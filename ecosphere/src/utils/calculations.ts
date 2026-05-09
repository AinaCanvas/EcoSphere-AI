// ─── Carbon Footprint Calculation Engine ────────────────────────────────────
// All values are in kg CO₂e per year unless noted.
// Emission factors are simplified approximations for demo purposes.

export interface TransportInputs {
  carKmPerWeek: number        // km/week by personal car
  publicTransportHrsPerWeek: number
  flightsPerYear: number      // short-haul equivalent
  bikeKmPerWeek: number       // zero emission, offsets
}

export type DietType = 'vegan' | 'vegetarian' | 'mixed' | 'heavy_meat'

export interface HomeEnergyInputs {
  electricityKwhPerMonth: number
  gasUnitsPerMonth: number    // cubic meters
  renewablePercent: number    // 0–100
}

export interface LifestyleInputs {
  onlineOrdersPerMonth: number
  clothingItemsPerYear: number
  plasticUsage: 'low' | 'medium' | 'high'
  recyclingHabit: 'always' | 'sometimes' | 'rarely' | 'never'
}

export interface CalculatorInputs {
  transport: TransportInputs
  diet: DietType
  homeEnergy: HomeEnergyInputs
  lifestyle: LifestyleInputs
}

// ── Emission factors ──────────────────────────────────────────────────────────
const EF = {
  car: 0.21,              // kg CO₂e per km
  publicTransport: 0.089, // kg CO₂e per hour (bus/metro mix)
  flight: 1_100,          // kg CO₂e per short-haul return flight
  diet: {
    vegan: 1_500,
    vegetarian: 1_700,
    mixed: 2_500,
    heavy_meat: 3_300,
  },
  electricity: 0.42,      // kg CO₂e per kWh
  gas: 2.04,              // kg CO₂e per cubic meter
  onlineOrder: 4.5,       // kg CO₂e per order (packaging + delivery)
  clothing: 12,           // kg CO₂e per item
  plastic: { low: 50, medium: 150, high: 300 },
  recycling: { always: -120, sometimes: -60, rarely: -20, never: 0 },
} as const

export interface BreakdownItem {
  category: string
  value: number   // kg CO₂e / year
  color: string
}

export interface CalculationResult {
  totalKgPerYear: number
  totalKgPerMonth: number
  breakdown: BreakdownItem[]
  impactLevel: 'Low' | 'Moderate' | 'High' | 'Critical'
  impactScore: number       // 0–100 (lower = better)
  globalAvgKgPerYear: number
  potentialSavingsKgPerYear: number
  tips: EcoTip[]
}

export interface EcoTip {
  id: string
  category: string
  icon: string
  title: string
  description: string
  savingKgPerYear: number
  priority: 'high' | 'medium' | 'low'
}

const GLOBAL_AVG = 7_000 // kg CO₂e per year (world average ~4t, developed ~7t)

export function calculateFootprint(inputs: CalculatorInputs): CalculationResult {
  // Transport
  const carAnnual = inputs.transport.carKmPerWeek * 52 * EF.car
  const ptAnnual = inputs.transport.publicTransportHrsPerWeek * 52 * EF.publicTransport
  const flightAnnual = inputs.transport.flightsPerYear * EF.flight
  const transportTotal = carAnnual + ptAnnual + flightAnnual

  // Diet
  const dietTotal = EF.diet[inputs.diet]

  // Home energy
  const rawElec = inputs.homeEnergy.electricityKwhPerMonth * 12 * EF.electricity
  const elecTotal = rawElec * (1 - inputs.homeEnergy.renewablePercent / 100)
  const gasTotal = inputs.homeEnergy.gasUnitsPerMonth * 12 * EF.gas
  const energyTotal = elecTotal + gasTotal

  // Lifestyle
  const shoppingTotal = inputs.lifestyle.onlineOrdersPerMonth * 12 * EF.onlineOrder
  const clothingTotal = inputs.lifestyle.clothingItemsPerYear * EF.clothing
  const plasticTotal = EF.plastic[inputs.lifestyle.plasticUsage]
  const recyclingOffset = EF.recycling[inputs.lifestyle.recyclingHabit]
  const lifestyleTotal = shoppingTotal + clothingTotal + plasticTotal + recyclingOffset

  const totalKgPerYear = Math.max(
    0,
    transportTotal + dietTotal + energyTotal + lifestyleTotal,
  )

  const breakdown: BreakdownItem[] = [
    { category: 'Transport', value: Math.round(transportTotal), color: '#22ffa8' },
    { category: 'Diet', value: Math.round(dietTotal), color: '#4ad8ff' },
    { category: 'Home Energy', value: Math.round(energyTotal), color: '#a78bfa' },
    { category: 'Lifestyle', value: Math.round(lifestyleTotal), color: '#fb923c' },
  ]

  // Impact level thresholds (kg/year)
  let impactLevel: CalculationResult['impactLevel']
  if (totalKgPerYear < 3_000) impactLevel = 'Low'
  else if (totalKgPerYear < 6_000) impactLevel = 'Moderate'
  else if (totalKgPerYear < 10_000) impactLevel = 'High'
  else impactLevel = 'Critical'

  // Score 0–100 (100 = worst, 0 = best), capped at 15,000 kg
  const impactScore = Math.min(100, Math.round((totalKgPerYear / 15_000) * 100))

  // Potential savings (rough estimate: 30% reduction achievable)
  const potentialSavingsKgPerYear = Math.round(totalKgPerYear * 0.3)

  const tips = generateTips(inputs, { carAnnual, flightAnnual, energyTotal, dietTotal })

  return {
    totalKgPerYear: Math.round(totalKgPerYear),
    totalKgPerMonth: Math.round(totalKgPerYear / 12),
    breakdown,
    impactLevel,
    impactScore,
    globalAvgKgPerYear: GLOBAL_AVG,
    potentialSavingsKgPerYear,
    tips,
  }
}

