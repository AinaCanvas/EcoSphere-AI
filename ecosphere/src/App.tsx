import { useEffect, useState } from 'react'
import { DashboardPage } from './pages/DashboardPage'
import { LandingPage } from './pages/LandingPage'
import { CalculatorPage } from './pages/CalculatorPage'
import { ChallengesPage } from './pages/ChallengesPage'
import { EcoLogPage } from './pages/EcoLogPage'
import { EnvMapPage } from './pages/EnvMapPage'
import { LeaderboardPage } from './pages/LeaderboardPage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ProfileSetupPage } from './pages/auth/ProfileSetupPage'
import { AIAdvisorPage } from './pages/AIAdvisorPage'
import { getSession } from './utils/authHelpers'

type Page =
  | 'landing' | 'dashboard' | 'calculator' | 'challenges'
  | 'ecolog'  | 'envmap'    | 'leaderboard'
  | 'login'   | 'register'  | 'profile-setup'
  | 'ai-advisor'

function getPage(): Page {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path === '/dashboard')     return 'dashboard'
    if (path === '/calculator')    return 'calculator'
    if (path === '/challenges')    return 'challenges'
    if (path === '/eco-log')       return 'ecolog'
    if (path === '/env-map')       return 'envmap'
    if (path === '/leaderboard')   return 'leaderboard'
    if (path === '/login')         return 'login'
    if (path === '/register')      return 'register'
    if (path === '/profile-setup') return 'profile-setup'
    if (path === '/ai-advisor')    return 'ai-advisor'
  }
  return 'landing'
}

function navigate(path: string, setPage: (p: Page) => void) {
  window.history.pushState(null, '', path)
  setPage(getPage())
}

export default function App() {
  const [page, setPage] = useState<Page>(getPage)

  useEffect(() => {
    const handler = () => setPage(getPage())
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  const nav = {
    toLanding:      () => navigate('/', setPage),
    toDashboard:    () => navigate('/dashboard', setPage),
    toCalculator:   () => navigate('/calculator', setPage),
    toChallenges:   () => navigate('/challenges', setPage),
    toEcoLog:       () => navigate('/eco-log', setPage),
    toEnvMap:       () => navigate('/env-map', setPage),
    toLeaderboard:  () => navigate('/leaderboard', setPage),
    toLogin:        () => navigate('/login', setPage),
    toRegister:     () => navigate('/register', setPage),
    toProfileSetup: () => navigate('/profile-setup', setPage),
    toAIAdvisor:    () => navigate('/ai-advisor', setPage),
  }

  // Auth page handlers
  if (page === 'login') {
    return (
      <LoginPage
        onNavigateHome={nav.toLanding}
        onNavigateRegister={nav.toRegister}
        onLoginSuccess={() => {
          const user = getSession()
          if (user && !user.profile) {
            nav.toProfileSetup()
          } else {
            nav.toDashboard()
          }
        }}
      />
    )
  }
  if (page === 'register') {
    return (
      <RegisterPage
        onNavigateHome={nav.toLanding}
        onNavigateLogin={nav.toLogin}
        onRegisterSuccess={nav.toProfileSetup}
      />
    )
  }
  if (page === 'profile-setup') {
    return (
      <ProfileSetupPage
        onNavigateHome={nav.toLanding}
        onSetupComplete={nav.toDashboard}
        onSkip={nav.toDashboard}
      />
    )
  }

  if (page === 'ai-advisor') {
    return <AIAdvisorPage onBack={nav.toLanding} onDashboard={nav.toDashboard} />
  }

  if (page === 'dashboard') {
    return (
      <DashboardPage
        onNavigateCalculator={nav.toCalculator}
        onNavigateChallenges={nav.toChallenges}
        onNavigateEcoLog={nav.toEcoLog}
        onNavigateEnvMap={nav.toEnvMap}
        onNavigateLeaderboard={nav.toLeaderboard}
      />
    )
  }
  if (page === 'calculator') {
    return <CalculatorPage onBack={nav.toLanding} onDashboard={nav.toDashboard} />
  }
  if (page === 'challenges') {
    return (
      <ChallengesPage
        onBack={nav.toLanding}
        onDashboard={nav.toDashboard}
        onCalculator={nav.toCalculator}
      />
    )
  }
  if (page === 'ecolog') {
    return (
      <EcoLogPage
        onBack={nav.toLanding}
        onDashboard={nav.toDashboard}
        onChallenges={nav.toChallenges}
      />
    )
  }
  if (page === 'envmap') {
    return (
      <EnvMapPage
        onBack={nav.toLanding}
        onDashboard={nav.toDashboard}
        onEcoLog={nav.toEcoLog}
      />
    )
  }
  if (page === 'leaderboard') {
    return (
      <LeaderboardPage
        onBack={nav.toLanding}
        onDashboard={nav.toDashboard}
        onChallenges={nav.toChallenges}
      />
    )
  }

  return (
    <LandingPage
      onNavigateDashboard={nav.toDashboard}
      onNavigateCalculator={nav.toCalculator}
      onNavigateChallenges={nav.toChallenges}
      onNavigateEcoLog={nav.toEcoLog}
      onNavigateEnvMap={nav.toEnvMap}
      onNavigateLeaderboard={nav.toLeaderboard}
      onNavigateLogin={nav.toLogin}
      onNavigateRegister={nav.toRegister}
      onNavigateAIAdvisor={nav.toAIAdvisor}
    />
  )
}
