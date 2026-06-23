from typing import List, Dict
import networkx as nx

COURSE_CATALOG = [
    {"id": "docker-basics", "title": "Docker & Containerization", "skills_taught": ["Docker", "DevOps"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 4, "category": "technical"},
    {"id": "kubernetes-core", "title": "Kubernetes Orchestration", "skills_taught": ["Kubernetes", "K8s"], "prerequisites": ["docker-basics"], "difficulty": "Intermediate", "duration_hours": 6, "category": "technical"},
    {"id": "aws-fundamentals", "title": "AWS Cloud Fundamentals", "skills_taught": ["AWS", "Cloud", "EC2", "S3"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 8, "category": "technical"},
    {"id": "system-design", "title": "System Design & Architecture", "skills_taught": ["System Design", "Scalability", "Architecture"], "prerequisites": ["aws-fundamentals"], "difficulty": "Advanced", "duration_hours": 10, "category": "technical"},
    {"id": "kafka-messaging", "title": "Apache Kafka & Event Streaming", "skills_taught": ["Kafka", "Streaming", "Messaging"], "prerequisites": [], "difficulty": "Intermediate", "duration_hours": 6, "category": "technical"},
    {"id": "ci-cd", "title": "CI/CD Pipelines", "skills_taught": ["CI/CD", "GitHub Actions", "Jenkins"], "prerequisites": ["docker-basics"], "difficulty": "Intermediate", "duration_hours": 5, "category": "technical"},
    {"id": "react-advanced", "title": "Advanced React Patterns", "skills_taught": ["React", "TypeScript", "Hooks"], "prerequisites": [], "difficulty": "Intermediate", "duration_hours": 5, "category": "technical"},
    {"id": "sql-advanced", "title": "Advanced SQL & Database Design", "skills_taught": ["SQL", "PostgreSQL", "Database"], "prerequisites": [], "difficulty": "Intermediate", "duration_hours": 6, "category": "technical"},
    {"id": "ml-fundamentals", "title": "ML Fundamentals with Python", "skills_taught": ["Machine Learning", "Python", "scikit-learn"], "prerequisites": [], "difficulty": "Intermediate", "duration_hours": 12, "category": "technical"},
    {"id": "deep-learning", "title": "Deep Learning & Neural Networks", "skills_taught": ["Deep Learning", "PyTorch", "TensorFlow"], "prerequisites": ["ml-fundamentals"], "difficulty": "Advanced", "duration_hours": 15, "category": "technical"},
    {"id": "python-basics", "title": "Python Programming", "skills_taught": ["Python", "OOP", "Data Structures"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 8, "category": "technical"},
    {"id": "linux-fundamentals", "title": "Linux & Shell Scripting", "skills_taught": ["Linux", "Bash", "Shell"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 5, "category": "technical"},
    {"id": "terraform", "title": "Infrastructure as Code with Terraform", "skills_taught": ["Terraform", "IaC", "Cloud Infrastructure"], "prerequisites": ["aws-fundamentals"], "difficulty": "Intermediate", "duration_hours": 7, "category": "technical"},
    {"id": "leadership", "title": "Engineering Leadership", "skills_taught": ["Leadership", "Team Management", "Communication"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 4, "category": "managerial"},
    {"id": "agile-scrum", "title": "Agile & Scrum Mastery", "skills_taught": ["Agile", "Scrum", "Project Management"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 3, "category": "managerial"},
    {"id": "product-strategy", "title": "Product Strategy & Roadmapping", "skills_taught": ["Product Strategy", "Roadmapping", "OKRs"], "prerequisites": [], "difficulty": "Intermediate", "duration_hours": 5, "category": "managerial"},
    {"id": "safety-protocols", "title": "Workplace Safety Protocols", "skills_taught": ["Safety", "Compliance", "OSHA"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 3, "category": "operational"},
    {"id": "logistics-ops", "title": "Logistics & Operations Management", "skills_taught": ["Logistics", "Operations", "Supply Chain"], "prerequisites": [], "difficulty": "Intermediate", "duration_hours": 5, "category": "operational"},
    {"id": "warehouse-mgmt", "title": "Warehouse Management Systems", "skills_taught": ["WMS", "Inventory", "Warehouse"], "prerequisites": ["logistics-ops"], "difficulty": "Intermediate", "duration_hours": 4, "category": "operational"},
    {"id": "qa-fundamentals", "title": "QA & Software Testing Fundamentals", "skills_taught": ["QA", "Quality Assurance", "Manual Testing", "Software Testing", "Test Cases", "Test Planning"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 5, "category": "technical"},
    {"id": "test-automation", "title": "Test Automation with Selenium", "skills_taught": ["Selenium", "Test Automation", "Automation Testing", "Automated Testing"], "prerequisites": ["qa-fundamentals"], "difficulty": "Intermediate", "duration_hours": 6, "category": "technical"},
    {"id": "api-testing", "title": "API Testing & Postman", "skills_taught": ["API Testing", "Postman", "REST API Testing", "API Test"], "prerequisites": [], "difficulty": "Intermediate", "duration_hours": 4, "category": "technical"},
    {"id": "node-backend", "title": "Node.js Backend Development", "skills_taught": ["Node.js", "Express", "REST APIs", "Backend"], "prerequisites": [], "difficulty": "Intermediate", "duration_hours": 8, "category": "technical"},
    {"id": "data-science", "title": "Data Science with Python", "skills_taught": ["Data Science", "Pandas", "Data Analysis", "Statistics"], "prerequisites": ["python-basics"], "difficulty": "Intermediate", "duration_hours": 10, "category": "technical"},
    {"id": "cybersecurity", "title": "Cybersecurity Fundamentals", "skills_taught": ["Cybersecurity", "Security", "Network Security", "Threat Analysis"], "prerequisites": [], "difficulty": "Intermediate", "duration_hours": 6, "category": "technical"},
    {"id": "ux-design", "title": "UX/UI Design Fundamentals", "skills_taught": ["UX Design", "UI Design", "Figma", "User Research"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 5, "category": "technical"},
    {"id": "business-analysis", "title": "Business Analysis Essentials", "skills_taught": ["Business Analysis", "Requirements Gathering", "Stakeholder Management"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 4, "category": "managerial"},
    {"id": "data-analytics", "title": "Data Analytics & Excel", "skills_taught": ["Excel", "Data Analytics", "Reporting", "Dashboards"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 4, "category": "managerial"},
    {"id": "digital-marketing", "title": "Digital Marketing Foundations", "skills_taught": ["Digital Marketing", "SEO", "Content Marketing", "Social Media"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 4, "category": "managerial"},
    {"id": "sales-fundamentals", "title": "Sales & Client Management", "skills_taught": ["Sales", "Negotiation", "CRM", "Client Relations"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 4, "category": "managerial"},
    {"id": "hr-fundamentals", "title": "HR & Talent Management", "skills_taught": ["HR", "Recruitment", "Talent Management", "Employee Relations"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 4, "category": "managerial"},
    {"id": "customer-support", "title": "Customer Support Excellence", "skills_taught": ["Customer Support", "Communication", "Ticketing", "Problem Solving"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 3, "category": "operational"},
    {"id": "supply-chain", "title": "Supply Chain Fundamentals", "skills_taught": ["Supply Chain", "Procurement", "Inventory Management"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 4, "category": "operational"},
    {"id": "quality-control", "title": "Quality Control & Compliance", "skills_taught": ["Quality Control", "Compliance", "Auditing", "Process Improvement"], "prerequisites": [], "difficulty": "Beginner", "duration_hours": 4, "category": "operational"},
]

def _skills_overlap(skills_needed: set, skills_taught: set) -> bool:
    for needed in skills_needed:
        for taught in skills_taught:
            if needed == taught or needed in taught or taught in needed:
                return True
    return False

def analyze_gap(resume_skills: List[Dict], jd_requirements: List[Dict]) -> Dict:
    resume_map = {s["name"].lower(): s for s in resume_skills}
    have, improve, missing = [], [], []
    level_order = {"beginner": 0, "intermediate": 1, "expert": 2}

    def resume_match(required: str):
        req_lower = required.lower()
        if req_lower in resume_map:
            return resume_map[req_lower]
        for name, skill in resume_map.items():
            if req_lower in name or name in req_lower:
                return skill
        return None

    for req in jd_requirements:
        name = req["name"]
        matched = resume_match(name)
        if matched:
            candidate_level = matched.get("level", "beginner")
            required_level = req.get("level_required", "beginner")
            if level_order.get(candidate_level, 0) >= level_order.get(required_level, 0):
                have.append(name)
            else:
                improve.append(name)
        else:
            missing.append(name)

    total = len(jd_requirements)
    score = int((len(have) / total) * 100) if total > 0 else 0

    return {
        "have": have,
        "improve": improve,
        "missing": missing,
        "readiness_score": score,
    }

def build_learning_path(gap: Dict, job_category: str) -> List[Dict]:
    skills_needed = set(s.lower() for s in gap["missing"] + gap["improve"])
    catalog = [c for c in COURSE_CATALOG if c["category"] == job_category]
    if not catalog:
        catalog = COURSE_CATALOG

    G = nx.DiGraph()
    for course in catalog:
        G.add_node(course["id"])
        for prereq in course["prerequisites"]:
            G.add_edge(prereq, course["id"])

    try:
        ordered_ids = list(nx.topological_sort(G))
    except Exception:
        ordered_ids = [c["id"] for c in catalog]

    selected = []
    selected_ids = set()

    for cid in ordered_ids:
        course = next((c for c in catalog if c["id"] == cid), None)
        if not course:
            continue
        teaches = set(s.lower() for s in course["skills_taught"])
        if not _skills_overlap(skills_needed, teaches):
            continue
        prereqs_met = all(p in selected_ids for p in course["prerequisites"])
        if course["prerequisites"] and not prereqs_met:
            for prereq_id in course["prerequisites"]:
                if prereq_id not in selected_ids:
                    prereq_course = next((c for c in catalog if c["id"] == prereq_id), None)
                    if prereq_course:
                        selected.append(prereq_course)
                        selected_ids.add(prereq_id)
        selected.append(course)
        selected_ids.add(course["id"])

    if not selected and skills_needed:
        ranked = []
        for course in catalog:
            teaches = set(s.lower() for s in course["skills_taught"])
            overlap = sum(
                1 for needed in skills_needed
                if any(needed == taught or needed in taught or taught in needed for taught in teaches)
            )
            if overlap:
                ranked.append((overlap, course))
        ranked.sort(key=lambda item: item[0], reverse=True)
        selected = [course for _, course in ranked[:5]]

    return selected

def generate_reasoning(module: Dict, gap: Dict) -> str:
    missing = [s.lower() for s in gap.get("missing", [])]
    improve = [s.lower() for s in gap.get("improve", [])]
    taught = module["skills_taught"]
    reasons = []

    for skill in taught:
        skill_lower = skill.lower()
        if skill_lower in missing:
            reasons.append(f"{skill} was explicitly required in the JD but absent from your resume")
        elif skill_lower in improve:
            reasons.append(f"{skill} exists in your resume but needs to reach a higher proficiency level")

    prereqs = module.get("prerequisites", [])
    if prereqs:
        reasons.append(f"This module depends on {', '.join(prereqs)} which were added to your path as prerequisites")

    if not reasons:
        reasons.append(f"This module teaches {', '.join(taught)} which are needed for your target role")

    return ". ".join(reasons) + "."
