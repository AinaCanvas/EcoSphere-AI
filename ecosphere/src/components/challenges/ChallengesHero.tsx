import { motion } from 'framer-motion'
import { Globe, Sparkles, Users, Zap } from 'lucide-react'
import { communityStats } from '../../data/challengesData'
import { fadeUp } from '../../animations/variants'
import { useCountUp } from '../../hooks/useCountUp'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

function CountStat({ to, suffix = '', label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const val = useCountUp({ to, start: inView, durationMs: 1400 })
  const display = to >= 1000 ? `${(val / 1000).toFixed(val >= 100_000 ? 0 : 1)}K` : val.toString()
  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="text-2xl font-bold text-gradient sm:text-3xl">
        {display}{suffix}
      </span>
      <span className="text-[11px] text-zinc-200/55">{label}</span>
    </div>
  )
}

export function ChallengesHero() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-18">
      {/* Radial bg */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_40%,rgba(139,92,246,0.10),transparent_55%),radial-gradient(700px_circle_at_85%_20%,rgba(34,255,168,0.09),transparent_50%),radial-gradient(600px_circle_at_50%_90%,rgba(74,216,255,0.07),transparent_55%)]"
      />
      {/* Floating orbs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl"
        animate={{ x: [0, 30, -15, 0], y: [0, -18, 22, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-80px] top-12 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl"
        animate={{ x: [0, -22, 26, 0], y: [0, 22, -14, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-300/10 px-3 py-1 text-xs text-violet-200/90 ring-1 ring-violet-200/20">
            <Sparkles className="h-3.5 w-3.5" />
            Global sustainability movement
            <span className="rounded-full bg-violet-300/10 px-2 py-0.5 text-[10px] font-semibold ring-1 ring-violet-200/15">
              Live
            </span>
          </div>
        </motion.div>

        <motion.h1
          className="mt-5 text-balance text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Community{' '}
          <span className="text-gradient">Eco Challenges</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-zinc-200/65"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Join global sustainability challenges, track your impact, and make real
          environmental change — together.
        </motion.p>

        {/* Chips */}
        <motion.div
          className="mt-5 flex flex-wrap justify-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          {[
            { icon: <Users className="h-3.5 w-3.5" />, label: `${communityStats.totalParticipants.toLocaleString()} participants` },
            { icon: <Globe className="h-3.5 w-3.5 text-cyan-300" />, label: `${communityStats.countriesRepresented} countries` },
            { icon: <Zap className="h-3.5 w-3.5 text-emerald-300" />, label: `${communityStats.activeChallenges} active now` },
          ].map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-200/70 ring-1 ring-white/10"
            >
              {chip.icon}
              {chip.label}
            </span>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          {[
            { to: communityStats.totalParticipants, suffix: '+', label: 'Participants' },
            { to: communityStats.totalCo2ReducedTonnes, suffix: 't', label: 'CO₂ Reduced' },
            { to: communityStats.totalChallengesCompleted, suffix: '+', label: 'Completed' },
            { to: communityStats.treesEquivalent, suffix: '+', label: 'Trees Equiv.' },
          ].map((s) => (
            <div
              key={s.label}
              className="glass glow-ring rounded-2xl py-4"
            >
              <CountStat to={s.to} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
