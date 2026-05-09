import { motion } from 'framer-motion'
import type { DietType } from '../../utils/calculations'

const options: { value: DietType; label: string; icon: string; desc: string; co2: string }[] = [
  { value: 'vegan', label: 'Vegan', icon: '🌱', desc: 'Plant-based only', co2: '~1.5t/yr' },
  { value: 'vegetarian', label: 'Vegetarian', icon: '🥦', desc: 'No meat', co2: '~1.7t/yr' },
  { value: 'mixed', label: 'Mixed Diet', icon: '🍽️', desc: 'Meat a few times/week', co2: '~2.5t/yr' },
  { value: 'heavy_meat', label: 'Heavy Meat', icon: '🥩', desc: 'Meat daily', co2: '~3.3t/yr' },
]

interface DietSelectorProps {
  value: DietType
  onChange: (v: DietType) => void
}

export function DietSelector({ value, onChange }: DietSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <motion.button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            whileTap={{ scale: 0.96 }}
            className={`relative flex flex-col items-center gap-1.5 rounded-xl p-3 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 ${
              active
                ? 'bg-emerald-400/15 ring-1 ring-emerald-300/30'
                : 'bg-white/5 ring-1 ring-white/10 hover:bg-white/8'
            }`}
          >
            {active && (
              <motion.span
                layoutId="diet-active"
                className="absolute inset-0 rounded-xl bg-emerald-400/10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative text-2xl">{opt.icon}</span>
            <span className={`relative text-xs font-semibold ${active ? 'text-emerald-100' : 'text-zinc-200/80'}`}>
              {opt.label}
            </span>
            <span className="relative text-[10px] text-zinc-200/50">{opt.desc}</span>
            <span className={`relative rounded-full px-1.5 py-0.5 text-[9px] font-semibold ring-1 ${active ? 'bg-emerald-300/10 text-emerald-200 ring-emerald-200/20' : 'bg-white/5 text-zinc-200/50 ring-white/10'}`}>
              {opt.co2}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
