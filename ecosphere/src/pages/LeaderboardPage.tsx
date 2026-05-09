import { motion } from 'framer-motion'
import { DashboardBackgroundFX } from '../components/dashboard/DashboardBackgroundFX'
import { LeaderboardNavbar } from '../components/leaderboard/LeaderboardNavbar'
import { LeaderboardHero } from '../components/leaderboard/LeaderboardHero'
import { LeaderboardControls } from '../components/leaderboard/LeaderboardControls'
import { PodiumSection } from '../components/leaderboard/PodiumSection'
import { LeaderboardTable } from '../components/leaderboard/LeaderboardTable'
import { CommunityStatsRow } from '../components/leaderboard/CommunityStatsRow'
import { YouCard } from '../components/leaderboard/YouCard'
import { useLeaderboard } from '../hooks/useLeaderboard'
import { staggerContainer, fadeUp } from '../animations/variants'

interface LeaderboardPageProps {
  onBack: () => void
  onDashboard: () => void
  onChallenges: () => void
}

export function LeaderboardPage({ onBack, onDashboard, onChallenges }: LeaderboardPageProps) {
  const { ranked, stats, youRank, time, changeTime, category, changeCategory } = useLeaderboard()

  const top3   = ranked.slice(0, 3)
  const rest   = ranked.slice(3)

  return (
    <div className="min-h-screen bg-[#070A0F]">
      <DashboardBackgroundFX />
      <LeaderboardNavbar onBack={onBack} onDashboard={onDashboard} onChallenges={onChallenges} />

      <main className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6">
        <LeaderboardHero />

        <motion.div
          className="flex flex-col gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Community stats */}
          <CommunityStatsRow stats={stats} />

          {/* Controls */}
          <motion.div variants={fadeUp} custom={0}>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">RANKINGS</p>
                <p className="mt-1 text-lg font-semibold text-zinc-50">
                  {time} · {category}
                  <span className="ml-2 rounded-full bg-white/5 px-2 py-0.5 text-sm font-normal text-zinc-200/50 ring-1 ring-white/10">
                    {ranked.length} users
                  </span>
                </p>
              </div>
            </div>
            <LeaderboardControls
              time={time}
              category={category}
              onTimeChange={changeTime}
              onCategoryChange={changeCategory}
            />
          </motion.div>

          {/* Podium */}
          <PodiumSection top3={top3} />

          {/* Your position */}
          {youRank && (
            <section>
              <YouCard you={youRank} totalUsers={stats.totalUsers} />
            </section>
          )}

          {/* Full table */}
          <section>
            <div className="mb-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">FULL RANKINGS</p>
              <p className="mt-1 text-sm font-semibold text-zinc-50">
                Positions #4 – #{ranked.length}
              </p>
            </div>
            <LeaderboardTable users={rest} />
          </section>
        </motion.div>
      </main>
    </div>
  )
}
