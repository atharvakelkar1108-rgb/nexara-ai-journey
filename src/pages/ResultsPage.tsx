import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, Check, Download, MessageCircle, X, Send, Clock, Zap, ExternalLink } from 'lucide-react'
import { MOCK_ROADMAP } from '../data/mockData'
import { useAuth } from '../context/AuthContext'

const COURSE_LINKS: Record<string, string> = {
  'docker-basics': 'https://docs.docker.com/get-started/',
  'kubernetes-core': 'https://kubernetes.io/docs/tutorials/',
  'aws-fundamentals': 'https://aws.amazon.com/training/learn-about/cloud-practitioner/',
  'system-design': 'https://github.com/donnemartin/system-design-primer',
  'kafka-messaging': 'https://kafka.apache.org/quickstart',
  'ci-cd': 'https://docs.github.com/en/actions',
  'react-advanced': 'https://react.dev/learn',
  'sql-advanced': 'https://www.postgresqltutorial.com/',
  'ml-fundamentals': 'https://www.kaggle.com/learn/intro-to-machine-learning',
  'deep-learning': 'https://www.fast.ai/',
  'python-basics': 'https://docs.python.org/3/tutorial/',
  'linux-fundamentals': 'https://linuxjourney.com/',
  'terraform': 'https://developer.hashicorp.com/terraform/tutorials',
  'leadership': 'https://www.coursera.org/learn/leading-teams',
  'agile-scrum': 'https://www.scrum.org/resources/what-is-scrum',
  'safety-protocols': 'https://www.osha.gov/training',
  'logistics-ops': 'https://www.coursera.org/learn/operations-management',
}

function ReadinessRing({ score }: { score: number }) {
  const r = 54, circ = 2 * Math.PI * r
  const [animated, setAnimated] = useState(0)
  useEffect(() => { setTimeout(() => setAnimated(score), 300) }, [score])
  const offset = circ - (animated / 100) * circ
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <div style={{ position: 'relative' }}>
        <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
          <circle cx="70" cy="70" r={r} fill="none" strokeWidth="10" stroke="url(#rg)" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)' }} />
          <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#6C63FF" /><stop offset="100%" stopColor="#00D4FF" /></linearGradient></defs>
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 28, background: 'linear-gradient(135deg,#7c83fc,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{animated}%</span>
          <span style={{ fontSize: 11, color: '#6b7280', fontFamily: 'JetBrains Mono,monospace' }}>ready</span>
        </div>
      </div>
      <p style={{ fontSize: 13, color: '#6b7280', textAlign: 'center', margin: '12px 0 0' }}>
        You are <span style={{ color: '#7c83fc', fontWeight: 600 }}>{6} modules</span> away from full role-readiness
      </p>
    </div>
  )
}

