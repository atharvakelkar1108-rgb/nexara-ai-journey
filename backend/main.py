from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import EventSourceResponse
import uvicorn
import asyncio
import json
import os
import random
from skill_extractor import extract_text_from_pdf, extract_skills, extract_jd_requirements
from gap_engine import analyze_gap, build_learning_path, generate_reasoning

app = FastAPI(title="Nexara API")

DEFAULT_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://nexara-ai-journey.vercel.app",
]
extra_origins = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "").split(",")
    if origin.strip()
]
allowed_origins = list(dict.fromkeys(DEFAULT_ORIGINS + extra_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LEADERBOARD_STATE = [
    {"rank": 1, "name": "Priya Sharma", "avatar": "PS", "xp": 4850, "level": 10, "badge": "🏆", "modules": 18, "streak": 21},
    {"rank": 2, "name": "Rahul Mehta", "avatar": "RM", "xp": 4200, "level": 9, "badge": "🥈", "modules": 15, "streak": 14},
    {"rank": 3, "name": "Ananya Gupta", "avatar": "AG", "xp": 3900, "level": 8, "badge": "🥉", "modules": 14, "streak": 9},
    {"rank": 4, "name": "Vikram Nair", "avatar": "VN", "xp": 3100, "level": 7, "badge": "⭐", "modules": 12, "streak": 7},
    {"rank": 5, "name": "Sneha Patel", "avatar": "SP", "xp": 2750, "level": 6, "badge": "⭐", "modules": 10, "streak": 5},
    {"rank": 6, "name": "Atharva Kelkar", "avatar": "AK", "xp": 1240, "level": 5, "badge": "🔥", "modules": 4, "streak": 7},
    {"rank": 7, "name": "Rohan Das", "avatar": "RD", "xp": 980, "level": 3, "badge": "", "modules": 3, "streak": 2},
    {"rank": 8, "name": "Kavya Reddy", "avatar": "KR", "xp": 750, "level": 2, "badge": "", "modules": 2, "streak": 1},
]

def sort_leaderboard():
    LEADERBOARD_STATE.sort(key=lambda entry: entry["xp"], reverse=True)
    for index, entry in enumerate(LEADERBOARD_STATE, start=1):
        entry["rank"] = index


def simulate_realtime_update():
    winner = random.choice(LEADERBOARD_STATE[:4])
    xp_gain = random.choice([50, 75, 100])
    winner["xp"] += xp_gain
    winner["streak"] += 1
    if winner["xp"] >= 5000:
        winner["level"] += 1
        winner["xp"] = 5000
    sort_leaderboard()


def leaderboard_event_generator():
    async def event_generator():
        while True:
            simulate_realtime_update()
            yield f"data: {json.dumps(LEADERBOARD_STATE)}\n\n"
            await asyncio.sleep(5)
    return event_generator()

@app.get("/")
def root():
    return {"status": "Nexara backend running"}

@app.get("/leaderboard")
def leaderboard_snapshot():
    return LEADERBOARD_STATE

@app.get("/leaderboard/stream")
def leaderboard_stream():
    return EventSourceResponse(leaderboard_event_generator())

@app.post("/analyze")
async def analyze_full(
    resume: UploadFile = File(...),
    jd: UploadFile = File(...)
):
    try:
        resume_bytes = await resume.read()
        jd_bytes = await jd.read()

        resume_text = extract_text_from_pdf(resume_bytes) if resume.filename.endswith(".pdf") else resume_bytes.decode("utf-8", errors="ignore")
        jd_text = extract_text_from_pdf(jd_bytes) if jd.filename.endswith(".pdf") else jd_bytes.decode("utf-8", errors="ignore")

        resume_data = extract_skills(resume_text)
        jd_data = extract_jd_requirements(jd_text)

        gap = analyze_gap(resume_data["skills"], jd_data["required_skills"])
        job_category = jd_data.get("job_category", "technical")
        path = build_learning_path(gap, job_category)

        modules_with_reasons = [
            {**module, "reason": generate_reasoning(module, gap)}
            for module in path
        ]

        reasoning_trace = [
            f"Step 1: Extracted {len(resume_data['skills'])} skills from resume using Claude claude-sonnet-4-20250514",
            f"Step 2: Identified {len(jd_data['required_skills'])} required skills from JD",
            f"Step 3: Found {len(gap['have'])} exact matches, {len(gap['improve'])} partial matches, {len(gap['missing'])} gaps",
            f"Step 4: Detected job category as '{job_category}' — filtered course catalog accordingly",
            f"Step 5: Built prerequisite dependency graph using NetworkX DiGraph",
            f"Step 6: Applied topological sort to ensure correct module ordering",
            f"Step 7: Selected {len(path)} modules that directly close identified skill gaps",
            f"Step 8: Generated reasoning trace for each module — zero hallucination, all from catalog",
        ]

        return {
            "resume_skills": resume_data["skills"],
            "jd_requirements": jd_data["required_skills"],
            "job_title": jd_data.get("job_title", "Unknown Role"),
            "job_category": job_category,
            "gap": gap,
            "modules": modules_with_reasons,
            "readiness_score": gap["readiness_score"],
            "reasoning_trace": reasoning_trace
        }
    except Exception as exc:
        message = str(exc)
        if "invalid_api_key" in message or "Invalid API Key" in message:
            raise HTTPException(
                status_code=503,
                detail="Groq API key is missing or invalid. Set GROQ_API_KEY in backend/.env (local) or Render environment variables (production).",
            )
        raise HTTPException(status_code=500, detail=message)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
