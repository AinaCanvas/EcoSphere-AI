import { motion } from 'framer-motion'
import { Bell, Calculator, Leaf, LayoutDashboard, LineChart, Target, Trophy } from 'lucide-react'
import { userProfile } from '../../data/dashboardData'
import { getSession } from '../../utils/authHelpers'

const navLinks = [
  { label: 'Overview', icon: LayoutDashboard, href: '#overview' },
  { label: 'Challenges', icon: Target, href: '#challenges' },
  { label: 'Analytics', icon: LineChart, href: '#analytics' },
  { label: 'Badges', icon: Trophy, href: '#badges' },
]

interface DashboardNavbarProps {
  onNavigateCalculator?: () => void
  onNavigateChallenges?: () => void
  onNavigateEcoLog?: () => void
  onNavigateEnvMap?: () => void
  onNavigateLeaderboard?: () => void
}

export function DashboardNavbar({ onNavigateCalculator, onNavigateChallenges, onNavigateEcoLog, onNavigateEnvMap, onNavigateLeaderboard }: DashboardNavbarProps) {
  const session = getSession()
  const displayName   = session?.name   ?? userProfile.name
  const displayAvatar = session?.avatar ?? userProfile.avatar
  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-white/5 bg-[#070A0F]/80 backdrop-blur-xl"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a href="/" className="group inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300/10 ring-1 ring-emerald-200/20">
            <Leaf className="h-5 w-5 text-emerald-200" />
          </span>
          <span className="text-sm font-semibold tracking-wide text-zinc-50">
            EcoSphere
          </span>
          <span className="hidden rounded-full bg-emerald-300/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-200 ring-1 ring-emerald-200/20 sm:inline-flex">
            Dashboard
          </span>
        </a>

        {/* Nav Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-zinc-200/70 transition hover:bg-white/5 hover:text-zinc-50"
            >
              <link.icon className="h-4 w-4 opacity-70 group-hover:opacity-100" />
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Calculator shortcut */}
          {onNavigateCalculator && (
            <button
              onClick={onNavigateCalculator}
              className="hidden items-center gap-1.5 rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-200/70 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-zinc-50 sm:flex"
            >
              <Calculator className="h-3.5 w-3.5" />
              Calculator
            </button>
          )}
          {/* Challenges shortcut */}
          {onNavigateChallenges && (
            <button
              onClick={onNavigateChallenges}
              className="hidden items-center gap-1.5 rounded-xl bg-violet-400/10 px-3 py-2 text-xs font-semibold text-violet-100 ring-1 ring-violet-300/20 transition hover:bg-violet-400/20 sm:flex"
            >
              Challenges
            </button>
          )}
          {/* Eco Log shortcut */}
          {onNavigateEcoLog && (
            <button
              onClick={onNavigateEcoLog}
              className="hidden items-center gap-1.5 rounded-xl bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-100 ring-1 ring-emerald-300/20 transition hover:bg-emerald-400/20 sm:flex"
            >
              Eco Log
            </button>
          )}
          {/* Env Map shortcut */}
          {onNavigateEnvMap && (
            <button
              onClick={onNavigateEnvMap}
              className="hidden items-center gap-1.5 rounded-xl bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-100 ring-1 ring-cyan-300/20 transition hover:bg-cyan-400/20 sm:flex"
            >
              🌍 Map
            </button>
          )}
          {/* Leaderboard shortcut */}
          {onNavigateLeaderboard && (
            <button
              onClick={onNavigateLeaderboard}
              className="hidden items-center gap-1.5 rounded-xl bg-yellow-400/10 px-3 py-2 text-xs font-semibold text-yellow-100 ring-1 ring-yellow-300/20 transition hover:bg-yellow-400/20 sm:flex"
            >
              🏆 Ranks
            </button>
          )}
          {/* Notifications */}
          <button className="relative grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10">
            <Bell className="h-4 w-4 text-zinc-200/80" />
            {userProfile.notifications > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[9px] font-bold text-[#070A0F]">
                {userProfile.notifications}
              </span>
            )}
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400/30 to-cyan-400/20 text-sm font-bold text-emerald-100 ring-1 ring-emerald-200/25">
              {displayAvatar}
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-xs font-semibold text-zinc-100">{displayName}</span>
              <span className="text-[10px] text-emerald-300/80">{userProfile.level}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
