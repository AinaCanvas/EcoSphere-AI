import { Bike, Car, Home, ShoppingBag, Utensils } from 'lucide-react'
import type { CalculatorInputs, DietType } from '../../utils/calculations'
import { DietSelector } from './DietSelector'
import { FormSection } from './FormSection'
import { OptionPicker } from './OptionPicker'
import { SliderInput } from './SliderInput'
import { GlowButton } from '../GlowButton'
import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'

interface CalculatorFormProps {
  inputs: CalculatorInputs
  onChange: (inputs: CalculatorInputs) => void
  onCalculate: () => void
}

const plasticOptions = [
  { value: 'low' as const, label: 'Low', icon: '✅' },
  { value: 'medium' as const, label: 'Medium', icon: '⚠️' },
  { value: 'high' as const, label: 'High', icon: '🚨' },
]

const recyclingOptions = [
  { value: 'always' as const, label: 'Always', icon: '♻️' },
  { value: 'sometimes' as const, label: 'Sometimes', icon: '🔄' },
  { value: 'rarely' as const, label: 'Rarely', icon: '😐' },
  { value: 'never' as const, label: 'Never', icon: '❌' },
]

export function CalculatorForm({ inputs, onChange, onCalculate }: CalculatorFormProps) {
  const setTransport = (key: keyof typeof inputs.transport, val: number) =>
    onChange({ ...inputs, transport: { ...inputs.transport, [key]: val } })

  const setEnergy = (key: keyof typeof inputs.homeEnergy, val: number) =>
    onChange({ ...inputs, homeEnergy: { ...inputs.homeEnergy, [key]: val } })

  const setLifestyle = <K extends keyof typeof inputs.lifestyle>(
    key: K,
    val: (typeof inputs.lifestyle)[K],
  ) => onChange({ ...inputs, lifestyle: { ...inputs.lifestyle, [key]: val } })

  return (
    <div className="flex flex-col gap-5">
      {/* Transport */}
      <FormSection
        index={0}
        icon={<Car className="h-5 w-5" />}
        title="Transport"
        subtitle="How do you get around?"
        accentColor="emerald"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <SliderInput
            label="Car usage"
            value={inputs.transport.carKmPerWeek}
            min={0} max={500} step={5} unit="km/week"
            onChange={(v) => setTransport('carKmPerWeek', v)}
            accentColor="emerald" icon="🚗"
          />
          <SliderInput
            label="Public transport"
            value={inputs.transport.publicTransportHrsPerWeek}
            min={0} max={30} step={1} unit="hrs/week"
            onChange={(v) => setTransport('publicTransportHrsPerWeek', v)}
            accentColor="emerald" icon="🚌"
          />
          <SliderInput
            label="Flights per year"
            value={inputs.transport.flightsPerYear}
            min={0} max={20} step={1} unit="flights"
            onChange={(v) => setTransport('flightsPerYear', v)}
            accentColor="emerald" icon="✈️"
          />
          <SliderInput
            label="Cycling"
            value={inputs.transport.bikeKmPerWeek}
            min={0} max={200} step={5} unit="km/week"
            onChange={(v) => setTransport('bikeKmPerWeek', v)}
            accentColor="emerald" icon="🚴"
          />
        </div>
      </FormSection>

      {/* Diet */}
      <FormSection
        index={1}
        icon={<Utensils className="h-5 w-5" />}
        title="Diet"
        subtitle="What best describes your eating habits?"
        accentColor="cyan"
      >
        <DietSelector
          value={inputs.diet}
          onChange={(v: DietType) => onChange({ ...inputs, diet: v })}
        />
      </FormSection>

      {/* Home Energy */}
      <FormSection
        index={2}
        icon={<Home className="h-5 w-5" />}
        title="Home Energy"
        subtitle="Your household energy consumption"
        accentColor="violet"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <SliderInput
            label="Electricity"
            value={inputs.homeEnergy.electricityKwhPerMonth}
            min={0} max={1000} step={10} unit="kWh/mo"
            onChange={(v) => setEnergy('electricityKwhPerMonth', v)}
            accentColor="violet" icon="⚡"
          />
          <SliderInput
            label="Gas usage"
            value={inputs.homeEnergy.gasUnitsPerMonth}
            min={0} max={200} step={5} unit="m³/mo"
            onChange={(v) => setEnergy('gasUnitsPerMonth', v)}
            accentColor="violet" icon="🔥"
          />
          <div className="sm:col-span-2">
            <SliderInput
              label="Renewable energy share"
              value={inputs.homeEnergy.renewablePercent}
              min={0} max={100} step={5} unit="%"
              onChange={(v) => setEnergy('renewablePercent', v)}
              accentColor="violet" icon="☀️"
            />
          </div>
        </div>
      </FormSection>

      {/* Lifestyle */}
      <FormSection
        index={3}
        icon={<ShoppingBag className="h-5 w-5" />}
        title="Shopping & Lifestyle"
        subtitle="Consumption and waste habits"
        accentColor="orange"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <SliderInput
            label="Online orders"
            value={inputs.lifestyle.onlineOrdersPerMonth}
            min={0} max={30} step={1} unit="/month"
            onChange={(v) => setLifestyle('onlineOrdersPerMonth', v)}
            accentColor="orange" icon="📦"
          />
          <SliderInput
            label="Clothing items bought"
            value={inputs.lifestyle.clothingItemsPerYear}
            min={0} max={100} step={1} unit="/year"
            onChange={(v) => setLifestyle('clothingItemsPerYear', v)}
            accentColor="orange" icon="👕"
          />
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs text-zinc-200/70">
              <Bike className="h-3.5 w-3.5" />
              Plastic usage
            </p>
            <OptionPicker
              options={plasticOptions}
              value={inputs.lifestyle.plasticUsage}
              onChange={(v) => setLifestyle('plasticUsage', v)}
              layoutId="plastic-picker"
              accentColor="orange"
            />
          </div>
          <div>
            <p className="mb-2 text-xs text-zinc-200/70">♻️ Recycling habit</p>
            <OptionPicker
              options={recyclingOptions}
              value={inputs.lifestyle.recyclingHabit}
              onChange={(v) => setLifestyle('recyclingHabit', v)}
              layoutId="recycling-picker"
              accentColor="orange"
            />
          </div>
        </div>
      </FormSection>

      {/* Calculate button */}
      <motion.div
        className="flex justify-center pt-2"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={4}
      >
        <GlowButton
          onClick={onCalculate}
          className="glow-ring px-8 py-3 text-base"
        >
          <span className="text-lg">🌍</span>
          Calculate My Footprint
        </GlowButton>
      </motion.div>
    </div>
  )
}
