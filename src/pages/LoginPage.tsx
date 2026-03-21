import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Zap, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()

  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: theme === 'dark' ? '#141d35' : '#f9fafb', color: theme === 'dark' ? 'white' : '#111', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'DM Sans, sans-serif' }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true); setError('')
    try { await login(email, password); navigate('/analyze') }
    catch { setError('Invalid credentials. Try again.') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: 64 }}>
      <div className="aurora-bg" style={{ position: 'absolute', inset: 0 }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 420, padding: '0 24px' }}>
        <div className="card animate-scale-in" style={{ padding: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #6C63FF, #00D4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(108,99,255,0.4)' }}>
              <Zap size={20} color="white" />
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 24 }} className="gradient-text">Nexara</span>
          </div>

          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 24, textAlign: 'center', margin: '0 0 8px' }}>Welcome back</h1>
          <p style={{ color: '#6b7280', textAlign: 'center', fontSize: 14, margin: '0 0 32px' }}>Continue your learning journey</p>

          {error && <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 12, background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', fontSize: 13 }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: theme === 'dark' ? '#d1d5db' : '#374151' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: theme === 'dark' ? '#d1d5db' : '#374151' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ ...inputStyle, paddingRight: 44 }} />
                <button type="button" onClick={() => setShow(!show)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', cursor: 'pointer', color: '#6b7280' }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15, marginTop: 8 }}>
              {loading ? <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%' }} className="animate-spin" />Signing in...</> : <>Sign in <ArrowRight size={16} /></>}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7280', marginTop: 24, marginBottom: 0 }}>
            Do not have an account?{' '}
            <Link to="/register" style={{ color: '#7c83fc', fontWeight: 500, textDecoration: 'none' }}>Create one free</Link>
          </p>

          <button onClick={() => { setEmail('demo@nexara.ai'); setPassword('demo123') }} style={{ width: '100%', marginTop: 12, padding: '10px', borderRadius: 12, border: '1px dashed rgba(255,255,255,0.15)', background: 'transparent', cursor: 'pointer', fontSize: 12, color: '#6b7280', fontFamily: 'DM Sans, sans-serif' }}>
            ✦ Use demo credentials
          </button>
        </div>
      </div>
    </div>
  )
}
