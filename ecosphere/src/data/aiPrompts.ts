// ─── AI Advisor Mock Data & Response Engine ──────────────────────────────────

export type TransportHabit = 'Car' | 'Public' | 'Bike' | 'Walk'
export type DietType = 'Vegan' | 'Vegetarian' | 'Mixed' | 'Heavy Meat'
export type ActivityLevel = 'Sedentary' | 'Light' | 'Active' | 'Very Active'
export type SustainabilityGoal = 'Reduce Carbon' | 'Save Energy' | 'Waste Reduction' | 'All of the above'

export interface UserPreferences {
  transport: TransportHabit
  diet: DietType
  activityLevel: ActivityLevel
  goal: SustainabilityGoal
}

export interface WeeklyAction {
  id: string
  title: string
  description: string
  category: 'Transport' | 'Energy' | 'Diet' | 'Lifestyle' | 'Recycling'
  co2SavedKg: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  completed: boolean
  icon: string
}

export interface SavedPlan {
  id: string
  createdAt: string
  preferences: UserPreferences
  actions: WeeklyAction[]
  totalCo2Saved: number
}

export interface ChatMessage {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: Date
}

// ── Category colors ───────────────────────────────────────────────────────────
export const categoryConfig = {
  Transport: { color: 'text-cyan-300',    bg: 'bg-cyan-400/10',    ring: 'ring-cyan-300/20',    icon: '🚴' },
  Energy:    { color: 'text-yellow-300',  bg: 'bg-yellow-400/10',  ring: 'ring-yellow-300/20',  icon: '⚡' },
  Diet:      { color: 'text-emerald-300', bg: 'bg-emerald-400/10', ring: 'ring-emerald-300/20', icon: '🥗' },
  Lifestyle: { color: 'text-purple-300',  bg: 'bg-purple-400/10',  ring: 'ring-purple-300/20',  icon: '♻️' },
  Recycling: { color: 'text-green-300',   bg: 'bg-green-400/10',   ring: 'ring-green-300/20',   icon: '🗑️' },
} as const

// ── Plan generator ────────────────────────────────────────────────────────────
export function generateWeeklyPlan(prefs: UserPreferences): WeeklyAction[] {
  const actions: WeeklyAction[] = []

  // Transport actions
  if (prefs.transport === 'Car') {
    actions.push({
      id: 'switch-public',
      title: 'Switch to public transport twice',
      description: 'Replace 2 car commutes this week with bus or metro. Each trip saves ~2.1 kg CO₂.',
      category: 'Transport', co2SavedKg: 4.2, difficulty: 'Medium', completed: false, icon: '🚌',
    })
    actions.push({
      id: 'carpool',
      title: 'Carpool with a colleague',
      description: 'Share a ride at least once this week to halve your transport emissions.',
      category: 'Transport', co2SavedKg: 2.1, difficulty: 'Easy', completed: false, icon: '🚗',
    })
  } else if (prefs.transport === 'Public') {
    actions.push({
      id: 'walk-short',
      title: 'Walk trips under 1 km',
      description: 'Skip the bus for very short trips — walk instead for zero emissions.',
      category: 'Transport', co2SavedKg: 1.2, difficulty: 'Easy', completed: false, icon: '🚶',
    })
  } else {
    actions.push({
      id: 'bike-extra',
      title: 'Add one extra cycling day',
      description: 'Extend your cycling habit by one more day this week.',
      category: 'Transport', co2SavedKg: 1.8, difficulty: 'Easy', completed: false, icon: '🚴',
    })
  }

  // Diet actions
  if (prefs.diet === 'Heavy Meat') {
    actions.push({
      id: 'meatless-days',
      title: 'Try 3 plant-based days',
      description: 'Replace meat with legumes, tofu, or vegetables for 3 days. Saves ~4.5 kg CO₂.',
      category: 'Diet', co2SavedKg: 4.5, difficulty: 'Medium', completed: false, icon: '🥗',
    })
    actions.push({
      id: 'local-food',
      title: 'Buy local produce once',
      description: 'Visit a farmers market or buy locally sourced food to cut food miles.',
      category: 'Diet', co2SavedKg: 1.5, difficulty: 'Easy', completed: false, icon: '🌾',
    })
  } else if (prefs.diet === 'Mixed') {
    actions.push({
      id: 'meatless-2',
      title: '2 meatless days this week',
      description: 'Go plant-based on 2 days — saves ~3 kg CO₂ and improves health.',
      category: 'Diet', co2SavedKg: 3.0, difficulty: 'Easy', completed: false, icon: '🥦',
    })
  } else {
    actions.push({
      id: 'seasonal-food',
      title: 'Eat seasonal & local',
      description: 'Choose seasonal produce to minimise transport and storage emissions.',
      category: 'Diet', co2SavedKg: 1.0, difficulty: 'Easy', completed: false, icon: '🌿',
    })
  }

  // Energy actions
  actions.push({
    id: 'led-switch',
    title: 'Switch to LED lighting',
    description: 'Replace any remaining incandescent bulbs with LEDs — 75% less energy.',
    category: 'Energy', co2SavedKg: 2.4, difficulty: 'Easy', completed: false, icon: '💡',
  })
  actions.push({
    id: 'unplug-idle',
    title: 'Unplug idle devices',
    description: 'Unplug chargers, TVs, and appliances on standby. Saves ~1.8 kg CO₂/week.',
    category: 'Energy', co2SavedKg: 1.8, difficulty: 'Easy', completed: false, icon: '🔌',
  })

  // Lifestyle / recycling
  actions.push({
    id: 'reusable-bag',
    title: 'Use reusable bags & bottle',
    description: 'Carry a reusable bag and water bottle every day this week.',
    category: 'Lifestyle', co2SavedKg: 0.8, difficulty: 'Easy', completed: false, icon: '🛍️',
  })

  if (prefs.goal === 'Waste Reduction' || prefs.goal === 'All of the above') {
    actions.push({
      id: 'compost',
      title: 'Start composting food scraps',
      description: 'Compost vegetable peels and coffee grounds instead of binning them.',
      category: 'Recycling', co2SavedKg: 1.2, difficulty: 'Medium', completed: false, icon: '🌱',
    })
  }

  if (prefs.activityLevel === 'Sedentary' || prefs.activityLevel === 'Light') {
    actions.push({
      id: 'active-commute',
      title: 'Add a 20-min walk daily',
      description: 'A daily walk replaces short car trips and improves wellbeing.',
      category: 'Transport', co2SavedKg: 1.4, difficulty: 'Easy', completed: false, icon: '🏃',
    })
  }

  return actions.slice(0, 7)
}

