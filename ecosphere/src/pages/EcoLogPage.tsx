import { motion } from 'framer-motion'
import { DashboardBackgroundFX } from '../components/dashboard/DashboardBackgroundFX'
import { EcoLogNavbar } from '../components/ecoLog/EcoLogNavbar'
import { EcoLogHero } from '../components/ecoLog/EcoLogHero'
import { ActionForm } from '../components/ecoLog/ActionForm'
import { SummaryDashboard } from '../components/ecoLog/SummaryDashboard'
import { ActionFeed } from '../components/ecoLog/ActionFeed'
import { AchievementBadges } from '../components/ecoLog/AchievementBadges'
import { useEcoActions } from '../hooks/useEcoActions'
import { staggerContainer } from '../animations/variants'

interface EcoLogPageProps {
  onBack: () => void
  onDashboard: () => void
  onChallenges: () => void
}

export function EcoLogPage({ onBack, onDashboard, onChallenges }: EcoLogPageProps) {
  const {
    actions,
    filter,
    search,
    changeFilter,
    changeSearch,
    addAction,
    removeAction,
    summary,
    categoryCounts,
  } = useEcoActions()

  return (
    <div className="min-h-screen bg-[#070A0F]">
      <DashboardBackgroundFX />
      <EcoLogNavbar onBack={onBack} onDashboard={onDashboard} onChallenges={onChallenges} />

      <main className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
        <EcoLogHero />

        <motion.div
          className="flex flex-col gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Log form */}
          <ActionForm onAdd={addAction} />

          {/* Summary dashboard */}
          <SummaryDashboard summary={summary} />

          {/* Action feed */}
          <ActionFeed
            actions={actions}
            filter={filter}
            search={search}
            counts={categoryCounts}
            onFilterChange={changeFilter}
            onSearchChange={changeSearch}
            onRemove={removeAction}
          />

          {/* Achievement badges */}
          <AchievementBadges totalPoints={summary.total} />
        </motion.div>
      </main>
    </div>
  )
}
