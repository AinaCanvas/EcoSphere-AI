import type { CalculatorInputs } from '../utils/calculations'

export const defaultInputs: CalculatorInputs = {
  transport: {
    carKmPerWeek: 80,
    publicTransportHrsPerWeek: 3,
    flightsPerYear: 2,
    bikeKmPerWeek: 10,
  },
  diet: 'mixed',
  homeEnergy: {
    electricityKwhPerMonth: 250,
    gasUnitsPerMonth: 30,
    renewablePercent: 20,
  },
  lifestyle: {
    onlineOrdersPerMonth: 6,
    clothingItemsPerYear: 20,
    plasticUsage: 'medium',
    recyclingHabit: 'sometimes',
  },
}

export const impactConfig = {
  Low: {
    color: '#22ffa8',
    bg: 'bg-emerald-300/10',
    ring: 'ring-emerald-200/20',
    text: 'text-emerald-200',
    glow: 'rgba(34,255,168,0.2)',
    label: 'Eco Champion',
    emoji: '🌱',
    description: "You're living sustainably. Keep inspiring others!",
  },
  Moderate: {
    color: '#4ad8ff',
    bg: 'bg-cyan-300/10',
    ring: 'ring-cyan-200/20',
    text: 'text-cyan-200',
    glow: 'rgba(74,216,255,0.2)',
    label: 'Green Aware',
    emoji: '🌿',
    description: 'Good progress! A few changes can make a big difference.',
  },
  High: {
    color: '#fb923c',
    bg: 'bg-orange-300/10',
    ring: 'ring-orange-200/20',
    text: 'text-orange-200',
    glow: 'rgba(251,146,60,0.2)',
    label: 'Needs Attention',
    emoji: '⚠️',
    description: 'Your footprint is above average. Time to take action.',
  },
  Critical: {
    color: '#f87171',
    bg: 'bg-red-300/10',
    ring: 'ring-red-200/20',
    text: 'text-red-300',
    glow: 'rgba(248,113,113,0.2)',
    label: 'Critical Impact',
    emoji: '🔴',
    description: 'Urgent action needed. Small steps today = big change tomorrow.',
  },
} as const
