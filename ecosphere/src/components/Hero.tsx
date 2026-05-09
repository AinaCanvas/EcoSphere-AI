import { motion } from 'framer-motion'
import { ArrowRight, Calculator, Target } from 'lucide-react'
import { Container } from './Container'
import { GlowButton } from './GlowButton'

interface HeroProps {
  onNavigateDashboard?: () => void
  onNavigateCalculator?: () => void
}

// Animated Earth SVG
function AnimatedEarth() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulse rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-emerald-400/20"
          style={{ width: 260 + i * 60, height: 260 + i * 60 }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 3 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        />
      ))}

      {/* Glow behind earth */}
      <div className="absolute h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="absolute h-48 w-48 rounded-full bg-cyan-400/10 blur-2xl" />

      {/* Earth sphere */}
      <motion.div
        className="relative h-56 w-56"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_0_30px_rgba(34,255,168,0.35)]">
          <defs>
            <radialGradient id="earthGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1a3a2a" />
              <stop offset="40%" stopColor="#0d2218" />
              <stop offset="100%" stopColor="#050e0a" />
            </radialGradient>
            <radialGradient id="oceanGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#0a2535" />
              <stop offset="60%" stopColor="#061520" />
              <stop offset="100%" stopColor="#030b12" />
            </radialGradient>
            <radialGradient id="glowGrad" cx="30%" cy="25%" r="60%">
              <stop offset="0%" stopColor="rgba(34,255,168,0.25)" />
              <stop offset="100%" stopColor="rgba(34,255,168,0)" />
            </radialGradient>
            <clipPath id="earthClip">
              <circle cx="100" cy="100" r="96" />
            </clipPath>
          </defs>

          {/* Base ocean */}
          <circle cx="100" cy="100" r="96" fill="url(#oceanGrad)" />

          {/* Continents */}
          <g clipPath="url(#earthClip)" fill="url(#earthGrad)">
            {/* Americas */}
            <path d="M55 45 Q48 55 50 70 Q52 85 45 95 Q40 108 48 118 Q55 128 52 140 Q58 148 65 142 Q72 135 70 120 Q75 108 80 98 Q85 88 82 75 Q78 60 72 50 Z" />
            {/* Europe/Africa */}
            <path d="M108 38 Q115 42 118 52 Q122 62 116 70 Q122 78 120 88 Q118 98 124 108 Q128 120 122 132 Q116 144 110 150 Q104 144 106 132 Q100 120 104 108 Q100 96 102 84 Q98 72 102 62 Q104 50 108 38 Z" />
            {/* Asia */}
            <path d="M128 35 Q140 38 148 48 Q158 58 155 70 Q162 78 158 90 Q152 100 158 112 Q152 108 145 100 Q138 92 140 80 Q135 68 128 60 Q122 50 128 35 Z" />
            {/* Australia */}
            <path d="M145 128 Q155 125 160 132 Q165 140 158 148 Q150 155 142 150 Q135 144 138 136 Z" />
            {/* Greenland */}
            <path d="M78 28 Q85 24 90 30 Q94 38 88 44 Q82 48 76 42 Q72 36 78 28 Z" />
          </g>

          {/* Atmosphere glow */}
          <circle cx="100" cy="100" r="96" fill="url(#glowGrad)" />

          {/* Specular highlight */}
          <ellipse cx="72" cy="65" rx="22" ry="16" fill="rgba(255,255,255,0.06)" transform="rotate(-20,72,65)" />

          {/* Neon grid lines (latitude/longitude) */}
          <g clipPath="url(#earthClip)" stroke="rgba(34,255,168,0.12)" strokeWidth="0.6" fill="none">
            <ellipse cx="100" cy="100" rx="96" ry="30" />
            <ellipse cx="100" cy="100" rx="96" ry="60" />
            <line x1="100" y1="4" x2="100" y2="196" />
            <line x1="4" y1="100" x2="196" y2="100" />
            <ellipse cx="100" cy="100" rx="50" ry="96" />
          </g>

          {/* Outer ring */}
          <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(34,255,168,0.3)" strokeWidth="1" />
          <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(74,216,255,0.15)" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Orbiting dot */}
      <motion.div
        className="absolute"
        style={{ width: 220, height: 220 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2">
          <div className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(34,255,168,0.9)]" />
        </div>
      </motion.div>

      {/* Second orbiting dot (cyan, opposite) */}
      <motion.div
        className="absolute"
        style={{ width: 280, height: 280 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-1 left-1/2 -translate-x-1/2">
          <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(74,216,255,0.9)]" />
        </div>
      </motion.div>

      {/* Floating stat chips */}
      <motion.div
        className="absolute -left-4 top-8 rounded-xl border border-emerald-400/20 bg-[#070A0F]/80 px-3 py-2 backdrop-blur-sm"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-[10px] text-zinc-500">Daily CO₂</p>
        <p className="text-sm font-bold text-emerald-300">6.2 kg</p>
      </motion.div>

      <motion.div
        className="absolute -right-6 top-16 rounded-xl border border-cyan-400/20 bg-[#070A0F]/80 px-3 py-2 backdrop-blur-sm"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <p className="text-[10px] text-zinc-500">Eco Score</p>
        <p className="text-sm font-bold text-cyan-300">82 / 100</p>
      </motion.div>

      <motion.div
        className="absolute -bottom-2 left-4 rounded-xl border border-emerald-400/20 bg-[#070A0F]/80 px-3 py-2 backdrop-blur-sm"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <p className="text-[10px] text-zinc-500">Trees Saved</p>
        <p className="text-sm font-bold text-emerald-300">382K 🌳</p>
      </motion.div>
    </div>
  )
}

export function Hero({ onNavigateDashboard, onNavigateCalculator }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_10%_10%,rgba(34,255,168,0.12),transparent_60%),radial-gradient(900px_circle_at_90%_20%,rgba(74,216,255,0.12),transparent_55%)]" />
        <motion.div
          className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"
          animate={{ x: [0, 35, -20, 0], y: [0, -18, 22, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[-80px] top-12 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"
          animate={{ x: [0, -25, 30, 0], y: [0, 22, -16, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,10,15,0.3),rgba(7,10,15,1))]" />
      </div>

      <Container className="relative py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-12">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-200/80 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(34,255,168,0.8)]" />
              AI-powered sustainability platform
            </div>

            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
              Track Your{' '}
              <span className="text-gradient">Carbon Footprint</span>{' '}
              &amp; Build a Greener Future
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
              Join 142K+ people reducing their environmental impact through smart
              tracking, eco challenges, and community-driven action.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GlowButton onClick={onNavigateCalculator} className="justify-center">
                <Calculator className="h-4 w-4" />
                Calculate My Footprint
                <ArrowRight className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5" />
              </GlowButton>
              <GlowButton variant="secondary" onClick={onNavigateDashboard} className="justify-center">
                <Target className="h-4 w-4" />
                Open Dashboard
              </GlowButton>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
              {[
                { value: '142K+', label: 'Active users' },
                { value: '8,420t', label: 'CO₂ reduced' },
                { value: '94', label: 'Countries' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-bold text-zinc-50">{s.value}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — animated earth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex items-center justify-center"
          >
            <AnimatedEarth />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
