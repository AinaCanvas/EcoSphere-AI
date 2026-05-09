import { motion } from 'framer-motion'
import { Bot, Sparkles, Zap } from 'lucide-react'
import { fadeUp } from '../../animations/variants'

export function AIHero() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-300/10 px-3 py-1 text-xs text-violet-200/90 ring-1 ring-violet-200/20">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by AI
            <span className="rounded-full bg-violet-300/10 px-2 py-0.5 text-[10px] font-semibold ring-1 ring-violet-200/15">
              Beta
            </span>
          </div>
        </motion.div>

        <motion.h1
          className="mt-5 text-balance text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          AI Sustainability{' '}
          <span className="bg-gradient-to-r from-violet-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            Advisor
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-zinc-400"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Get personalized weekly green action plans, carbon-saving tips, and
          AI-powered sustainability advice tailored to your lifestyle.
        </motion.p>

        {/* Feature chips */}
        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          {[
            { icon: <Bot className="h-3.5 w-3.5 text-violet-300" />, label: 'AI-powered insights' },
            { icon: <Zap className="h-3.5 w-3.5 text-emerald-300" />, label: 'Weekly action plans' },
            { icon: <Sparkles className="h-3.5 w-3.5 text-cyan-300" />, label: 'CO₂ savings tracker' },
          ].map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10"
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
