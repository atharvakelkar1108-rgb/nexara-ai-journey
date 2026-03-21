import os
import json
from groq import Groq
import pdfplumber
import io
from dotenv import load_dotenv
from pathlib import Path

dotenv_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=dotenv_path)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

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

def extract_jd_requirements(jd_text: str) -> dict:
    prompt = f"""You are a job description parser. Extract required skills from this JD.

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

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
        max_tokens=1000,
    )
    raw = response.choices[0].message.content.strip()
    raw = raw.replace("```json", "").replace("```", "").strip()
    return json.loads(raw)
