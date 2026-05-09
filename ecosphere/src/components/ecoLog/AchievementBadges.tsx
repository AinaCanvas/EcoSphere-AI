import { motion } from 'framer-motion'
import { Lock, Trophy } from 'lucide-react'
import { achievementBadges } from '../../data/actionsData'
import { scaleIn } from '../../animations/variants'

const rarityGlow: Record<string, string> = {
  Common: 'rgba(34,255,168,0.10)',
  Rare: 'rgba(74,216,255,0.12)',
  Epic: 'rgba(192,132,252,0.14)',
  Legendary: 'rgba(251,191,36,0.16)',
}

const rarityLabel: Record<string, string> = {
  Common: 'bg-emerald-300/10 text-emerald-200 ring-1 ring-emerald-200/20',
  Rare: 'bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-200/20',
  Epic: 'bg-violet-300/10 text-violet-200 ring-1 ring-violet-200/20',
  Legendary: 'bg-yellow-300/10 text-yellow-200 ring-1 ring-yellow-200/20',
}

interface AchievementBadgesProps {
  totalPoints: number
}

export function AchievementBadges({ totalPoints }: AchievementBadgesProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-yellow-300/10 ring-1 ring-yellow-200/20">
          <Trophy className="h-4 w-4 text-yellow-200" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">ACHIEVEMENTS</p>
          <p className="text-sm font-semibold text-zinc-50">Your Badges</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {achievementBadges.map((badge, i) => {
          const unlocked = totalPoints >= badge.pointsRequired
          const glow = rarityGlow[badge.rarity]

          return (
            <motion.div
              key={badge.id}
              variants={scaleIn}
              custom={i}
              whileHover={unlocked ? { scale: 1.04, transition: { duration: 0.2 } } : {}}
              className={`glass relative overflow-hidden rounded-2xl p-4 ring-1 transition ${
                unlocked ? `${badge.ring} cursor-pointer` : 'ring-white/8 opacity-55 grayscale'
              }`}
            >
              {/* Rarity glow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: `radial-gradient(180px circle at 50% 0%, ${glow}, transparent 70%)` }}
              />

              <div className="relative flex flex-col items-center gap-2 text-center">
                {/* Icon */}
                <div className="relative">
                  <span className="text-3xl">{badge.icon}</span>
                  {!unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#070A0F]/60">
                      <Lock className="h-4 w-4 text-zinc-400" />
                    </div>
                  )}
                </div>

                <p className="text-xs font-semibold text-zinc-50">{badge.name}</p>
                <p className="text-[10px] leading-relaxed text-zinc-200/50">{badge.description}</p>

                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${rarityLabel[badge.rarity]}`}>
                  {badge.rarity}
                </span>

                {unlocked ? (
                  <motion.span
                    className="rounded-full bg-emerald-300/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-200 ring-1 ring-emerald-200/20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 * i + 0.4, type: 'spring' }}
                  >
                    ✓ Unlocked
                  </motion.span>
                ) : (
                  <span className="text-[9px] text-zinc-200/35">
                    {badge.pointsRequired.toLocaleString()} pts needed
                  </span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
