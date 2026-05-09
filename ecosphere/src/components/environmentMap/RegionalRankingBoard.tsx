import { motion } from 'framer-motion'
import { Award, AlertTriangle } from 'lucide-react'
import type { RegionData, FilterMetric } from '../../data/regionalData'
import { aqiConfig } from '../../data/regionalData'
import { getAqiColor } from '../../utils/analyticsHelpers'
import { fadeUp } from '../../animations/variants'

interface RankingBoardProps {
  cleanest: RegionData[]
  mostPolluted: RegionData[]
  filter: FilterMetric
  onSelect: (id: string) => void
}

function getScore(r: RegionData, filter: FilterMetric): string {
  switch (filter) {
    case 'AQI': return `AQI ${r.aqi}`
    case 'CO2': return `${r.co2PerCapita}t CO₂`
    case 'Renewable': return `${r.renewablePercent}% renewable`
    case 'Pollution': return r.pollutionLevel
  }
}

function RankRow({
  region,
  rank,
  filter,
  variant,
  onSelect,
  index,
}: {
  region: RegionData
  rank: number
  filter: FilterMetric
  variant: 'clean' | 'polluted'
  onSelect: (id: string) => void
  index: number
}) {
  const cfg = aqiConfig[region.pollutionLevel]
  const rankColors = ['text-yellow-300', 'text-zinc-300', 'text-orange-400']
  const rankIcons = ['🥇', '🥈', '🥉']

  return (
    <motion.button
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      whileHover={{ x: 4, transition: { duration: 0.15 } }}
      onClick={() => onSelect(region.id)}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/5"
    >
      <span className={`w-6 text-center text-sm font-bold ${rank <= 3 ? rankColors[rank - 1] : 'text-zinc-200/40'}`}>
        {rank <= 3 ? rankIcons[rank - 1] : `#${rank}`}
      </span>
      <span className="text-lg">{region.flag}</span>
      <div className="flex-1 min-w-0">
        <p className="truncate text-xs font-semibold text-zinc-50">{region.name}</p>
        <p className="text-[10px] text-zinc-200/45">{region.continent}</p>
      </div>
      <div className="text-right">
        <p
          className="text-xs font-bold"
          style={{ color: variant === 'clean' ? '#22ffa8' : getAqiColor(region.aqi) }}
        >
          {getScore(region, filter)}
        </p>
        <span className={`text-[9px] font-semibold ${cfg.text}`}>{region.pollutionLevel}</span>
      </div>
    </motion.button>
  )
}

export function RegionalRankingBoard({ cleanest, mostPolluted, filter, onSelect }: RankingBoardProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Cleanest */}
      <motion.div
        className="glass glow-ring rounded-2xl p-5"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        custom={0}
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300/10 ring-1 ring-emerald-200/20">
            <Award className="h-4 w-4 text-emerald-200" />
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] text-zinc-200/55">TOP 5</p>
            <p className="text-sm font-semibold text-zinc-50">Cleanest Regions</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {cleanest.map((r, i) => (
            <RankRow
              key={r.id}
              region={r}
              rank={i + 1}
              filter={filter}
              variant="clean"
              onSelect={onSelect}
              index={i}
            />
          ))}
        </div>
      </motion.div>

      {/* Most polluted */}
      <motion.div
        className="glass glow-ring rounded-2xl p-5"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        custom={1}
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-red-300/10 ring-1 ring-red-200/20">
            <AlertTriangle className="h-4 w-4 text-red-300" />
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] text-zinc-200/55">BOTTOM 5</p>
            <p className="text-sm font-semibold text-zinc-50">Most Polluted Regions</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {mostPolluted.map((r, i) => (
            <RankRow
              key={r.id}
              region={r}
              rank={i + 1}
              filter={filter}
              variant="polluted"
              onSelect={onSelect}
              index={i}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
