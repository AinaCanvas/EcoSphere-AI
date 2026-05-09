import { motion } from 'framer-motion'

export function AIBackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#070A0F]" />

      {/* Gradient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.15),transparent),radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(34,255,168,0.10),transparent),radial-gradient(ellipse_50%_40%_at_20%_70%,rgba(74,216,255,0.10),transparent)]" />

      {/* Animated orbs */}
      <motion.div
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
        animate={{ x: [0, -30, 25, 0], y: [0, 25, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/8 blur-3xl"
        animate={{ scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.8) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}
