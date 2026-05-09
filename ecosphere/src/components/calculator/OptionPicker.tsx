import { motion } from 'framer-motion'

interface Option<T extends string> {
  value: T
  label: string
  icon: string
}

interface OptionPickerProps<T extends string> {
  options: Option<T>[]
  value: T
  onChange: (v: T) => void
  layoutId: string
  accentColor?: 'emerald' | 'cyan' | 'violet' | 'orange'
}

const activeStyles = {
  emerald: 'bg-emerald-400/15 ring-1 ring-emerald-300/30 text-emerald-100',
  cyan: 'bg-cyan-400/15 ring-1 ring-cyan-300/30 text-cyan-100',
  violet: 'bg-violet-400/15 ring-1 ring-violet-300/30 text-violet-100',
  orange: 'bg-orange-400/15 ring-1 ring-orange-300/30 text-orange-100',
}

const activeBg = {
  emerald: 'bg-emerald-400/10',
  cyan: 'bg-cyan-400/10',
  violet: 'bg-violet-400/10',
  orange: 'bg-orange-400/10',
}

export function OptionPicker<T extends string>({
  options,
  value,
  onChange,
  layoutId,
  accentColor = 'emerald',
}: OptionPickerProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <motion.button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            whileTap={{ scale: 0.95 }}
            className={`relative inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 ${
              active ? activeStyles[accentColor] : 'bg-white/5 text-zinc-200/70 ring-1 ring-white/10 hover:bg-white/8 hover:text-zinc-50'
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className={`absolute inset-0 rounded-xl ${activeBg[accentColor]}`}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{opt.icon}</span>
            <span className="relative">{opt.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
