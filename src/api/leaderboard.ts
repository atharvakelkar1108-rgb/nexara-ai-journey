const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export type LeaderboardEntry = {
  rank: number
  name: string
  avatar: string
  xp: number
  level: number
  badge: string
  modules: number
  streak: number
  isYou?: boolean
}

export async function fetchLeaderboardSnapshot(): Promise<LeaderboardEntry[]> {
  const res = await fetch(`${BASE}/leaderboard`)
  if (!res.ok) {
    throw new Error('Failed to fetch leaderboard snapshot')
  }
  return res.json()
}
