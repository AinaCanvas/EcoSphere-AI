import { AnimatePresence, motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { EcoAction } from '../../data/actionsData'
import { categoryConfig } from '../../data/actionsData'
import { scaleIn } from '../../animations/variants'

interface ActionCardProps {
  action: EcoAction
  index: number
  onRemove: (id: string) => void
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  d.setHours(0, 0, 0, 0)
  if (d.getTime() === today.getTime()) return 'Today'
  if (d.getTime() === yesterday.getTime()) return 'Yesterday'
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export function ActionCard({ action, index, onRemove }: ActionCardProps) {
  const cfg = categoryConfig[action.category]
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <motion.div
      layout
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.22 } }}
      custom={index % 8}
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
      className="glass group relative overflow-hidden rounded-2xl p-4 ring-1 ring-white/10 transition hover:ring-white/20"
    >
      {/* Category glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(280px circle at 50% 0%, ${cfg.glow}, transparent 70%)` }}
      />

      {/* Top row */}
      <div className="relative flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/5 text-2xl ring-1 ring-white/10">
            {action.icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-50 leading-snug">{action.title}</p>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${cfg.bg} ${cfg.ring} ${cfg.text}`}>
              {cfg.icon} {action.category}
            </span>
          </div>
        </div>

        {/* Points badge */}
        <motion.div
          className="flex shrink-0 flex-col items-end gap-1"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05 * (index % 8) + 0.2, type: 'spring' }}
        >
          <span className="rounded-xl bg-emerald-300/10 px-2.5 py-1 text-sm font-bold text-emerald-200 ring-1 ring-emerald-200/20">
            +{action.points}
          </span>
          <span className="text-[9px] text-zinc-200/40">pts</span>
        </motion.div>
      </div>

      {/* Notes */}
      {action.notes && (
        <p className="relative mt-2.5 text-[11px] leading-relaxed text-zinc-200/55 italic">
          "{action.notes}"
        </p>
      )}

      {/* Footer */}
      <div className="relative mt-3 flex items-center justify-between">
        <span className="text-[10px] text-zinc-200/40">
          {formatDate(action.date)} · {action.time}
        </span>

        {/* Delete */}
        <AnimatePresence mode="wait">
          {confirmDelete ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-1.5"
            >
              <span className="text-[10px] text-zinc-200/60">Remove?</span>
              <button
                onClick={() => onRemove(action.id)}
                className="rounded-lg bg-red-400/15 px-2 py-0.5 text-[10px] font-semibold text-red-300 ring-1 ring-red-300/20 transition hover:bg-red-400/25"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="rounded-lg bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/10"
              >
                No
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="delete-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDelete(true)}
              className="rounded-lg p-1.5 text-zinc-200/30 transition hover:bg-red-400/10 hover:text-red-300"
              aria-label="Remove action"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
