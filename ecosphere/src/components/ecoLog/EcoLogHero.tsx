import { motion } from 'framer-motion'
import { BookOpen, Sparkles, Zap } from 'lucide-react'
import { fadeUp } from '../../animations/variants'

export function EcoLogHero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      {/* Radial bg */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_10%_40%,rgba(34,255,168,0.09),transparent_55%),radial-gradient(600px_circle_at_90%_20%,rgba(74,216,255,0.08),transparent_50%),radial-gradient(500px_circle_at_60%_90%,rgba(192,132,252,0.07),transparent_55%)]"
      />
      {/* Floating orbs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-6 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl"
        animate={{ x: [0, 28, -14, 0], y: [0, -16, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-60px] top-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"
        animate={{ x: [0, -20, 24, 0], y: [0, 20, -12, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200/90 ring-1 ring-emerald-200/20">
            <Sparkles className="h-3.5 w-3.5" />
            Gamified sustainability tracking
          </div>
        </motion.div>

        <motion.h1
          className="mt-5 text-balance text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Eco-Action{' '}
          <span className="text-gradient">Log</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-zinc-200/65"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Track your daily sustainable activities, earn eco points, and unlock
          achievement badges as your impact grows.
        </motion.p>

        <motion.div
          className="mt-5 flex flex-wrap justify-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          {[
            { icon: <BookOpen className="h-3.5 w-3.5" />, label: 'Log any eco action' },
            { icon: <Zap className="h-3.5 w-3.5 text-yellow-300" />, label: 'Earn points instantly' },
            { icon: <Sparkles className="h-3.5 w-3.5 text-violet-300" />, label: 'Unlock badges' },
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
