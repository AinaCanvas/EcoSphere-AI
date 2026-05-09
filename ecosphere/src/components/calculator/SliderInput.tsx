import { motion } from 'framer-motion'

interface SliderInputProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit: string
  onChange: (v: number) => void
  accentColor?: 'emerald' | 'cyan' | 'violet' | 'orange'
  icon?: string
}

const trackColors = {
  emerald: 'from-emerald-400 to-emerald-300',
  cyan: 'from-cyan-400 to-cyan-300',
  violet: 'from-violet-400 to-violet-300',
  orange: 'from-orange-400 to-orange-300',
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  accentColor = 'emerald',
  icon,
}: SliderInputProps) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-xs text-zinc-200/70">
          {icon && <span>{icon}</span>}
          {label}
        </label>
        <motion.span
          key={value}
          className="rounded-lg bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-zinc-50 ring-1 ring-white/10"
          initial={{ scale: 0.85, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          {value} {unit}
        </motion.span>
      </div>

      <div className="relative flex h-6 items-center">
        {/* Track background */}
        <div className="absolute h-1.5 w-full overflow-hidden rounded-full bg-white/8 ring-1 ring-white/10">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${trackColors[accentColor]}`}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(34,255,168,0.6)] [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-emerald-300/50 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white"
        />
      </div>
    </div>
  )
}
