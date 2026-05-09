import { AnimatePresence, motion } from 'framer-motion'
import type { FilterMetric, RegionData } from '../../data/regionalData'
import { aqiConfig } from '../../data/regionalData'
import { getAqiColor } from '../../utils/analyticsHelpers'
import { scaleIn } from '../../animations/variants'

interface RegionGridProps {
  regions: RegionData[]
  selected: RegionData | null
  filter: FilterMetric
  onSelect: (id: string | null) => void
}

function getMetricDisplay(r: RegionData, filter: FilterMetric): { value: string; label: string; color: string } {
  switch (filter) {
    case 'AQI':
      return { value: String(r.aqi), label: 'AQI', color: getAqiColor(r.aqi) }
    case 'CO2':
      return { value: `${r.co2PerCapita}t`, label: 'CO₂/cap', color: r.co2PerCapita > 10 ? '#f87171' : r.co2PerCapita > 6 ? '#fb923c' : '#22ffa8' }
    case 'Renewable':
      return { value: `${r.renewablePercent}%`, label: 'Renewable', color: r.renewablePercent > 60 ? '#22ffa8' : r.renewablePercent > 30 ? '#4ad8ff' : '#fb923c' }
    case 'Pollution': {
      const cfg = aqiConfig[r.pollutionLevel]
      return { value: r.pollutionLevel, label: 'Level', color: cfg.color }
    }
  }
}

export function RegionGrid({ regions, selected, filter, onSelect }: RegionGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {regions.map((r, i) => {
          const isSelected = selected?.id === r.id
          const cfg = aqiConfig[r.pollutionLevel]
          const metric = getMetricDisplay(r, filter)

          return (
            <motion.button
              key={r.id}
              layout
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              custom={i % 8}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(isSelected ? null : r.id)}
              className={`glass relative overflow-hidden rounded-2xl p-4 text-left ring-1 transition ${
                isSelected
                  ? 'ring-cyan-300/40 shadow-[0_0_28px_rgba(74,216,255,0.10)]'
                  : 'ring-white/10 hover:ring-white/20'
              }`}
            >
              {/* Glow */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(280px circle at 50% 0%, ${isSelected ? cfg.glow : 'rgba(255,255,255,0.02)'}, transparent 70%)`,
                  opacity: isSelected ? 1 : 0,
                }}
              />
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{ background: `radial-gradient(280px circle at 50% 0%, ${cfg.glow}, transparent 70%)` }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />

              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  layoutId="selected-ring"
                  className="absolute inset-0 rounded-2xl ring-2 ring-cyan-300/40"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <div className="relative">
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{r.flag}</span>
                    <div>
                      <p className="text-sm font-semibold text-zinc-50 leading-tight">{r.name}</p>
                      <p className="text-[10px] text-zinc-200/50">{r.continent}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${cfg.bg} ${cfg.ring} ${cfg.text}`}>
                    {r.pollutionLevel}
                  </span>
                </div>

                {/* Metric highlight */}
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-zinc-200/50">{metric.label}</p>
                    <p className="text-xl font-bold" style={{ color: metric.color }}>
                      {metric.value}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-zinc-200/50">Renewable</p>
                    <p className="text-sm font-semibold text-emerald-300">{r.renewablePercent}%</p>
                  </div>
                </div>

                {/* Mini AQI bar */}
                <div className="mt-3">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: getAqiColor(r.aqi) }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min((r.aqi / 300) * 100, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[9px] text-zinc-200/35">
                    <span>AQI {r.aqi}</span>
                    <span>CO₂ {r.co2PerCapita}t</span>
                  </div>
                </div>
              </div>
            </motion.button>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
