// ─── Eco-Action Log — Seed Data & Types ─────────────────────────────────────

export type ActionCategory =
  | 'Transport'
  | 'Energy'
  | 'Recycling'
  | 'Water'
  | 'Lifestyle'

export interface EcoAction {
  id: string
  title: string
  category: ActionCategory
  points: number
  date: string        // ISO date string
  time: string        // HH:MM
  notes?: string
  icon: string
}

// Seed actions (pre-populated feed)
export const seedActions: EcoAction[] = [
  {
    id: 'seed-1',
    title: 'Cycled to Work',
    category: 'Transport',
    points: 120,
    date: new Date().toISOString().slice(0, 10),
    time: '08:30',
    notes: 'Saved ~2.1 kg CO₂ vs driving',
    icon: '🚴',
  },
  {
    id: 'seed-2',
    title: 'Sorted Recycling',
    category: 'Recycling',
    points: 80,
    date: new Date().toISOString().slice(0, 10),
    time: '10:15',
    icon: '♻️',
  },
  {
    id: 'seed-3',
    title: 'Switched to LED Bulbs',
    category: 'Energy',
    points: 150,
    date: new Date(Date.now() - 86_400_000).toISOString().slice(0, 10),
    time: '18:00',
    notes: 'Replaced 6 bulbs in living room',
    icon: '💡',
  },
  {
    id: 'seed-4',
    title: 'Shorter Shower (5 min)',
    category: 'Water',
    points: 60,
    date: new Date(Date.now() - 86_400_000).toISOString().slice(0, 10),
    time: '07:45',
    icon: '💧',
  },
  {
    id: 'seed-5',
    title: 'Bought Second-Hand Jacket',
    category: 'Lifestyle',
    points: 200,
    date: new Date(Date.now() - 2 * 86_400_000).toISOString().slice(0, 10),
    time: '14:20',
    notes: 'Thrift store find — saved ~30 kg CO₂',
    icon: '👕',
  },
  {
    id: 'seed-6',
    title: 'Used Public Transport',
    category: 'Transport',
    points: 90,
    date: new Date(Date.now() - 2 * 86_400_000).toISOString().slice(0, 10),
    time: '09:00',
    icon: '🚌',
  },
  {
    id: 'seed-7',
    title: 'Composted Kitchen Waste',
    category: 'Recycling',
    points: 70,
    date: new Date(Date.now() - 3 * 86_400_000).toISOString().slice(0, 10),
    time: '19:30',
    icon: '🌿',
  },
  {
    id: 'seed-8',
    title: 'Turned Off Standby Devices',
    category: 'Energy',
    points: 50,
    date: new Date(Date.now() - 3 * 86_400_000).toISOString().slice(0, 10),
    time: '22:00',
    icon: '⚡',
  },
  {
    id: 'seed-9',
    title: 'Fixed Dripping Tap',
    category: 'Water',
    points: 110,
    date: new Date(Date.now() - 4 * 86_400_000).toISOString().slice(0, 10),
    time: '11:00',
    notes: 'Saves ~15 litres/day',
    icon: '🔧',
  },
  {
    id: 'seed-10',
    title: 'Plant-Based Meal Day',
    category: 'Lifestyle',
    points: 130,
    date: new Date(Date.now() - 4 * 86_400_000).toISOString().slice(0, 10),
    time: '12:30',
    icon: '🥗',
  },
  {
    id: 'seed-11',
    title: 'Walked Instead of Driving',
    category: 'Transport',
    points: 100,
    date: new Date(Date.now() - 5 * 86_400_000).toISOString().slice(0, 10),
    time: '08:00',
    icon: '🚶',
  },
  {
    id: 'seed-12',
    title: 'Unplugged Chargers',
    category: 'Energy',
    points: 30,
    date: new Date(Date.now() - 5 * 86_400_000).toISOString().slice(0, 10),
    time: '21:00',
    icon: '🔌',
  },
]

// Category config — colors, icons, point defaults
export const categoryConfig: Record<
  ActionCategory,
  {
    color: string
    bg: string
    ring: string
    text: string
    glow: string
    icon: string
    defaultPoints: number
    description: string
  }
> = {
  Transport: {
    color: '#4ad8ff',
    bg: 'bg-cyan-300/10',
    ring: 'ring-cyan-200/20',
    text: 'text-cyan-200',
    glow: 'rgba(74,216,255,0.15)',
    icon: '🚴',
    defaultPoints: 100,
    description: 'Cycling, walking, public transit',
  },
  Energy: {
    color: '#fbbf24',
    bg: 'bg-yellow-300/10',
    ring: 'ring-yellow-200/20',
    text: 'text-yellow-200',
    glow: 'rgba(251,191,36,0.15)',
    icon: '⚡',
    defaultPoints: 80,
    description: 'Saving electricity & gas',
  },
  Recycling: {
    color: '#22ffa8',
    bg: 'bg-emerald-300/10',
    ring: 'ring-emerald-200/20',
    text: 'text-emerald-200',
    glow: 'rgba(34,255,168,0.15)',
    icon: '♻️',
    defaultPoints: 70,
    description: 'Sorting, composting, reducing waste',
  },
  Water: {
    color: '#60a5fa',
    bg: 'bg-blue-300/10',
    ring: 'ring-blue-200/20',
    text: 'text-blue-200',
    glow: 'rgba(96,165,250,0.15)',
    icon: '💧',
    defaultPoints: 60,
    description: 'Conserving water usage',
  },
  Lifestyle: {
    color: '#c084fc',
    bg: 'bg-violet-300/10',
    ring: 'ring-violet-200/20',
    text: 'text-violet-200',
    glow: 'rgba(192,132,252,0.15)',
    icon: '🌿',
    defaultPoints: 120,
    description: 'Diet, shopping, daily habits',
  },
}

// Achievement badges
export interface AchievementBadge {
  id: string
  name: string
  icon: string
  description: string
  pointsRequired: number
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
  color: string
  bg: string
  ring: string
}

export const achievementBadges: AchievementBadge[] = [
  {
    id: 'eco-starter',
    name: 'Eco Starter',
    icon: '🌱',
    description: 'Logged your first eco action',
    pointsRequired: 1,
    rarity: 'Common',
    color: 'text-emerald-200',
    bg: 'bg-emerald-300/10',
    ring: 'ring-emerald-200/20',
  },
  {
    id: 'green-contributor',
    name: 'Green Contributor',
    icon: '🌿',
    description: 'Earned 500+ eco points',
    pointsRequired: 500,
    rarity: 'Rare',
    color: 'text-cyan-200',
    bg: 'bg-cyan-300/10',
    ring: 'ring-cyan-200/20',
  },
  {
    id: 'earth-saver',
    name: 'Earth Saver',
    icon: '🌍',
    description: 'Earned 1,500+ eco points',
    pointsRequired: 1500,
    rarity: 'Epic',
    color: 'text-violet-200',
    bg: 'bg-violet-300/10',
    ring: 'ring-violet-200/20',
  },
  {
    id: 'climate-hero',
    name: 'Climate Hero',
    icon: '🦸',
    description: 'Earned 3,000+ eco points',
    pointsRequired: 3000,
    rarity: 'Legendary',
    color: 'text-yellow-200',
    bg: 'bg-yellow-300/10',
    ring: 'ring-yellow-200/20',
  },
]

export type FilterCategory = 'All' | ActionCategory