function AIChat({ onClose, trace }: { onClose: () => void, trace: string[] }) {
  const [msgs, setMsgs] = useState([{ role: 'ai', text: 'Hi! I am your Nexara AI. Ask me anything about your roadmap or skill gaps.' }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const RESP: Record<string, string> = {
    docker: 'Docker is your first priority because Kubernetes depends on it.',
    kubernetes: 'Kubernetes comes after Docker. It manages containers at scale.',
    aws: 'AWS fundamentals unlock System Design in your path.',
    kafka: 'Kafka is a must-have in your JD for data pipeline responsibilities.',
    why: 'Each module was selected based on: JD mention, resume absence, and prerequisite ordering via dependency graph.',
    trace: trace.join('\n'),
    default: 'Based on your skill gap analysis, focus on foundational modules first before advanced topics.',
  }
  const send = async () => {
    if (!input.trim()) return
    const msg = input.trim()
    setMsgs(m => [...m, { role: 'user', text: msg }])
    setInput(''); setTyping(true)
    await new Promise(r => setTimeout(r, 1200))
    const key = Object.keys(RESP).find(k => msg.toLowerCase().includes(k) && k !== 'default')
    setMsgs(m => [...m, { role: 'ai', text: RESP[key || 'default'] }])
    setTyping(false)
  }
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])
  return (
    <div className="card animate-scale-in" style={{ position: 'fixed', bottom: 24, right: 24, width: 320, height: 400, display: 'flex', flexDirection: 'column', zIndex: 50, padding: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#6C63FF,#00D4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={14} color="white" /></div>
          <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 600, fontSize: 14 }}>Nexara AI</span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00F5A0', display: 'inline-block' }} className="animate-pulse" />
        </div>
        <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#6b7280' }}><X size={16} /></button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '85%', padding: '8px 12px', borderRadius: 12, fontSize: 12, lineHeight: 1.5, background: m.role === 'user' ? '#6C63FF' : 'rgba(255,255,255,0.08)', color: 'inherit' }}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex', gap: 4, padding: '8px 12px', background: 'rgba(255,255,255,0.08)', borderRadius: 12, width: 'fit-content' }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#6b7280', animation: `bounce 1s infinite ${i*0.15}s` }} />)}
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about your roadmap..." style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: '#141d35', color: 'white', fontSize: 12, outline: 'none', fontFamily: 'DM Sans,sans-serif' }} />
        <button onClick={send} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#6C63FF,#00D4FF)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Send size={14} color="white" /></button>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [chatOpen, setChatOpen] = useState(false)
  const [showTrace, setShowTrace] = useState(false)
  const [startedModule, setStartedModule] = useState<string | null>(null)
  const { completeModule } = useAuth()

  const saved = sessionStorage.getItem('nexara_result')
  const result = saved ? JSON.parse(saved) : null

  const have = result?.gap?.have || MOCK_ROADMAP.have
  const improve = result?.gap?.improve || MOCK_ROADMAP.improve
  const missing = result?.gap?.missing || MOCK_ROADMAP.missing
  const score = result?.readiness_score || MOCK_ROADMAP.readinessScore
  const modules = result?.modules || MOCK_ROADMAP.modules
  const trace = result?.reasoning_trace || []

  const toggleComplete = (id: string) => {
    const newVal = !completed[id]
    setCompleted(c => ({ ...c, [id]: newVal }))
    if (newVal) completeModule(id)
  }

  const handleStartLearning = (moduleId: string) => {
    const url = COURSE_LINKS[moduleId]
    if (url) {
      setStartedModule(moduleId)
      window.open(url, '_blank')
    }
  }

  const handleStartAll = () => {
    const firstModule = modules[0]
    if (firstModule) handleStartLearning(firstModule.id)
  }

  const completedCount = Object.values(completed).filter(Boolean).length
  const totalProgress = Math.round((completedCount / modules.length) * 100)

  return (
    <div style={{ minHeight: '100vh', position: 'relative', paddingTop: 96, paddingBottom: 64 }}>
      <div className="aurora-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', margin: '0 0 8px' }}>Your <span className="gradient-text">personalized path</span></h1>
          {result?.job_title && <p style={{ color: '#7c83fc', fontSize: 14, fontFamily: 'JetBrains Mono,monospace', margin: '0 0 4px' }}>Role: {result.job_title}</p>}
          <p style={{ color: '#6b7280', margin: 0 }}>Based on your resume vs the target role requirements</p>
        </div>

        <div className="card" style={{ marginBottom: 32, padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ padding: 24, borderRight: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace', color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: 2, margin: '0 0 16px' }}>Skill snapshot</h3>
              {[
                { label: 'You have', pills: have, cls: 'skill-pill-green' },
                { label: 'Needs work', pills: improve, cls: 'skill-pill-amber' },
                { label: 'Missing', pills: missing, cls: 'skill-pill-red' }
              ].map(({ label, pills, cls }) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 11, color: '#6b7280', fontFamily: 'JetBrains Mono,monospace', margin: '0 0 6px' }}>{label}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 4 }}>{pills.map((p: string) => <span key={p} className={cls}>{p}</span>)}</div>
                </div>
              ))}
            </div>
            <ReadinessRing score={score} />
          </div>
          {completedCount > 0 && (
            <div style={{ padding: '12px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b7280', marginBottom: 6 }}>
                <span>{completedCount}/{modules.length} completed</span>
                <span style={{ color: '#7c83fc', fontWeight: 600 }}>{totalProgress}%</span>
              </div>
              <div className="xp-bar"><div className="xp-fill" style={{ width: `${totalProgress}%` }} /></div>
            </div>
          )}
        </div>

        {trace.length > 0 && (
          <div className="card" style={{ marginBottom: 32 }}>
            <button onClick={() => setShowTrace(!showTrace)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>🧠</span>
                <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 16 }}>AI Reasoning Trace</span>
              </div>
              <ChevronDown size={16} color="#7c83fc" style={{ transform: showTrace ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
            </button>
            {showTrace && (
              <div style={{ marginTop: 16, padding: 16, borderRadius: 12, background: 'rgba(0,0,0,0.3)', fontFamily: 'JetBrains Mono,monospace', fontSize: 12, lineHeight: 2 }} className="animate-fade-in">
                {trace.map((step: string, i: number) => (
                  <div key={i} style={{ color: i === trace.length - 1 ? '#00F5A0' : '#7c83fc' }}>
                    <span style={{ color: '#6b7280' }}>{'>'} </span>{step}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 24, margin: '0 0 24px' }}>Learning roadmap</h2>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 31, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom,#6C63FF,#00D4FF,transparent)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {modules.map((mod: any, i: number) => (
              <div key={mod.id} style={{ paddingLeft: 72, opacity: 0, animation: `slideUp 0.6s ease-out ${i * 0.1}s forwards` }}>
                <div style={{ position: 'absolute', left: 20, width: 24, height: 24, borderRadius: '50%', border: `2px solid ${completed[mod.id] ? '#00F5A0' : '#6C63FF'}`, background: completed[mod.id] ? '#00F5A0' : '#060912', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: completed[mod.id] ? '#060912' : '#7c83fc', fontFamily: 'JetBrains Mono,monospace', marginTop: 20, transition: 'all 0.3s' }}>
                  {completed[mod.id] ? <Check size={12} /> : String(i + 1).padStart(2, '0')}
                </div>
                <div className="card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' as const }}>
                        <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 17, margin: 0, textDecoration: completed[mod.id] ? 'line-through' : 'none', color: completed[mod.id] ? '#6b7280' : 'inherit' }}>{mod.title}</h3>
                        <span style={{ padding: '2px 8px', borderRadius: 9999, fontSize: 11, fontFamily: 'JetBrains Mono,monospace', background: mod.difficulty === 'Beginner' ? 'rgba(0,245,160,0.1)' : mod.difficulty === 'Intermediate' ? 'rgba(251,191,36,0.1)' : 'rgba(248,113,113,0.1)', color: mod.difficulty === 'Beginner' ? '#00F5A0' : mod.difficulty === 'Intermediate' ? '#fbbf24' : '#f87171' }}>{mod.difficulty}</span>
                        {startedModule === mod.id && <span style={{ padding: '2px 8px', borderRadius: 9999, fontSize: 11, background: 'rgba(108,99,255,0.2)', color: '#7c83fc', fontFamily: 'JetBrains Mono,monospace' }}>In progress</span>}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' as const }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6b7280' }}><Clock size={12} />{mod.duration_hours ? `${mod.duration_hours} hrs` : mod.duration}</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 4 }}>{(mod.skills_taught || mod.skills || []).map((s: string) => <span key={s} className="skill-pill-blue">{s}</span>)}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                      <button onClick={() => handleStartLearning(mod.id)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg,#6C63FF,#00D4FF)', color: 'white', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', whiteSpace: 'nowrap' as const }}>
                        <ExternalLink size={11} /> Start
                      </button>
                      <button onClick={() => toggleComplete(mod.id)} style={{ width: '100%', padding: '5px', borderRadius: 8, border: `2px solid ${completed[mod.id] ? '#00F5A0' : 'rgba(255,255,255,0.2)'}`, background: completed[mod.id] ? '#00F5A0' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: completed[mod.id] ? '#060912' : '#6b7280', transition: 'all 0.2s' }}>
                        <Check size={14} />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => setExpanded(e => ({ ...e, [mod.id]: !e[mod.id] }))} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#7c83fc', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'DM Sans,sans-serif' }}>
                    {expanded[mod.id] ? <ChevronUp size={12} /> : <ChevronDown size={12} />} Why this module?
                  </button>
                  {expanded[mod.id] && (
                    <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)', fontSize: 13, color: '#d1d5db', lineHeight: 1.6, fontFamily: 'JetBrains Mono,monospace' }} className="animate-fade-in">
                      🧠 {mod.reason}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 40 }}>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => window.print()}>
            <Download size={16} />Download PDF
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }} onClick={handleStartAll}>
            <Zap size={16} />Start Learning
          </button>
        </div>
      </div>

      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} className="animate-pulse-glow" style={{ position: 'fixed', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg,#6C63FF,#00D4FF)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 40 }}>
          <MessageCircle size={24} color="white" />
        </button>
      )}
      {chatOpen && <AIChat onClose={() => setChatOpen(false)} trace={trace} />}
    </div>
  )
}
