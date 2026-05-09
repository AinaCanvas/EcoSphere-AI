import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Plus } from 'lucide-react'
import { useState } from 'react'
import { categoryConfig } from '../../data/actionsData'
import type { ActionCategory } from '../../data/actionsData'
import { type ActionFormState, defaultFormState } from '../../hooks/useEcoActions'
import { fadeUp } from '../../animations/variants'

const CATEGORIES: ActionCategory[] = ['Transport', 'Energy', 'Recycling', 'Water', 'Lifestyle']

const QUICK_ACTIONS: { title: string; category: ActionCategory; icon: string }[] = [
  { title: 'Cycled to Work', category: 'Transport', icon: '🚴' },
  { title: 'Used Public Transit', category: 'Transport', icon: '🚌' },
  { title: 'Sorted Recycling', category: 'Recycling', icon: '♻️' },
  { title: 'Shorter Shower', category: 'Water', icon: '💧' },
  { title: 'Turned Off Lights', category: 'Energy', icon: '💡' },
  { title: 'Plant-Based Meal', category: 'Lifestyle', icon: '🥗' },
]

interface ActionFormProps {
  onAdd: (action: Omit<import('../../data/actionsData').EcoAction, 'id'>) => void
}

export function ActionForm({ onAdd }: ActionFormProps) {
  const [form, setForm] = useState<ActionFormState>(defaultFormState)
  const [open, setOpen] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const cfg = categoryConfig[form.category]
  const autoPoints = cfg.defaultPoints
  const resolvedPoints = form.points ? parseInt(form.points, 10) : autoPoints

  const set = <K extends keyof ActionFormState>(k: K, v: ActionFormState[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }))

  const handleQuick = (q: (typeof QUICK_ACTIONS)[number]) => {
    setForm((prev) => ({
      ...prev,
      title: q.title,
      category: q.category,
      points: String(categoryConfig[q.category].defaultPoints),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onAdd({
      title: form.title.trim(),
      category: form.category,
      points: resolvedPoints,
      date: form.date,
      time: form.time,
      notes: form.notes.trim() || undefined,
      icon: cfg.icon,
    })
    setSubmitted(true)
    setTimeout(() => {
      setForm(defaultFormState())
      setSubmitted(false)
    }, 1200)
  }

  return (
    <motion.div
      className="glass glow-ring relative overflow-hidden rounded-2xl"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
    >
      {/* Top accent */}
      <div className="absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 opacity-70" />

      {/* Header toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-4"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300/10 ring-1 ring-emerald-200/20">
            <Plus className="h-4 w-4 text-emerald-200" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-zinc-50">Log New Action</p>
            <p className="text-[11px] text-zinc-200/50">Record a sustainable activity</p>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="h-4 w-4 text-zinc-200/60" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="form-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 px-6 pb-6 pt-4">
              {/* Quick actions */}
              <div className="mb-5">
                <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-zinc-200/50">
                  QUICK ADD
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_ACTIONS.map((q) => (
                    <button
                      key={q.title}
                      type="button"
                      onClick={() => handleQuick(q)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-1.5 text-xs text-zinc-200/70 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-zinc-50"
                    >
                      <span>{q.icon}</span>
                      {q.title}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs text-zinc-200/70">
                    Action Title <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) => set('title', e.target.value)}
                    placeholder="e.g. Cycled to work, Sorted recycling…"
                    required
                    className="h-10 w-full rounded-xl bg-[#05070C]/80 px-4 text-sm text-zinc-50 placeholder-zinc-200/30 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-emerald-300/40"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-1.5 block text-xs text-zinc-200/70">Category</label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={(e) => set('category', e.target.value as ActionCategory)}
                      className="h-10 w-full appearance-none rounded-xl bg-[#05070C]/80 px-4 pr-8 text-sm text-zinc-50 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-emerald-300/40"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {categoryConfig[c].icon} {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-200/50" />
                  </div>
                </div>

                {/* Points */}
                <div>
                  <label className="mb-1.5 flex items-center justify-between text-xs text-zinc-200/70">
                    <span>Eco Points</span>
                    <span className="text-zinc-200/40">auto: {autoPoints}</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={999}
                    value={form.points}
                    onChange={(e) => set('points', e.target.value)}
                    placeholder={String(autoPoints)}
                    className="h-10 w-full rounded-xl bg-[#05070C]/80 px-4 text-sm text-zinc-50 placeholder-zinc-200/30 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-emerald-300/40"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="mb-1.5 block text-xs text-zinc-200/70">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => set('date', e.target.value)}
                    className="h-10 w-full rounded-xl bg-[#05070C]/80 px-4 text-sm text-zinc-50 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-emerald-300/40 [color-scheme:dark]"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="mb-1.5 block text-xs text-zinc-200/70">Time</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => set('time', e.target.value)}
                    className="h-10 w-full rounded-xl bg-[#05070C]/80 px-4 text-sm text-zinc-50 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-emerald-300/40 [color-scheme:dark]"
                  />
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs text-zinc-200/70">
                    Notes <span className="text-zinc-200/40">(optional)</span>
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    placeholder="Any extra details about this action…"
                    rows={2}
                    className="w-full resize-none rounded-xl bg-[#05070C]/80 px-4 py-2.5 text-sm text-zinc-50 placeholder-zinc-200/30 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-emerald-300/40"
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center gap-3 sm:col-span-2">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-2 rounded-xl bg-emerald-400/15 px-5 py-2.5 text-sm font-semibold text-emerald-100 ring-1 ring-emerald-300/25"
                      >
                        ✓ Action logged! +{resolvedPoints} pts
                      </motion.div>
                    ) : (
                      <motion.button
                        key="submit"
                        type="submit"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileTap={{ scale: 0.97 }}
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-emerald-400/15 px-5 py-2.5 text-sm font-semibold text-emerald-100 ring-1 ring-emerald-300/25 transition hover:bg-emerald-400/22"
                      >
                        <Plus className="h-4 w-4" />
                        Log Action
                        <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle,rgba(34,255,168,0.35),transparent_60%)]" />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {/* Preview badge */}
                  <div className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold ring-1 ${cfg.bg} ${cfg.ring} ${cfg.text}`}>
                    <span>{cfg.icon}</span>
                    <span>+{resolvedPoints} pts</span>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
