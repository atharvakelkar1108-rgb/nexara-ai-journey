export const COURSES = [
  { id: 'docker-basics', title: 'Docker & Containerization', skills: ['Docker', 'DevOps'], duration: '4 hrs', difficulty: 'Beginner', category: 'technical', prereqs: [] },
  { id: 'kubernetes-core', title: 'Kubernetes Orchestration', skills: ['Kubernetes', 'K8s'], duration: '6 hrs', difficulty: 'Intermediate', category: 'technical', prereqs: ['docker-basics'] },
  { id: 'aws-fundamentals', title: 'AWS Cloud Fundamentals', skills: ['AWS', 'Cloud', 'EC2'], duration: '8 hrs', difficulty: 'Beginner', category: 'technical', prereqs: [] },
  { id: 'system-design', title: 'System Design & Architecture', skills: ['System Design', 'Scalability'], duration: '10 hrs', difficulty: 'Advanced', category: 'technical', prereqs: ['aws-fundamentals'] },
  { id: 'kafka-messaging', title: 'Apache Kafka & Event Streaming', skills: ['Kafka', 'Streaming'], duration: '6 hrs', difficulty: 'Intermediate', category: 'technical', prereqs: [] },
  { id: 'ci-cd', title: 'CI/CD Pipelines & DevOps', skills: ['CI/CD', 'GitHub Actions'], duration: '5 hrs', difficulty: 'Intermediate', category: 'technical', prereqs: ['docker-basics'] },
]

