import { motion } from 'framer-motion'

export function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_10%_10%,rgba(34,255,168,0.14),transparent_60%),radial-gradient(900px_circle_at_90%_20%,rgba(74,216,255,0.14),transparent_55%),radial-gradient(700px_circle_at_50%_100%,rgba(34,255,168,0.08),transparent_55%)]" />

      <motion.div
        className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-400/25 blur-3xl"
        animate={{ x: [0, 35, -20, 0], y: [0, -18, 22, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-80px] top-12 h-80 w-80 rounded-full bg-cyan-400/25 blur-3xl"
        animate={{ x: [0, -25, 30, 0], y: [0, 22, -16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-[55%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl"
        animate={{ scale: [1, 1.08, 0.98, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,10,15,0.4),rgba(7,10,15,1))]" />
    </div>
  )
}

