import { motion } from 'framer-motion'
import { Leaf, TrendingDown, Users } from 'lucide-react'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'
import { GLOBAL_AVG_WEEKLY_SAVING } from '../../utils/aiPlanner'
import { fadeUp } from '../../animations/variants'

interface CO2EstimatorProps {
  weeklyCo2: number
  monthlyCo2: number
  completedCount: number
  totalActions: number
}

function AnimatedNum({ to, decimals = 1 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const val = useCountUp({ to, start: inView, durationMs: 1000 })
  return <span ref={ref}>{val.toFixed(decimals)}</span>
}

export function CO2Estimator({ weeklyCo2, monthlyCo2, completedCount, totalActions }: CO2EstimatorProps) {
  const vsAvgPct = Math.round((weeklyCo2 / GLOBAL_AVG_WEEKLY_SAVING) * 100)
  const completedCo2 = weeklyCo2 * (completedCount / Math.max(totalActions, 1))

  const stats = [
    {
      icon: <TrendingDown className="h-5 w-5 text-emerald-300" />,
      label: 'Weekly CO₂ Savings',
      value: <><AnimatedNum to={weeklyCo2} /> kg</>,
      sub: 'if all actions completed',
      color: 'text-emerald-300',
      bg: 'bg-emerald-400/10',
      ring: 'ring-emerald-300/20',
      glow: 'rgba(34,255,168,0.15)',
    },
    {
      icon: <Leaf className="h-5 w-5 text-cyan-300" />,
      label: 'Monthly Projection',
      value: <><AnimatedNum to={monthlyCo2} /> kg</>,
      sub: '≈ planting 2 trees',
      color: 'text-cyan-300',
      bg: 'bg-cyan-400/10',
      ring: 'ring-cyan-300/20',
      glow: 'rgba(74,216,255,0.15)',
    },
    {
      icon: <Users className="h-5 w-5 text-violet-300" />,
      label: 'vs Average User',
      value: <><AnimatedNum to={vsAvgPct} decimals={0} />%</>,
      sub: `avg saves ${GLOBAL_AVG_WEEKLY_SAVING} kg/week`,
      color: 'text-violet-300',
      bg: 'bg-violet-400/10',
      ring: 'ring-violet-300/20',
      glow: 'rgba(139,92,246,0.15)',
    },
  ]

  return (
    <motion.div
      className="glass glow-ring rounded-2xl p-6"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={1}
    >
      <p className="mb-1 text-xs font-semibold tracking-widest text-zinc-500 uppercase">CO₂ Impact</p>
      <h3 className="mb-5 text-base font-bold text-zinc-50">Savings Estimator</h3>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`relative overflow-hidden rounded-xl p-4 ring-1 ${s.bg} ${s.ring}`}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-xl"
              style={{ background: `radial-gradient(circle at 30% 0%, ${s.glow}, transparent 60%)` }}
            />
            <div className={`mb-2 grid h-9 w-9 place-items-center rounded-xl ring-1 ${s.bg} ${s.ring}`}>
              {s.icon}
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-xs font-medium text-zinc-300">{s.label}</p>
            <p className="mt-0.5 text-[10px] text-zinc-600">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Progress toward weekly goal */}
      <div className="mt-5">
        <div className="mb-1.5 flex justify-between text-xs text-zinc-500">
          <span>Completed savings this week</span>
          <span className="text-emerald-400 font-medium">{completedCo2.toFixed(1)} kg</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/8">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
            animate={{ width: totalActions > 0 ? `${(completedCount / totalActions) * 100}%` : '0%' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>
        <p className="mt-1.5 text-[10px] text-zinc-600">
          {completedCount} of {totalActions} actions completed
        </p>
      </div>
    </motion.div>
  )
}
