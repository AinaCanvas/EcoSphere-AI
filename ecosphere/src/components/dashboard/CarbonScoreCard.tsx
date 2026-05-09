import { motion, useInView } from 'framer-motion'
import { TrendingDown } from 'lucide-react'
import { useRef } from 'react'
import { carbonScore } from '../../data/dashboardData'
import { fadeUp } from '../../animations/variants'

const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function CircularProgress({ score }: { score: number }) {
  const ref = useRef<SVGCircleElement>(null)
  const inView = useInView(ref, { once: true })
  const pct = score / 100
  const offset = CIRCUMFERENCE * (1 - pct)

  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      <svg className="-rotate-90" width="140" height="140" viewBox="0 0 140 140">
        {/* Track */}
        <circle
          cx="70"
          cy="70"
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
        />
        {/* Progress */}
        <motion.circle
          ref={ref}
          cx="70"
          cy="70"
          r={RADIUS}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={inView ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22ffa8" />
            <stop offset="100%" stopColor="#4ad8ff" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center text */}
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-gradient">{score}</span>
        <span className="text-[10px] text-zinc-200/60 tracking-widest">SCORE</span>
      </div>

      {/* Glow pulse */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(34,255,168,0.15) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export function CarbonScoreCard() {
  return (
    <motion.div
      className="glass glow-ring relative overflow-hidden rounded-2xl p-6"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_circle_at_20%_50%,rgba(34,255,168,0.08),transparent_60%)]" />

      <p className="text-xs font-semibold tracking-[0.18em] text-emerald-200/70">
        DAILY CARBON SCORE
      </p>

      <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <CircularProgress score={carbonScore.score} />

        <div className="flex flex-col gap-4">
          {/* Weekly improvement */}
          <div className="flex items-center gap-2 rounded-xl bg-emerald-300/10 px-4 py-2.5 ring-1 ring-emerald-200/15">
            <TrendingDown className="h-4 w-4 text-emerald-300" />
            <div>
              <p className="text-xs text-zinc-200/60">Weekly Improvement</p>
              <p className="text-lg font-bold text-emerald-200">
                +{carbonScore.weeklyImprovement}%
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <p className="text-[10px] text-zinc-200/60">Today's CO₂</p>
              <p className="mt-1 text-base font-semibold text-zinc-50">
                {carbonScore.todayEmission} kg
              </p>
            </div>
            <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <p className="text-[10px] text-zinc-200/60">Daily Target</p>
              <p className="mt-1 text-base font-semibold text-zinc-50">
                {carbonScore.dailyTarget} kg
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="mb-1.5 flex justify-between text-[10px] text-zinc-200/60">
              <span>Progress to target</span>
              <span className="text-emerald-300">
                {Math.round((carbonScore.dailyTarget / carbonScore.todayEmission) * 100)}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-300 to-cyan-300"
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min((carbonScore.dailyTarget / carbonScore.todayEmission) * 100, 100)}%`,
                }}
                transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
