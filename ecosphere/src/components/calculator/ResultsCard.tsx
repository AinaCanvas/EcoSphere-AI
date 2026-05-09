import { motion, AnimatePresence } from 'framer-motion'
import { Download, Share2, X } from 'lucide-react'
import type { CalculationResult } from '../../utils/calculations'
import { impactConfig } from '../../data/calculatorDefaults'
import { ScoreMeter } from './ScoreMeter'
import { BreakdownChart } from './BreakdownChart'
import { EcoTipsSection } from './EcoTipsSection'
import { ComparisonSection } from './ComparisonSection'
import { GlowButton } from '../GlowButton'
import { useCountUp } from '../../hooks/useCountUp'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

function AnimatedNumber({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const val = useCountUp({ to, start: inView, durationMs: 1200 })
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  )
}

interface ResultsCardProps {
  result: CalculationResult
  onReset: () => void
}

export function ResultsCard({ result, onReset }: ResultsCardProps) {
  const cfg = impactConfig[result.impactLevel]

  const handleShare = () => {
    const text = `My carbon footprint is ${(result.totalKgPerYear / 1000).toFixed(1)}t CO₂/year — ${result.impactLevel} impact. Calculated with EcoSphere 🌍`
    if (navigator.share) {
      navigator.share({ title: 'My Carbon Footprint', text }).catch(() => {})
    } else {
      navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!')).catch(() => {})
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="results"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">
              YOUR RESULTS
            </p>
            <h2 className="mt-1 text-xl font-semibold text-zinc-50">
              Carbon Footprint Analysis
            </h2>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-2 text-xs text-zinc-200/70 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-zinc-50"
          >
            <X className="h-3.5 w-3.5" />
            Recalculate
          </button>
        </div>

        {/* Score + summary */}
        <div className="glass glow-ring relative overflow-hidden rounded-2xl p-6">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(600px circle at 50% 0%, ${cfg.glow}, transparent 60%)` }}
          />

          <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-start">
            {/* Meter */}
            <ScoreMeter result={result} />

            {/* Stats */}
            <div className="flex flex-1 flex-col gap-4 w-full">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  {
                    label: 'Annual CO₂',
                    value: <AnimatedNumber to={result.totalKgPerYear} />,
                    sub: 'kg per year',
                    color: cfg.text,
                    bg: `${cfg.bg} ${cfg.ring}`,
                  },
                  {
                    label: 'Monthly CO₂',
                    value: <AnimatedNumber to={result.totalKgPerMonth} />,
                    sub: 'kg per month',
                    color: 'text-cyan-200',
                    bg: 'bg-cyan-300/10 ring-1 ring-cyan-200/15',
                  },
                  {
                    label: 'Potential Saving',
                    value: <AnimatedNumber to={result.potentialSavingsKgPerYear} />,
                    sub: 'kg reducible/yr',
                    color: 'text-emerald-200',
                    bg: 'bg-emerald-300/10 ring-1 ring-emerald-200/15',
                  },
                ].map((stat) => (
                  <div key={stat.label} className={`rounded-xl p-4 ring-1 ${stat.bg}`}>
                    <p className="text-[10px] text-zinc-200/60">{stat.label}</p>
                    <p className={`mt-1 text-xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="mt-0.5 text-[10px] text-zinc-200/50">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar vs global avg */}
              <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="mb-2 flex justify-between text-xs text-zinc-200/60">
                  <span>vs Global Average ({(result.globalAvgKgPerYear / 1000).toFixed(0)}t)</span>
                  <span className={cfg.text}>
                    {Math.round((result.totalKgPerYear / result.globalAvgKgPerYear) * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, #22ffa8, ${cfg.color})` }}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min((result.totalKgPerYear / (result.globalAvgKgPerYear * 2)) * 100, 100)}%`,
                    }}
                    transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                <GlowButton variant="secondary" onClick={handleShare} className="gap-1.5">
                  <Share2 className="h-3.5 w-3.5" />
                  Share Results
                </GlowButton>
                <GlowButton variant="ghost" onClick={() => window.print()} className="gap-1.5">
                  <Download className="h-3.5 w-3.5" />
                  Save Report
                </GlowButton>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown chart */}
        <BreakdownChart result={result} />

        {/* Comparison */}
        <ComparisonSection result={result} />

        {/* Eco tips */}
        <EcoTipsSection result={result} />
      </motion.div>
    </AnimatePresence>
  )
}
