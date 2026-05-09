import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BarChart3, Leaf, Trophy, Users } from 'lucide-react'
import { useCountUp } from '../../hooks/useCountUp'
import { fadeUp } from '../../animations/variants'

interface StatsRowProps {
  stats: { totalUsers: number; avg: number; highest: number; totalCo2Saved: number }
}

function CountCard({
  icon,
  label,
  to,
  suffix,
  accent,
  index,
}: {
  icon: React.ReactNode
  label: string
  to: number
  suffix?: string
  accent: 'yellow' | 'emerald' | 'cyan' | 'violet'
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const val = useCountUp({ to, start: inView, durationMs: 1200 })

  const accentMap = {
    yellow:  { bg: 'bg-yellow-300/10 ring-yellow-200/20',  text: 'text-yellow-200',  glow: 'rgba(251,191,36,0.12)',  icon: 'text-yellow-200'  },
    emerald: { bg: 'bg-emerald-300/10 ring-emerald-200/20', text: 'text-emerald-200', glow: 'rgba(34,255,168,0.12)',  icon: 'text-emerald-200' },
    cyan:    { bg: 'bg-cyan-300/10 ring-cyan-200/20',       text: 'text-cyan-200',    glow: 'rgba(74,216,255,0.12)',  icon: 'text-cyan-200'    },
    violet:  { bg: 'bg-violet-300/10 ring-violet-200/20',   text: 'text-violet-200',  glow: 'rgba(192,132,252,0.12)', icon: 'text-violet-200'  },
  }
  const a = accentMap[accent]

  return (
    <motion.div
      ref={ref}
      className="glass glow-ring relative overflow-hidden rounded-2xl p-5"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(200px circle at 50% 0%, ${a.glow}, transparent 70%)` }}
      />
      <div className={`grid h-10 w-10 place-items-center rounded-xl ring-1 ${a.bg}`}>
        <span className={a.icon}>{icon}</span>
      </div>
      <p className={`mt-3 text-2xl font-bold ${a.text}`}>
        {val.toLocaleString()}{suffix}
      </p>
      <p className="mt-0.5 text-xs font-semibold text-zinc-50">{label}</p>
    </motion.div>
  )
}

export function CommunityStatsRow({ stats }: StatsRowProps) {
  return (
    <section>
      <div className="mb-4">
        <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">COMMUNITY STATS</p>
        <p className="mt-1 text-lg font-semibold text-zinc-50">Global Overview</p>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <CountCard icon={<Users className="h-5 w-5" />}    label="Active Users"       to={stats.totalUsers}    accent="yellow"  index={0} />
        <CountCard icon={<BarChart3 className="h-5 w-5" />} label="Average Eco Points" to={stats.avg}           accent="cyan"    index={1} />
        <CountCard icon={<Trophy className="h-5 w-5" />}   label="Highest Score"      to={stats.highest}       accent="violet"  index={2} />
        <CountCard icon={<Leaf className="h-5 w-5" />}     label="CO₂ Saved (kg)"     to={stats.totalCo2Saved} accent="emerald" index={3} suffix=" kg" />
      </div>
    </section>
  )
}
