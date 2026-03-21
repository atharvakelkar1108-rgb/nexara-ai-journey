import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Target, Brain } from 'lucide-react'

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

export default function HeroSection() {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true) }, { threshold: 0.3 })
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const glow = document.createElement('div')
    glow.className = 'cursor-glow'
    document.body.appendChild(glow)
    const move = (e: MouseEvent) => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px' }
    window.addEventListener('mousemove', move)
    return () => { window.removeEventListener('mousemove', move); glow.remove() }
  }, [])

  const s1 = useCountUp(87, 2000, statsVisible)
  const s2 = useCountUp(0, 2000, statsVisible)
  const s3 = useCountUp(10, 2000, statsVisible)

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 64 }}>
      <div className="aurora-bg" style={{ position: 'absolute', inset: 0 }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(108,99,255,0.1)', filter: 'blur(60px)' }} className="animate-float" />
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 250, height: 250, borderRadius: '50%', background: 'rgba(0,212,255,0.08)', filter: 'blur(60px)' }} className="animate-float" />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 9999, border: '1px solid rgba(108,99,255,0.4)', background: 'rgba(108,99,255,0.1)', color: '#7c83fc', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', marginBottom: 32 }} className="animate-fade-in">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c83fc' }} className="animate-pulse" />
          ✦ Powered by AI • Adaptive Learning Engine
        </div>

        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 8vw, 88px)', lineHeight: 1.05, margin: '0 0 24px' }} className="animate-slide-up">
          <span style={{ color: 'inherit' }}>Your next era</span><br />
          <span className="gradient-text">starts here.</span>
        </h1>

        <p style={{ fontSize: 18, color: '#9ca3af', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }} className="animate-slide-up">
          Upload your resume. Drop a job description. Nexara builds your{' '}
          <span style={{ color: 'inherit', fontWeight: 500 }}>exact learning path</span>{' '}
          to role-readiness — no fluff, no guesswork.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 80, flexWrap: 'wrap' }} className="animate-slide-up">
          <Link to="/analyze" className="btn-primary animate-pulse-glow" style={{ fontSize: 16, padding: '14px 32px' }}>
            Analyze My Skills <ArrowRight size={18} />
          </Link>
          <Link to="/roles" className="btn-ghost" style={{ fontSize: 16, padding: '14px 32px' }}>
            Explore Roles
          </Link>
        </div>

        <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 500, margin: '0 auto' }}>
          {[
            { icon: Zap, value: `${s1}%`, label: 'Faster onboarding', color: '#7c83fc' },
            { icon: Target, value: `${s2}`, label: 'Redundant modules', color: '#00F5A0' },
            { icon: Brain, value: `${s3}x`, label: 'More precise', color: '#00D4FF' },
          ].map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="card" style={{ textAlign: 'center', padding: 20 }}>
              <Icon size={22} color={color} style={{ margin: '0 auto 8px' }} />
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 28, color, marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }} className="animate-bounce-slow">
        <span style={{ fontSize: 11, color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}>scroll</span>
        <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(108,99,255,0.6), transparent)' }} />
      </div>
    </div>
  )
}
