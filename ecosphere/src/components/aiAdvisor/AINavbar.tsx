import { motion } from 'framer-motion'
import { Bot, Leaf } from 'lucide-react'

interface AINavbarProps {
  onBack?: () => void
  onDashboard?: () => void
}

export function AINavbar({ onBack, onDashboard }: AINavbarProps) {
  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-white/5 bg-[#070A0F]/80 backdrop-blur-xl"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <button onClick={onBack} className="group inline-flex items-center gap-2 focus:outline-none">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300/10 ring-1 ring-emerald-200/20">
            <Leaf className="h-5 w-5 text-emerald-200" />
          </span>
          <span className="text-sm font-semibold tracking-wide text-zinc-50">EcoSphere</span>
        </button>

        {/* Center badge */}
        <div className="hidden items-center gap-2 md:flex">
          <div className="flex items-center gap-2 rounded-full bg-violet-400/10 px-3 py-1.5 ring-1 ring-violet-300/20">
            <Bot className="h-3.5 w-3.5 text-violet-300" />
            <span className="text-xs font-semibold text-violet-200">AI Sustainability Advisor</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(34,255,168,0.9)]" />
          </div>
        </div>

        {/* Right */}
        <button
          onClick={onDashboard}
          className="rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-zinc-50 focus:outline-none"
        >
          Dashboard
        </button>
      </div>
    </motion.header>
  )
}