export const ROLES = [
  // Technical
  { id: 'swe', title: 'Software Engineer', icon: '💻', category: 'technical', skills: ['Python', 'React', 'SQL', 'Git', 'System Design', 'Docker'] },
  { id: 'frontend', title: 'Frontend Developer', icon: '🎨', category: 'technical', skills: ['React', 'TypeScript', 'CSS', 'JavaScript', 'HTML', 'UI Design'] },
  { id: 'backend', title: 'Backend Developer', icon: '🛠️', category: 'technical', skills: ['Python', 'Node.js', 'SQL', 'REST APIs', 'Docker', 'System Design'] },
  { id: 'fullstack', title: 'Full Stack Developer', icon: '🌐', category: 'technical', skills: ['React', 'Node.js', 'TypeScript', 'SQL', 'Docker'] },
  { id: 'mobile', title: 'Mobile Developer', icon: '📱', category: 'technical', skills: ['React Native', 'Swift', 'Kotlin', 'Mobile UI', 'APIs'] },
  { id: 'devops', title: 'DevOps Engineer', icon: '⚙️', category: 'technical', skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Terraform'] },
  { id: 'sre', title: 'Site Reliability Engineer', icon: '🔧', category: 'technical', skills: ['Linux', 'Kubernetes', 'Monitoring', 'CI/CD', 'Python', 'AWS'] },
  { id: 'cloud-architect', title: 'Cloud Architect', icon: '☁️', category: 'technical', skills: ['AWS', 'Azure', 'Terraform', 'System Design', 'Networking', 'Security'] },
  { id: 'ml-eng', title: 'ML Engineer', icon: '🧠', category: 'technical', skills: ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'AWS'] },
  { id: 'data-scientist', title: 'Data Scientist', icon: '📈', category: 'technical', skills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Analysis'] },
  { id: 'data-eng', title: 'Data Engineer', icon: '📊', category: 'technical', skills: ['Python', 'SQL', 'Kafka', 'Spark', 'AWS', 'Airflow'] },
  { id: 'data-analyst', title: 'Data Analyst', icon: '📉', category: 'technical', skills: ['SQL', 'Excel', 'Python', 'Data Visualization', 'Statistics'] },
  { id: 'qa-analyst', title: 'Quality Assurance Analyst', icon: '✅', category: 'technical', skills: ['Manual Testing', 'Test Cases', 'Selenium', 'API Testing', 'JIRA', 'SQL'] },
  { id: 'qa-engineer', title: 'QA Engineer', icon: '🔍', category: 'technical', skills: ['Test Automation', 'Selenium', 'API Testing', 'CI/CD', 'Python', 'Agile'] },
  { id: 'security', title: 'Cybersecurity Analyst', icon: '🔒', category: 'technical', skills: ['Cybersecurity', 'Network Security', 'Linux', 'Threat Analysis', 'Compliance'] },
  { id: 'dba', title: 'Database Administrator', icon: '🗄️', category: 'technical', skills: ['SQL', 'PostgreSQL', 'Database Design', 'Performance Tuning', 'Backup'] },
  { id: 'network', title: 'Network Engineer', icon: '🌐', category: 'technical', skills: ['Networking', 'TCP/IP', 'Linux', 'Security', 'Cloud'] },
  { id: 'ux-designer', title: 'UX Designer', icon: '✏️', category: 'technical', skills: ['UX Design', 'Figma', 'User Research', 'Prototyping', 'UI Design'] },
  { id: 'ui-designer', title: 'UI Designer', icon: '🖌️', category: 'technical', skills: ['UI Design', 'Figma', 'CSS', 'Design Systems', 'Prototyping'] },
  { id: 'business-analyst', title: 'Business Analyst', icon: '📋', category: 'technical', skills: ['Business Analysis', 'Requirements Gathering', 'SQL', 'Agile', 'Documentation'] },
  { id: 'blockchain', title: 'Blockchain Developer', icon: '⛓️', category: 'technical', skills: ['Solidity', 'Smart Contracts', 'Web3', 'JavaScript', 'Security'] },
  { id: 'game-dev', title: 'Game Developer', icon: '🎮', category: 'technical', skills: ['C++', 'Unity', 'Game Design', '3D Graphics', 'Physics'] },
  { id: 'embedded', title: 'Embedded Systems Engineer', icon: '🔌', category: 'technical', skills: ['C', 'C++', 'RTOS', 'Microcontrollers', 'Linux'] },
  { id: 'ai-engineer', title: 'AI Engineer', icon: '🤖', category: 'technical', skills: ['Python', 'Deep Learning', 'NLP', 'LLMs', 'PyTorch'] },
  // Managerial
  { id: 'em', title: 'Engineering Manager', icon: '👥', category: 'managerial', skills: ['Leadership', 'Agile', 'System Design', 'Communication'] },
  { id: 'pm', title: 'Product Manager', icon: '🎯', category: 'managerial', skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Roadmapping'] },
  { id: 'project-mgr', title: 'Project Manager', icon: '📅', category: 'managerial', skills: ['Project Management', 'Agile', 'Scrum', 'Stakeholder Management', 'Risk Management'] },
  { id: 'scrum-master', title: 'Scrum Master', icon: '🏃', category: 'managerial', skills: ['Scrum', 'Agile', 'Facilitation', 'Coaching', 'JIRA'] },
  { id: 'tpm', title: 'Technical Program Manager', icon: '🗂️', category: 'managerial', skills: ['Program Management', 'Agile', 'Technical Leadership', 'Roadmapping'] },
  { id: 'marketing-mgr', title: 'Marketing Manager', icon: '📣', category: 'managerial', skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics', 'Branding'] },
  { id: 'sales-mgr', title: 'Sales Manager', icon: '💼', category: 'managerial', skills: ['Sales', 'CRM', 'Negotiation', 'Leadership', 'Forecasting'] },
  { id: 'hr-mgr', title: 'HR Manager', icon: '🧑‍💼', category: 'managerial', skills: ['HR', 'Recruitment', 'Employee Relations', 'Compliance', 'Talent Management'] },
  { id: 'ops-mgr', title: 'Operations Manager', icon: '🏢', category: 'managerial', skills: ['Operations', 'Process Improvement', 'Leadership', 'Budgeting', 'KPIs'] },
  { id: 'customer-success', title: 'Customer Success Manager', icon: '🤝', category: 'managerial', skills: ['Customer Success', 'Communication', 'CRM', 'Account Management'] },
  { id: 'finance-analyst', title: 'Financial Analyst', icon: '💰', category: 'managerial', skills: ['Financial Analysis', 'Excel', 'Reporting', 'Budgeting', 'Forecasting'] },
  { id: 'consultant', title: 'Management Consultant', icon: '📊', category: 'managerial', skills: ['Strategy', 'Problem Solving', 'Communication', 'Data Analysis', 'Presentation'] },
  // Operational
  { id: 'warehouse', title: 'Warehouse Supervisor', icon: '🏭', category: 'operational', skills: ['Logistics', 'Safety', 'Operations', 'Team Management'] },
  { id: 'supply-chain', title: 'Supply Chain Analyst', icon: '🚚', category: 'operational', skills: ['Supply Chain', 'Logistics', 'Inventory', 'Procurement', 'Excel'] },
  { id: 'production-sup', title: 'Production Supervisor', icon: '⚙️', category: 'operational', skills: ['Operations', 'Quality Control', 'Safety', 'Team Management'] },
  { id: 'qc-inspector', title: 'Quality Control Inspector', icon: '🔬', category: 'operational', skills: ['Quality Control', 'Compliance', 'Auditing', 'Safety', 'Documentation'] },
  { id: 'fleet-mgr', title: 'Fleet Manager', icon: '🚛', category: 'operational', skills: ['Logistics', 'Operations', 'Safety', 'Maintenance', 'Compliance'] },
  { id: 'customer-support', title: 'Customer Support Specialist', icon: '🎧', category: 'operational', skills: ['Customer Support', 'Communication', 'Problem Solving', 'Ticketing'] },
  { id: 'admin-assistant', title: 'Administrative Assistant', icon: '📝', category: 'operational', skills: ['Office Administration', 'Communication', 'Scheduling', 'Documentation'] },
  { id: 'nurse', title: 'Registered Nurse', icon: '🏥', category: 'operational', skills: ['Patient Care', 'Clinical Skills', 'Communication', 'Compliance', 'Documentation'] },
  { id: 'teacher', title: 'Teacher / Educator', icon: '📚', category: 'operational', skills: ['Teaching', 'Communication', 'Curriculum Design', 'Assessment'] },
  { id: 'retail-mgr', title: 'Retail Store Manager', icon: '🛍️', category: 'operational', skills: ['Retail Operations', 'Sales', 'Team Management', 'Inventory', 'Customer Service'] },
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
