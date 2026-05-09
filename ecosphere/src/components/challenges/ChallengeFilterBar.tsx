import { motion } from 'framer-motion'
import type { FilterKey } from '../../data/challengesData'

const FILTERS: { key: FilterKey; label: string; icon: string }[] = [
  { key: 'All', label: 'All Challenges', icon: '🌍' },
  { key: 'Active', label: 'Active', icon: '🔥' },
  { key: 'Popular', label: 'Popular', icon: '⭐' },
  { key: 'Completed', label: 'Completed', icon: '✅' },
]

interface ChallengeFilterBarProps {
  active: FilterKey
  onChange: (f: FilterKey) => void
  counts: Record<FilterKey, number>
}

export function ChallengeFilterBar({ active, onChange, counts }: ChallengeFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTERS.map((f) => {
        const isActive = active === f.key
        return (
          <motion.button
            key={f.key}
            onClick={() => onChange(f.key)}
            whileTap={{ scale: 0.95 }}
            className={`relative inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 ${
              isActive
                ? 'bg-violet-400/15 text-violet-100 ring-1 ring-violet-300/30'
                : 'bg-white/5 text-zinc-200/70 ring-1 ring-white/10 hover:bg-white/8 hover:text-zinc-50'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="challenge-filter-pill"
                className="absolute inset-0 rounded-xl bg-violet-400/10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{f.icon}</span>
            <span className="relative">{f.label}</span>
            <span
              className={`relative rounded-full px-1.5 py-0.5 text-[9px] font-bold ring-1 ${
                isActive
                  ? 'bg-violet-300/10 text-violet-200 ring-violet-200/20'
                  : 'bg-white/5 text-zinc-200/50 ring-white/10'
              }`}
            >
              {counts[f.key]}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
