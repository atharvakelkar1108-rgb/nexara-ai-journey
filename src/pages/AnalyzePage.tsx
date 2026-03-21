import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, X, ChevronRight, GitCompare, Search, Briefcase } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { analyzeDocuments } from '../api/nexara'
import { ROLES } from '../data/mockData'

interface FileState { file: File | null; text: string; mode: 'upload' | 'paste' }

function UploadZone({ label, color, state, onChange }: { label: string; color: string; state: FileState; onChange: (s: FileState) => void }) {
  const [dragging, setDragging] = useState(false)
  const { theme } = useTheme()
  const filled = state.file || state.text.trim()
  const ac = color === 'brand' ? '#6C63FF' : '#00D4FF'
  const abg = color === 'brand' ? 'rgba(108,99,255,0.1)' : 'rgba(0,212,255,0.1)'
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) onChange({ ...state, file: f, mode: 'upload' })
  }, [state, onChange])
  return (
    <div className="card" style={{ border: filled ? `2px solid ${ac}` : undefined }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 18, margin: 0, color: ac }}>{label}</h3>
        <div style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 8, background: theme === 'dark' ? '#141d35' : '#f3f4f6' }}>
          {(['upload','paste'] as const).map(m => (
            <button key={m} onClick={() => onChange({ ...state, mode: m })} style={{ padding: '4px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500, background: state.mode === m ? abg : 'transparent', color: state.mode === m ? ac : '#6b7280', fontFamily: 'DM Sans,sans-serif' }}>
              {m === 'upload' ? 'Upload' : 'Paste'}
            </button>
          ))}
        </div>
      </div>
      {state.mode === 'upload' ? (
        <div onDrop={onDrop} onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)}
          style={{ position: 'relative', borderRadius: 12, border: `2px dashed ${dragging ? ac : 'rgba(255,255,255,0.15)'}`, padding: 40, textAlign: 'center', cursor: 'pointer', background: dragging ? abg : 'transparent' }}>
          <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={e => { const f = e.target.files?.[0]; if (f) onChange({ ...state, file: f }) }} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
          {state.file ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: abg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={20} color={ac} /></div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{state.file.name}</p>
                <p style={{ margin: 0, fontSize: 12, color: '#6b7280' }}>{(state.file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button onClick={e => { e.stopPropagation(); onChange({ ...state, file: null }) }} style={{ marginLeft: 'auto', border: 'none', background: 'transparent', cursor: 'pointer', color: '#6b7280' }}><X size={16} /></button>
            </div>
          ) : (
            <>
              <Upload size={32} color={ac} style={{ margin: '0 auto 12px', opacity: 0.6 }} />
              <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 500 }}>Drop your file here</p>
              <p style={{ margin: 0, fontSize: 12, color: '#6b7280' }}>PDF, DOCX, TXT</p>
            </>
          )}
        </div>
      ) : (
        <textarea value={state.text} onChange={e => onChange({ ...state, text: e.target.value })} placeholder={`Paste your ${label.toLowerCase()} here...`} rows={8}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: `1px solid ${state.text ? ac : 'rgba(255,255,255,0.1)'}`, background: theme === 'dark' ? '#141d35' : '#f9fafb', color: theme === 'dark' ? 'white' : '#111', fontSize: 13, lineHeight: 1.6, resize: 'none', outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'DM Sans,sans-serif' }} />
      )}
    </div>
  )
}

const MSGS = ['Parsing your resume...','Extracting skills...','Analyzing job description...','Mapping skill gaps...','Building your roadmap...','Almost ready!']

type JDMode = 'upload' | 'role' | 'title'

