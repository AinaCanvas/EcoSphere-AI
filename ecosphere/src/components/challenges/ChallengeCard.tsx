import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Users } from 'lucide-react'
import type { Challenge } from '../../data/challengesData'
import { scaleIn } from '../../animations/variants'

const difficultyStyles = {
  Easy: 'bg-emerald-300/10 text-emerald-100 ring-1 ring-emerald-200/20',
  Medium: 'bg-cyan-300/10 text-cyan-100 ring-1 ring-cyan-200/20',
  Hard: 'bg-fuchsia-300/10 text-fuchsia-100 ring-1 ring-fuchsia-200/20',
}

const statusStyles = {
  Active: 'bg-emerald-300/10 text-emerald-200 ring-1 ring-emerald-200/15',
  Popular: 'bg-violet-300/10 text-violet-200 ring-1 ring-violet-200/15',
  Completed: 'bg-zinc-300/10 text-zinc-400 ring-1 ring-zinc-200/10',
}

const categoryColors: Record<string, string> = {
  Transport: 'text-cyan-300',
  Energy: 'text-yellow-300',
  Diet: 'text-emerald-300',
  Recycling: 'text-teal-300',
  Nature: 'text-green-300',
  Lifestyle: 'text-violet-300',
}

interface ChallengeCardProps {
  challenge: Challenge & { isJoined: boolean; displayParticipants: number }
  index: number
  onToggle: (id: string) => void
}

export function ChallengeCard({ challenge: c, index, onToggle }: ChallengeCardProps) {
  const catColor = categoryColors[c.category] ?? 'text-zinc-300'

  return (
    <motion.div
      layout
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      custom={index}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`glass group relative flex flex-col overflow-hidden rounded-2xl p-5 ring-1 transition ${
        c.isJoined
          ? 'ring-emerald-300/30 shadow-[0_0_24px_rgba(34,255,168,0.08)]'
          : 'ring-white/10 hover:ring-white/20'
      }`}
    >
      {/* Hover / joined glow */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${c.isJoined ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        style={{
          background:
            'radial-gradient(350px circle at 50% 0%, rgba(34,255,168,0.06), transparent 70%)',
        }}
      />

      {/* Top row */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/5 text-2xl ring-1 ring-white/10">
            {c.icon}
          </div>
          <div>
            <p className="text-sm font-semibold leading-snug text-zinc-50">{c.title}</p>
            <p className={`mt-0.5 text-[10px] font-semibold ${catColor}`}>{c.category}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${difficultyStyles[c.difficulty]}`}>
            {c.difficulty}
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusStyles[c.status]}`}>
            {c.status}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="relative mt-3 text-xs leading-relaxed text-zinc-200/60">{c.description}</p>

      {/* Meta row */}
      <div className="relative mt-3 flex flex-wrap items-center gap-3 text-[11px] text-zinc-200/50">
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          {c.displayParticipants.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {c.durationDays}d
        </span>
        {c.status !== 'Completed' && c.endsInDays > 0 && (
          <span className="rounded-full bg-white/5 px-2 py-0.5 ring-1 ring-white/10">
            {c.endsInDays}d left
          </span>
        )}
        <span className="ml-auto rounded-full bg-emerald-300/10 px-2 py-0.5 text-emerald-200 ring-1 ring-emerald-200/15">
          +{c.ecoPoints} pts
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative mt-4">
        <div className="mb-1.5 flex justify-between text-[10px] text-zinc-200/50">
          <span>Community progress</span>
          <span className="font-semibold text-emerald-300">{c.communityProgress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
            initial={{ width: 0 }}
            whileInView={{ width: `${c.communityProgress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.05 * index, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* CO₂ saving */}
      <div className="relative mt-3 flex items-center gap-1.5 text-[10px] text-zinc-200/50">
        <span>🌍</span>
        <span>~{c.co2SavedKg} kg CO₂ saved per participant</span>
      </div>

      {/* Join / Leave button */}
      <div className="relative mt-4 flex-1 flex items-end">
        <AnimatePresence mode="wait">
          {c.status === 'Completed' ? (
            <div
              key="completed"
              className="w-full rounded-xl bg-zinc-300/5 py-2 text-center text-xs font-semibold text-zinc-400 ring-1 ring-zinc-200/10"
            >
              ✓ Challenge Completed
            </div>
          ) : c.isJoined ? (
            <motion.button
              key="leave"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => onToggle(c.id)}
              className="w-full rounded-xl bg-white/5 py-2 text-xs font-semibold text-zinc-300 ring-1 ring-white/15 transition hover:bg-red-400/10 hover:text-red-300 hover:ring-red-300/20"
            >
              ✓ Joined — Leave Challenge
            </motion.button>
          ) : (
            <motion.button
              key="join"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => onToggle(c.id)}
              className="group/btn relative w-full overflow-hidden rounded-xl bg-emerald-400/10 py-2 text-xs font-semibold text-emerald-100 ring-1 ring-emerald-300/20 transition hover:bg-emerald-400/20"
            >
              <span className="relative">Join Challenge →</span>
              <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-lg transition-opacity duration-300 group-hover/btn:opacity-100 bg-[radial-gradient(circle,rgba(34,255,168,0.3),transparent_60%)]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
