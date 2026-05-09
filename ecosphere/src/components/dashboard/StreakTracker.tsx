import { motion } from 'framer-motion'
import { Flame, Trophy, Zap } from 'lucide-react'
import { streakData } from '../../data/dashboardData'
import { fadeUp } from '../../animations/variants'
import { calcSummary } from '../../utils/pointsCalculator'
import { seedActions } from '../../data/actionsData'

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

// Build live week activity from seed actions
function getLiveWeekDays(streak: number): boolean[] {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    // i=0 is Monday of current week
    const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1
    d.setDate(today.getDate() - dayOfWeek + i)
    const iso = d.toISOString().slice(0, 10)
    return seedActions.some((a) => a.date === iso)
  })
}

export function StreakTracker() {
  const liveSummary = calcSummary(seedActions)
  const liveStreak = liveSummary.streak || streakData.current
  const weekDays = getLiveWeekDays(liveStreak)

  const cards = [
    {
      icon: Flame,
      label: 'Current Streak',
      value: liveStreak,
      suffix: 'days',
      color: 'emerald',
      glow: 'rgba(34,255,168,0.15)',
    },
    {
      icon: Trophy,
      label: 'Longest Streak',
      value: Math.max(liveStreak, streakData.longest),
      suffix: 'days',
      color: 'cyan',
      glow: 'rgba(74,216,255,0.15)',
    },
    {
      icon: Zap,
      label: 'Weekly Consistency',
      value: Math.round((weekDays.filter(Boolean).length / 7) * 100),
      suffix: '%',
      color: 'emerald',
      glow: 'rgba(34,255,168,0.15)',
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      {/* Streak cards */}
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            className="glass glow-ring relative overflow-hidden rounded-2xl p-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={i}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(300px circle at 50% 0%, ${card.glow}, transparent 70%)`,
              }}
            />
            <div
              className={`grid h-9 w-9 place-items-center rounded-xl ring-1 ${
                card.color === 'emerald'
                  ? 'bg-emerald-300/10 ring-emerald-200/20'
                  : 'bg-cyan-300/10 ring-cyan-200/20'
              }`}
            >
              <card.icon
                className={`h-4 w-4 ${card.color === 'emerald' ? 'text-emerald-200' : 'text-cyan-200'}`}
              />
            </div>
            <motion.p
              className="mt-3 text-2xl font-bold text-zinc-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
            >
              {card.value}
              <span className="ml-1 text-xs font-normal text-zinc-200/60">
                {card.suffix}
              </span>
            </motion.p>
            <p className="mt-1 text-[11px] text-zinc-200/60">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Weekly day tracker */}
      <motion.div
        className="glass glow-ring rounded-2xl p-4"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-zinc-200/60">
          THIS WEEK
        </p>
        <div className="flex items-center justify-between gap-2">
          {weekDays.map((active, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <motion.div
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-semibold transition ${
                  active
                    ? 'bg-gradient-to-br from-emerald-400/30 to-cyan-400/20 text-emerald-100 ring-1 ring-emerald-200/30'
                    : 'bg-white/5 text-zinc-200/40 ring-1 ring-white/10'
                }`}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.05 * i + 0.4, duration: 0.35 }}
              >
                {active ? '✓' : '·'}
              </motion.div>
              <span className="text-[10px] text-zinc-200/50">{DAY_LABELS[i]}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
