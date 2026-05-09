import { AnimatePresence, motion } from 'framer-motion'
import { BookmarkCheck, CheckCircle2, Circle, Save } from 'lucide-react'
import type { SavedPlan } from '../../data/aiPrompts'
import { categoryConfig } from '../../data/aiPrompts'
import { fadeUp, staggerContainer } from '../../animations/variants'

interface WeeklyPlanCardProps {
  plan: SavedPlan
  onToggle: (actionId: string, completed: boolean) => void
  onSave: () => void
  saved: boolean
}

const difficultyStyle = {
  Easy:   'bg-emerald-400/10 text-emerald-300 ring-emerald-300/20',
  Medium: 'bg-yellow-400/10  text-yellow-300  ring-yellow-300/20',
  Hard:   'bg-red-400/10     text-red-300     ring-red-300/20',
}

export function WeeklyPlanCard({ plan, onToggle, onSave, saved }: WeeklyPlanCardProps) {
  const completedCount = plan.actions.filter((a) => a.completed).length
  const pct = Math.round((completedCount / plan.actions.length) * 100)

  return (
    <motion.div
      className="glass glow-ring overflow-hidden rounded-2xl"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
    >
      {/* Top accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-violet-400 via-emerald-400 to-cyan-400 opacity-70" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-6 py-5">
        <div>
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">Weekly Plan</p>
          <h3 className="mt-1 text-lg font-bold text-zinc-50">Your Green Action Plan</h3>
          <p className="mt-0.5 text-xs text-zinc-500">
            Generated {new Date(plan.createdAt).toLocaleDateString()} ·{' '}
            {plan.actions.length} actions
          </p>
        </div>
        <button
          onClick={onSave}
          disabled={saved}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold ring-1 transition focus:outline-none ${
            saved
              ? 'bg-emerald-400/10 text-emerald-300 ring-emerald-300/20 cursor-default'
              : 'bg-white/5 text-zinc-400 ring-white/10 hover:bg-violet-400/10 hover:text-violet-300 hover:ring-violet-300/20'
          }`}
        >
          {saved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
          {saved ? 'Saved' : 'Save Plan'}
        </button>
      </div>

      {/* Progress */}
      <div className="px-6 pb-4">
        <div className="mb-1.5 flex justify-between text-xs text-zinc-500">
          <span>{completedCount} / {plan.actions.length} completed</span>
          <span className="text-emerald-400 font-medium">{pct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/8">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-400 to-emerald-400"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Actions list */}
      <motion.div
        className="flex flex-col divide-y divide-white/5"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {plan.actions.map((action, i) => {
            const cat = categoryConfig[action.category]
            return (
              <motion.div
                key={action.id}
                variants={fadeUp}
                custom={i}
                className={`flex items-start gap-4 px-6 py-4 transition-colors ${
                  action.completed ? 'opacity-60' : ''
                }`}
              >
                {/* Checkbox */}
                <button
                  onClick={() => onToggle(action.id, !action.completed)}
                  className="mt-0.5 shrink-0 focus:outline-none"
                  aria-label={action.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {action.completed
                    ? <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    : <Circle className="h-5 w-5 text-zinc-600 hover:text-zinc-400 transition" />
                  }
                </button>

                {/* Icon */}
                <span className="mt-0.5 text-xl">{action.icon}</span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className={`text-sm font-semibold ${action.completed ? 'line-through text-zinc-500' : 'text-zinc-100'}`}>
                      {action.title}
                    </p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${difficultyStyle[action.difficulty]}`}>
                      {action.difficulty}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed">{action.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${cat.bg} ${cat.color} ${cat.ring}`}>
                      {cat.icon} {action.category}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium">
                      −{action.co2SavedKg} kg CO₂
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
