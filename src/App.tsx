import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AnalyzePage from './pages/AnalyzePage'
import ResultsPage from './pages/ResultsPage'
import LeaderboardPage from './pages/LeaderboardPage'
import RolesPage from './pages/RolesPage'
import ProfilePage from './pages/ProfilePage'

function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div style={{ minHeight: '100vh', transition: 'background 0.3s' }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/analyze" element={<AnalyzePage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/roles" element={<RolesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
