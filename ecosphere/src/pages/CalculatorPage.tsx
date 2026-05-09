import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { DashboardBackgroundFX } from '../components/dashboard/DashboardBackgroundFX'
import { CalcHero } from '../components/calculator/CalcHero'
import { CalcNavbar } from '../components/calculator/CalcNavbar'
import { CalculatorForm } from '../components/calculator/CalculatorForm'
import { ResultsCard } from '../components/calculator/ResultsCard'
import { defaultInputs } from '../data/calculatorDefaults'
import type { CalculatorInputs, CalculationResult } from '../utils/calculations'
import { calculateFootprint } from '../utils/calculations'

interface CalculatorPageProps {
  onBack: () => void
  onDashboard: () => void
}

export function CalculatorPage({ onBack, onDashboard }: CalculatorPageProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs)
  const [result, setResult] = useState<CalculationResult | null>(null)

  const handleCalculate = () => {
    const r = calculateFootprint(inputs)
    setResult(r)
    // Scroll to results
    setTimeout(() => {
      document.getElementById('calc-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleReset = () => {
    setResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#070A0F]">
      <DashboardBackgroundFX />
      <CalcNavbar onBack={onBack} onDashboard={onDashboard} />

      <main className="mx-auto w-full max-w-4xl px-4 pb-16 sm:px-6">
        <CalcHero />

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <CalculatorForm
                inputs={inputs}
                onChange={setInputs}
                onCalculate={handleCalculate}
              />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              id="calc-results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <ResultsCard result={result} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
