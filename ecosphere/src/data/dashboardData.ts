// ─── Dashboard Mock Data ────────────────────────────────────────────────────

export const userProfile = {
  name: 'Alex Rivera',
  avatar: 'AR',
  level: 'Green Warrior',
  xp: 3240,
  xpToNext: 5000,
  sustainabilityLevel: 7,
  notifications: 4,
}

export const carbonScore = {
  score: 74,
  maxScore: 100,
  weeklyImprovement: 12.4,
  dailyTarget: 5.0,
  todayEmission: 4.3,
  unit: 'kg CO₂',
}

export const streakData = {
  current: 14,
  longest: 21,
  weeklyConsistency: 85,
  weekDays: [true, true, true, false, true, true, true],
}

export const weeklyAnalytics = [
  { day: 'Mon', carbon: 6.2, target: 5.0 },
  { day: 'Tue', carbon: 5.8, target: 5.0 },
  { day: 'Wed', carbon: 4.9, target: 5.0 },
  { day: 'Thu', carbon: 5.3, target: 5.0 },
  { day: 'Fri', carbon: 4.3, target: 5.0 },
  { day: 'Sat', carbon: 3.8, target: 5.0 },
  { day: 'Sun', carbon: 4.1, target: 5.0 },
]

export const challengesCompleted = 18
export const sustainabilityTrend = [42, 55, 61, 58, 67, 72, 74]

export type ActionCategory = 'Energy' | 'Recycling' | 'Transport' | 'Challenges'

export type GreenAction = {
  id: string
  icon: string
  title: string
  points: number
  timestamp: string
  status: 'Completed' | 'In Progress' | 'Pending'
  category: ActionCategory
}

export const greenActions: GreenAction[] = [
  {
    id: '1',
    icon: '🚴',
    title: 'Cycling to Work',
    points: 120,
    timestamp: 'Today, 8:30 AM',
    status: 'Completed',
    category: 'Transport',
  },
  {
    id: '2',
    icon: '♻️',
    title: 'Recycling Plastics',
    points: 80,
    timestamp: 'Today, 10:15 AM',
    status: 'Completed',
    category: 'Recycling',
  },
  {
    id: '3',
    icon: '⚡',
    title: 'Energy Saving Mode',
    points: 60,
    timestamp: 'Today, 12:00 PM',
    status: 'In Progress',
    category: 'Energy',
  },
  {
    id: '4',
    icon: '💧',
    title: 'Water Conservation',
    points: 50,
    timestamp: 'Yesterday, 7:00 PM',
    status: 'Completed',
    category: 'Energy',
  },
  {
    id: '5',
    icon: '🌳',
    title: 'Tree Plantation Drive',
    points: 200,
    timestamp: 'Yesterday, 3:00 PM',
    status: 'Completed',
    category: 'Challenges',
  },
  {
    id: '6',
    icon: '🛴',
    title: 'E-Scooter Commute',
    points: 90,
    timestamp: '2 days ago',
    status: 'Completed',
    category: 'Transport',
  },
  {
    id: '7',
    icon: '🥗',
    title: 'Plant-Based Meal',
    points: 45,
    timestamp: '2 days ago',
    status: 'Pending',
    category: 'Challenges',
  },
  {
    id: '8',
    icon: '🔋',
    title: 'Solar Panel Usage',
    points: 150,
    timestamp: '3 days ago',
    status: 'Completed',
    category: 'Energy',
  },
]

export type Badge = {
  id: string
  name: string
  icon: string
  description: string
  xpRequired: number
  unlocked: boolean
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
}

export const badges: Badge[] = [
  {
    id: '1',
    name: 'Eco Beginner',
    icon: '🌱',
    description: 'Started your sustainability journey',
    xpRequired: 500,
    unlocked: true,
    rarity: 'Common',
  },
  {
    id: '2',
    name: 'Green Warrior',
    icon: '⚔️',
    description: 'Completed 10 eco challenges',
    xpRequired: 2000,
    unlocked: true,
    rarity: 'Rare',
  },
  {
    id: '3',
    name: 'Carbon Saver',
    icon: '🌍',
    description: 'Reduced carbon by 50kg this month',
    xpRequired: 3500,
    unlocked: false,
    rarity: 'Epic',
  },
  {
    id: '4',
    name: 'Planet Protector',
    icon: '🛡️',
    description: 'Achieved top 1% sustainability score',
    xpRequired: 7500,
    unlocked: false,
    rarity: 'Legendary',
  },
]

export const ecoQuotes = [
  'The Earth does not belong to us. We belong to the Earth.',
  'Small acts, when multiplied by millions of people, can transform the world.',
  'We do not inherit the Earth from our ancestors; we borrow it from our children.',
  'The greatest threat to our planet is the belief that someone else will save it.',
]

export const dailyQuote = ecoQuotes[new Date().getDay() % ecoQuotes.length]
