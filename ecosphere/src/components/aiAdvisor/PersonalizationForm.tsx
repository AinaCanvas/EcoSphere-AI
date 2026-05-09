import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Sliders } from 'lucide-react'
import { useState } from 'react'
import type { ActivityLevel, DietType, SustainabilityGoal, TransportHabit, UserPreferences } from '../../data/aiPrompts'
import { fadeUp } from '../../animations/variants'

interface PersonalizationFormProps {
  onGenerate: (prefs: UserPreferences) => void
}

type OptionSet<T> = { value: T; label: string; icon: string }[]

const transportOpts: OptionSet<TransportHabit> = [
  { value: 'Car',    label: 'Car',           icon: '🚗' },
  { value: 'Public', label: 'Public Transit', icon: '🚌' },
  { value: 'Bike',   label: 'Cycling',        icon: '🚴' },
  { value: 'Walk',   label: 'Walking',         icon: '🚶' },
]
const dietOpts: OptionSet<DietType> = [
  { value: 'Vegan',       label: 'Vegan',       icon: '🌱' },
  { value: 'Vegetarian',  label: 'Vegetarian',  icon: '🥦' },
  { value: 'Mixed',       label: 'Mixed',        icon: '🍽️' },
  { value: 'Heavy Meat',  label: 'Heavy Meat',  icon: '🥩' },
]
const activityOpts: OptionSet<ActivityLevel> = [
  { value: 'Sedentary',   label: 'Sedentary',   icon: '🪑' },
  { value: 'Light',       label: 'Light',        icon: '🚶' },
  { value: 'Active',      label: 'Active',       icon: '🏃' },
  { value: 'Very Active', label: 'Very Active',  icon: '⚡' },
]
const goalOpts: OptionSet<SustainabilityGoal> = [
  { value: 'Reduce Carbon',   label: 'Reduce Carbon',   icon: '🌍' },
  { value: 'Save Energy',     label: 'Save Energy',     icon: '💡' },
  { value: 'Waste Reduction', label: 'Waste Reduction', icon: '♻️' },
  { value: 'All of the above',label: 'All Goals',       icon: '🎯' },
]

function OptionRow<T extends string>({
  label, options, value, onChange,
}: { label: string; options: OptionSet<T>; value: T; onChange: (v: T) => void }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-zinc-400">{label}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium transition focus:outline-none ${
              value === o.value
                ? 'bg-violet-400/15 text-violet-200 ring-1 ring-violet-300/30'
                : 'bg-white/5 text-zinc-400 ring-1 ring-white/10 hover:bg-white/8 hover:text-zinc-200'
            }`}
          >
            <span>{o.icon}</span>
            <span className="truncate">{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function PersonalizationForm({ onGenerate }: PersonalizationFormProps) {
  const [open, setOpen] = useState(true)
  const [transport, setTransport]   = useState<TransportHabit>('Mixed' as TransportHabit)
  const [diet, setDiet]             = useState<DietType>('Mixed')
  const [activity, setActivity]     = useState<ActivityLevel>('Light')
  const [goal, setGoal]             = useState<SustainabilityGoal>('Reduce Carbon')

  // Default transport to Car so it's always valid
  const [transportVal, setTransportVal] = useState<TransportHabit>('Car')

  function handleGenerate() {
    onGenerate({ transport: transportVal, diet, activityLevel: activity, goal })
  }

  return (
    <motion.div
      className="glass glow-ring overflow-hidden rounded-2xl"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-4 focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-400/10 ring-1 ring-violet-300/20">
            <Sliders className="h-4 w-4 text-violet-300" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-zinc-50">Personalize Your Plan</p>
            <p className="text-[11px] text-zinc-500">Tell us about your habits for a tailored plan</p>
          </div>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-zinc-500" /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 px-6 pb-6 pt-4">
              <div className="flex flex-col gap-5">
                <OptionRow label="🚗 Transport habit" options={transportOpts} value={transportVal} onChange={setTransportVal} />
                <OptionRow label="🍽️ Diet type" options={dietOpts} value={diet} onChange={setDiet} />
                <OptionRow label="⚡ Activity level" options={activityOpts} value={activity} onChange={setActivity} />
                <OptionRow label="🎯 Sustainability goal" options={goalOpts} value={goal} onChange={setGoal} />

                <button
                  type="button"
                  onClick={handleGenerate}
                  className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-violet-400/15 py-3 text-sm font-semibold text-violet-100 ring-1 ring-violet-300/25 transition hover:bg-violet-400/25 focus:outline-none"
                >
                  <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.55),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(34,255,168,0.25),transparent_55%)]" />
                  ✨ Generate My Weekly Plan
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
