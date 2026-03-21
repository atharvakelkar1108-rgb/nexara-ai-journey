<div align="center">
  <h1>⚡ Nexara AI</h1>
  <p><strong>Your next era starts here.</strong></p>
  <p>An AI-driven adaptive onboarding engine that builds personalized, prerequisite-aware learning roadmaps by analyzing the skill gap between a candidate resume and a target job description.</p>

  ![React](https://img.shields.io/badge/React-19-blue)
  ![FastAPI](https://img.shields.io/badge/FastAPI-green)
  ![Groq](https://img.shields.io/badge/Groq-Llama3.3-orange)
  ![License](https://img.shields.io/badge/License-MIT-purple)
  ![Live](https://img.shields.io/badge/Live-Deployed-brightgreen)
</div>

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| 🎯 **Frontend App** | https://nexara-ai-journey.vercel.app |
| 🔧 **Backend API** | https://nexara-backend.onrender.com |
| 📚 **API Docs (Swagger)** | https://nexara-backend.onrender.com/docs |
| 📁 **GitHub** | https://github.com/atharvakelkar1108-rgb/nexara-ai-journey |

---

## 🎯 Problem Statement

Corporate onboarding often uses static, one-size-fits-all curricula:
- Experienced hires waste time on concepts they already know
- Beginners get overwhelmed by advanced modules
- No personalization at scale

Nexara solves this by building a unique learning roadmap per person, based on their actual skill gaps relative to the target role.

---

## ✨ Features

- **AI Skill Extraction** — Llama 3.3 70B parses resume and JD into structured JSON with skill names and proficiency levels
- **Skill Normalization** — Custom alias dictionary maps informal names (JS→JavaScript, k8s→Kubernetes)
- **Level-aware Gap Analysis** — Three-way classification: exact match / level mismatch / completely missing
- **Adaptive Path Engine** — NetworkX DAG with topological sort ensures prerequisites are always respected
- **Reasoning Trace** — Every module includes an AI-generated explanation of why it was selected
- **Zero Hallucination** — All recommendations come strictly from a predefined course catalog
- **Cross-Domain** — Supports Technical, Managerial, and Operational job categories
- **3 Input Modes** — Upload JD / Pick from Role Explorer / Type job title
- **Comparison Mode** — Analyze 2 resumes against 1 JD simultaneously
- **Gamification** — XP, levels, badges, streaks, leaderboard
- **Dark / Light Mode** — Full theme toggle
- **AI Chat Sidebar** — Ask questions about your roadmap in real time

---

## 🏗️ Architecture
```
Resume + JD Input
       ↓
Skill Extractor  →  Llama 3.3 70B via Groq
       ↓
Skill Normalizer →  Alias dictionary
       ↓
Gap Analyzer     →  Level-aware 3-way classification
       ↓
Path Engine      →  NetworkX DAG + Topological Sort
       ↓
Reasoning Engine →  Per-module AI justification
       ↓
Personalized Learning Roadmap
```

---

## 🚀 Setup and Installation

### Prerequisites
- Node.js 18+
- Python 3.11+
- Groq API Key — free at console.groq.com

### Frontend
```bash
npm install
npm run dev
```
Runs at http://localhost:5173

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python main.py
```
Runs at http://localhost:8000

### API Docs
Visit http://localhost:8000/docs for Swagger UI

---

## 🧠 Skill Gap Algorithm

1. **Text Extraction** — PDFPlumber extracts raw text from uploaded PDF files
2. **LLM Parsing** — Llama 3.3 70B returns structured JSON with skill names and proficiency levels
3. **Normalization** — Alias dictionary maps informal names to standard titles
4. **Gap Detection** — Per skill: exact match / level mismatch / completely missing
5. **Readiness Score** — (exact matches / total JD requirements) x 100
6. **Path Building** — NetworkX DiGraph built from course catalog, topological sort applied
7. **Prerequisite Injection** — Unmet prerequisites automatically prepended to the path
8. **Reasoning** — Per-module AI explanation generated for full transparency

---

## 🤖 Models and Tools

| Tool | Purpose |
|------|---------|
| Llama 3.3 70B Versatile (Groq) | Skill extraction from resume and JD |
| NetworkX | Prerequisite dependency graph + topological sort |
| PDFPlumber | PDF text extraction |
| FastAPI | Backend REST API |
| React 19 + Vite | Frontend application |
| TailwindCSS v4 | Styling |

---

## 📊 Datasets Referenced

| Dataset | Source | Purpose |
|---------|--------|---------|
| O*NET Skill Taxonomy | onetcenter.org | Inspiration for skill normalization structure |
| Resume Dataset | Kaggle (snehaanbhawal) | Reference for resume format understanding |
| Job Description Dataset | Kaggle (kshitizregmi) | Reference for JD format understanding |

Note: The course catalog and skill normalization dictionary were built manually. These datasets were used as domain reference only.

---

## 📏 Key Metrics

| Metric | Value |
|--------|-------|
| Readiness Score | Calculated per analysis: (matches / total) x 100 |
| Hallucination Rate | 0% — all modules from predefined catalog |
| Job Categories Supported | 3 (Technical, Managerial, Operational) |
| Roles in Explorer | 8 built-in roles |
| Course Catalog Size | 19 modules across all categories |

---

## 📁 Project Structure
```
nexara-ai-journey/
├── src/
│   ├── components/          # Navbar, HeroSection, HowItWorks
│   ├── pages/               # All page components
│   ├── context/             # Theme + Auth context
│   ├── data/                # Course catalog + mock data
│   └── api/                 # API client
├── backend/
│   ├── main.py              # FastAPI endpoints
│   ├── skill_extractor.py   # LLM skill parsing
│   ├── gap_engine.py        # Gap analysis + path algorithm
│   ├── skill_normalizer.py  # Alias normalization
│   └── requirements.txt
├── Dockerfile
└── README.md
```

---

## 🐳 Docker
```bash
docker build -t nexara .
docker run -p 8000:8000 -e GROQ_API_KEY=your_key nexara
```

---

## 👥 Team

**Team Fast and Curious** — ARTPARK CodeForge Hackathon 2025

---

## 📄 License

MIT License