function generateTips(
  inputs: CalculatorInputs,
  computed: { carAnnual: number; flightAnnual: number; energyTotal: number; dietTotal: number },
): EcoTip[] {
  const tips: EcoTip[] = []

  if (inputs.transport.carKmPerWeek > 100) {
    tips.push({
      id: 'car-reduce',
      category: 'Transport',
      icon: '🚌',
      title: 'Switch to public transport',
      description: 'Replace 3 car trips/week with bus or metro to cut transport emissions significantly.',
      savingKgPerYear: Math.round(computed.carAnnual * 0.25),
      priority: 'high',
    })
  }

  if (inputs.transport.flightsPerYear > 2) {
    tips.push({
      id: 'flight-reduce',
      category: 'Transport',
      icon: '✈️',
      title: 'Reduce air travel',
      description: 'One fewer short-haul flight per year saves over 1 tonne of CO₂.',
      savingKgPerYear: Math.round(computed.flightAnnual * 0.3),
      priority: 'high',
    })
  }

  if (inputs.transport.bikeKmPerWeek < 20) {
    tips.push({
      id: 'bike-more',
      category: 'Transport',
      icon: '🚴',
      title: 'Cycle short distances',
      description: 'Biking instead of driving for trips under 5 km saves fuel and improves health.',
      savingKgPerYear: 200,
      priority: 'medium',
    })
  }

  if (inputs.diet === 'heavy_meat' || inputs.diet === 'mixed') {
    tips.push({
      id: 'diet-plant',
      category: 'Diet',
      icon: '🥗',
      title: 'Try plant-based meals',
      description: 'Replacing meat 3 days/week with plant-based options can save 500+ kg CO₂/year.',
      savingKgPerYear: inputs.diet === 'heavy_meat' ? 800 : 400,
      priority: 'high',
    })
  }

  if (inputs.homeEnergy.renewablePercent < 50) {
    tips.push({
      id: 'renewable',
      category: 'Energy',
      icon: '☀️',
      title: 'Switch to renewable energy',
      description: 'Choosing a green energy tariff or installing solar panels dramatically cuts home emissions.',
      savingKgPerYear: Math.round(computed.energyTotal * 0.4),
      priority: 'high',
    })
  }

  if (inputs.homeEnergy.electricityKwhPerMonth > 300) {
    tips.push({
      id: 'led-lights',
      category: 'Energy',
      icon: '💡',
      title: 'Switch to LED lighting',
      description: 'LED bulbs use 75% less energy than incandescent. Easy swap, big savings.',
      savingKgPerYear: 120,
      priority: 'medium',
    })
  }

  if (inputs.lifestyle.plasticUsage !== 'low') {
    tips.push({
      id: 'plastic-reduce',
      category: 'Lifestyle',
      icon: '♻️',
      title: 'Reduce single-use plastic',
      description: 'Carry a reusable bag, bottle, and coffee cup to cut plastic waste significantly.',
      savingKgPerYear: 100,
      priority: 'medium',
    })
  }

  if (inputs.lifestyle.recyclingHabit === 'rarely' || inputs.lifestyle.recyclingHabit === 'never') {
    tips.push({
      id: 'recycle-more',
      category: 'Lifestyle',
      icon: '🗑️',
      title: 'Recycle consistently',
      description: 'Sorting waste properly reduces landfill methane and saves raw material energy.',
      savingKgPerYear: 120,
      priority: 'medium',
    })
  }

  if (inputs.lifestyle.onlineOrdersPerMonth > 8) {
    tips.push({
      id: 'batch-orders',
      category: 'Lifestyle',
      icon: '📦',
      title: 'Batch your online orders',
      description: 'Consolidating deliveries reduces packaging and last-mile transport emissions.',
      savingKgPerYear: Math.round(inputs.lifestyle.onlineOrdersPerMonth * 12 * 4.5 * 0.2),
      priority: 'low',
    })
  }

  // Always add a general tip
  tips.push({
    id: 'eat-local',
    category: 'Diet',
    icon: '🌿',
    title: 'Buy local & seasonal food',
    description: 'Local produce travels less and is often grown with fewer inputs. Great for taste too.',
    savingKgPerYear: 150,
    priority: 'low',
  })

  return tips.slice(0, 6)
}

export const MONTHLY_TREND = [
  { month: 'Jan', you: 620, avg: 583 },
  { month: 'Feb', you: 590, avg: 583 },
  { month: 'Mar', you: 570, avg: 583 },
  { month: 'Apr', you: 545, avg: 583 },
  { month: 'May', you: 530, avg: 583 },
  { month: 'Jun', you: 510, avg: 583 },
]
