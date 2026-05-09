import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Globe, Leaf, Target, Users, Zap } from 'lucide-react'
import { communityStats } from '../../data/challengesData'
import { useCountUp } from '../../hooks/useCountUp'
import { fadeUp } from '../../animations/variants'

function StatPill({
  icon,
  to,
  suffix,
  label,
  accent,
  index,
}: {
  icon: React.ReactNode
  to: number
  suffix?: string
  label: string
  accent: 'emerald' | 'cyan' | 'violet' | 'orange'
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const val = useCountUp({ to, start: inView, durationMs: 1400 })

  const display =
    to >= 100_000
      ? `${(val / 1000).toFixed(0)}K`
      : to >= 1_000
        ? `${(val / 1000).toFixed(1)}K`
        : val.toString()

  const accentMap = {
    emerald: { icon: 'text-emerald-200', bg: 'bg-emerald-300/10 ring-emerald-200/20', val: 'text-emerald-200' },
    cyan: { icon: 'text-cyan-200', bg: 'bg-cyan-300/10 ring-cyan-200/20', val: 'text-cyan-200' },
    violet: { icon: 'text-violet-200', bg: 'bg-violet-300/10 ring-violet-200/20', val: 'text-violet-200' },
    orange: { icon: 'text-orange-200', bg: 'bg-orange-300/10 ring-orange-200/20', val: 'text-orange-200' },
  }
  const a = accentMap[accent]

  return (
    <motion.div
      ref={ref}
      className="glass glow-ring flex flex-col items-center gap-2 rounded-2xl p-4 text-center"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={index}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <div className={`grid h-10 w-10 place-items-center rounded-xl ring-1 ${a.bg}`}>
        <span className={a.icon}>{icon}</span>
      </div>
      <p className={`text-xl font-bold ${a.val}`}>
        {display}{suffix}
      </p>
      <p className="text-[11px] text-zinc-200/55">{label}</p>
    </motion.div>
  )
}

export function CommunityStatsBar() {
  const stats = [
    { icon: <Users className="h-5 w-5" />, to: communityStats.totalParticipants, suffix: '+', label: 'Total Participants', accent: 'emerald' as const },
    { icon: <Leaf className="h-5 w-5" />, to: communityStats.totalCo2ReducedTonnes, suffix: 't', label: 'CO₂ Reduced', accent: 'cyan' as const },
    { icon: <Target className="h-5 w-5" />, to: communityStats.totalChallengesCompleted, suffix: '+', label: 'Challenges Done', accent: 'violet' as const },
    { icon: <Globe className="h-5 w-5" />, to: communityStats.countriesRepresented, label: 'Countries', accent: 'orange' as const },
    { icon: <Zap className="h-5 w-5" />, to: communityStats.treesEquivalent, suffix: '+', label: 'Trees Equivalent', accent: 'emerald' as const },
  ]

  return (
    <section>
      <div className="mb-4">
        <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">GLOBAL IMPACT</p>
        <p className="mt-1 text-lg font-semibold text-zinc-50">Community Statistics</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s, i) => (
          <StatPill key={s.label} {...s} index={i} />
        ))}
      </div>
    </section>
  )
}
