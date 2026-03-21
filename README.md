<div align="center">
  <h1>⚡ Nexara AI</h1>
  <p><strong>Your next era starts here.</strong></p>
  <p>An AI-driven adaptive onboarding engine that maps personalized learning pathways by analyzing skill gaps between a candidate resume and target job description.</p>

  ![React](https://img.shields.io/badge/React-19-blue)
  ![FastAPI](https://img.shields.io/badge/FastAPI-0.100-green)
  ![Groq](https://img.shields.io/badge/Groq-Llama3-orange)
  ![License](https://img.shields.io/badge/License-MIT-purple)
</div>

---

## 🎯 Problem Statement

Corporate onboarding often uses static one-size-fits-all curricula. Experienced hires waste time on known concepts while beginners get overwhelmed. Nexara solves this by building a personalized, prerequisite-aware learning roadmap for every individual.

---

## ✨ Features

- **AI Skill Extraction** — Parses resume and JD using Llama 3.3 70B via Groq
- **Smart Gap Analysis** — Compares candidate skills vs role requirements with level matching
- **Adaptive Path Engine** — NetworkX DAG with topological sort for prerequisite ordering
- **Reasoning Trace** — Every module recommendation includes AI-generated justification
- **Zero Hallucination** — All modules strictly from predefined course catalog
- **Cross-Domain** — Supports Technical, Managerial, and Operational job categories
- **3 Input Modes** — Upload JD / Pick from Role Explorer / Just type job title
- **Comparison Mode** — Analyze 2 resumes against 1 JD simultaneously
- **Gamification** — XP, levels, badges, streaks, leaderboard
- **Dark/Light Mode** — Full theme support
- **AI Chat Sidebar** — Ask questions about your roadmap in real time

---

## 🏗️ Architecture
```
Resume + JD
     ↓
Skill Extractor (Llama 3.3 via Groq)
     ↓
Gap Analyzer (Level-aware comparison)
     ↓
Adaptive Path Engine (NetworkX DAG + Topological Sort)
     ↓
Reasoning Generator (Per-module AI justification)
     ↓
Personalized Learning Roadmap
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+
- Python 3.11+
- Groq API Key (free at console.groq.com)

### Frontend
```bash
npm install
npm run dev
```
Runs at `http://localhost:5173`

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
cp .env.example .env         # Add your GROQ_API_KEY
python main.py
```
Runs at `http://localhost:8000`

### API Docs
Visit `http://localhost:8000/docs` for interactive Swagger UI

---

## 🧠 Skill Gap Algorithm

1. **Extraction** — LLM parses resume into structured JSON skill list with proficiency levels (beginner/intermediate/expert)
2. **Normalization** — Skills normalized against O*NET taxonomy to prevent name mismatches
3. **Gap Detection** — Three-way classification: exact match, level mismatch, completely missing
4. **Readiness Score** — `(matched skills / total required) * 100`
5. **Path Building** — NetworkX DiGraph built from course catalog prerequisites, topological sort applied, modules filtered to only those that close identified gaps
6. **Ordering** — Prerequisites automatically prepended when a dependent module is selected

---

## 📊 Datasets Used

| Dataset | Source | Usage |
|---------|--------|-------|
| O*NET Database | onetcenter.org | Skill normalization taxonomy |
| Resume Dataset | Kaggle (snehaanbhawal) | Testing & validation |
| Job Description Dataset | Kaggle (kshitizregmi) | Testing & validation |

---

## 🤖 Models Used

| Model | Provider | Usage |
|-------|----------|-------|
| Llama 3.3 70B Versatile | Groq | Skill extraction + reasoning generation |

---

## 📏 Evaluation Metrics

| Metric | Description |
|--------|-------------|
| Extraction Accuracy | Validated on 20 sample resumes |
| Zero Hallucination | All modules validated against catalog |
| Redundancy Reduction | Average modules skipped vs static curriculum |
| Cross-domain Coverage | Tested on 8 diverse job roles |

---

## 🐳 Docker
```bash
docker build -t nexara .
docker run -p 8000:8000 -e GROQ_API_KEY=your_key nexara
```

---

## 📁 Project Structure
```
nexara-ai-journey/
├── src/                    # React frontend
│   ├── components/         # Navbar, HeroSection, HowItWorks
│   ├── pages/              # All page components
│   ├── context/            # Theme + Auth context
│   ├── data/               # Mock data & course catalog
│   └── api/                # API client
├── backend/                # Python FastAPI backend
│   ├── main.py             # API endpoints
│   ├── skill_extractor.py  # LLM-based skill parsing
│   ├── gap_engine.py       # Gap analysis + adaptive pathing
│   └── requirements.txt
├── Dockerfile
└── README.md
```

---

## 👨‍💻 Team

Built with ❤️ for ARTPARK CodeForge Hackathon 2025

---

## 📄 License

MIT License
