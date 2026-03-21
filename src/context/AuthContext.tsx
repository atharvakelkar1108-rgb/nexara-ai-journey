import { createContext, useContext, useState } from 'react'

export interface User {
  id: string; name: string; email: string; avatar: string
  xp: number; level: number; streak: number
  badges: string[]; completedModules: string[]; joinedAt: string
}

interface AuthCtx {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  completeModule: (id: string) => void
}

const AuthContext = createContext<AuthCtx>({} as AuthCtx)

const MOCK_USER: User = {
  id: '1', name: 'Atharva Kelkar', email: 'atharva@nexara.ai', avatar: 'AK',
  xp: 1240, level: 5, streak: 7,
  badges: ['first-analysis', 'speed-learner', 'week-streak'],
  completedModules: ['docker-basics'], joinedAt: '2024-01-15',
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nexara-user')
    return saved ? JSON.parse(saved) : null
  })

  const save = (u: User | null) => {
    setUser(u)
    if (u) localStorage.setItem('nexara-user', JSON.stringify(u))
    else localStorage.removeItem('nexara-user')
  }

  const login = async (email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 1200))
    save({ ...MOCK_USER, email })
  }

  const register = async (name: string, email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 1400))
    save({ ...MOCK_USER, name, email, xp: 0, level: 1, streak: 0, badges: [], completedModules: [] })
  }

  const logout = () => save(null)

  const completeModule = (id: string) => {
    if (!user || user.completedModules.includes(id)) return
    const newXP = user.xp + 150
    const newLevel = Math.floor(newXP / 500) + 1
    save({ ...user, completedModules: [...user.completedModules, id], xp: newXP, level: newLevel })
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, completeModule }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
