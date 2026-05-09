import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import type { RankedUser } from '../../utils/rankingUtils'
import { badgeConfig } from '../../data/leaderboardData'
import { scaleIn } from '../../animations/variants'

const MEDAL = ['🥇', '🥈', '🥉']
const PODIUM_HEIGHT = ['h-28', 'h-20', 'h-16']
const PODIUM_ORDER  = [1, 0, 2]   // centre = rank 1

const glowColors = [
  'rgba(251,191,36,0.20)',   // gold
  'rgba(212,212,216,0.15)',  // silver
  'rgba(251,146,60,0.15)',   // bronze
]
const ringColors = [
  'ring-yellow-300/40',
  'ring-zinc-300/25',
  'ring-orange-300/25',
]

interface PodiumSectionProps {
  top3: RankedUser[]
}

export function PodiumSection({ top3 }: PodiumSectionProps) {
  if (top3.length < 3) return null

  return (
    <motion.div
      className="glass glow-ring relative overflow-hidden rounded-3xl p-6 sm:p-8"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_50%_0%,rgba(251,191,36,0.07),transparent_55%),radial-gradient(500px_circle_at_20%_80%,rgba(34,255,168,0.06),transparent_55%)]"
      />

      <p className="relative mb-6 text-center text-xs font-semibold tracking-[0.2em] text-zinc-200/55">
        TOP PERFORMERS
      </p>

      {/* Podium cards */}
      <div className="relative flex items-end justify-center gap-3 sm:gap-5">
        {PODIUM_ORDER.map((dataIdx) => {
          const user = top3[dataIdx]
          const visualPos = PODIUM_ORDER.indexOf(dataIdx) // 0=left,1=centre,2=right
          const bc = badgeConfig[user.badge]

          return (
            <motion.div
              key={user.id}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={visualPos}
              className="flex flex-col items-center gap-2"
              style={{ order: visualPos }}
            >
              {/* Medal */}
              <motion.span
                className="text-3xl"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: visualPos * 0.3 }}
              >
                {MEDAL[dataIdx]}
              </motion.span>

              {/* Avatar card */}
              <motion.div
                className={`relative flex flex-col items-center gap-1.5 rounded-2xl p-4 ring-1 ${ringColors[dataIdx]}`}
                style={{
                  background: `radial-gradient(200px circle at 50% 0%, ${glowColors[dataIdx]}, rgba(255,255,255,0.04) 70%)`,
                  backdropFilter: 'blur(14px)',
                  minWidth: dataIdx === 0 ? '120px' : '100px',
                }}
                whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              >
                {/* Glow pulse */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ boxShadow: `0 0 0 1px ${glowColors[dataIdx].replace('0.20', '0.4').replace('0.15', '0.3')}` }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: visualPos * 0.4 }}
                />

                {/* Avatar */}
                <div
                  className={`grid place-items-center rounded-xl text-sm font-bold ring-1 ${bc.bg} ${bc.ring} ${bc.text} ${dataIdx === 0 ? 'h-12 w-12' : 'h-10 w-10'}`}
                >
                  {user.avatar}
                </div>

                <p className="text-center text-xs font-semibold text-zinc-50 leading-tight">
                  {user.name.split(' ')[0]}
                </p>
                <p className="text-center text-[10px] text-zinc-200/50">{user.flag}</p>

                {/* Score */}
                <div className={`rounded-lg px-2 py-0.5 text-xs font-bold ring-1 ${bc.bg} ${bc.ring} ${bc.text}`}>
                  {user.score.toLocaleString()} pts
                </div>

                {/* Badge */}
                <span className="text-[10px] text-zinc-200/50">{bc.icon} {user.badge}</span>

                {/* Streak */}
                {user.streak > 0 && (
                  <span className="flex items-center gap-0.5 text-[9px] text-orange-300">
                    <Flame className="h-2.5 w-2.5" />
                    {user.streak}d
                  </span>
                )}
              </motion.div>

              {/* Podium base */}
              <div
                className={`w-full rounded-t-lg ${PODIUM_HEIGHT[dataIdx]} ${
                  dataIdx === 0
                    ? 'bg-gradient-to-t from-yellow-400/20 to-yellow-300/10 ring-1 ring-yellow-300/20'
                    : dataIdx === 1
                      ? 'bg-gradient-to-t from-zinc-400/15 to-zinc-300/8 ring-1 ring-zinc-300/15'
                      : 'bg-gradient-to-t from-orange-400/15 to-orange-300/8 ring-1 ring-orange-300/15'
                }`}
              >
                <p className="pt-2 text-center text-xs font-bold text-zinc-200/40">
                  #{user.rank}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
