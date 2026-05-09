import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import { Container } from './Container'
import { GlowButton } from './GlowButton'

interface NavbarProps {
  onNavigateDashboard?: () => void
  onNavigateCalculator?: () => void
  onNavigateChallenges?: () => void
  onNavigateEcoLog?: () => void
  onNavigateEnvMap?: () => void
  onNavigateLeaderboard?: () => void
  onNavigateLogin?: () => void
  onNavigateRegister?: () => void
  onNavigateAIAdvisor?: () => void
}

export function Navbar({
  onNavigateDashboard,
  onNavigateCalculator,
  onNavigateChallenges,
  onNavigateEcoLog,
  onNavigateEnvMap,
  onNavigateLeaderboard,
  onNavigateLogin,
  onNavigateRegister,
  onNavigateAIAdvisor,
}: NavbarProps) {
  const navLinks = [
    { label: 'Home',       onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Calculator', onClick: onNavigateCalculator },
    { label: 'Challenges', onClick: onNavigateChallenges },
    { label: 'Eco Log',    onClick: onNavigateEcoLog },
    { label: 'Map',        onClick: onNavigateEnvMap },
    { label: 'Leaderboard',onClick: onNavigateLeaderboard },
    { label: '✨ AI Advisor', onClick: onNavigateAIAdvisor },
    { label: 'About',      onClick: () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) },
  ]

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-white/5 bg-[#070A0F]/70 backdrop-blur-xl"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group inline-flex items-center gap-2 focus:outline-none"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300/10 ring-1 ring-emerald-200/20">
            <Leaf className="h-5 w-5 text-emerald-200" />
          </span>
          <span className="text-sm font-semibold tracking-wide text-zinc-50">EcoSphere</span>
        </button>

        {/* Center nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={l.onClick}
              className="group relative rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-zinc-50 focus:outline-none"
            >
              {l.label}
              <span className="absolute bottom-1 left-3 right-3 h-px scale-x-0 bg-gradient-to-r from-emerald-300 to-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <GlowButton
            onClick={onNavigateLogin ?? (() => {})}
            variant="ghost"
            className="hidden md:inline-flex"
          >
            Sign In
          </GlowButton>
          <GlowButton
            onClick={onNavigateRegister ?? onNavigateDashboard ?? (() => {})}
            className="glow-ring"
          >
            Get Started
          </GlowButton>
        </div>
      </Container>
    </motion.header>
  )
}
