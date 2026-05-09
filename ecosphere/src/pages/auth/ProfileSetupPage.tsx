import { AnimatePresence, motion } from 'framer-motion'
import {
  Bike,
  Bus,
  Car,
  CheckCircle2,
  ChevronRight,
  Leaf,
  Loader2,
  Salad,
  Target,
  Utensils,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { fadeUp, scaleIn, staggerContainer } from '../../animations/variants'
import { AuthBackgroundFX } from '../../components/auth/AuthBackgroundFX'
import { AuthNavbar } from '../../components/auth/AuthNavbar'
import {
  type DietType,
  type EcoGoal,
  type TransportHabit,
  saveProfile,
} from '../../utils/authHelpers'

interface ProfileSetupPageProps {
  onNavigateHome?: () => void
  onSetupComplete?: () => void
  onSkip?: () => void
}

type OptionItem<T> = { value: T; label: string; desc: string; icon: React.ReactNode; color: string }

const transportOptions: OptionItem<TransportHabit>[] = [
  { value: 'Car',    label: 'Car',           desc: 'Primary driver',       icon: <Car className="h-5 w-5" />,  color: 'text-orange-300 bg-orange-400/10 ring-orange-300/20' },
  { value: 'Public', label: 'Public Transit', desc: 'Bus, metro, train',    icon: <Bus className="h-5 w-5" />,  color: 'text-cyan-300 bg-cyan-400/10 ring-cyan-300/20' },
  { value: 'Bike',   label: 'Cycling',        desc: 'Bike or e-bike',       icon: <Bike className="h-5 w-5" />, color: 'text-emerald-300 bg-emerald-400/10 ring-emerald-300/20' },
  { value: 'Walk',   label: 'Walking',         desc: 'Mostly on foot',       icon: <Leaf className="h-5 w-5" />, color: 'text-green-300 bg-green-400/10 ring-green-300/20' },
]

const dietOptions: OptionItem<DietType>[] = [
  { value: 'Vegan',       label: 'Vegan',        desc: 'No animal products',    icon: <Salad className="h-5 w-5" />,   color: 'text-emerald-300 bg-emerald-400/10 ring-emerald-300/20' },
  { value: 'Vegetarian',  label: 'Vegetarian',   desc: 'No meat',               icon: <Leaf className="h-5 w-5" />,    color: 'text-green-300 bg-green-400/10 ring-green-300/20' },
  { value: 'Mixed',       label: 'Mixed',         desc: 'Balanced diet',         icon: <Utensils className="h-5 w-5" />, color: 'text-yellow-300 bg-yellow-400/10 ring-yellow-300/20' },
  { value: 'Heavy Meat',  label: 'Heavy Meat',   desc: 'Meat-heavy diet',       icon: <Utensils className="h-5 w-5" />, color: 'text-red-300 bg-red-400/10 ring-red-300/20' },
]

const goalOptions: OptionItem<EcoGoal>[] = [
  { value: 'Reduce Carbon',   label: 'Reduce Carbon',   desc: 'Lower my CO₂ footprint',  icon: <Leaf className="h-5 w-5" />,   color: 'text-emerald-300 bg-emerald-400/10 ring-emerald-300/20' },
  { value: 'Save Energy',     label: 'Save Energy',     desc: 'Cut energy consumption',  icon: <Zap className="h-5 w-5" />,    color: 'text-yellow-300 bg-yellow-400/10 ring-yellow-300/20' },
  { value: 'Waste Reduction', label: 'Waste Reduction', desc: 'Minimize waste output',   icon: <Target className="h-5 w-5" />, color: 'text-cyan-300 bg-cyan-400/10 ring-cyan-300/20' },
  { value: 'All of the above',label: 'All of the above',desc: 'Full sustainability mode', icon: <CheckCircle2 className="h-5 w-5" />, color: 'text-purple-300 bg-purple-400/10 ring-purple-300/20' },
]

function OptionGrid<T extends string>({
  options,
  selected,
  onSelect,
}: {
  options: OptionItem<T>[]
  selected: T | null
  onSelect: (v: T) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt) => {
        const active = selected === opt.value
        return (
          <motion.button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all duration-200 focus:outline-none ${
              active
                ? 'border-emerald-400/40 bg-emerald-400/10 shadow-[0_0_20px_rgba(34,255,168,0.12)]'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
            }`}
          >
            {active && (
              <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20 ring-1 ring-emerald-300/40">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
              </span>
            )}
            <span className={`grid h-9 w-9 place-items-center rounded-xl ring-1 ${opt.color}`}>
              {opt.icon}
            </span>
            <div>
              <p className="text-sm font-semibold text-zinc-100">{opt.label}</p>
              <p className="text-xs text-zinc-500">{opt.desc}</p>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}

const STEPS = ['Transport', 'Diet', 'Goal'] as const
type Step = 0 | 1 | 2

export function ProfileSetupPage({ onNavigateHome, onSetupComplete, onSkip }: ProfileSetupPageProps) {
  const [step, setStep]           = useState<Step>(0)
  const [transport, setTransport] = useState<TransportHabit | null>(null)
  const [diet, setDiet]           = useState<DietType | null>(null)
  const [goal, setGoal]           = useState<EcoGoal | null>(null)
  const [loading, setLoading]     = useState(false)
  const [done, setDone]           = useState(false)

  const currentSelection = [transport, diet, goal][step]

  function canAdvance() {
    return currentSelection !== null
  }

  async function handleNext() {
    if (step < 2) {
      setStep((s) => (s + 1) as Step)
    } else {
      // Save and finish
      setLoading(true)
      await new Promise((r) => setTimeout(r, 800))
      saveProfile({
        transport: transport!,
        diet: diet!,
        goal: goal!,
      })
      setLoading(false)
      setDone(true)
      setTimeout(() => onSetupComplete?.(), 1400)
    }
  }

  const stepTitles = [
    { title: 'How do you get around?', sub: 'Your primary mode of transport' },
    { title: 'What\'s your diet like?', sub: 'Helps us estimate your food footprint' },
    { title: 'What\'s your eco goal?', sub: 'We\'ll tailor challenges to match' },
  ]

  return (
    <div className="min-h-screen">
      <AuthBackgroundFX />
      <AuthNavbar onNavigateHome={onNavigateHome} />

      <main className="flex min-h-screen items-center justify-center px-4 py-24">
        <motion.div
          className="w-full max-w-lg"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                className="glass glow-ring rounded-2xl p-10 text-center shadow-[0_10px_60px_-30px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-emerald-400/15 ring-1 ring-emerald-300/30 shadow-[0_0_30px_rgba(34,255,168,0.2)]">
                  <CheckCircle2 className="h-8 w-8 text-emerald-300" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-50">Profile complete!</h2>
                <p className="mt-2 text-sm text-zinc-400">Taking you to your dashboard…</p>
                <div className="mt-6 flex justify-center">
                  <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="setup"
                className="glass glow-ring rounded-2xl p-8 shadow-[0_10px_60px_-30px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                {/* Header */}
                <motion.div className="mb-6" variants={fadeUp} custom={0}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-400/10 ring-1 ring-emerald-300/20">
                        <Leaf className="h-4 w-4 text-emerald-300" />
                      </div>
                      <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                        Sustainability Profile
                      </span>
                    </div>
                    <button
                      onClick={onSkip}
                      className="text-xs text-zinc-600 transition hover:text-zinc-400 focus:outline-none"
                    >
                      Skip for now
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-5 flex gap-1.5">
                    {STEPS.map((s, i) => (
                      <div key={s} className="flex-1">
                        <div
                          className={`h-1 rounded-full transition-all duration-500 ${
                            i <= step ? 'bg-emerald-400' : 'bg-white/10'
                          }`}
                        />
                        <p className={`mt-1.5 text-center text-[10px] font-medium transition-colors ${
                          i === step ? 'text-emerald-400' : i < step ? 'text-zinc-500' : 'text-zinc-700'
                        }`}>
                          {s}
                        </p>
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-bold text-zinc-50">{stepTitles[step].title}</h2>
                      <p className="mt-1 text-sm text-zinc-400">{stepTitles[step].sub}</p>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Options */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                      {step === 0 && (
                        <OptionGrid options={transportOptions} selected={transport} onSelect={setTransport} />
                      )}
                      {step === 1 && (
                        <OptionGrid options={dietOptions} selected={diet} onSelect={setDiet} />
                      )}
                      {step === 2 && (
                        <OptionGrid options={goalOptions} selected={goal} onSelect={setGoal} />
                      )}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <motion.div className="mt-6 flex items-center justify-between" variants={fadeUp} custom={2}>
                  <button
                    type="button"
                    onClick={() => step > 0 && setStep((s) => (s - 1) as Step)}
                    disabled={step === 0}
                    className="rounded-xl px-4 py-2.5 text-sm text-zinc-400 ring-1 ring-white/10 transition hover:bg-white/5 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-30 focus:outline-none"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canAdvance() || loading}
                    className="group relative flex items-center gap-2 rounded-xl bg-emerald-400/15 px-5 py-2.5 text-sm font-semibold text-emerald-100 ring-1 ring-emerald-300/25 transition hover:bg-emerald-400/25 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(34,255,168,0.55),transparent_55%)]"
                    />
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : step < 2 ? (
                      <>Next <ChevronRight className="h-4 w-4" /></>
                    ) : (
                      <>Finish Setup <CheckCircle2 className="h-4 w-4" /></>
                    )}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p
            className="mt-6 text-center text-xs text-zinc-600"
            variants={fadeUp} custom={3}
          >
            Step {step + 1} of 3 — You can update this anytime in your profile settings
          </motion.p>
        </motion.div>
      </main>
    </div>
  )
}
