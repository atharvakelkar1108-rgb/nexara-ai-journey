import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import { ROLES } from '../data/mockData'
import { useTheme } from '../context/ThemeContext'

const CATS = ['all','technical','managerial','operational']

export default function RolesPage() {
  const [cat, setCat] = useState('all')
  const [query, setQuery] = useState('')
  const { theme } = useTheme()
  const navigate = useNavigate()
  const filtered = ROLES.filter(r => (cat === 'all' || r.category === cat) && r.title.toLowerCase().includes(query.toLowerCase()))
  return (
    <div style={{ minHeight: '100vh', position: 'relative', paddingTop: 96, paddingBottom: 64 }}>
      <div className="aurora-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,52px)', margin: '0 0 12px' }}>Explore <span className="gradient-text">roles</span></h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Pick a role to see required skills and start your path</p>
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' as const }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={16} color="#6b7280" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search roles..." style={{ width: '100%', padding: '10px 16px 10px 40px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: theme === 'dark' ? '#0D1426' : '#f9fafb', color: theme === 'dark' ? 'white' : '#111', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'DM Sans,sans-serif' }} />
          </div>
          <div style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 12, background: theme === 'dark' ? '#0D1426' : '#f3f4f6', border: '1px solid rgba(255,255,255,0.08)' }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, textTransform: 'capitalize' as const, background: cat === c ? (theme === 'dark' ? '#141d35' : 'white') : 'transparent', color: cat === c ? '#7c83fc' : '#6b7280', fontFamily: 'DM Sans,sans-serif' }}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
          {filtered.map((role, i) => (
            <div key={role.id} className="card" onClick={() => navigate('/analyze')}
              style={{ cursor: 'pointer', opacity: 0, animation: `slideUp 0.5s ease-out ${i * 0.05}s forwards`, transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-8px)'; el.style.boxShadow = '0 0 30px rgba(108,99,255,0.2)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none' }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{role.icon}</div>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 17, margin: '0 0 6px' }}>{role.title}</h3>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 9999, fontFamily: 'JetBrains Mono,monospace', display: 'inline-block', marginBottom: 12, background: role.category === 'technical' ? 'rgba(108,99,255,0.1)' : role.category === 'managerial' ? 'rgba(0,212,255,0.1)' : 'rgba(251,191,36,0.1)', color: role.category === 'technical' ? '#7c83fc' : role.category === 'managerial' ? '#00D4FF' : '#fbbf24' }}>{role.category}</span>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 4, marginBottom: 16 }}>
                {role.skills.slice(0, 3).map(s => <span key={s} className="skill-pill-blue">{s}</span>)}
                {role.skills.length > 3 && <span className="skill-pill-blue">+{role.skills.length - 3}</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#7c83fc', fontSize: 13, fontWeight: 500 }}>
                Analyze for this role <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
