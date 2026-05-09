import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Flame, Star, Users } from 'lucide-react'
import type { Challenge } from '../../data/challengesData'
import { fadeUp } from '../../animations/variants'

interface FeaturedChallengeProps {
  challenge: Challenge & { isJoined: boolean; displayParticipants: number }
  onToggle: (id: string) => void
}

export function FeaturedChallenge({ challenge: c, onToggle }: FeaturedChallengeProps) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={0}
    >
      <div className="mb-4 flex items-center gap-2">
        <Star className="h-4 w-4 text-yellow-300" />
        <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">
          FEATURED CHALLENGE
        </p>
      </div>

      <div
        className={`relative overflow-hidden rounded-3xl p-6 ring-1 sm:p-8 ${
          c.isJoined
            ? 'ring-emerald-300/40 shadow-[0_0_60px_rgba(34,255,168,0.10)]'
            : 'ring-violet-300/25 shadow-[0_0_60px_rgba(139,92,246,0.08)]'
        }`}
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(14px)',
        }}
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: c.isJoined
              ? 'radial-gradient(800px circle at 20% 50%, rgba(34,255,168,0.10), transparent 55%), radial-gradient(600px circle at 80% 20%, rgba(74,216,255,0.08), transparent 50%)'
              : 'radial-gradient(800px circle at 20% 50%, rgba(139,92,246,0.10), transparent 55%), radial-gradient(600px circle at 80% 20%, rgba(34,255,168,0.08), transparent 50%)',
          }}
        />

        {/* Animated border glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            boxShadow: c.isJoined
              ? '0 0 0 1px rgba(34,255,168,0.3), 0 0 40px rgba(34,255,168,0.08)'
              : '0 0 0 1px rgba(139,92,246,0.25), 0 0 40px rgba(139,92,246,0.06)',
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto]">
          {/* Left content */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-300/10 px-3 py-1 text-xs font-semibold text-yellow-200 ring-1 ring-yellow-200/20">
                <Flame className="h-3.5 w-3.5" />
                Featured
              </span>
              <span className="rounded-full bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-200 ring-1 ring-violet-200/20">
                {c.status}
              </span>
              <span className="rounded-full bg-fuchsia-300/10 px-3 py-1 text-xs font-semibold text-fuchsia-200 ring-1 ring-fuchsia-200/20">
                {c.difficulty}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-5xl">{c.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-zinc-50 sm:text-3xl">{c.title}</h2>
                <p className="mt-1 text-sm text-zinc-200/60">{c.category} · {c.durationDays} days</p>
              </div>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-200/70">
              {c.longDescription}
            </p>

            {/* Motivational quote */}
            <blockquote className="mt-4 border-l-2 border-violet-400/40 pl-4 text-sm italic text-zinc-200/55">
              "{c.motivationalQuote}"
            </blockquote>

            {/* Stats row */}
            <div className="mt-6 flex flex-wrap gap-4">
              {[
                { icon: <Users className="h-4 w-4" />, value: c.displayParticipants.toLocaleString(), label: 'participants' },
                { icon: <Clock className="h-4 w-4" />, value: `${c.endsInDays}d`, label: 'remaining' },
                { icon: <span className="text-base">🌍</span>, value: `${c.co2SavedKg} kg`, label: 'CO₂ saved/person' },
                { icon: <span className="text-base">⚡</span>, value: `+${c.ecoPoints}`, label: 'eco points' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
                  <span className="text-zinc-200/60">{s.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-zinc-50">{s.value}</p>
                    <p className="text-[10px] text-zinc-200/50">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: progress + CTA */}
          <div className="flex flex-col items-center justify-center gap-5 lg:min-w-[200px]">
            {/* Circular progress */}
            <div className="relative flex h-36 w-36 items-center justify-center">
              <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
                <circle cx="72" cy="72" r="58" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                <motion.circle
                  cx="72" cy="72" r="58"
                  fill="none"
                  stroke="url(#featGrad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 58}
                  initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
                  whileInView={{
                    strokeDashoffset: 2 * Math.PI * 58 * (1 - c.communityProgress / 100),
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                />
                <defs>
                  <linearGradient id="featGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#22ffa8" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-gradient">{c.communityProgress}%</span>
                <span className="text-[10px] text-zinc-200/50">complete</span>
              </div>
            </div>

            {/* CTA */}
            <AnimatePresence mode="wait">
              {c.isJoined ? (
                <motion.button
                  key="leave"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => onToggle(c.id)}
                  className="w-full rounded-xl bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-300 ring-1 ring-white/15 transition hover:bg-red-400/10 hover:text-red-300 hover:ring-red-300/20"
                >
                  ✓ Joined — Leave
                </motion.button>
              ) : (
                <motion.button
                  key="join"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => onToggle(c.id)}
                  className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-500/20 to-emerald-500/20 px-6 py-3 text-sm font-semibold text-zinc-50 ring-1 ring-violet-300/25 transition hover:ring-violet-300/40"
                >
                  <span className="relative">🚀 Join Featured Challenge</span>
                  <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover/btn:opacity-100 bg-[radial-gradient(circle,rgba(139,92,246,0.4),transparent_60%)]" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