// ── Chat response engine ──────────────────────────────────────────────────────
const RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['carbon', 'footprint', 'reduce', 'lower'],
    reply: `Great question! Here are the highest-impact ways to reduce your carbon footprint:\n\n🚗 **Transport** — Switching from a car to public transit for 3 days/week saves ~12 kg CO₂. Cycling saves even more.\n\n🥗 **Diet** — Going plant-based 3 days/week cuts ~4.5 kg CO₂. Reducing beef has the biggest single impact.\n\n⚡ **Energy** — Switching to LED bulbs and unplugging idle devices saves ~4 kg CO₂/week with zero effort.\n\n♻️ **Shopping** — Buying second-hand and reducing online orders cuts packaging and delivery emissions.\n\nWant me to generate a personalised weekly plan based on your habits?`,
  },
  {
    keywords: ['weekly', 'plan', 'action', 'schedule'],
    reply: `Here's a sample 7-day green action plan:\n\n**Mon** 🚌 Take public transport to work\n**Tue** 🥗 Cook a plant-based dinner\n**Wed** 💡 Audit your home for idle devices\n**Thu** 🚴 Cycle for any trip under 3 km\n**Fri** 🛍️ Shop with reusable bags only\n**Sat** 🌱 Start a small compost bin\n**Sun** 🔌 Unplug all standby electronics\n\nThis plan saves an estimated **18–22 kg CO₂** in one week. Use the Plan Generator below to get a personalised version based on your lifestyle!`,
  },
  {
    keywords: ['improve', 'lifestyle', 'habit', 'change', 'better'],
    reply: `Based on typical lifestyle patterns, here are the top improvements with the biggest impact:\n\n1. 🥩 **Reduce meat** — The single biggest dietary change. Even 2 meatless days saves 3 kg CO₂/week.\n2. 🚗 **Drive less** — Each car trip replaced by transit or cycling saves 1–4 kg CO₂.\n3. ⚡ **Energy audit** — Standby devices waste 10% of home energy. Unplug them.\n4. 🛒 **Buy less, buy local** — Fast fashion and online shopping have hidden carbon costs.\n5. 💧 **Shorter showers** — Cutting 2 minutes saves ~0.5 kg CO₂ and 30L of water daily.\n\nTell me more about your current habits and I'll give you a tailored plan!`,
  },
  {
    keywords: ['transport', 'car', 'commute', 'travel', 'drive'],
    reply: `Transport is typically 25–30% of a person's carbon footprint. Here's how to cut it:\n\n🚌 **Public transit** — Saves ~2.1 kg CO₂ per trip vs driving alone.\n🚴 **Cycling** — Zero emissions, great for trips under 5 km.\n🚶 **Walking** — For trips under 1 km, walking beats everything.\n✈️ **Flights** — One short-haul return flight = ~1,100 kg CO₂. Consider trains for trips under 600 km.\n🚗 **EV** — If you must drive, an EV cuts emissions by 60–70% vs petrol.\n\nWhat's your main commute method? I can give more specific advice.`,
  },
  {
    keywords: ['diet', 'food', 'eat', 'vegan', 'vegetarian', 'meat'],
    reply: `Food accounts for ~20% of the average carbon footprint. Here's the impact by diet:\n\n🌱 **Vegan** — ~1.5t CO₂/year from food\n🥚 **Vegetarian** — ~1.7t CO₂/year\n🍽️ **Mixed** — ~2.5t CO₂/year\n🥩 **Heavy meat** — ~3.3t CO₂/year\n\nSwitching from heavy meat to mixed diet saves **~800 kg CO₂/year** — equivalent to not flying for 8 months!\n\nTop food tips:\n• Replace beef with chicken or legumes (beef = 27x more CO₂ than chicken)\n• Buy seasonal and local produce\n• Reduce food waste — 30% of food is thrown away globally`,
  },
  {
    keywords: ['energy', 'electricity', 'power', 'solar', 'renewable'],
    reply: `Home energy is typically 20–25% of your footprint. Quick wins:\n\n💡 **LED bulbs** — 75% less energy than incandescent. Saves ~120 kg CO₂/year.\n🔌 **Standby power** — Unplugging idle devices saves ~10% of your electricity bill.\n🌡️ **Thermostat** — Lowering heating by 1°C saves ~300 kg CO₂/year.\n☀️ **Solar panels** — Can cut home electricity emissions by 80%.\n🌿 **Green tariff** — Switch to a renewable energy supplier — often same price as standard.\n\nWhat's your current electricity usage? I can estimate your potential savings.`,
  },
  {
    keywords: ['tip', 'advice', 'suggest', 'recommend', 'help'],
    reply: `Here are my top 5 sustainability tips for immediate impact:\n\n1. 🥗 **Go plant-based 3 days/week** — Saves ~4.5 kg CO₂/week\n2. 🚌 **Use public transport twice** — Saves ~4.2 kg CO₂/week\n3. 💡 **Switch all bulbs to LED** — One-time change, saves forever\n4. 🛍️ **Carry reusable bags & bottle** — Eliminates single-use plastic daily\n5. 🔌 **Unplug idle electronics** — Saves ~1.8 kg CO₂/week effortlessly\n\nCombined, these 5 habits save **~13 kg CO₂/week = 676 kg/year** — that's like planting 30 trees! 🌳`,
  },
  {
    keywords: ['save', 'money', 'cost', 'cheap', 'affordable'],
    reply: `Great news — most eco actions also save money! Here's the financial case:\n\n💡 **LED bulbs** — Save £50–100/year on electricity\n🔌 **Unplug standby** — Save £30–60/year\n🚴 **Cycle instead of drive** — Save £500–2000/year on fuel & parking\n🥗 **Plant-based meals** — Legumes cost 3–5x less than meat per meal\n🛒 **Buy less, buy second-hand** — Fashion resale saves 60–80% vs new\n\nGoing green is one of the best financial decisions you can make. Want a personalised savings estimate?`,
  },
]

const FALLBACK = `I'm your AI Sustainability Advisor! 🌍 I can help you with:\n\n• **Reducing your carbon footprint** — transport, diet, energy tips\n• **Weekly action plans** — personalised to your lifestyle\n• **CO₂ savings estimates** — see the real impact of your choices\n• **Eco habit building** — small changes with big results\n\nTry asking me:\n*"How can I reduce my carbon footprint?"*\n*"Give me a weekly eco plan"*\n*"What food changes have the biggest impact?"*`

export function getMockAIResponse(input: string): string {
  const lower = input.toLowerCase()
  for (const r of RESPONSES) {
    if (r.keywords.some((k) => lower.includes(k))) return r.reply
  }
  return FALLBACK
}

// ── Suggested quick prompts ───────────────────────────────────────────────────
export const QUICK_PROMPTS = [
  'How can I reduce my carbon footprint?',
  'Give me a weekly eco action plan',
  'What food changes have the biggest impact?',
  'How do I cut my transport emissions?',
  'Tips for saving energy at home',
  'How much CO₂ can I realistically save?',
]
