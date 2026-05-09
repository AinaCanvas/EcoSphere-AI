import { motion } from 'framer-motion'
import { Quote, Sparkles } from 'lucide-react'
import { dailyQuote, userProfile } from '../../data/dashboardData'
import { fadeUp } from '../../animations/variants'
import { getSession } from '../../utils/authHelpers'

export function WelcomeSection() {
  const session = getSession()
  const displayName = session?.name ?? userProfile.name

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <motion.div
      className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome text */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-200 ring-1 ring-emerald-200/20">
          <Sparkles className="h-3.5 w-3.5" />
          Sustainability Level {userProfile.sustainabilityLevel}
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          {greeting},{' '}
          <span className="text-gradient">{displayName.split(' ')[0]}</span> 👋
        </h1>
        <p className="mt-1 text-sm text-zinc-200/60">
          Here's your sustainability snapshot for today.
        </p>
      </div>

      {/* Daily quote */}
      <motion.div
        className="glass glow-ring flex max-w-sm items-start gap-3 rounded-2xl p-4"
        variants={fadeUp}
        custom={1}
        initial="hidden"
        animate="visible"
      >
        <Quote className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300/70" />
        <p className="text-xs leading-relaxed text-zinc-200/75 italic">
          "{dailyQuote}"
        </p>
      </motion.div>
    </motion.div>
  )
}
