// ─── Community Challenges Mock Data ─────────────────────────────────────────

export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type ChallengeStatus = 'Active' | 'Popular' | 'Completed'
export type ChallengeCategory = 'Transport' | 'Energy' | 'Diet' | 'Recycling' | 'Nature' | 'Lifestyle'

export interface Challenge {
  id: string
  title: string
  description: string
  longDescription: string
  icon: string
  category: ChallengeCategory
  difficulty: Difficulty
  status: ChallengeStatus
  durationDays: number
  participants: number
  communityProgress: number   // 0–100 %
  co2SavedKg: number          // per participant
  ecoPoints: number
  tags: string[]
  featured?: boolean
  endsInDays: number
  motivationalQuote: string
}

export const challenges: Challenge[] = [
  {
    id: 'no-plastic-week',
    title: 'No Plastic Week',
    description: 'Eliminate single-use plastics from your daily routine for 7 days.',
    longDescription:
      'Swap plastic bags, bottles, and packaging for reusable alternatives. Track every swap and inspire your community to do the same.',
    icon: '♻️',
    category: 'Recycling',
    difficulty: 'Easy',
    status: 'Popular',
    durationDays: 7,
    participants: 12_480,
    communityProgress: 68,
    co2SavedKg: 4.2,
    ecoPoints: 150,
    tags: ['plastic-free', 'recycling', 'beginner'],
    featured: true,
    endsInDays: 4,
    motivationalQuote: 'Every piece of plastic you refuse is a win for the ocean.',
  },
  {
    id: 'bike-to-work',
    title: 'Bike to Work Challenge',
    description: 'Replace car commutes with cycling for 30 days straight.',
    longDescription:
      'Commit to cycling or walking for all trips under 5 km. Log your rides and watch your carbon savings stack up.',
    icon: '🚴',
    category: 'Transport',
    difficulty: 'Medium',
    status: 'Active',
    durationDays: 30,
    participants: 8_920,
    communityProgress: 54,
    co2SavedKg: 28.5,
    ecoPoints: 320,
    tags: ['cycling', 'transport', 'fitness'],
    endsInDays: 18,
    motivationalQuote: 'Two wheels, zero emissions, infinite impact.',
  },
  {
    id: 'energy-saver-month',
    title: 'Energy Saver Month',
    description: 'Cut your household electricity usage by 20% over 30 days.',
    longDescription:
      'Switch to LED bulbs, unplug idle devices, and optimise your thermostat. Small changes compound into massive savings.',
    icon: '⚡',
    category: 'Energy',
    difficulty: 'Medium',
    status: 'Active',
    durationDays: 30,
    participants: 6_340,
    communityProgress: 41,
    co2SavedKg: 35.0,
    ecoPoints: 280,
    tags: ['energy', 'home', 'savings'],
    endsInDays: 22,
    motivationalQuote: 'The greenest energy is the energy you never use.',
  },
  {
    id: 'plant-based-week',
    title: 'Plant-Based Week',
    description: 'Go fully plant-based for 7 days and discover delicious eco meals.',
    longDescription:
      'Explore vegan and vegetarian recipes, reduce meat consumption, and see how much CO₂ you save through diet alone.',
    icon: '🥗',
    category: 'Diet',
    difficulty: 'Easy',
    status: 'Active',
    durationDays: 7,
    participants: 9_750,
    communityProgress: 72,
    co2SavedKg: 12.0,
    ecoPoints: 200,
    tags: ['vegan', 'diet', 'health'],
    endsInDays: 3,
    motivationalQuote: 'Eat like the planet depends on it — because it does.',
  },
  {
    id: 'tree-planting-drive',
    title: 'Tree Planting Drive',
    description: 'Plant or sponsor a tree and contribute to global reforestation.',
    longDescription:
      'Partner with local nurseries or donate to verified reforestation projects. Every tree absorbs ~22 kg CO₂ per year.',
    icon: '🌳',
    category: 'Nature',
    difficulty: 'Hard',
    status: 'Popular',
    durationDays: 14,
    participants: 4_210,
    communityProgress: 38,
    co2SavedKg: 22.0,
    ecoPoints: 500,
    tags: ['trees', 'nature', 'reforestation'],
    endsInDays: 9,
    motivationalQuote: 'The best time to plant a tree was 20 years ago. The second best time is now.',
  },
  {
    id: 'zero-waste-kitchen',
    title: 'Zero Waste Kitchen',
    description: 'Reduce kitchen waste to near-zero through composting and smart shopping.',
    longDescription:
      'Plan meals to avoid food waste, compost scraps, and buy only what you need. The kitchen is the biggest waste hotspot in most homes.',
    icon: '🍃',
    category: 'Lifestyle',
    difficulty: 'Medium',
    status: 'Active',
    durationDays: 21,
    participants: 5_680,
    communityProgress: 59,
    co2SavedKg: 18.5,
    ecoPoints: 240,
    tags: ['zero-waste', 'food', 'composting'],
    endsInDays: 14,
    motivationalQuote: 'Waste less, live more.',
  },
  {
    id: 'public-transport-pledge',
    title: 'Public Transport Pledge',
    description: 'Ditch the car for public transport for 2 full weeks.',
    longDescription:
      'Use buses, trains, and metros exclusively for 14 days. Track your CO₂ savings and share your journey with the community.',
    icon: '🚌',
    category: 'Transport',
    difficulty: 'Easy',
    status: 'Active',
    durationDays: 14,
    participants: 7_120,
    communityProgress: 63,
    co2SavedKg: 21.0,
    ecoPoints: 180,
    tags: ['transport', 'public-transit', 'urban'],
    endsInDays: 7,
    motivationalQuote: 'Share the ride, share the planet.',
  },
  {
    id: 'solar-switch',
    title: 'Solar Switch Challenge',
    description: 'Transition at least one device or appliance to solar power.',
    longDescription:
      'Install a solar charger, solar garden lights, or explore community solar programmes. Every watt of solar is a step toward energy independence.',
    icon: '☀️',
    category: 'Energy',
    difficulty: 'Hard',
    status: 'Popular',
    durationDays: 30,
    participants: 3_890,
    communityProgress: 29,
    co2SavedKg: 45.0,
    ecoPoints: 450,
    tags: ['solar', 'renewable', 'energy'],
    endsInDays: 25,
    motivationalQuote: 'Harness the sun. Power the future.',
  },
  {
    id: 'water-conservation',
    title: 'Water Conservation Week',
    description: 'Cut your water usage by 30% with simple daily habit changes.',
    longDescription:
      'Shorter showers, full dishwasher loads, and fixing leaks can save thousands of litres. Water is our most precious resource.',
    icon: '💧',
    category: 'Lifestyle',
    difficulty: 'Easy',
    status: 'Completed',
    durationDays: 7,
    participants: 15_300,
    communityProgress: 100,
    co2SavedKg: 6.0,
    ecoPoints: 130,
    tags: ['water', 'conservation', 'home'],
    endsInDays: 0,
    motivationalQuote: 'Water is life. Conserve it.',
  },
  {
    id: 'digital-detox-eco',
    title: 'Digital Eco Detox',
    description: 'Reduce screen time and digital carbon footprint for 7 days.',
    longDescription:
      'Data centres consume enormous energy. Reduce streaming, delete unused apps, and switch to dark mode to cut your digital emissions.',
    icon: '📵',
    category: 'Lifestyle',
    difficulty: 'Easy',
    status: 'Completed',
    durationDays: 7,
    participants: 11_200,
    communityProgress: 100,
    co2SavedKg: 3.5,
    ecoPoints: 120,
    tags: ['digital', 'screen-time', 'lifestyle'],
    endsInDays: 0,
    motivationalQuote: 'Disconnect to reconnect with nature.',
  },
  {
    id: 'second-hand-september',
    title: 'Second-Hand September',
    description: 'Buy nothing new for 30 days — thrift, swap, and borrow instead.',
    longDescription:
      'Fast fashion is one of the most polluting industries. Commit to second-hand shopping for a month and discover the joy of circular fashion.',
    icon: '👕',
    category: 'Lifestyle',
    difficulty: 'Hard',
    status: 'Active',
    durationDays: 30,
    participants: 4_560,
    communityProgress: 47,
    co2SavedKg: 30.0,
    ecoPoints: 380,
    tags: ['fashion', 'second-hand', 'circular'],
    endsInDays: 16,
    motivationalQuote: 'Old is the new new.',
  },
  {
    id: 'local-food-fortnight',
    title: 'Local Food Fortnight',
    description: 'Source all food from within 50 km for 2 weeks.',
    longDescription:
      'Visit farmers markets, join a CSA box scheme, and discover local producers. Food miles matter — local food is fresher and greener.',
    icon: '🌾',
    category: 'Diet',
    difficulty: 'Medium',
    status: 'Active',
    durationDays: 14,
    participants: 3_240,
    communityProgress: 55,
    co2SavedKg: 14.0,
    ecoPoints: 210,
    tags: ['local', 'food', 'community'],
    endsInDays: 11,
    motivationalQuote: 'Know your farmer, know your food.',
  },
]

