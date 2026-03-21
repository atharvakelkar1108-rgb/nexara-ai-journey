import { useEffect, useRef, useState } from 'react'
import { Upload, Cpu, Map } from 'lucide-react'

const steps = [
  { icon: Upload, title: 'Drop your files', desc: 'Upload your resume and paste or upload the target job description. Supports PDF, DOCX, and plain text.', color: 'linear-gradient(135deg, #6C63FF, #7c83fc)' },
  { icon: Cpu, title: 'AI maps your gap', desc: 'Our engine extracts skills from both documents, normalizes them against O*NET, and identifies every gap with precision.', color: 'linear-gradient(135deg, #7c83fc, #00D4FF)' },
  { icon: Map, title: 'Get your path', desc: 'Receive a personalized, prerequisite-aware learning roadmap with AI reasoning behind every single module selection.', color: 'linear-gradient(135deg, #00D4FF, #00F5A0)' },
]

export default function HowItWorks() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', margin: '0 0 16px' }}>
            How <span className="gradient-text">Nexara</span> works
          </h2>
          <p style={{ color: '#6b7280', fontSize: 16, margin: 0 }}>Three steps from resume to role-readiness</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="card" style={{
                textAlign: 'center', position: 'relative',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${i * 0.15}s`
              }}>
                <div style={{ position: 'absolute', top: -12, right: -12, width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #6C63FF, #00D4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 0 30px rgba(108,99,255,0.3)' }}>
                  <Icon size={24} color="white" />
                </div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, margin: '0 0 12px' }}>{step.title}</h3>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
