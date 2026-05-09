import { AnimatePresence, motion } from 'framer-motion'
import { challenges as allChallenges } from '../data/challengesData'
import type { FilterKey } from '../data/challengesData'
import { useChallenges } from '../hooks/useChallenges'
import { DashboardBackgroundFX } from '../components/dashboard/DashboardBackgroundFX'
import { ChallengesNavbar } from '../components/challenges/ChallengesNavbar'
import { ChallengesHero } from '../components/challenges/ChallengesHero'
import { FeaturedChallenge } from '../components/challenges/FeaturedChallenge'
import { ChallengeFilterBar } from '../components/challenges/ChallengeFilterBar'
import { ChallengeCard } from '../components/challenges/ChallengeCard'
import { LeaderboardSection } from '../components/challenges/LeaderboardSection'
import { CommunityStatsBar } from '../components/challenges/CommunityStatsBar'
import { staggerContainer } from '../animations/variants'

interface ChallengesPageProps {
  onBack: () => void
  onDashboard: () => void
  onCalculator: () => void
}

// Pre-compute filter counts from static data
function getFilterCounts(): Record<FilterKey, number> {
  return {
    All: allChallenges.length,
    Active: allChallenges.filter((c) => c.status === 'Active').length,
    Popular: allChallenges.filter((c) => c.status === 'Popular').length,
    Completed: allChallenges.filter((c) => c.status === 'Completed').length,
  }
}

export function ChallengesPage({ onBack, onDashboard, onCalculator }: ChallengesPageProps) {
  const { challenges, featured, filter, changeFilter, toggleJoin } = useChallenges()
  const filterCounts = getFilterCounts()

  return (
    <div className="min-h-screen bg-[#070A0F]">
      <DashboardBackgroundFX />
      <ChallengesNavbar onBack={onBack} onDashboard={onDashboard} onCalculator={onCalculator} />

      <main className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
        {/* Hero */}
        <ChallengesHero />

        <motion.div
          className="flex flex-col gap-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Featured */}
          <FeaturedChallenge challenge={featured} onToggle={toggleJoin} />

          {/* Community Stats */}
          <CommunityStatsBar />

          {/* Challenges Grid */}
          <section>
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">
                  ALL CHALLENGES
                </p>
                <h2 className="mt-1 text-lg font-semibold text-zinc-50">
                  Browse & Join
                  <span className="ml-2 rounded-full bg-white/5 px-2 py-0.5 text-sm font-normal text-zinc-200/50 ring-1 ring-white/10">
                    {challenges.length}
                  </span>
                </h2>
              </div>
              <ChallengeFilterBar
                active={filter}
                onChange={changeFilter}
                counts={filterCounts}
              />
            </div>

            <motion.div
              layout
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {challenges.map((c, i) => (
                  <ChallengeCard
                    key={c.id}
                    challenge={c}
                    index={i}
                    onToggle={toggleJoin}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {challenges.length === 0 && (
              <motion.div
                className="glass rounded-2xl py-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-4xl">🌿</p>
                <p className="mt-3 text-sm text-zinc-200/50">No challenges found for this filter.</p>
              </motion.div>
            )}
          </section>

          {/* Leaderboard */}
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* Left: joined summary */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55 }}
            >
              <div className="mb-4">
                <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">YOUR IMPACT</p>
                <p className="mt-1 text-lg font-semibold text-zinc-50">Challenges You've Joined</p>
              </div>
              <JoinedSummary challenges={challenges} />
            </motion.section>

            {/* Right: leaderboard */}
            <LeaderboardSection />
          </div>
        </motion.div>
      </main>
    </div>
  )
}

// ── Joined summary sub-component ─────────────────────────────────────────────
function JoinedSummary({
  challenges,
}: {
  challenges: (ReturnType<typeof useChallenges>['challenges'][number])[]
}) {
  const joined = challenges.filter((c) => c.isJoined)

  if (joined.length === 0) {
    return (
      <div className="glass glow-ring flex flex-col items-center justify-center gap-3 rounded-2xl py-12 text-center">
        <span className="text-4xl">🌱</span>
        <p className="text-sm font-semibold text-zinc-50">No challenges joined yet</p>
        <p className="text-xs text-zinc-200/50">
          Join a challenge above to start tracking your impact.
        </p>
      </div>
    )
  }

  const totalPoints = joined.reduce((s, c) => s + c.ecoPoints, 0)
  const totalCo2 = joined.reduce((s, c) => s + c.co2SavedKg, 0)

  return (
    <div className="flex flex-col gap-3">
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Joined', value: joined.length, color: 'text-emerald-200', bg: 'bg-emerald-300/10 ring-emerald-200/15' },
          { label: 'Eco Points', value: `+${totalPoints}`, color: 'text-cyan-200', bg: 'bg-cyan-300/10 ring-cyan-200/15' },
          { label: 'CO₂ Saving', value: `${totalCo2.toFixed(1)} kg`, color: 'text-violet-200', bg: 'bg-violet-300/10 ring-violet-200/15' },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-3 ring-1 text-center ${s.bg}`}>
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-zinc-200/55">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Joined list */}
      <div className="glass glow-ring divide-y divide-white/5 overflow-hidden rounded-2xl">
        {joined.map((c) => (
          <div key={c.id} className="flex items-center gap-3 px-4 py-3">
            <span className="text-xl">{c.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-semibold text-zinc-50">{c.title}</p>
              <p className="text-[10px] text-zinc-200/50">{c.durationDays}d · {c.category}</p>
            </div>
            <span className="rounded-full bg-emerald-300/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-200 ring-1 ring-emerald-200/15">
              +{c.ecoPoints} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
