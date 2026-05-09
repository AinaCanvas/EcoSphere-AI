import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Flame, Star, Target, Zap } from 'lucide-react'
import type { PointsSummary } from '../../utils/pointsCalculator'
import { categoryConfig } from '../../data/actionsData'
import { useCountUp } from '../../hooks/useCountUp'
import { fadeUp } from '../../animations/variants'

function AnimCount({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const val = useCountUp({ to, start: inView, durationMs: 1000 })
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

interface SummaryDashboardProps {
  summary: PointsSummary
}

export function SummaryDashboard({ summary }: SummaryDashboardProps) {
  const topCat = summary.mostActiveCategory
  const topCfg = topCat ? categoryConfig[topCat] : null

  const statCards = [
    {
      icon: <Zap className="h-5 w-5" />,
      label: 'Total Eco Points',
      value: <AnimCount to={summary.total} />,
      sub: 'all time',
      accent: 'emerald' as const,
    },
    {
      icon: <Target className="h-5 w-5" />,
      label: 'Actions Logged',
      value: <AnimCount to={summary.totalActions} />,
      sub: 'total entries',
      accent: 'cyan' as const,
    },
    {
      icon: <Flame className="h-5 w-5" />,
      label: 'Current Streak',
      value: <AnimCount to={summary.streak} suffix=" days" />,
      sub: 'consecutive days',
      accent: 'violet' as const,
    },
    {
      icon: <Star className="h-5 w-5" />,
      label: "Today's Points",
      value: <AnimCount to={summary.todayTotal} />,
      sub: 'earned today',
      accent: 'orange' as const,
    },
  ]

  const accentMap = {
    emerald: { icon: 'text-emerald-200', bg: 'bg-emerald-300/10 ring-emerald-200/20', val: 'text-emerald-200', glow: 'rgba(34,255,168,0.12)' },
    cyan: { icon: 'text-cyan-200', bg: 'bg-cyan-300/10 ring-cyan-200/20', val: 'text-cyan-200', glow: 'rgba(74,216,255,0.12)' },
    violet: { icon: 'text-violet-200', bg: 'bg-violet-300/10 ring-violet-200/20', val: 'text-violet-200', glow: 'rgba(192,132,252,0.12)' },
    orange: { icon: 'text-orange-200', bg: 'bg-orange-300/10 ring-orange-200/20', val: 'text-orange-200', glow: 'rgba(251,146,60,0.12)' },
  }

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={0}
    >
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statCards.map((s, i) => {
          const a = accentMap[s.accent]
          return (
            <motion.div
              key={s.label}
              className="glass glow-ring relative overflow-hidden rounded-2xl p-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: `radial-gradient(200px circle at 50% 0%, ${a.glow}, transparent 70%)` }}
              />
              <div className={`grid h-9 w-9 place-items-center rounded-xl ring-1 ${a.bg}`}>
                <span className={a.icon}>{s.icon}</span>
              </div>
              <p className={`mt-3 text-2xl font-bold ${a.val}`}>{s.value}</p>
              <p className="mt-0.5 text-xs font-semibold text-zinc-50">{s.label}</p>
              <p className="text-[10px] text-zinc-200/50">{s.sub}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Weekly progress + category breakdown */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {/* Weekly progress */}
        <motion.div
          className="glass glow-ring rounded-2xl p-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] text-zinc-200/60">WEEKLY GOAL</p>
              <p className="mt-0.5 text-sm font-semibold text-zinc-50">
                {summary.weeklyTotal.toLocaleString()} / {summary.weeklyTarget.toLocaleString()} pts
              </p>
            </div>
            <span className="rounded-xl bg-emerald-300/10 px-3 py-1.5 text-sm font-bold text-emerald-200 ring-1 ring-emerald-200/20">
              {summary.weeklyPct}%
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
              initial={{ width: 0 }}
              whileInView={{ width: `${summary.weeklyPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="mt-3 flex justify-between text-[10px] text-zinc-200/40">
            <span>0 pts</span>
            <span>{summary.weeklyTarget.toLocaleString()} pts target</span>
          </div>

          {/* Most active category */}
          {topCfg && topCat && (
            <div className={`mt-4 flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ${topCfg.bg} ${topCfg.ring}`}>
              <span className="text-lg">{topCfg.icon}</span>
              <div>
                <p className="text-[10px] text-zinc-200/50">Most active category</p>
                <p className={`text-xs font-semibold ${topCfg.text}`}>{topCat}</p>
              </div>
              <span className={`ml-auto text-sm font-bold ${topCfg.text}`}>
                {summary.byCategory[topCat].toLocaleString()} pts
              </span>
            </div>
          )}
        </motion.div>

        {/* Category breakdown */}
        <motion.div
          className="glass glow-ring rounded-2xl p-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={5}
        >
          <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-zinc-200/60">
            POINTS BY CATEGORY
          </p>
          <div className="flex flex-col gap-2.5">
            {(Object.entries(summary.byCategory) as [import('../../data/actionsData').ActionCategory, number][])
              .sort(([, a], [, b]) => b - a)
              .map(([cat, pts]) => {
                const cfg = categoryConfig[cat]
                const pct = summary.total > 0 ? Math.round((pts / summary.total) * 100) : 0
                return (
                  <div key={cat}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-zinc-200/70">
                        <span>{cfg.icon}</span>
                        {cat}
                      </span>
                      <span className={`font-semibold ${cfg.text}`}>
                        {pts.toLocaleString()} pts
                        <span className="ml-1 text-zinc-200/40">({pct}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: cfg.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
