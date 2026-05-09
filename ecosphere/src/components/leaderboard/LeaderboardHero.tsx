import { motion } from 'framer-motion'
import { Sparkles, Trophy, Users, Zap } from 'lucide-react'
import { fadeUp } from '../../animations/variants'
import { allUsers } from '../../data/leaderboardData'

export function LeaderboardHero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      {/* Radial bg */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_40%,rgba(251,191,36,0.08),transparent_55%),radial-gradient(700px_circle_at_85%_20%,rgba(34,255,168,0.08),transparent_50%),radial-gradient(500px_circle_at_55%_85%,rgba(192,132,252,0.07),transparent_55%)]"
      />
      {/* Floating orbs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-yellow-400/8 blur-3xl"
        animate={{ x: [0, 30, -15, 0], y: [0, -18, 22, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-80px] top-12 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl"
        animate={{ x: [0, -22, 26, 0], y: [0, 22, -14, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-300/10 px-3 py-1 text-xs text-yellow-200/90 ring-1 ring-yellow-200/20">
            <Trophy className="h-3.5 w-3.5" />
            Global eco rankings
            <span className="rounded-full bg-yellow-300/10 px-2 py-0.5 text-[10px] font-semibold ring-1 ring-yellow-200/15">
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
          Eco{' '}
          <span className="text-gradient">Leaderboard</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-zinc-200/65"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Top contributors making the biggest environmental impact. Compete,
          climb the ranks, and inspire your community to go greener.
        </motion.p>

        <motion.div
          className="mt-5 flex flex-wrap justify-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          {[
            { icon: <Users className="h-3.5 w-3.5" />, label: `${allUsers.length} active users` },
            { icon: <Zap className="h-3.5 w-3.5 text-yellow-300" />, label: '5 categories tracked' },
            { icon: <Sparkles className="h-3.5 w-3.5 text-violet-300" />, label: 'Weekly & monthly rankings' },
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
      </div>
    </section>
  )
}
