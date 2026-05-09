import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import { fadeUp, staggerContainer } from '../../animations/variants'

const TIPS = [
  { icon: '🚌', title: 'Switch to public transport twice a week', saving: '4.2 kg CO₂/week', category: 'Transport', color: 'text-cyan-300 bg-cyan-400/10 ring-cyan-300/20' },
  { icon: '🥗', title: 'Reduce meat consumption 2 days/week', saving: '3.0 kg CO₂/week', category: 'Diet', color: 'text-emerald-300 bg-emerald-400/10 ring-emerald-300/20' },
  { icon: '💡', title: 'Replace all bulbs with LED lighting', saving: '2.4 kg CO₂/week', category: 'Energy', color: 'text-yellow-300 bg-yellow-400/10 ring-yellow-300/20' },
  { icon: '🛍️', title: 'Eliminate single-use plastic daily', saving: '0.8 kg CO₂/week', category: 'Lifestyle', color: 'text-purple-300 bg-purple-400/10 ring-purple-300/20' },
  { icon: '🔌', title: 'Unplug idle electronics every night', saving: '1.8 kg CO₂/week', category: 'Energy', color: 'text-yellow-300 bg-yellow-400/10 ring-yellow-300/20' },
  { icon: '🚴', title: 'Cycle for trips under 3 km', saving: '1.8 kg CO₂/week', category: 'Transport', color: 'text-cyan-300 bg-cyan-400/10 ring-cyan-300/20' },
]

export function SuggestedImprovements() {
  return (
    <motion.div
      className="glass glow-ring rounded-2xl p-6"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={2}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-400/10 ring-1 ring-violet-300/20">
          <Lightbulb className="h-4 w-4 text-violet-300" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">AI Suggestions</p>
          <h3 className="text-base font-bold text-zinc-50">Suggested Improvements</h3>
        </div>
      </div>

      <motion.div
        className="grid gap-3 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {TIPS.map((tip, i) => (
          <motion.div
            key={tip.title}
            variants={fadeUp}
            custom={i}
            whileHover={{ scale: 1.01 }}
            className="flex items-start gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/8 transition"
          >
            <span className="mt-0.5 text-xl">{tip.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-200 leading-snug">{tip.title}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${tip.color}`}>
                  {tip.category}
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">{tip.saving}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
