import { motion } from 'framer-motion'
import { Flame, Star } from 'lucide-react'
import type { RankedUser } from '../../utils/rankingUtils'
import { badgeConfig } from '../../data/leaderboardData'
import { getNextBadgeInfo } from '../../utils/rankingUtils'
import { fadeUp } from '../../animations/variants'

interface YouCardProps {
  you: RankedUser
  totalUsers: number
}

export function YouCard({ you, totalUsers }: YouCardProps) {
  const bc = badgeConfig[you.badge]
  const next = getNextBadgeInfo(you.overall)
  const topPct = Math.round(((totalUsers - you.rank + 1) / totalUsers) * 100)

  const motivational =
    you.rank <= 3
      ? "You're on the podium! Keep it up 🏆"
      : you.rank <= 10
        ? "You're in the top 10 — push for the podium! 🚀"
        : you.rank <= 20
          ? "Great progress! A few more actions to climb higher 🌱"
          : "Every action counts — keep logging your impact! 💪"

  return (
    <motion.div
      className="glass relative overflow-hidden rounded-2xl p-6 ring-1 ring-emerald-300/25 shadow-[0_0_40px_rgba(34,255,168,0.07)]"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={0}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(600px circle at 20% 30%, rgba(34,255,168,0.08), transparent 55%), radial-gradient(400px circle at 80% 70%, rgba(74,216,255,0.06), transparent 55%)',
        }}
      />

      {/* Animated border pulse */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ boxShadow: '0 0 0 1px rgba(34,255,168,0.25)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <Star className="h-4 w-4 text-emerald-300" />
          <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">YOUR POSITION</p>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {/* Left: avatar + rank */}
          <div className="flex flex-col items-center gap-3">
            {/* Rank badge */}
            <div className="relative">
              <div
                className={`grid h-16 w-16 place-items-center rounded-2xl text-xl font-bold ring-2 ${bc.bg} ${bc.ring} ${bc.text}`}
              >
                {you.avatar}
              </div>
              <motion.div
                className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-emerald-400 text-[10px] font-bold text-[#070A0F]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                #{you.rank}
              </motion.div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-zinc-50">{you.name}</p>
              <p className="text-[10px] text-zinc-200/50">{you.flag} {you.country}</p>
            </div>
          </div>

          {/* Right: stats */}
          <div className="flex flex-1 flex-col gap-4">
            {/* Stat row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Eco Points', value: you.score.toLocaleString(), color: bc.text, bg: `${bc.bg} ${bc.ring}` },
                { label: 'Top %', value: `${topPct}%`, color: 'text-cyan-200', bg: 'bg-cyan-300/10 ring-cyan-200/15' },
                { label: 'Streak', value: `${you.streak}d`, color: 'text-orange-300', bg: 'bg-orange-300/10 ring-orange-200/15' },
              ].map((s) => (
                <div key={s.label} className={`rounded-xl p-3 ring-1 text-center ${s.bg}`}>
                  <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] text-zinc-200/50">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Badge */}
            <div className={`flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ${bc.bg} ${bc.ring}`}>
              <span className="text-lg">{bc.icon}</span>
              <div>
                <p className="text-[10px] text-zinc-200/50">Current Badge</p>
                <p className={`text-xs font-semibold ${bc.text}`}>{you.badge}</p>
              </div>
              {you.trend !== 0 && (
                <span className={`ml-auto text-xs font-bold ${you.trend > 0 ? 'text-emerald-300' : 'text-red-300'}`}>
                  {you.trend > 0 ? '+' : ''}{you.trend} pts
                </span>
              )}
            </div>

            {/* Next badge progress */}
            {next && (
              <div>
                <div className="mb-1.5 flex justify-between text-[10px] text-zinc-200/50">
                  <span>Progress to {next.name}</span>
                  <span className="text-emerald-300">{next.pct}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${next.pct}%` }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p className="mt-1 text-right text-[10px] text-zinc-200/40">
                  {(next.threshold - you.overall).toLocaleString()} pts to go
                </p>
              </div>
            )}

            {/* Motivational message */}
            <div className="flex items-start gap-2 rounded-xl bg-white/3 px-3 py-2.5 ring-1 ring-white/8">
              <Flame className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-300" />
              <p className="text-xs text-zinc-200/65">{motivational}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
