import { motion } from 'framer-motion'
import { useCallback } from 'react'

export type FilterKey = 'All' | 'Energy' | 'Recycling' | 'Transport' | 'Challenges'

const FILTERS: FilterKey[] = ['All', 'Energy', 'Recycling', 'Transport', 'Challenges']

interface FilterButtonsProps {
  active: FilterKey
  onChange: (f: FilterKey) => void
}

export function FilterButtons({ active, onChange }: FilterButtonsProps) {
  const handleClick = useCallback(
    (f: FilterKey) => {
      onChange(f)
      // Persist to URL
      const params = new URLSearchParams(window.location.search)
      if (f === 'All') {
        params.delete('filter')
      } else {
        params.set('filter', f)
      }
      const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`
      window.history.replaceState(null, '', newUrl)
    },
    [onChange],
  )

  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTERS.map((f) => {
        const isActive = active === f
        return (
          <motion.button
            key={f}
            onClick={() => handleClick(f)}
            className={`relative rounded-xl px-3.5 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 ${
              isActive
                ? 'bg-emerald-400/15 text-emerald-100 ring-1 ring-emerald-300/30'
                : 'bg-white/5 text-zinc-200/70 ring-1 ring-white/10 hover:bg-white/10 hover:text-zinc-50'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-xl bg-emerald-400/10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{f}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
