import { motion, useInView } from 'framer-motion'
import { BarChart3, Trophy, Trees, Users } from 'lucide-react'
import { useMemo, useRef } from 'react'
import { useCountUp } from '../hooks/useCountUp'
import { Container } from './Container'
import { GlassCard } from './GlassCard'

type Stat = {
  icon: React.ReactNode
  to: number
  prefix?: string
  suffix?: string
  label: string
  accent: 'emerald' | 'cyan'
}

function formatCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`
  return new Intl.NumberFormat().format(n)
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { margin: '-80px', once: true })
  const value = useCountUp({ to: stat.to, start: inView, durationMs: 1000 })

  const accentClass =
    stat.accent === 'emerald'
      ? 'from-emerald-300/20 to-emerald-100/0 ring-emerald-200/15 text-emerald-200'
      : 'from-cyan-300/20 to-cyan-100/0 ring-cyan-200/15 text-cyan-200'

  const display = useMemo(() => formatCompact(value), [value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, delay: 0.06 * index, ease: 'easeOut' }}
    >
      <GlassCard className="relative overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accentClass} opacity-80`}
          aria-hidden="true"
        />
        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
              {stat.icon}
            </div>
            <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-zinc-200/70 ring-1 ring-white/10">
              Live
            </span>
          </div>

          <p className="mt-5 text-3xl font-semibold tracking-tight text-zinc-50">
            {stat.prefix}
            <span className="text-gradient">{display}</span>
            {stat.suffix}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-200/75">
            {stat.label}
          </p>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export function ImpactStats() {
  const stats: Stat[] = [
    {
      icon: <BarChart3 className="h-5 w-5 text-emerald-200" />,
      to: 1_200_000,
      suffix: ' kg',
      label: 'CO₂ tracked across the EcoSphere community',
      accent: 'emerald',
    },
    {
      icon: <Trophy className="h-5 w-5 text-cyan-200" />,
      to: 50_000,
      label: 'Eco challenges completed with verified streaks',
      accent: 'cyan',
    },
    {
      icon: <Trees className="h-5 w-5 text-emerald-200" />,
      to: 10_000,
      label: 'Trees planted through partner missions',
      accent: 'emerald',
    },
    {
      icon: <Users className="h-5 w-5 text-cyan-200" />,
      to: 85,
      suffix: '%',
      label: 'Community engagement rate across weekly goals',
      accent: 'cyan',
    },
  ]

  return (
    <section className="relative py-14 sm:py-18">
      <Container>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}

