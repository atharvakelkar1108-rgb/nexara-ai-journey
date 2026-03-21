export const COURSES = [
  { id: 'docker-basics', title: 'Docker & Containerization', skills: ['Docker', 'DevOps'], duration: '4 hrs', difficulty: 'Beginner', category: 'technical', prereqs: [] },
  { id: 'kubernetes-core', title: 'Kubernetes Orchestration', skills: ['Kubernetes', 'K8s'], duration: '6 hrs', difficulty: 'Intermediate', category: 'technical', prereqs: ['docker-basics'] },
  { id: 'aws-fundamentals', title: 'AWS Cloud Fundamentals', skills: ['AWS', 'Cloud', 'EC2'], duration: '8 hrs', difficulty: 'Beginner', category: 'technical', prereqs: [] },
  { id: 'system-design', title: 'System Design & Architecture', skills: ['System Design', 'Scalability'], duration: '10 hrs', difficulty: 'Advanced', category: 'technical', prereqs: ['aws-fundamentals'] },
  { id: 'kafka-messaging', title: 'Apache Kafka & Event Streaming', skills: ['Kafka', 'Streaming'], duration: '6 hrs', difficulty: 'Intermediate', category: 'technical', prereqs: [] },
  { id: 'ci-cd', title: 'CI/CD Pipelines & DevOps', skills: ['CI/CD', 'GitHub Actions'], duration: '5 hrs', difficulty: 'Intermediate', category: 'technical', prereqs: ['docker-basics'] },
]

export const ROLES = [
  { id: 'swe', title: 'Software Engineer', icon: '💻', category: 'technical', skills: ['Python', 'React', 'SQL', 'Git', 'System Design', 'Docker'] },
  { id: 'devops', title: 'DevOps Engineer', icon: '⚙️', category: 'technical', skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Terraform'] },
  { id: 'ml-eng', title: 'ML Engineer', icon: '🧠', category: 'technical', skills: ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'AWS'] },
  { id: 'fullstack', title: 'Full Stack Developer', icon: '🌐', category: 'technical', skills: ['React', 'Node.js', 'TypeScript', 'SQL', 'Docker'] },
  { id: 'data-eng', title: 'Data Engineer', icon: '📊', category: 'technical', skills: ['Python', 'SQL', 'Kafka', 'Spark', 'AWS', 'Airflow'] },
  { id: 'em', title: 'Engineering Manager', icon: '👥', category: 'managerial', skills: ['Leadership', 'Agile', 'System Design', 'Communication'] },
  { id: 'warehouse', title: 'Warehouse Supervisor', icon: '🏭', category: 'operational', skills: ['Logistics', 'Safety', 'Operations', 'Team Management'] },
  { id: 'pm', title: 'Product Manager', icon: '🎯', category: 'managerial', skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Roadmapping'] },
]

export const LEADERBOARD = [
  { rank: 1, name: 'Priya Sharma', avatar: 'PS', xp: 4850, level: 10, badge: '🏆', modules: 18, streak: 21 },
  { rank: 2, name: 'Rahul Mehta', avatar: 'RM', xp: 4200, level: 9, badge: '🥈', modules: 15, streak: 14 },
  { rank: 3, name: 'Ananya Gupta', avatar: 'AG', xp: 3900, level: 8, badge: '🥉', modules: 14, streak: 9 },
  { rank: 4, name: 'Vikram Nair', avatar: 'VN', xp: 3100, level: 7, badge: '⭐', modules: 12, streak: 7 },
  { rank: 5, name: 'Sneha Patel', avatar: 'SP', xp: 2750, level: 6, badge: '⭐', modules: 10, streak: 5 },
  { rank: 6, name: 'Atharva Kelkar', avatar: 'AK', xp: 1240, level: 5, badge: '🔥', modules: 4, streak: 7, isYou: true },
  { rank: 7, name: 'Rohan Das', avatar: 'RD', xp: 980, level: 3, badge: '', modules: 3, streak: 2 },
  { rank: 8, name: 'Kavya Reddy', avatar: 'KR', xp: 750, level: 2, badge: '', modules: 2, streak: 1 },
]

export const BADGES = [
  { id: 'first-analysis', icon: '🎯', title: 'First Analysis', desc: 'Completed your first skill gap analysis' },
  { id: 'speed-learner', icon: '⚡', title: 'Speed Learner', desc: 'Completed 3 modules in one day' },
  { id: 'week-streak', icon: '🔥', title: 'Week Streak', desc: '7 days learning streak' },
  { id: 'gap-crusher', icon: '💪', title: 'Gap Crusher', desc: 'Closed 5 skill gaps' },
  { id: 'role-ready', icon: '🚀', title: 'Role Ready', desc: 'Achieved 100% role readiness' },
  { id: 'scholar', icon: '🎓', title: 'Scholar', desc: 'Completed 10 modules' },
]

export const MOCK_ROADMAP = {
  readinessScore: 62,
  totalModules: 6,
  have: ['Python', 'REST APIs', 'Git', 'SQL', 'Linux'],
  improve: ['Docker', 'System Design'],
  missing: ['Kubernetes', 'Kafka', 'AWS'],
  modules: [
    { id: 'docker-basics', title: 'Docker & Containerization', skills: ['Docker', 'DevOps'], duration: '4 hrs', difficulty: 'Beginner', reason: 'Docker was listed as required in the JD but absent from your resume. It is also a prerequisite for Kubernetes.' },
    { id: 'aws-fundamentals', title: 'AWS Cloud Fundamentals', skills: ['AWS', 'Cloud', 'EC2'], duration: '8 hrs', difficulty: 'Beginner', reason: 'AWS Cloud is required for the role and will unlock System Design in the next step.' },
    { id: 'kubernetes-core', title: 'Kubernetes Orchestration', skills: ['Kubernetes', 'K8s'], duration: '6 hrs', difficulty: 'Intermediate', reason: 'Kubernetes depends on Docker (module 1). You need container orchestration for this DevOps role.' },
    { id: 'kafka-messaging', title: 'Apache Kafka & Event Streaming', skills: ['Kafka', 'Streaming'], duration: '6 hrs', difficulty: 'Intermediate', reason: 'Kafka is explicitly listed in the JD as a must-have for data pipeline responsibilities.' },
    { id: 'system-design', title: 'System Design & Architecture', skills: ['System Design', 'Scalability'], duration: '10 hrs', difficulty: 'Advanced', reason: 'System Design builds on AWS fundamentals. Senior roles require distributed systems thinking.' },
    { id: 'ci-cd', title: 'CI/CD Pipelines & DevOps', skills: ['CI/CD', 'GitHub Actions'], duration: '5 hrs', difficulty: 'Intermediate', reason: 'CI/CD pipelines are expected for modern DevOps-oriented engineering roles.' },
  ]
}
