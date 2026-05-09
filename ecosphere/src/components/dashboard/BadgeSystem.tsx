import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { badges, userProfile } from '../../data/dashboardData'
import { fadeUp, scaleIn } from '../../animations/variants'

const rarityStyles = {
  Common: {
    ring: 'ring-zinc-200/20',
    glow: 'rgba(255,255,255,0.08)',
    label: 'bg-zinc-300/10 text-zinc-300 ring-1 ring-zinc-200/15',
  },
  Rare: {
    ring: 'ring-cyan-200/30',
    glow: 'rgba(74,216,255,0.12)',
    label: 'bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-200/20',
  },
  Epic: {
    ring: 'ring-fuchsia-200/30',
    glow: 'rgba(217,70,239,0.12)',
    label: 'bg-fuchsia-300/10 text-fuchsia-200 ring-1 ring-fuchsia-200/20',
  },
  Legendary: {
    ring: 'ring-amber-200/30',
    glow: 'rgba(251,191,36,0.12)',
    label: 'bg-amber-300/10 text-amber-200 ring-1 ring-amber-200/20',
  },
}

export function BadgeSystem() {
  const xpPct = Math.min((userProfile.xp / userProfile.xpToNext) * 100, 100)

  return (
    <motion.section
      id="badges"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
    >
      <div className="mb-4">
        <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">
          LEVEL & BADGES
        </p>
        <h2 className="mt-1 text-lg font-semibold text-zinc-50">
          Your Achievements
        </h2>
      </div>

      {/* XP Bar */}
      <motion.div
        className="glass glow-ring mb-4 rounded-2xl p-5"
        variants={fadeUp}
        custom={1}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-zinc-200/60">Experience Points</p>
            <p className="mt-0.5 text-xl font-bold text-zinc-50">
              <span className="text-gradient">{userProfile.xp.toLocaleString()}</span>
              <span className="ml-1 text-sm font-normal text-zinc-200/50">
                / {userProfile.xpToNext.toLocaleString()} XP
              </span>
            </p>
          </div>
          <div className="rounded-xl bg-emerald-300/10 px-3 py-2 text-center ring-1 ring-emerald-200/20">
            <p className="text-[10px] text-zinc-200/60">Level</p>
            <p className="text-xl font-bold text-emerald-200">
              {userProfile.sustainabilityLevel}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-[10px] text-zinc-200/50">
            <span>Progress to Level {userProfile.sustainabilityLevel + 1}</span>
            <span className="text-emerald-300">{Math.round(xpPct)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300"
              initial={{ width: 0 }}
              animate={{ width: `${xpPct}%` }}
              transition={{ duration: 1.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </motion.div>

      {/* Badge grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {badges.map((badge, i) => {
          const styles = rarityStyles[badge.rarity]
          return (
            <motion.div
              key={badge.id}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={i}
              whileHover={
                badge.unlocked
                  ? { scale: 1.04, transition: { duration: 0.2 } }
                  : {}
              }
              className={`glass relative overflow-hidden rounded-2xl p-4 ring-1 transition ${styles.ring} ${
                badge.unlocked ? 'cursor-pointer' : 'opacity-60 grayscale'
              }`}
            >
              {/* Rarity glow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(200px circle at 50% 0%, ${styles.glow}, transparent 70%)`,
                }}
              />

              <div className="relative flex flex-col items-center gap-2 text-center">
                <div className="relative">
                  <span className="text-3xl">{badge.icon}</span>
                  {!badge.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#070A0F]/60">
                      <Lock className="h-4 w-4 text-zinc-400" />
                    </div>
                  )}
                </div>

                <p className="text-xs font-semibold text-zinc-50">{badge.name}</p>
                <p className="text-[10px] leading-relaxed text-zinc-200/55">
                  {badge.description}
                </p>

                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${styles.label}`}>
                  {badge.rarity}
                </span>

                {badge.unlocked ? (
                  <motion.span
                    className="rounded-full bg-emerald-300/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-200 ring-1 ring-emerald-200/20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 * i + 0.5, type: 'spring' }}
                  >
                    ✓ Unlocked
                  </motion.span>
                ) : (
                  <span className="text-[9px] text-zinc-200/40">
                    {badge.xpRequired.toLocaleString()} XP needed
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
