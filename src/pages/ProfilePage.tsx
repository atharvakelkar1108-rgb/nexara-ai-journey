import { useNavigate } from 'react-router-dom'
import { Flame, Zap, BookOpen, Trophy } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { BADGES, MOCK_ROADMAP } from '../data/mockData'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  if (!user) { navigate('/login'); return null }
  const xpProgress = ((user.xp % 500) / 500) * 100
  return (
    <div style={{ minHeight: '100vh', position: 'relative', paddingTop: 96, paddingBottom: 64 }}>
      <div className="aurora-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' as const }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, background: 'linear-gradient(135deg,#6C63FF,#00D4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24, fontWeight: 800, fontFamily: 'Syne,sans-serif', boxShadow: '0 0 30px rgba(108,99,255,0.4)' }}>{user.avatar}</div>
              <div style={{ position: 'absolute', bottom: -8, right: -8, width: 28, height: 28, borderRadius: 8, background: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#060912' }}>{user.level}</div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 26, margin: '0 0 4px' }}>{user.name}</h1>
              <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 16px' }}>{user.email}</p>
              <div style={{ maxWidth: 280 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6b7280', marginBottom: 6, fontFamily: 'JetBrains Mono,monospace' }}>
                  <span>{user.xp} XP</span><span>Next: {user.level * 500} XP</span>
                </div>
                <div className="xp-bar"><div className="xp-fill" style={{ width: `${xpProgress}%` }} /></div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              {[
                { icon: Flame, val: user.streak, label: 'streak', color: '#fb923c' },
                { icon: Zap, val: user.xp, label: 'XP', color: '#7c83fc' },
                { icon: BookOpen, val: user.completedModules.length, label: 'done', color: '#00D4FF' }
              ].map(({ icon: Icon, val, label, color }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <Icon size={18} color={color} style={{ margin: '0 auto 4px', display: 'block' }} />
                  <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 22, color }}>{val}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Trophy size={18} color="#fbbf24" />
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 18, margin: 0 }}>Badges</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {BADGES.map(badge => {
                const earned = user.badges.includes(badge.id)
                return (
                  <div key={badge.id} title={badge.desc} style={{ padding: '12px 8px', borderRadius: 12, textAlign: 'center', background: earned ? 'rgba(108,99,255,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${earned ? 'rgba(108,99,255,0.3)' : 'rgba(255,255,255,0.06)'}`, opacity: earned ? 1 : 0.4, filter: earned ? 'none' : 'grayscale(1)', cursor: 'help' }}>
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{earned ? badge.icon : '🔒'}</div>
                    <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: earned ? '#d1d5db' : '#6b7280', lineHeight: 1.3 }}>{badge.title}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <BookOpen size={18} color="#00D4FF" />
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 18, margin: 0 }}>Progress</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MOCK_ROADMAP.modules.map(mod => {
                const done = user.completedModules.includes(mod.id)
                return (
                  <div key={mod.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: done ? '#00F5A0' : 'transparent', border: `2px solid ${done ? '#00F5A0' : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
                      {done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#060912" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 500, flex: 1, textDecoration: done ? 'line-through' : 'none', color: done ? '#6b7280' : 'inherit', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{mod.title}</p>
                    {done && <span style={{ fontSize: 11, color: '#7c83fc', fontFamily: 'JetBrains Mono,monospace', flexShrink: 0 }}>+150 XP</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <button onClick={() => { logout(); navigate('/') }} className="btn-ghost" style={{ color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' }}>Sign out</button>
        </div>
      </div>
    </div>
  )
}