export default function AnalyzePage() {
  const [resume, setResume] = useState<FileState>({ file: null, text: '', mode: 'upload' })
  const [jd, setJD] = useState<FileState>({ file: null, text: '', mode: 'upload' })
  const [jdMode, setJdMode] = useState<JDMode>('upload')
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [jobTitle, setJobTitle] = useState('')
  const [roleSearch, setRoleSearch] = useState('')
  const [compareMode, setCompareMode] = useState(false)
  const [resume2, setResume2] = useState<FileState>({ file: null, text: '', mode: 'upload' })
  const [loading, setLoading] = useState(false)
  const [msgIdx, setMsgIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { theme } = useTheme()

  const resumeFilled = resume.file || resume.text.trim()
  const jdFilled = jdMode === 'upload'
    ? (jd.file || jd.text.trim())
    : jdMode === 'role'
    ? selectedRole
    : jobTitle.trim()

  const canAnalyze = resumeFilled && jdFilled

  const getJDFile = (): File => {
    if (jdMode === 'upload') {
      if (jd.file) return jd.file
      return new File([jd.text], 'jd.txt', { type: 'text/plain' })
    }
    if (jdMode === 'role') {
      const role = ROLES.find(r => r.id === selectedRole)
      const jdText = `Job Title: ${role?.title}\nRequired Skills: ${role?.skills.join(', ')}\nCategory: ${role?.category}`
      return new File([jdText], 'jd.txt', { type: 'text/plain' })
    }
    const jdText = `Job Title: ${jobTitle}\nThis is a ${jobTitle} position requiring relevant skills and experience.`
    return new File([jdText], 'jd.txt', { type: 'text/plain' })
  }

  const handleAnalyze = async () => {
    if (!canAnalyze) return
    setLoading(true); setError('')
    const msgInterval = setInterval(() => {
      setMsgIdx(i => Math.min(i + 1, MSGS.length - 1))
      setProgress(p => Math.min(p + 16, 90))
    }, 800)
    try {
      let resumeFile = resume.file || new File([resume.text], 'resume.txt', { type: 'text/plain' })
      const jdFile = getJDFile()
      const result = await analyzeDocuments(resumeFile, jdFile)
      clearInterval(msgInterval)
      setProgress(100)
      setMsgIdx(MSGS.length - 1)
      sessionStorage.setItem('nexara_result', JSON.stringify(result))
      await new Promise(r => setTimeout(r, 500))
      navigate('/results')
    } catch {
      clearInterval(msgInterval)
      setError('Analysis failed. Check your files and try again.')
      setLoading(false)
      setMsgIdx(0); setProgress(0)
    }
  }

  const filteredRoles = ROLES.filter(r => r.title.toLowerCase().includes(roleSearch.toLowerCase()))

  const modeTab = (mode: JDMode, label: string, icon: any) => (
    <button onClick={() => setJdMode(mode)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s', background: jdMode === mode ? 'rgba(0,212,255,0.15)' : 'transparent', color: jdMode === mode ? '#00D4FF' : '#6b7280', fontFamily: 'DM Sans,sans-serif' }}>
      {icon}{label}
    </button>
  )

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: 64 }}>
      <div className="aurora-bg" style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 320, padding: '0 24px' }}>
        <div style={{ width: 80, height: 80, borderRadius: 20, background: 'linear-gradient(135deg,#6C63FF,#00D4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', boxShadow: '0 0 40px rgba(108,99,255,0.5)' }} className="nexara-loader">
          <span style={{ color: 'white', fontSize: 28, fontWeight: 800, fontFamily: 'Syne,sans-serif' }}>N</span>
        </div>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 24, margin: '0 0 8px' }}>Analyzing with Nexara</h2>
        <p style={{ color: '#7c83fc', fontSize: 13, fontFamily: 'JetBrains Mono,monospace', margin: '0 0 32px' }} className="typing-cursor">{MSGS[msgIdx]}</p>
        <div className="xp-bar" style={{ marginBottom: 8 }}><div className="xp-fill" style={{ width: `${progress}%` }} /></div>
        <p style={{ fontSize: 12, color: '#6b7280', fontFamily: 'JetBrains Mono,monospace', margin: 0 }}>{progress}%</p>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', paddingTop: 100, paddingBottom: 64 }}>
      <div className="aurora-bg" style={{ position: 'absolute', inset: 0 }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,52px)', margin: '0 0 12px' }}>Find your <span className="gradient-text">gap.</span></h1>
          <p style={{ color: '#6b7280', fontSize: 15, margin: 0 }}>Upload your resume and tell us your target role</p>
        </div>

        {error && (
          <div style={{ marginBottom: 24, padding: '12px 20px', borderRadius: 12, background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', fontSize: 14, textAlign: 'center' }}>{error}</div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: compareMode ? 'repeat(3,1fr)' : '1fr 1fr', gap: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <UploadZone label="Your Resume" color="brand" state={resume} onChange={setResume} />
            <button onClick={() => setCompareMode(!compareMode)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '8px', borderRadius: 10, border: `1px dashed ${compareMode ? '#6C63FF' : 'rgba(255,255,255,0.15)'}`, background: compareMode ? 'rgba(108,99,255,0.08)' : 'transparent', color: compareMode ? '#7c83fc' : '#6b7280', fontSize: 12, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }}>
              <GitCompare size={13} />{compareMode ? 'Comparison mode ON — click to disable' : 'Compare 2 resumes vs 1 JD'}
            </button>
          </div>

          {compareMode && <UploadZone label="Resume 2" color="brand" state={resume2} onChange={setResume2} />}

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 18, margin: 0, color: '#00D4FF' }}>Target Role</h3>
            </div>

            <div style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 10, background: theme === 'dark' ? '#141d35' : '#f3f4f6', marginBottom: 16 }}>
              {modeTab('upload', 'Upload JD', <FileText size={13} />)}
              {modeTab('role', 'Pick Role', <Search size={13} />)}
              {modeTab('title', 'Job Title', <Briefcase size={13} />)}
            </div>

            {jdMode === 'upload' && (
              <div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                  {(['upload','paste'] as const).map(m => (
                    <button key={m} onClick={() => setJD({...jd, mode: m})} style={{ padding: '4px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, background: jd.mode === m ? 'rgba(0,212,255,0.1)' : 'transparent', color: jd.mode === m ? '#00D4FF' : '#6b7280', fontFamily: 'DM Sans,sans-serif' }}>
                      {m === 'upload' ? 'Upload' : 'Paste'}
                    </button>
                  ))}
                </div>
                {jd.mode === 'upload' ? (
                  <div style={{ position: 'relative', borderRadius: 12, border: '2px dashed rgba(0,212,255,0.3)', padding: 32, textAlign: 'center', cursor: 'pointer' }}>
                    <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={e => { const f = e.target.files?.[0]; if (f) setJD({...jd, file: f}) }} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                    {jd.file ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <FileText size={18} color="#00D4FF" />
                        <span style={{ fontSize: 13 }}>{jd.file.name}</span>
                        <button onClick={e => { e.stopPropagation(); setJD({...jd, file: null}) }} style={{ marginLeft: 'auto', border: 'none', background: 'transparent', cursor: 'pointer', color: '#6b7280' }}><X size={14} /></button>
                      </div>
                    ) : (
                      <><Upload size={24} color="#00D4FF" style={{ margin: '0 auto 8px', opacity: 0.6 }} /><p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>Drop JD file here</p></>
                    )}
                  </div>
                ) : (
                  <textarea value={jd.text} onChange={e => setJD({...jd, text: e.target.value})} placeholder="Paste job description here..." rows={6}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(0,212,255,0.2)', background: theme === 'dark' ? '#141d35' : '#f9fafb', color: theme === 'dark' ? 'white' : '#111', fontSize: 13, lineHeight: 1.6, resize: 'none', outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'DM Sans,sans-serif' }} />
                )}
              </div>
            )}

            {jdMode === 'role' && (
              <div>
                <div style={{ position: 'relative', marginBottom: 12 }}>
                  <Search size={14} color="#6b7280" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input value={roleSearch} onChange={e => setRoleSearch(e.target.value)} placeholder="Search roles..." style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: theme === 'dark' ? '#141d35' : '#f9fafb', color: theme === 'dark' ? 'white' : '#111', fontSize: 13, outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'DM Sans,sans-serif' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, maxHeight: 220, overflowY: 'auto' }}>
                  {filteredRoles.map(role => (
                    <button key={role.id} onClick={() => setSelectedRole(role.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, border: `1px solid ${selectedRole === role.id ? '#00D4FF' : 'rgba(255,255,255,0.08)'}`, background: selectedRole === role.id ? 'rgba(0,212,255,0.1)' : 'transparent', cursor: 'pointer', fontSize: 12, color: selectedRole === role.id ? '#00D4FF' : theme === 'dark' ? '#d1d5db' : '#374151', fontFamily: 'DM Sans,sans-serif', textAlign: 'left' as const }}>
                      <span style={{ fontSize: 18 }}>{role.icon}</span>
                      <span style={{ fontWeight: selectedRole === role.id ? 600 : 400 }}>{role.title}</span>
                    </button>
                  ))}
                </div>
                {selectedRole && (
                  <div style={{ marginTop: 10, padding: '8px 12px', borderRadius: 8, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', fontSize: 12, color: '#00D4FF' }}>
                    ✓ Selected: {ROLES.find(r => r.id === selectedRole)?.title}
                  </div>
                )}
              </div>
            )}

            {jdMode === 'title' && (
              <div>
                <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 12px' }}>Just type your target job title — Nexara will figure out the required skills.</p>
                <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="e.g. DevOps Engineer, ML Engineer..." style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: `1px solid ${jobTitle ? '#00D4FF' : 'rgba(255,255,255,0.1)'}`, background: theme === 'dark' ? '#141d35' : '#f9fafb', color: theme === 'dark' ? 'white' : '#111', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'DM Sans,sans-serif' }} />
                {jobTitle && (
                  <p style={{ fontSize: 12, color: '#00D4FF', margin: '8px 0 0', fontFamily: 'JetBrains Mono,monospace' }}>
                    ✓ Will analyze for: {jobTitle}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={handleAnalyze} disabled={!canAnalyze} className="btn-primary" style={{ fontSize: 17, padding: '16px 48px' }}>
            Analyze with Nexara <ChevronRight size={20} />
          </button>
          <p style={{ fontSize: 12, color: '#6b7280', marginTop: 16 }}>✦ Your data is processed in-memory. Nothing is stored.</p>
        </div>
      </div>
    </div>
  )
}
