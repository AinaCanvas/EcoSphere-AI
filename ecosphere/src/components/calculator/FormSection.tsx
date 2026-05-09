import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'

interface FormSectionProps {
  index: number
  icon: ReactNode
  title: string
  subtitle: string
  children: ReactNode
  accentColor?: 'emerald' | 'cyan' | 'violet' | 'orange'
}

const accentMap = {
  emerald: {
    iconBg: 'bg-emerald-300/10 ring-emerald-200/20',
    iconText: 'text-emerald-200',
    badge: 'bg-emerald-300/10 text-emerald-200 ring-emerald-200/15',
    bar: 'from-emerald-300 to-emerald-200',
  },
  cyan: {
    iconBg: 'bg-cyan-300/10 ring-cyan-200/20',
    iconText: 'text-cyan-200',
    badge: 'bg-cyan-300/10 text-cyan-200 ring-cyan-200/15',
    bar: 'from-cyan-300 to-cyan-200',
  },
  violet: {
    iconBg: 'bg-violet-300/10 ring-violet-200/20',
    iconText: 'text-violet-200',
    badge: 'bg-violet-300/10 text-violet-200 ring-violet-200/15',
    bar: 'from-violet-300 to-violet-200',
  },
  orange: {
    iconBg: 'bg-orange-300/10 ring-orange-200/20',
    iconText: 'text-orange-200',
    badge: 'bg-orange-300/10 text-orange-200 ring-orange-200/15',
    bar: 'from-orange-300 to-orange-200',
  },
}

export function FormSection({
  index,
  icon,
  title,
  subtitle,
  children,
  accentColor = 'emerald',
}: FormSectionProps) {
  const accent = accentMap[accentColor]

  return (
    <motion.div
      className="glass glow-ring relative overflow-hidden rounded-2xl p-6"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={index}
    >
      {/* Top accent bar */}
      <div className={`absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r ${accent.bar} opacity-60`} />

      <div className="mb-5 flex items-start gap-3">
        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ring-1 ${accent.iconBg}`}>
          <span className={accent.iconText}>{icon}</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-50">{title}</h3>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${accent.badge}`}>
              0{index + 1}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-zinc-200/55">{subtitle}</p>
        </div>
      </div>

      {children}
    </motion.div>
  )
}
