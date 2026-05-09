import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { categoryConfig } from '../../data/actionsData'
import type { FilterCategory } from '../../data/actionsData'

const FILTERS: { key: FilterCategory; label: string; icon: string }[] = [
  { key: 'All', label: 'All', icon: '🌍' },
  { key: 'Transport', label: 'Transport', icon: categoryConfig.Transport.icon },
  { key: 'Energy', label: 'Energy', icon: categoryConfig.Energy.icon },
  { key: 'Recycling', label: 'Recycling', icon: categoryConfig.Recycling.icon },
  { key: 'Water', label: 'Water', icon: categoryConfig.Water.icon },
  { key: 'Lifestyle', label: 'Lifestyle', icon: categoryConfig.Lifestyle.icon },
]

interface ActionFilterBarProps {
  filter: FilterCategory
  search: string
  counts: Record<FilterCategory, number>
  onFilterChange: (f: FilterCategory) => void
  onSearchChange: (q: string) => void
}

export function ActionFilterBar({
  filter,
  search,
  counts,
  onFilterChange,
  onSearchChange,
}: ActionFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative flex-1 max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-200/40" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search actions…"
          className="h-9 w-full rounded-xl bg-white/5 pl-9 pr-8 text-xs text-zinc-50 placeholder-zinc-200/35 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-emerald-300/40"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-200/40 hover:text-zinc-200/80"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap items-center gap-1.5">
        {FILTERS.map((f) => {
          const isActive = filter === f.key
          return (
            <motion.button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              whileTap={{ scale: 0.95 }}
              className={`relative inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 ${
                isActive
                  ? 'bg-emerald-400/15 text-emerald-100 ring-1 ring-emerald-300/30'
                  : 'bg-white/5 text-zinc-200/65 ring-1 ring-white/10 hover:bg-white/8 hover:text-zinc-50'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="action-filter-pill"
                  className="absolute inset-0 rounded-xl bg-emerald-400/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{f.icon}</span>
              <span className="relative">{f.label}</span>
              <span
                className={`relative rounded-full px-1 py-0.5 text-[9px] font-bold ring-1 ${
                  isActive
                    ? 'bg-emerald-300/10 text-emerald-200 ring-emerald-200/20'
                    : 'bg-white/5 text-zinc-200/45 ring-white/10'
                }`}
              >
                {counts[f.key]}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
