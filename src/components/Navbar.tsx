import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X, Zap, LogOut, User, Trophy } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/roles', label: 'Roles' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/analyze', label: 'Analyze' },
  ]

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }} className="glass-light">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #6C63FF, #00D4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={16} color="white" />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20 }} className="gradient-text">Nexara</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              padding: '8px 16px', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'all 0.2s',
              background: location.pathname === l.to ? 'rgba(108,99,255,0.15)' : 'transparent',
              color: location.pathname === l.to ? '#7c83fc' : theme === 'dark' ? '#9ca3af' : '#6b7280',
            }}>{l.label}</Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={toggle} style={{ width: 36, height: 36, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {user ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setProfileOpen(!profileOpen)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 9999, border: '1px solid rgba(108,99,255,0.3)', background: 'transparent', cursor: 'pointer' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #6C63FF, #00D4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700 }}>{user.avatar}</div>
                <span style={{ fontSize: 14, fontWeight: 500, color: theme === 'dark' ? '#e5e7eb' : '#374151' }}>{user.name.split(' ')[0]}</span>
                <span style={{ fontSize: 11, color: '#7c83fc', fontFamily: 'JetBrains Mono, monospace' }}>Lv.{user.level}</span>
              </button>
              {profileOpen && (
                <div className="card" style={{ position: 'absolute', right: 0, top: 48, width: 200, padding: 8, zIndex: 100 }}>
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 4 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: theme === 'dark' ? 'white' : '#111' }}>{user.name}</p>
                    <p style={{ margin: 0, fontSize: 11, color: '#6b7280' }}>{user.xp} XP • Level {user.level}</p>
                  </div>
                  {[{ icon: User, label: 'Profile', to: '/profile' }, { icon: Trophy, label: 'Leaderboard', to: '/leaderboard' }].map(({ icon: Icon, label, to }) => (
                    <Link key={to} to={to} onClick={() => setProfileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, textDecoration: 'none', fontSize: 13, color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
                      <Icon size={14} />{label}
                    </Link>
                  ))}
                  <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 13, color: '#f87171', marginTop: 4 }}>
                    <LogOut size={14} />Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <Link to="/login" className="btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }}>Log in</Link>
              <Link to="/register" className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>Get started</Link>
            </div>
          )}

          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="glass-light" style={{ padding: '12px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 16px', borderRadius: 8, textDecoration: 'none', fontSize: 14, color: theme === 'dark' ? '#d1d5db' : '#374151' }}>{l.label}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}
