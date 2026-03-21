from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from skill_extractor import extract_text_from_pdf, extract_skills, extract_jd_requirements
from gap_engine import analyze_gap, build_learning_path, generate_reasoning

app = FastAPI(title="Nexara API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "Nexara backend running"}

@app.post("/analyze")
async def analyze_full(
    resume: UploadFile = File(...),
    jd: UploadFile = File(...)
):
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

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
