import { motion } from 'framer-motion'
import type { FilterMetric } from '../../data/regionalData'

const METRICS: { key: FilterMetric; label: string; icon: string; desc: string }[] = [
  { key: 'AQI',       label: 'Air Quality',      icon: '💨', desc: 'AQI index' },
  { key: 'CO2',       label: 'CO₂ Emissions',    icon: '🏭', desc: 'tonnes/capita' },
  { key: 'Renewable', label: 'Renewable Energy', icon: '☀️', desc: '% of total' },
  { key: 'Pollution', label: 'Pollution Level',  icon: '🌫️', desc: 'severity' },
]

interface MetricFilterBarProps {
  active: FilterMetric
  onChange: (m: FilterMetric) => void
}

export function MetricFilterBar({ active, onChange }: MetricFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {METRICS.map((m) => {
        const isActive = active === m.key
        return (
          <motion.button
            key={m.key}
            onClick={() => onChange(m.key)}
            whileTap={{ scale: 0.95 }}
            className={`relative inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${
              isActive
                ? 'bg-cyan-400/15 text-cyan-100 ring-1 ring-cyan-300/30'
                : 'bg-white/5 text-zinc-200/70 ring-1 ring-white/10 hover:bg-white/8 hover:text-zinc-50'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="metric-pill"
                className="absolute inset-0 rounded-xl bg-cyan-400/10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{m.icon}</span>
            <span className="relative">{m.label}</span>
            <span
              className={`relative rounded-full px-1.5 py-0.5 text-[9px] ring-1 ${
                isActive
                  ? 'bg-cyan-300/10 text-cyan-200 ring-cyan-200/20'
                  : 'bg-white/5 text-zinc-200/40 ring-white/10'
              }`}
            >
              {m.desc}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
