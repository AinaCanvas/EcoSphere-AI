import { motion } from 'framer-motion'
import { AnalyticsSection } from '../components/dashboard/AnalyticsSection'
import { BadgeSystem } from '../components/dashboard/BadgeSystem'
import { CarbonScoreCard } from '../components/dashboard/CarbonScoreCard'
import { DashboardBackgroundFX } from '../components/dashboard/DashboardBackgroundFX'
import { DashboardNavbar } from '../components/dashboard/DashboardNavbar'
import { GreenActionLog } from '../components/dashboard/GreenActionLog'
import { StreakTracker } from '../components/dashboard/StreakTracker'
import { WelcomeSection } from '../components/dashboard/WelcomeSection'
import { staggerContainer } from '../animations/variants'

interface DashboardPageProps {
  onNavigateCalculator?: () => void
  onNavigateChallenges?: () => void
  onNavigateEcoLog?: () => void
  onNavigateEnvMap?: () => void
  onNavigateLeaderboard?: () => void
}

export function DashboardPage({ onNavigateCalculator, onNavigateChallenges, onNavigateEcoLog, onNavigateEnvMap, onNavigateLeaderboard }: DashboardPageProps) {
  return (
    <div className="min-h-screen bg-[#070A0F]">
      <DashboardBackgroundFX />
      <DashboardNavbar
        onNavigateCalculator={onNavigateCalculator}
        onNavigateChallenges={onNavigateChallenges}
        onNavigateEcoLog={onNavigateEcoLog}
        onNavigateEnvMap={onNavigateEnvMap}
        onNavigateLeaderboard={onNavigateLeaderboard}
      />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <motion.div
          className="flex flex-col gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome */}
          <section id="overview">
            <WelcomeSection />
          </section>

          {/* Top row: Carbon Score + Streak */}
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <CarbonScoreCard />
            <StreakTracker />
          </div>

          {/* Analytics */}
          <AnalyticsSection />

          {/* Green Action Log */}
          <GreenActionLog />

          {/* Badge System */}
          <BadgeSystem />
        </motion.div>
      </main>
    </div>
  )
}
