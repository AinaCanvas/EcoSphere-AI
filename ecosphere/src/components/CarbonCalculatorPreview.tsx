import { motion } from 'framer-motion'
import { ArrowRight, Car, Leaf, PlugZap, ShoppingBag, Utensils } from 'lucide-react'
import { useState } from 'react'
import { Container } from './Container'
import { GlassCard } from './GlassCard'
import { GlowButton } from './GlowButton'
import { SectionHeading } from './SectionHeading'

// Mirrors the real calculator's emission factors from calculations.ts
const DIET_KG: Record<string, number> = {
  vegan: 1.5, vegetarian: 2.0, mixed: 3.5, 'heavy-meat': 5.5,
}

interface PreviewProps {
  onNavigateCalculator?: () => void
}

export function CarbonCalculatorPreview({ onNavigateCalculator }: PreviewProps) {
  const [carKm, setCarKm]       = useState(80)
  const [electricity, setElec]  = useState(250)
  const [diet, setDiet]         = useState<'vegan' | 'vegetarian' | 'mixed' | 'heavy-meat'>('mixed')
  const [shopping, setShopping] = useState(6)

  // Same simplified formula as the real calculator
  const transport  = (carKm * 52 * 0.21) / 1000
  const energy     = (electricity * 12 * 0.42) / 1000
  const dietKg     = DIET_KG[diet] * 365 / 1000
  const shoppingKg = (shopping * 12 * 3.5) / 1000
  const total      = transport + energy + dietKg + shoppingKg

  const level =
    total < 4 ? 'Low' : total < 8 ? 'Moderate' : total < 12 ? 'High' : 'Critical'

  const levelStyles = {
    Low:      { color: 'text-emerald-300', bar: 'bg-emerald-400', glow: 'rgba(34,255,168,0.3)', label: '🌱 Eco Champion' },
    Moderate: { color: 'text-cyan-300',    bar: 'bg-cyan-400',    glow: 'rgba(74,216,255,0.3)', label: '🌿 Green Aware' },
    High:     { color: 'text-orange-300',  bar: 'bg-orange-400',  glow: 'rgba(251,146,60,0.3)', label: '⚠️ Needs Attention' },
    Critical: { color: 'text-red-300',     bar: 'bg-red-400',     glow: 'rgba(248,113,113,0.3)', label: '🔴 Critical Impact' },
  }

  const style = levelStyles[level]
  const pct   = Math.min((total / 16) * 100, 100)

  const sliders = [
    { icon: <Car className="h-4 w-4 text-cyan-300" />,       label: 'Car km / week',       value: carKm,      set: setCarKm,      min: 0, max: 500, unit: 'km' },
    { icon: <PlugZap className="h-4 w-4 text-yellow-300" />, label: 'Electricity kWh / mo', value: electricity, set: setElec,       min: 0, max: 800, unit: 'kWh' },
    { icon: <ShoppingBag className="h-4 w-4 text-purple-300" />, label: 'Online orders / mo', value: shopping, set: setShopping,   min: 0, max: 30,  unit: 'orders' },
  ]

  return (
    <section id="calculator" className="relative py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="CARBON CALCULATOR"
            title="Estimate your annual footprint."
            subtitle="Adjust the sliders to see your real-time CO₂ estimate — same formula as the full calculator."
          />
          {onNavigateCalculator && (
            <GlowButton onClick={onNavigateCalculator} className="shrink-0">
              Full Calculator <ArrowRight className="h-4 w-4" />
            </GlowButton>
          )}
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          {/* Controls */}
          <GlassCard className="flex flex-col gap-6">
            {/* Diet selector */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-zinc-400">
                <Utensils className="h-4 w-4 text-emerald-300" />
                Diet type
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(['vegan', 'vegetarian', 'mixed', 'heavy-meat'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDiet(d)}
                    className={`rounded-xl px-3 py-2 text-xs font-medium capitalize transition focus:outline-none ${
                      diet === d
                        ? 'bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/30'
                        : 'bg-white/5 text-zinc-400 ring-1 ring-white/10 hover:bg-white/8 hover:text-zinc-200'
                    }`}
                  >
                    {d.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            {sliders.map((s) => (
              <div key={s.label}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    {s.icon} {s.label}
                  </div>
                  <span className="text-sm font-semibold text-zinc-200">
                    {s.value} <span className="text-xs text-zinc-500">{s.unit}</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={s.value}
                  onChange={(e) => s.set(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>
            ))}
          </GlassCard>

          {/* Result */}
          <GlassCard className="relative overflow-hidden flex flex-col gap-6">
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-60"
              style={{ background: `radial-gradient(400px circle at 20% 0%, ${style.glow}, transparent 60%)` }}
            />

            <div className="relative">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                <Leaf className="h-3.5 w-3.5 text-emerald-400" />
                Annual Estimate
              </div>

              <motion.p
                key={total.toFixed(1)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mt-3 text-5xl font-bold tracking-tight ${style.color}`}
              >
                {total.toFixed(1)}
                <span className="ml-2 text-xl font-normal text-zinc-400">t CO₂e / yr</span>
              </motion.p>

              <p className="mt-2 text-sm font-medium text-zinc-300">{style.label}</p>
            </div>

            {/* Progress bar */}
            <div className="relative">
              <div className="mb-1.5 flex justify-between text-xs text-zinc-600">
                <span>0t</span><span>Global avg ~7t</span><span>16t+</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
                <motion.div
                  className={`h-full rounded-full ${style.bar}`}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Transport',  value: transport.toFixed(2),  color: 'text-cyan-300' },
                { label: 'Energy',     value: energy.toFixed(2),     color: 'text-yellow-300' },
                { label: 'Diet',       value: dietKg.toFixed(2),     color: 'text-emerald-300' },
                { label: 'Shopping',   value: shoppingKg.toFixed(2), color: 'text-purple-300' },
              ].map((b) => (
                <div key={b.label} className="rounded-xl bg-white/5 p-3 ring-1 ring-white/8">
                  <p className="text-xs text-zinc-500">{b.label}</p>
                  <p className={`mt-1 text-base font-semibold ${b.color}`}>{b.value}t</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </Container>
    </section>
  )
}
