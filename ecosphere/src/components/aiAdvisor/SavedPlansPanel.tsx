import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import type { SavedPlan } from '../../data/aiPrompts'
import { fadeUp } from '../../animations/variants'

interface SavedPlansPanelProps {
  plans: SavedPlan[]
  onLoad: (plan: SavedPlan) => void
}

export function SavedPlansPanel({ plans, onLoad }: SavedPlansPanelProps) {
  const [open, setOpen] = useState(false)

  if (plans.length === 0) return null

  return (
    <motion.div
      className="glass glow-ring overflow-hidden rounded-2xl"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={3}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-4 focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/10 ring-1 ring-emerald-300/20">
            <BookOpen className="h-4 w-4 text-emerald-300" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-zinc-50">Saved Plans</p>
            <p className="text-[11px] text-zinc-500">{plans.length} plan{plans.length !== 1 ? 's' : ''} saved</p>
          </div>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-zinc-500" /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 px-6 pb-5 pt-4 flex flex-col gap-3">
              {plans.map((plan) => {
                const completed = plan.actions.filter((a) => a.completed).length
                return (
                  <div
                    key={plan.id}
                    className="flex items-center justify-between gap-4 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/8"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        {new Date(plan.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {plan.actions.length} actions · {completed} completed · {plan.totalCo2Saved.toFixed(1)} kg CO₂
                      </p>
                    </div>
                    <button
                      onClick={() => onLoad(plan)}
                      className="rounded-xl bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-300 ring-1 ring-violet-300/20 transition hover:bg-violet-400/20 focus:outline-none"
                    >
                      Load
                    </button>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