export const leaderboard = [
  { rank: 1, name: 'Priya Sharma', avatar: 'PS', points: 4_820, badge: 'gold', challenges: 14, co2Saved: 312 },
  { rank: 2, name: 'Luca Bianchi', avatar: 'LB', points: 4_210, badge: 'gold', challenges: 12, co2Saved: 287 },
  { rank: 3, name: 'Aiko Tanaka', avatar: 'AT', points: 3_980, badge: 'gold', challenges: 11, co2Saved: 265 },
  { rank: 4, name: 'Marcus Webb', avatar: 'MW', points: 3_540, badge: 'silver', challenges: 10, co2Saved: 241 },
  { rank: 5, name: 'Sofia Reyes', avatar: 'SR', points: 3_120, badge: 'silver', challenges: 9, co2Saved: 218 },
  { rank: 6, name: 'Alex Rivera', avatar: 'AR', points: 3_240, badge: 'silver', challenges: 9, co2Saved: 198, isYou: true },
  { rank: 7, name: 'Chen Wei', avatar: 'CW', points: 2_890, badge: 'bronze', challenges: 8, co2Saved: 176 },
  { rank: 8, name: 'Fatima Al-Zahra', avatar: 'FA', points: 2_640, badge: 'bronze', challenges: 7, co2Saved: 154 },
]

export const communityStats = {
  totalParticipants: 142_800,
  totalCo2ReducedTonnes: 8_420,
  totalChallengesCompleted: 284_600,
  countriesRepresented: 94,
  activeChallenges: 8,
  treesEquivalent: 382_000,
}

export type FilterKey = 'All' | 'Active' | 'Popular' | 'Completed'
