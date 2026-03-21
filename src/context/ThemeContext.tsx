import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'
interface ThemeCtx { theme: Theme; toggle: () => void }

const ThemeContext = createContext<ThemeCtx>({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('nexara-theme')
    return (saved as Theme) || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
      document.body.style.background = '#f8f9ff'
      document.body.style.color = '#0a0a1a'
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
      document.body.style.background = '#060912'
      document.body.style.color = '#f3f4f6'
    }
    localStorage.setItem('nexara-theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
