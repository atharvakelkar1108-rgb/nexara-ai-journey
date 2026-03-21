import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Zap, ArrowRight, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const ROLES = ['Software Engineer','DevOps Engineer','ML Engineer','Full Stack Developer','Data Engineer','Product Manager','Engineering Manager','Other']

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [targetRole, setTargetRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()

  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: theme === 'dark' ? '#141d35' : '#f9fafb', color: theme === 'dark' ? 'white' : '#111', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'DM Sans, sans-serif' }

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) { setError('Please fill in all fields'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setError(''); setStep(2)
  }

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    try { await register(name, email, password); setStep(3); setTimeout(() => navigate('/analyze'), 2000) }
    catch { setError('Registration failed. Try again.') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: 64 }}>
      <div className="aurora-bg" style={{ position: 'absolute', inset: 0 }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 440, padding: '0 24px' }}>
        <div className="card animate-scale-in" style={{ padding: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #6C63FF, #00D4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} color="white" />
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 24 }} className="gradient-text">Nexara</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
            {[1,2].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, transition: 'all 0.3s', background: step > s ? 'rgba(0,245,160,0.2)' : step === s ? '#6C63FF' : 'rgba(255,255,255,0.1)', color: step > s ? '#00F5A0' : 'white', border: step > s ? '1px solid rgba(0,245,160,0.4)' : 'none', boxShadow: step === s ? '0 0 20px rgba(108,99,255,0.4)' : 'none' }}>
                  {step > s ? <Check size={14} /> : s}
                </div>
                {s < 2 && <div style={{ width: 40, height: 1, background: step > s ? 'rgba(0,245,160,0.4)' : 'rgba(255,255,255,0.1)', transition: 'all 0.3s' }} />}
              </div>
            ))}
          </div>

          {error && <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 12, background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', fontSize: 13 }}>{error}</div>}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '32px 0' }} className="animate-scale-in">
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,245,160,0.2)', border: '2px solid rgba(0,245,160,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Check size={32} color="#00F5A0" />
              </div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 24, margin: '0 0 8px' }}>Welcome to Nexara!</h2>
              <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 16px' }}>Your journey to {targetRole || 'your next role'} begins now.</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#7c83fc', fontSize: 13 }}>
                <div style={{ width: 12, height: 12, border: '2px solid rgba(108,99,255,0.3)', borderTop: '2px solid #7c83fc', borderRadius: '50%' }} className="animate-spin" />
                Redirecting...
              </div>
            </div>
          )}

          {step === 1 && (
            <>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 22, textAlign: 'center', margin: '0 0 6px' }}>Create your account</h1>
              <p style={{ color: '#6b7280', textAlign: 'center', fontSize: 13, margin: '0 0 28px' }}>Free forever. No credit card required.</p>
              <form onSubmit={handleStep1} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[{label:'Full name',val:name,set:setName,type:'text',ph:'Atharva Kelkar'},{label:'Email',val:email,set:setEmail,type:'email',ph:'you@company.com'}].map(({label,val,set,type,ph}) => (
                  <div key={label}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: theme === 'dark' ? '#d1d5db' : '#374151' }}>{label}</label>
                    <input type={type} value={val} onChange={e => set(e.target.value)} placeholder={ph} style={inputStyle} />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: theme === 'dark' ? '#d1d5db' : '#374151' }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" style={{ ...inputStyle, paddingRight: 44 }} />
                    <button type="button" onClick={() => setShow(!show)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', cursor: 'pointer', color: '#6b7280' }}>
                      {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: 14, fontSize: 15, marginTop: 8 }}>Continue <ArrowRight size={16} /></button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 22, textAlign: 'center', margin: '0 0 6px' }}>Your target role?</h1>
              <p style={{ color: '#6b7280', textAlign: 'center', fontSize: 13, margin: '0 0 24px' }}>We will personalize your experience</p>
              <form onSubmit={handleStep2} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {ROLES.map(role => (
                    <button key={role} type="button" onClick={() => setTargetRole(role)} style={{ padding: '10px 12px', borderRadius: 12, textAlign: 'left', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s', border: targetRole === role ? '1px solid #6C63FF' : '1px solid rgba(255,255,255,0.1)', background: targetRole === role ? 'rgba(108,99,255,0.15)' : 'transparent', color: targetRole === role ? '#7c83fc' : theme === 'dark' ? '#9ca3af' : '#6b7280', boxShadow: targetRole === role ? '0 0 20px rgba(108,99,255,0.2)' : 'none', fontFamily: 'DM Sans, sans-serif' }}>
                      {role}
                    </button>
                  ))}
                </div>
                <button type="submit" disabled={loading || !targetRole} className="btn-primary" style={{ width: '100%', padding: 14, fontSize: 15, marginTop: 4 }}>
                  {loading ? <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%' }} className="animate-spin" />Creating...</> : <>Complete setup <ArrowRight size={16} /></>}
                </button>
                <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>← Back</button>
              </form>
            </>
          )}

          {step < 3 && (
            <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7280', marginTop: 24, marginBottom: 0 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#7c83fc', fontWeight: 500, textDecoration: 'none' }}>Sign in</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
