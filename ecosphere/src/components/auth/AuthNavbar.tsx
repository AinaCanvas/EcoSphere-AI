import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'

interface AuthNavbarProps {
  onNavigateHome?: () => void
}

export function AuthNavbar({ onNavigateHome }: AuthNavbarProps) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#070A0F]/70 backdrop-blur-xl"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <button
          onClick={onNavigateHome}
          className="group inline-flex items-center gap-2 focus:outline-none"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300/10 ring-1 ring-emerald-200/20 transition group-hover:bg-emerald-300/15">
            <Leaf className="h-5 w-5 text-emerald-200" />
          </span>
          <span className="text-sm font-semibold tracking-wide text-zinc-50">EcoSphere</span>
        </button>

        <p className="text-xs text-zinc-500">
          Sustainability &amp; Green Tech Platform
        </p>
      </div>
    </motion.header>
  )
}
