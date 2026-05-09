import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { CalculationResult } from '../../utils/calculations'
import { impactConfig } from '../../data/calculatorDefaults'

const RADIUS = 70
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface ScoreMeterProps {
  result: CalculationResult
}

export function ScoreMeter({ result }: ScoreMeterProps) {
  const ref = useRef<SVGCircleElement>(null)
  const inView = useInView(ref, { once: true })
  const cfg = impactConfig[result.impactLevel]

  // Arc covers 75% of circle (270°) for a gauge look
  const arcFraction = 0.75
  const arcLength = CIRCUMFERENCE * arcFraction
  const filledLength = arcLength * (result.impactScore / 100)
  // Rotate so arc starts at bottom-left (-225deg)
  const rotation = -225

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-52 w-52 items-center justify-center">
        <svg width="208" height="208" viewBox="0 0 208 208" style={{ transform: `rotate(${rotation}deg)` }}>
          {/* Track */}
          <circle
            cx="104" cy="104" r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="12"
            strokeDasharray={`${arcLength} ${CIRCUMFERENCE}`}
            strokeLinecap="round"
          />
          {/* Progress */}
          <motion.circle
            ref={ref}
            cx="104" cy="104" r={RADIUS}
            fill="none"
            stroke={`url(#meterGrad-${result.impactLevel})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${CIRCUMFERENCE}`}
            initial={{ strokeDashoffset: arcLength }}
            animate={inView ? { strokeDashoffset: arcLength - filledLength } : {}}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id={`meterGrad-${result.impactLevel}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22ffa8" />
              <stop offset="50%" stopColor={cfg.color} />
              <stop offset="100%" stopColor={cfg.color} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute flex flex-col items-center gap-0.5" style={{ transform: 'rotate(0deg)' }}>
          <span className="text-3xl">{cfg.emoji}</span>
          <motion.span
            className="text-3xl font-bold text-gradient"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
          >
            {result.impactScore}
          </motion.span>
          <span className="text-[10px] tracking-widest text-zinc-200/50">IMPACT</span>
        </div>

        {/* Glow pulse */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 65%)` }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Impact badge */}
      <div className={`flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ${cfg.bg} ${cfg.ring}`}>
        <span className={`text-sm font-bold ${cfg.text}`}>{cfg.label}</span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${cfg.bg} ${cfg.ring} ${cfg.text}`}>
          {result.impactLevel}
        </span>
      </div>

      <p className="max-w-xs text-center text-xs text-zinc-200/60">{cfg.description}</p>
    </div>
  )
}
