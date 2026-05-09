import { motion } from 'framer-motion'
import { Calculator, Leaf, Sparkles } from 'lucide-react'
import { fadeUp } from '../../animations/variants'

export function CalcHero() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-18">
      {/* Background radials */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_20%_40%,rgba(34,255,168,0.10),transparent_55%),radial-gradient(600px_circle_at_80%_20%,rgba(74,216,255,0.10),transparent_50%)]"
      />

      {/* Floating orbs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl"
        animate={{ x: [0, 28, -14, 0], y: [0, -16, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-60px] top-8 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl"
        animate={{ x: [0, -22, 26, 0], y: [0, 20, -14, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-200/80 ring-1 ring-white/10">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            AI-powered carbon analysis
            <span className="rounded-full bg-emerald-300/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-200 ring-1 ring-emerald-200/15">
              Free
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
          Calculate Your{' '}
          <span className="text-gradient">Carbon Footprint</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-zinc-200/70"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Answer a few questions about your lifestyle and get an instant estimate
          of your annual CO₂ emissions — with personalised tips to reduce them.
        </motion.p>

        {/* Stat chips */}
        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          {[
            { icon: <Calculator className="h-3.5 w-3.5" />, label: '4 categories' },
            { icon: <Leaf className="h-3.5 w-3.5 text-emerald-300" />, label: 'Instant results' },
            { icon: <Sparkles className="h-3.5 w-3.5 text-cyan-300" />, label: 'Eco tips included' },
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
