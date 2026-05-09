import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { greenActions } from '../../data/dashboardData'
import { type FilterKey, FilterButtons } from './FilterButtons'
import { fadeUp, scaleIn } from '../../animations/variants'

const statusStyles = {
  Completed:
    'bg-emerald-300/10 text-emerald-100 ring-1 ring-emerald-200/20',
  'In Progress':
    'bg-cyan-300/10 text-cyan-100 ring-1 ring-cyan-200/20',
  Pending:
    'bg-zinc-300/10 text-zinc-300 ring-1 ring-zinc-200/15',
}

function getInitialFilter(): FilterKey {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const f = params.get('filter') as FilterKey | null
    if (f && ['Energy', 'Recycling', 'Transport', 'Challenges'].includes(f)) return f
  }
  return 'All'
}

export function GreenActionLog() {
  const [filter, setFilter] = useState<FilterKey>(getInitialFilter)

  const filtered =
    filter === 'All'
      ? greenActions
      : greenActions.filter((a) => a.category === filter)

  return (
    <motion.section
      id="actions"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">
            GREEN ACTION LOG
          </p>
          <h2 className="mt-1 text-lg font-semibold text-zinc-50">
            Your Eco Activities
          </h2>
        </div>
        <FilterButtons active={filter} onChange={setFilter} />
      </div>

      <motion.div
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((action, i) => (
            <motion.div
              key={action.id}
              layout
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              custom={i}
              className="glass glow-ring group relative overflow-hidden rounded-2xl p-4 transition hover:ring-emerald-200/20"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(300px_circle_at_50%_0%,rgba(34,255,168,0.07),transparent_70%)]" />

              <div className="flex items-start justify-between gap-2">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 text-2xl ring-1 ring-white/10">
                  {action.icon}
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusStyles[action.status]}`}
                >
                  {action.status}
                </span>
              </div>

              <p className="mt-3 text-sm font-semibold text-zinc-50">
                {action.title}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-300/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-200 ring-1 ring-emerald-200/15">
                  +{action.points} pts
                </span>
                <span className="text-[10px] text-zinc-200/50">
                  {action.category}
                </span>
              </div>

              <p className="mt-2 text-[10px] text-zinc-200/50">
                {action.timestamp}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div
          className="glass rounded-2xl py-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-zinc-200/50">No actions found for this filter.</p>
        </motion.div>
      )}
    </motion.section>
  )
}
