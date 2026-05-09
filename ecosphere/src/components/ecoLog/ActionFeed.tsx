import { AnimatePresence, motion } from 'framer-motion'
import { ListFilter } from 'lucide-react'
import type { EcoAction, FilterCategory } from '../../data/actionsData'
import { ActionCard } from './ActionCard'
import { ActionFilterBar } from './ActionFilterBar'
import { fadeUp } from '../../animations/variants'

interface ActionFeedProps {
  actions: EcoAction[]
  filter: FilterCategory
  search: string
  counts: Record<FilterCategory, number>
  onFilterChange: (f: FilterCategory) => void
  onSearchChange: (q: string) => void
  onRemove: (id: string) => void
}

// Group actions by date label
function groupByDate(actions: EcoAction[]): { label: string; items: EcoAction[] }[] {
  const map = new Map<string, EcoAction[]>()
  for (const a of actions) {
    const existing = map.get(a.date) ?? []
    existing.push(a)
    map.set(a.date, existing)
  }
  // Sort dates descending
  const sorted = [...map.entries()].sort(([a], [b]) => b.localeCompare(a))
  return sorted.map(([date, items]) => {
    const d = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    d.setHours(0, 0, 0, 0)
    let label: string
    if (d.getTime() === today.getTime()) label = 'Today'
    else if (d.getTime() === yesterday.getTime()) label = 'Yesterday'
    else label = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })
    return { label, items }
  })
}

export function ActionFeed({
  actions,
  filter,
  search,
  counts,
  onFilterChange,
  onSearchChange,
  onRemove,
}: ActionFeedProps) {
  const groups = groupByDate(actions)

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={0}
    >
      {/* Header + filters */}
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300/10 ring-1 ring-emerald-200/20">
            <ListFilter className="h-4 w-4 text-emerald-200" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">ACTION FEED</p>
            <p className="text-sm font-semibold text-zinc-50">
              Your Eco Activities
              <span className="ml-2 rounded-full bg-white/5 px-2 py-0.5 text-xs font-normal text-zinc-200/50 ring-1 ring-white/10">
                {actions.length}
              </span>
            </p>
          </div>
        </div>

        <ActionFilterBar
          filter={filter}
          search={search}
          counts={counts}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
        />
      </div>

      {/* Grouped feed */}
      {groups.length === 0 ? (
        <motion.div
          className="glass rounded-2xl py-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-4xl">🌱</p>
          <p className="mt-3 text-sm font-semibold text-zinc-50">No actions found</p>
          <p className="mt-1 text-xs text-zinc-200/50">
            {search ? 'Try a different search term.' : 'Log your first eco action above!'}
          </p>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-6">
          {groups.map(({ label, items }) => (
            <div key={label}>
              {/* Date divider */}
              <div className="mb-3 flex items-center gap-3">
                <span className="text-xs font-semibold text-zinc-200/50">{label}</span>
                <div className="flex-1 border-t border-white/5" />
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-200/40 ring-1 ring-white/8">
                  {items.reduce((s, a) => s + a.points, 0)} pts
                </span>
              </div>

              <motion.div
                layout
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {items.map((action, i) => (
                    <ActionCard
                      key={action.id}
                      action={action}
                      index={i}
                      onRemove={onRemove}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  )
}
