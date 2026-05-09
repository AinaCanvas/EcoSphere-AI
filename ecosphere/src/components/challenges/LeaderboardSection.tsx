import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { leaderboard } from '../../data/challengesData'
import { fadeUp, scaleIn } from '../../animations/variants'

const badgeStyles = {
  gold: {
    ring: 'ring-yellow-300/40',
    bg: 'bg-yellow-300/10',
    text: 'text-yellow-200',
    icon: '🥇',
    glow: 'rgba(251,191,36,0.15)',
  },
  silver: {
    ring: 'ring-zinc-300/30',
    bg: 'bg-zinc-300/10',
    text: 'text-zinc-300',
    icon: '🥈',
    glow: 'rgba(212,212,216,0.10)',
  },
  bronze: {
    ring: 'ring-orange-300/30',
    bg: 'bg-orange-300/10',
    text: 'text-orange-300',
    icon: '🥉',
    glow: 'rgba(251,146,60,0.10)',
  },
}

export function LeaderboardSection() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={0}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-yellow-300/10 ring-1 ring-yellow-200/20">
          <Trophy className="h-4 w-4 text-yellow-200" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">LEADERBOARD</p>
          <p className="text-sm font-semibold text-zinc-50">Top Eco Champions</p>
        </div>
      </div>

      <div className="glass glow-ring overflow-hidden rounded-2xl">
        {/* Top 3 podium */}
        <div className="grid grid-cols-3 gap-px border-b border-white/5 bg-white/5">
          {leaderboard.slice(0, 3).map((entry, i) => {
            const bs = badgeStyles[entry.badge as keyof typeof badgeStyles]
            const podiumOrder = [1, 0, 2] // center = rank 1
            const isCenter = podiumOrder[i] === 0
            return (
              <motion.div
                key={entry.rank}
                variants={scaleIn}
                custom={i}
                className={`relative flex flex-col items-center gap-2 p-4 ${isCenter ? 'bg-white/3' : ''}`}
                style={{ order: podiumOrder[i] }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: `radial-gradient(200px circle at 50% 0%, ${bs.glow}, transparent 70%)` }}
                />
                <span className="text-2xl">{bs.icon}</span>
                <div
                  className={`grid h-10 w-10 place-items-center rounded-xl text-sm font-bold ring-1 ${bs.bg} ${bs.ring} ${bs.text}`}
                >
                  {entry.avatar}
                </div>
                <p className="text-center text-xs font-semibold text-zinc-50 leading-tight">
                  {entry.name.split(' ')[0]}
                </p>
                <p className={`text-sm font-bold ${bs.text}`}>
                  {entry.points.toLocaleString()}
                </p>
                <p className="text-[10px] text-zinc-200/50">pts</p>
              </motion.div>
            )
          })}
        </div>

        {/* Remaining rows */}
        <div className="divide-y divide-white/5">
          {leaderboard.slice(3).map((entry, i) => {
            const bs = badgeStyles[entry.badge as keyof typeof badgeStyles]
            return (
              <motion.div
                key={entry.rank}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`flex items-center gap-3 px-4 py-3 transition hover:bg-white/3 ${entry.isYou ? 'bg-emerald-300/5 ring-inset ring-1 ring-emerald-300/10' : ''}`}
              >
                <span className="w-5 text-center text-xs font-bold text-zinc-200/40">
                  #{entry.rank}
                </span>
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-bold ring-1 ${bs.bg} ${bs.ring} ${bs.text}`}
                >
                  {entry.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-semibold text-zinc-50">
                    {entry.name}
                    {entry.isYou && (
                      <span className="ml-1.5 rounded-full bg-emerald-300/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300 ring-1 ring-emerald-200/20">
                        You
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-zinc-200/50">
                    {entry.challenges} challenges · {entry.co2Saved} kg CO₂
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${bs.text}`}>
                    {entry.points.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-zinc-200/40">pts</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
