import { CarbonCalculatorPreview } from '../components/CarbonCalculatorPreview'
import { EcoChallenges } from '../components/EcoChallenges'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { ImpactStats } from '../components/ImpactStats'
import { Mission } from '../components/Mission'
import { Navbar } from '../components/Navbar'

interface LandingPageProps {
  onNavigateDashboard?: () => void
  onNavigateCalculator?: () => void
  onNavigateChallenges?: () => void
  onNavigateEcoLog?: () => void
  onNavigateEnvMap?: () => void
  onNavigateLeaderboard?: () => void
  onNavigateLogin?: () => void
  onNavigateRegister?: () => void
  onNavigateAIAdvisor?: () => void
}

export function LandingPage({ onNavigateDashboard, onNavigateCalculator, onNavigateChallenges, onNavigateEcoLog, onNavigateEnvMap, onNavigateLeaderboard, onNavigateLogin, onNavigateRegister, onNavigateAIAdvisor }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#070A0F]">
      <Navbar
        onNavigateDashboard={onNavigateDashboard}
        onNavigateCalculator={onNavigateCalculator}
        onNavigateChallenges={onNavigateChallenges}
        onNavigateEcoLog={onNavigateEcoLog}
        onNavigateEnvMap={onNavigateEnvMap}
        onNavigateLeaderboard={onNavigateLeaderboard}
        onNavigateLogin={onNavigateLogin}
        onNavigateRegister={onNavigateRegister}
        onNavigateAIAdvisor={onNavigateAIAdvisor}
      />
      <main>
        <Hero onNavigateDashboard={onNavigateDashboard} onNavigateCalculator={onNavigateCalculator} />
        <ImpactStats />
        <Mission />
        <EcoChallenges onNavigateChallenges={onNavigateChallenges} />
        <CarbonCalculatorPreview onNavigateCalculator={onNavigateCalculator} />
      </main>
      <Footer />
    </div>
  )
}

