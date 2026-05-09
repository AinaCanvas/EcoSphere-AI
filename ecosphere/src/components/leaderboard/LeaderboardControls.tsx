import { motion } from 'framer-motion'
import type { CategoryTab, TimeFilter } from '../../data/leaderboardData'
import { categoryConfig } from '../../data/leaderboardData'

const TIME_FILTERS: TimeFilter[] = ['Weekly', 'Monthly', 'All-Time']
const CATEGORIES: CategoryTab[]  = ['Overall', 'Transport', 'Energy', 'Recycling', 'Challenges']

interface LeaderboardControlsProps {
  time: TimeFilter
  category: CategoryTab
  onTimeChange: (t: TimeFilter) => void
  onCategoryChange: (c: CategoryTab) => void
}

export function LeaderboardControls({
  time,
  category,
  onTimeChange,
  onCategoryChange,
}: LeaderboardControlsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Time filter */}
      <div className="flex items-center gap-1.5 rounded-xl bg-white/5 p-1 ring-1 ring-white/10">
        {TIME_FILTERS.map((t) => {
          const active = time === t
          return (
            <motion.button
              key={t}
              onClick={() => onTimeChange(t)}
              whileTap={{ scale: 0.95 }}
              className={`relative rounded-lg px-3.5 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/60 ${
                active ? 'text-zinc-50' : 'text-zinc-200/55 hover:text-zinc-200/80'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="time-pill"
                  className="absolute inset-0 rounded-lg bg-white/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{t}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap items-center gap-1.5">
        {CATEGORIES.map((c) => {
          const active = category === c
          const cfg = categoryConfig[c]
          return (
            <motion.button
              key={c}
              onClick={() => onCategoryChange(c)}
              whileTap={{ scale: 0.95 }}
              className={`relative inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/60 ${
                active
                  ? 'bg-yellow-400/15 text-yellow-100 ring-1 ring-yellow-300/30'
                  : 'bg-white/5 text-zinc-200/65 ring-1 ring-white/10 hover:bg-white/8 hover:text-zinc-50'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="cat-pill"
                  className="absolute inset-0 rounded-xl bg-yellow-400/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{cfg.icon}</span>
              <span className="relative">{c}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
