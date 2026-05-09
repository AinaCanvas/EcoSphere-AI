import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import type { CalculationResult } from '../../utils/calculations'
import { scaleIn } from '../../animations/variants'

const priorityStyles = {
  high: 'bg-emerald-300/10 text-emerald-200 ring-1 ring-emerald-200/20',
  medium: 'bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-200/20',
  low: 'bg-zinc-300/10 text-zinc-300 ring-1 ring-zinc-200/15',
}

const priorityLabel = {
  high: 'High Impact',
  medium: 'Medium Impact',
  low: 'Low Impact',
}

interface EcoTipsSectionProps {
  result: CalculationResult
}

export function EcoTipsSection({ result }: EcoTipsSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300/10 ring-1 ring-emerald-200/20">
          <Leaf className="h-4 w-4 text-emerald-200" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] text-zinc-200/60">
            PERSONALISED TIPS
          </p>
          <p className="text-sm font-semibold text-zinc-50">
            How to reduce your footprint
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {result.tips.map((tip, i) => (
          <motion.div
            key={tip.id}
            variants={scaleIn}
            custom={i}
            className="glass glow-ring group relative overflow-hidden rounded-2xl p-4 transition hover:ring-emerald-200/20"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            {/* Hover glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(250px_circle_at_50%_0%,rgba(34,255,168,0.07),transparent_70%)]" />

            <div className="flex items-start justify-between gap-2">
              <span className="text-2xl">{tip.icon}</span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${priorityStyles[tip.priority]}`}>
                {priorityLabel[tip.priority]}
              </span>
            </div>

            <p className="mt-3 text-sm font-semibold text-zinc-50">{tip.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-200/60">
              {tip.description}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-300/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-200 ring-1 ring-emerald-200/15">
                💚 Save ~{tip.savingKgPerYear.toLocaleString()} kg/yr
              </span>
              <span className="text-[10px] text-zinc-200/40">{tip.category}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
