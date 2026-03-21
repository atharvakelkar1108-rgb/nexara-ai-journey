import { Trophy, Flame, BookOpen, Zap } from 'lucide-react'
import { LEADERBOARD } from '../data/mockData'
import { useAuth } from '../context/AuthContext'

export default function LeaderboardPage() {
  const { user } = useAuth()
  const top3 = LEADERBOARD.slice(0, 3)
  return (
    <div style={{ minHeight: '100vh', position: 'relative', paddingTop: 96, paddingBottom: 64 }}>
      <div className="aurora-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 9999, border: '1px solid rgba(251,191,36,0.3)', background: 'rgba(251,191,36,0.1)', color: '#fbbf24', fontSize: 13, fontFamily: 'JetBrains Mono,monospace', marginBottom: 20 }}>
            <Trophy size={14} /> Global Leaderboard
          </div>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,52px)', margin: '0 0 12px' }}>Top <span className="gradient-text">learners</span></h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Compete, learn, and climb the ranks • <span style={{fontFamily:'JetBrains Mono,monospace', fontSize:11}}>Demo data shown</span></p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32, alignItems: 'flex-end' }}>
          {[top3[1], top3[0], top3[2]].map((entry, pi) => {
            const heights = [112, 144, 96]
            const colors = ['rgba(156,163,175,0.15)','rgba(251,191,36,0.15)','rgba(251,146,60,0.15)']
            const borders = ['rgba(156,163,175,0.3)','rgba(251,191,36,0.4)','rgba(251,146,60,0.3)']
            return (
              <div key={entry.rank} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,rgba(108,99,255,0.3),rgba(0,212,255,0.3))', border: '1px solid rgba(108,99,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, transform: pi === 1 ? 'scale(1.1)' : undefined, boxShadow: pi === 1 ? '0 0 30px rgba(108,99,255,0.4)' : undefined }}>{entry.avatar}</div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: pi === 1 ? 15 : 13, margin: '0 0 2px' }}>{entry.name.split(' ')[0]}</p>
                  <p style={{ fontSize: 11, color: '#7c83fc', fontFamily: 'JetBrains Mono,monospace', margin: 0 }}>{entry.xp.toLocaleString()} XP</p>
                </div>
                <div style={{ width: '100%', height: heights[pi], borderRadius: '10px 10px 0 0', background: colors[pi], border: `1px solid ${borders[pi]}`, borderBottom: 'none', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 12 }}>
                  <span style={{ fontSize: 22 }}>{entry.badge}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Trophy size={16} color="#fbbf24" />
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 600, fontSize: 14 }}>Full Rankings</span>
          </div>
          {LEADERBOARD.map(entry => {
            const isYou = entry.name === (user?.name || 'Atharva Kelkar')
            return (
              <div key={entry.rank} style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: '1px solid rgba(255,255,255,0.05)', background: isYou ? 'rgba(108,99,255,0.08)' : undefined, borderLeft: isYou ? '3px solid #6C63FF' : '3px solid transparent' }}>
                <div style={{ width: 28, textAlign: 'center', fontFamily: 'JetBrains Mono,monospace', fontWeight: 700, fontSize: 13, color: entry.rank === 1 ? '#fbbf24' : entry.rank === 2 ? '#9ca3af' : entry.rank === 3 ? '#fb923c' : '#6b7280' }}>
                  {entry.rank <= 3 ? entry.badge : `#${entry.rank}`}
                </div>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,rgba(108,99,255,0.2),rgba(0,212,255,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{entry.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p style={{ margin: 0, fontFamily: 'Syne,sans-serif', fontWeight: 600, fontSize: 14 }}>{entry.name}</p>
                    {isYou && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 9999, background: 'rgba(108,99,255,0.2)', color: '#7c83fc', fontFamily: 'JetBrains Mono,monospace' }}>you</span>}
                  </div>
                  <div className="xp-bar" style={{ marginTop: 5, width: 100 }}><div className="xp-fill" style={{ width: `${Math.min((entry.xp / 5000) * 100, 100)}%` }} /></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6b7280' }}><Zap size={12} color="#7c83fc" />{entry.xp.toLocaleString()}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6b7280' }}><BookOpen size={12} />{entry.modules}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6b7280' }}><Flame size={12} color="#fb923c" />{entry.streak}d</span>
                  <span style={{ fontSize: 12, color: '#7c83fc', fontFamily: 'JetBrains Mono,monospace', fontWeight: 600 }}>Lv.{entry.level}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
