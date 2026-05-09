import { AnimatePresence, motion } from 'framer-motion'
import { Flame, TrendingDown, TrendingUp } from 'lucide-react'
import type { RankedUser } from '../../utils/rankingUtils'
import { badgeConfig } from '../../data/leaderboardData'

interface LeaderboardTableProps {
  users: RankedUser[]   // already ranked, top3 excluded
}

function TrendBadge({ trend }: { trend: number }) {
  if (trend === 0) return <span className="text-[10px] text-zinc-200/40">—</span>
  const up = trend > 0
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ring-1 ${
        up
          ? 'bg-emerald-300/10 text-emerald-300 ring-emerald-200/20'
          : 'bg-red-300/10 text-red-300 ring-red-200/20'
      }`}
    >
      {up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
      {up ? '+' : ''}{trend}
    </span>
  )
}

export function LeaderboardTable({ users }: LeaderboardTableProps) {
  return (
    <div className="glass glow-ring overflow-hidden rounded-2xl">
      {/* Header */}
      <div className="grid grid-cols-[40px_1fr_auto_auto_auto] items-center gap-3 border-b border-white/5 px-4 py-2.5 text-[10px] font-semibold tracking-[0.12em] text-zinc-200/40 sm:grid-cols-[48px_1fr_auto_auto_auto_auto]">
        <span>RANK</span>
        <span>USER</span>
        <span className="hidden sm:block">BADGE</span>
        <span>SCORE</span>
        <span className="hidden sm:block">STREAK</span>
        <span>TREND</span>
      </div>

      {/* Rows */}
      <AnimatePresence mode="popLayout">
        {users.map((user, i) => {
          const bc = badgeConfig[user.badge]
          return (
            <motion.div
              key={user.id}
              layout
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16, transition: { duration: 0.2 } }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: 'easeOut' }}
              className={`group grid grid-cols-[40px_1fr_auto_auto_auto] items-center gap-3 border-b border-white/5 px-4 py-3 transition last:border-0 hover:bg-white/3 sm:grid-cols-[48px_1fr_auto_auto_auto_auto] ${
                user.isYou
                  ? 'bg-emerald-300/5 ring-inset ring-1 ring-emerald-300/10'
                  : ''
              }`}
            >
              {/* Rank */}
              <span className="text-sm font-bold text-zinc-200/40">#{user.rank}</span>

              {/* User */}
              <div className="flex min-w-0 items-center gap-2.5">
                <div
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold ring-1 ${bc.bg} ${bc.ring} ${bc.text}`}
                >
                  {user.avatar}
                </div>
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 truncate text-xs font-semibold text-zinc-50">
                    {user.name}
                    {user.isYou && (
                      <span className="rounded-full bg-emerald-300/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300 ring-1 ring-emerald-200/20">
                        You
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-zinc-200/45">
                    {user.flag} {user.country}
                  </p>
                </div>
              </div>

              {/* Badge */}
              <span className={`hidden items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 sm:inline-flex ${bc.bg} ${bc.ring} ${bc.text}`}>
                {bc.icon} {user.badge}
              </span>

              {/* Score */}
              <span className={`text-sm font-bold ${bc.text}`}>
                {user.score.toLocaleString()}
              </span>

              {/* Streak */}
              <span className="hidden items-center gap-1 text-[11px] text-orange-300 sm:flex">
                {user.streak > 0 && (
                  <>
                    <Flame className="h-3 w-3" />
                    {user.streak}d
                  </>
                )}
              </span>

              {/* Trend */}
              <TrendBadge trend={user.trend} />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
