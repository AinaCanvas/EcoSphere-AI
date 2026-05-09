import { motion } from 'framer-motion'

export function DashboardBackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_20%,rgba(34,255,168,0.07),transparent_55%),radial-gradient(700px_circle_at_85%_10%,rgba(74,216,255,0.07),transparent_50%),radial-gradient(600px_circle_at_50%_90%,rgba(34,255,168,0.05),transparent_55%)]" />

      <motion.div
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl"
        animate={{ x: [0, 30, -15, 0], y: [0, -20, 25, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-100px] top-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
        animate={{ x: [0, -20, 28, 0], y: [0, 25, -18, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-emerald-300/5 blur-3xl"
        animate={{ scale: [1, 1.06, 0.97, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}
