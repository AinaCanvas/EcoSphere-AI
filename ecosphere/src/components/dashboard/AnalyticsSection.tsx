import { motion, useInView } from 'framer-motion'
import { BarChart3, CheckCircle2, TrendingUp } from 'lucide-react'
import { useRef } from 'react'
import {
  challengesCompleted,
  sustainabilityTrend,
  weeklyAnalytics,
} from '../../data/dashboardData'
import { fadeUp } from '../../animations/variants'

const MAX_CARBON = Math.max(...weeklyAnalytics.map((d) => d.carbon))

function WeeklyCarbonChart() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="glass glow-ring rounded-2xl p-5"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] text-zinc-200/60">
            WEEKLY CARBON
          </p>
          <p className="mt-0.5 text-sm font-semibold text-zinc-50">
            CO₂ Reduction Trend
          </p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300/10 ring-1 ring-emerald-200/20">
          <BarChart3 className="h-4 w-4 text-emerald-200" />
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex h-28 items-end gap-2">
        {weeklyAnalytics.map((d, i) => {
          const heightPct = (d.carbon / MAX_CARBON) * 100
          const belowTarget = d.carbon <= d.target
          return (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="relative flex w-full flex-col items-center justify-end" style={{ height: '88px' }}>
                {/* Target line indicator */}
                <div
                  className="absolute left-0 right-0 border-t border-dashed border-cyan-300/30"
                  style={{ bottom: `${(d.target / MAX_CARBON) * 88}px` }}
                />
                <motion.div
                  className={`w-full rounded-t-lg ${
                    belowTarget
                      ? 'bg-gradient-to-t from-emerald-400/60 to-emerald-300/40'
                      : 'bg-gradient-to-t from-cyan-400/50 to-cyan-300/30'
                  }`}
                  style={{ height: `${heightPct}%` }}
                  initial={{ scaleY: 0, originY: 1 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="text-[10px] text-zinc-200/50">{d.day}</span>
            </div>
          )
        })}
      </div>

      <div className="mt-3 flex items-center gap-4 text-[10px] text-zinc-200/50">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
          Below target
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-cyan-400/50" />
          Above target
        </span>
        <span className="flex items-center gap-1">
          <span className="h-px w-4 border-t border-dashed border-cyan-300/50" />
          Target (5 kg)
        </span>
      </div>
    </motion.div>
  )
}

function ChallengesCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const pct = Math.min((challengesCompleted / 25) * 100, 100)

  return (
    <motion.div
      ref={ref}
      className="glass glow-ring rounded-2xl p-5"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={1}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] text-zinc-200/60">
            CHALLENGES
          </p>
          <p className="mt-0.5 text-sm font-semibold text-zinc-50">
            Completed This Month
          </p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300/10 ring-1 ring-cyan-200/20">
          <CheckCircle2 className="h-4 w-4 text-cyan-200" />
        </div>
      </div>

      <motion.p
        className="text-4xl font-bold text-gradient"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
      >
        {challengesCompleted}
      </motion.p>
      <p className="mt-1 text-xs text-zinc-200/55">out of 25 monthly goal</p>

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
            initial={{ width: 0 }}
            animate={inView ? { width: `${pct}%` } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <p className="mt-1.5 text-right text-[10px] text-emerald-300">{Math.round(pct)}% complete</p>
      </div>

      {/* Mini milestone dots */}
      <div className="mt-4 flex items-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = challengesCompleted >= (i + 1) * 5
          return (
            <motion.div
              key={i}
              className={`h-2 flex-1 rounded-full ${filled ? 'bg-gradient-to-r from-cyan-300 to-emerald-300' : 'bg-white/10'}`}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 * i + 0.5 }}
            />
          )
        })}
      </div>
    </motion.div>
  )
}

function SustainabilityTrendCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const maxVal = Math.max(...sustainabilityTrend)
  const minVal = Math.min(...sustainabilityTrend)
  const range = maxVal - minVal || 1

  // Build SVG polyline points
  const w = 200
  const h = 60
  const points = sustainabilityTrend
    .map((v, i) => {
      const x = (i / (sustainabilityTrend.length - 1)) * w
      const y = h - ((v - minVal) / range) * h
      return `${x},${y}`
    })
    .join(' ')

  const areaPoints = `0,${h} ${points} ${w},${h}`

  return (
    <motion.div
      ref={ref}
      className="glass glow-ring rounded-2xl p-5"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={2}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] text-zinc-200/60">
            TREND
          </p>
          <p className="mt-0.5 text-sm font-semibold text-zinc-50">
            Sustainability Score
          </p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300/10 ring-1 ring-emerald-200/20">
          <TrendingUp className="h-4 w-4 text-emerald-200" />
        </div>
      </div>

      <div className="flex items-end gap-3">
        <motion.p
          className="text-4xl font-bold text-gradient"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {sustainabilityTrend[sustainabilityTrend.length - 1]}
        </motion.p>
        <span className="mb-1 rounded-full bg-emerald-300/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-200 ring-1 ring-emerald-200/20">
          ↑ +{sustainabilityTrend[sustainabilityTrend.length - 1] - sustainabilityTrend[0]} pts
        </span>
      </div>
      <p className="mt-0.5 text-xs text-zinc-200/50">7-week progression</p>

      {/* SVG sparkline */}
      <div className="mt-4 overflow-hidden rounded-xl">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full"
          style={{ height: '60px' }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(34,255,168,0.3)" />
              <stop offset="100%" stopColor="rgba(34,255,168,0)" />
            </linearGradient>
            <clipPath id="trendClip">
              <motion.rect
                x="0"
                y="0"
                width={w}
                height={h}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                style={{ transformOrigin: 'left center' }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              />
            </clipPath>
          </defs>
          <polygon
            points={areaPoints}
            fill="url(#trendGrad)"
            clipPath="url(#trendClip)"
          />
          <polyline
            points={points}
            fill="none"
            stroke="rgba(34,255,168,0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#trendClip)"
          />
          {/* Dots */}
          {sustainabilityTrend.map((v, i) => {
            const x = (i / (sustainabilityTrend.length - 1)) * w
            const y = h - ((v - minVal) / range) * h
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill="#22ffa8"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15 * i + 0.5, duration: 0.3 }}
              />
            )
          })}
        </svg>
      </div>
    </motion.div>
  )
}

export function AnalyticsSection() {
  return (
    <section id="analytics">
      <div className="mb-4">
        <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">
          ANALYTICS
        </p>
        <h2 className="mt-1 text-lg font-semibold text-zinc-50">
          Your Impact Overview
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <WeeklyCarbonChart />
        <ChallengesCard />
        <SustainabilityTrendCard />
      </div>
    </section>
  )
}
