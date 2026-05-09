import { motion } from 'framer-motion'
import { ArrowLeft, Leaf, Users } from 'lucide-react'

interface ChallengesNavbarProps {
  onBack: () => void
  onDashboard: () => void
  onCalculator: () => void
}

export function ChallengesNavbar({ onBack, onDashboard, onCalculator }: ChallengesNavbarProps) {
  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-white/5 bg-[#070A0F]/80 backdrop-blur-xl"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: back + logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4 text-zinc-200/80" />
          </button>
          <a href="/" className="inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300/10 ring-1 ring-emerald-200/20">
              <Leaf className="h-5 w-5 text-emerald-200" />
            </span>
            <span className="text-sm font-semibold tracking-wide text-zinc-50">EcoSphere</span>
          </a>
        </div>

        {/* Center badge */}
        <div className="hidden items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10 sm:flex">
          <Users className="h-3.5 w-3.5 text-violet-300" />
          <span className="text-xs font-semibold text-zinc-200/80">Community Challenges</span>
        </div>

        {/* Right: nav shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={onCalculator}
            className="hidden rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-200/70 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-zinc-50 sm:block"
          >
            Calculator
          </button>
          <button
            onClick={onDashboard}
            className="rounded-xl bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-100 ring-1 ring-emerald-300/20 transition hover:bg-emerald-400/20"
          >
            Dashboard →
          </button>
        </div>
      </div>
    </motion.header>
  )
}
