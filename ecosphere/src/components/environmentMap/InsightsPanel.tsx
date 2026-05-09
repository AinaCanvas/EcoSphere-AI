import { motion } from 'framer-motion'
import { Brain, TrendingDown, TrendingUp, Zap, Wind } from 'lucide-react'
import type { RegionData } from '../../data/regionalData'
import { fadeUp, scaleIn } from '../../animations/variants'

interface InsightsPanelProps {
  insights: {
    bestAqi: RegionData
    worstAqi: RegionData
    bestRenewable: RegionData
    lowestCo2: RegionData
    highestCo2: RegionData
  }
  onSelect: (id: string) => void
}

export function InsightsPanel({ insights, onSelect }: InsightsPanelProps) {
  const cards = [
    {
      icon: <Wind className="h-4 w-4" />,
      label: 'Best Air Quality',
      region: insights.bestAqi,
      value: `AQI ${insights.bestAqi.aqi}`,
      sub: 'Cleanest air globally',
      accent: 'emerald',
      bg: 'bg-emerald-300/10 ring-emerald-200/20',
      text: 'text-emerald-200',
      glow: 'rgba(34,255,168,0.12)',
    },
    {
      icon: <TrendingDown className="h-4 w-4" />,
      label: 'Worst Air Quality',
      region: insights.worstAqi,
      value: `AQI ${insights.worstAqi.aqi}`,
      sub: 'Needs urgent action',
      accent: 'red',
      bg: 'bg-red-300/10 ring-red-200/20',
      text: 'text-red-300',
      glow: 'rgba(248,113,113,0.12)',
    },
    {
      icon: <Zap className="h-4 w-4" />,
      label: 'Most Sustainable Energy',
      region: insights.bestRenewable,
      value: `${insights.bestRenewable.renewablePercent}% renewable`,
      sub: 'Leading energy transition',
      accent: 'cyan',
      bg: 'bg-cyan-300/10 ring-cyan-200/20',
      text: 'text-cyan-200',
      glow: 'rgba(74,216,255,0.12)',
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      label: 'Highest CO₂ Emitter',
      region: insights.highestCo2,
      value: `${insights.highestCo2.co2PerCapita}t/capita`,
      sub: 'Highest per-capita emissions',
      accent: 'orange',
      bg: 'bg-orange-300/10 ring-orange-200/20',
      text: 'text-orange-200',
      glow: 'rgba(251,146,60,0.12)',
    },
  ]

  const suggestions = [
    `${insights.worstAqi.name} could reduce AQI by 40% through stricter vehicle emission standards.`,
    `${insights.highestCo2.name} has significant solar potential — transitioning 20% of energy could save millions of tonnes of CO₂.`,
    `Regions like ${insights.bestRenewable.name} demonstrate that 90%+ renewable energy is achievable with the right policy mix.`,
    `${insights.lowestCo2.name} shows that low per-capita emissions are possible even in developing economies.`,
  ]

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={0}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-300/10 ring-1 ring-violet-200/20">
          <Brain className="h-4 w-4 text-violet-200" />
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-[0.18em] text-zinc-200/55">AI INSIGHTS</p>
          <p className="text-sm font-semibold text-zinc-50">Smart Environmental Analysis</p>
        </div>
      </div>

      {/* Insight cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.button
            key={c.label}
            variants={scaleIn}
            custom={i}
            onClick={() => onSelect(c.region.id)}
            whileHover={{ y: -3, transition: { duration: 0.18 } }}
            className={`glass relative overflow-hidden rounded-2xl p-4 text-left ring-1 transition hover:ring-white/20 ${c.bg}`}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(200px circle at 50% 0%, ${c.glow}, transparent 70%)` }}
            />
            <div className="relative">
              <div className={`grid h-9 w-9 place-items-center rounded-xl ring-1 ${c.bg}`}>
                <span className={c.text}>{c.icon}</span>
              </div>
              <p className="mt-3 text-[10px] text-zinc-200/55">{c.label}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-lg">{c.region.flag}</span>
                <p className="text-xs font-semibold text-zinc-50 leading-tight">{c.region.name}</p>
              </div>
              <p className={`mt-1.5 text-sm font-bold ${c.text}`}>{c.value}</p>
              <p className="mt-0.5 text-[10px] text-zinc-200/45">{c.sub}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Suggestions */}
      <motion.div
        className="glass glow-ring mt-4 rounded-2xl p-5"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={4}
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg">💡</span>
          <p className="text-sm font-semibold text-zinc-50">Suggested Improvements</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {suggestions.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="flex items-start gap-2.5 rounded-xl bg-white/3 p-3 ring-1 ring-white/8"
            >
              <span className="mt-0.5 text-emerald-400 text-xs font-bold shrink-0">→</span>
              <p className="text-xs leading-relaxed text-zinc-200/65">{s}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}
