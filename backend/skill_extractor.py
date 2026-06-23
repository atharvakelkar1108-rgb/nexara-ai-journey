import os
import json
from groq import Groq
import pdfplumber
import io
from dotenv import load_dotenv
from pathlib import Path

dotenv_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=dotenv_path)

# Prefer process env (Render/Docker) and fall back to backend/.env for local dev.
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "").strip()
if not GROQ_API_KEY or GROQ_API_KEY == "your_groq_api_key_here":
    raise RuntimeError(
        "Missing GROQ_API_KEY in backend/.env. Please set your Groq API key before running the backend."
    )

client = Groq(api_key=GROQ_API_KEY)

def extract_text_from_pdf(file_bytes: bytes) -> str:
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        return "\n".join(page.extract_text() or "" for page in pdf.pages)

def extract_skills(text: str) -> dict:
    prompt = f"""You are a skill extraction engine. Extract skills from this resume.

Return ONLY valid JSON, no explanation, no markdown, no backticks:
{{
  "skills": [
    {{"name": "Python", "level": "intermediate", "years": 2}},
    {{"name": "Docker", "level": "beginner", "years": 0}}
  ],
  "experience_years": 3,
  "job_category": "technical"
}}

Levels must be exactly: beginner, intermediate, or expert
Job categories must be exactly: technical, managerial, or operational

RESUME:
{text[:3000]}"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
        max_tokens=1000,
    )
    raw = response.choices[0].message.content.strip()
    raw = raw.replace("```json", "").replace("```", "").strip()
    return json.loads(raw)

def _parse_llm_json(raw: str) -> dict:
    raw = raw.replace("```json", "").replace("```", "").strip()
    return json.loads(raw)


def _call_llm(prompt: str) -> dict:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
        max_tokens=1000,
    )
    return _parse_llm_json(response.choices[0].message.content.strip())


def infer_role_requirements(job_title: str) -> dict:
    prompt = f"""You are a career skills expert with knowledge of every industry and job title.

A candidate is targeting this role: "{job_title}"

Infer 8-12 skills typically required for this EXACT role in the industry today.
Works for ANY role — technical, managerial, operational, creative, healthcare, legal, finance, education, trades, etc.
Use standard skill names that appear on resumes and job postings.

Return ONLY valid JSON, no explanation, no markdown, no backticks:
{{
  "required_skills": [
    {{"name": "Manual Testing", "importance": "must-have", "level_required": "intermediate"}},
    {{"name": "Selenium", "importance": "nice-to-have", "level_required": "beginner"}}
  ],
  "job_title": "{job_title}",
  "job_category": "technical"
}}

Importance must be exactly: must-have or nice-to-have
Levels must be exactly: beginner, intermediate, or expert
Job categories must be exactly: technical, managerial, or operational
Always return at least 8 required_skills."""

    data = _call_llm(prompt)
    if len(data.get("required_skills", [])) < 6:
        data["required_skills"] = data.get("required_skills", []) + [
            {"name": "Communication", "importance": "must-have", "level_required": "intermediate"},
            {"name": "Problem Solving", "importance": "must-have", "level_required": "intermediate"},
            {"name": "Teamwork", "importance": "must-have", "level_required": "beginner"},
        ]
    return data


def extract_jd_requirements(jd_text: str) -> dict:
    prompt = f"""You are a job description parser. Extract required skills from this JD.

If the input only contains a job title with little or no detail, infer 8-12 typical skills
required for that role in the industry. Always return at least 6 required_skills.

Return ONLY valid JSON, no explanation, no markdown, no backticks:
{{
  "required_skills": [
    {{"name": "Kubernetes", "importance": "must-have", "level_required": "intermediate"}},
    {{"name": "AWS", "importance": "nice-to-have", "level_required": "beginner"}}
  ],
  "job_title": "DevOps Engineer",
  "job_category": "technical"
}}

Importance must be exactly: must-have or nice-to-have
Levels must be exactly: beginner, intermediate, or expert
Job categories must be exactly: technical, managerial, or operational

JD:
{jd_text[:3000]}"""

    data = _call_llm(prompt)
    title = data.get("job_title") or _extract_job_title(jd_text)
    if len(data.get("required_skills", [])) < 6 and title:
        data = infer_role_requirements(title)
    return data


def _extract_job_title(jd_text: str) -> str:
    for line in jd_text.splitlines():
        if line.lower().startswith("job title:"):
            return line.split(":", 1)[1].strip()
    return jd_text.split("\n", 1)[0].strip()
