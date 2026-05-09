// ─── Leaderboard Mock Data ────────────────────────────────────────────────────

export type BadgeLevel = 'Eco Starter' | 'Green Warrior' | 'Earth Saver' | 'Climate Hero'
export type TimeFilter = 'Weekly' | 'Monthly' | 'All-Time'
export type CategoryTab =
  | 'Overall'
  | 'Transport'
  | 'Energy'
  | 'Recycling'
  | 'Challenges'

export interface LeaderboardUser {
  id: string
  name: string
  avatar: string          // 2-letter initials
  country: string
  flag: string
  badge: BadgeLevel
  // points per category
  overall: number
  transport: number
  energy: number
  recycling: number
  challenges: number
  // weekly / monthly snapshots
  weekly: number
  monthly: number
  // trend vs previous period (+/-)
  trend: number
  // streak
  streak: number
  // is the "current user"
  isYou?: boolean
}

export const allUsers: LeaderboardUser[] = [
  { id: 'u1',  name: 'Priya Sharma',     avatar: 'PS', country: 'India',       flag: '🇮🇳', badge: 'Climate Hero',   overall: 9_820, transport: 2_400, energy: 2_100, recycling: 2_800, challenges: 2_520, weekly: 680, monthly: 2_840, trend: +120, streak: 28 },
  { id: 'u2',  name: 'Luca Bianchi',     avatar: 'LB', country: 'Italy',       flag: '🇮🇹', badge: 'Climate Hero',   overall: 9_210, transport: 2_200, energy: 2_400, recycling: 2_100, challenges: 2_510, weekly: 620, monthly: 2_650, trend: +85,  streak: 21 },
  { id: 'u3',  name: 'Aiko Tanaka',      avatar: 'AT', country: 'Japan',       flag: '🇯🇵', badge: 'Climate Hero',   overall: 8_980, transport: 1_900, energy: 2_600, recycling: 2_300, challenges: 2_180, weekly: 590, monthly: 2_510, trend: +60,  streak: 19 },
  { id: 'u4',  name: 'Marcus Webb',      avatar: 'MW', country: 'UK',          flag: '🇬🇧', badge: 'Earth Saver',    overall: 7_540, transport: 1_800, energy: 1_900, recycling: 2_000, challenges: 1_840, weekly: 510, monthly: 2_100, trend: +45,  streak: 15 },
  { id: 'u5',  name: 'Sofia Reyes',      avatar: 'SR', country: 'Mexico',      flag: '🇲🇽', badge: 'Earth Saver',    overall: 7_120, transport: 1_600, energy: 1_700, recycling: 2_100, challenges: 1_720, weekly: 480, monthly: 1_980, trend: -20,  streak: 12 },
  { id: 'u6',  name: 'Alex Rivera',      avatar: 'AR', country: 'USA',         flag: '🇺🇸', badge: 'Earth Saver',    overall: 6_840, transport: 1_500, energy: 1_600, recycling: 1_900, challenges: 1_840, weekly: 460, monthly: 1_860, trend: +30,  streak: 14, isYou: true },
  { id: 'u7',  name: 'Chen Wei',         avatar: 'CW', country: 'China',       flag: '🇨🇳', badge: 'Earth Saver',    overall: 6_540, transport: 1_400, energy: 1_800, recycling: 1_700, challenges: 1_640, weekly: 440, monthly: 1_780, trend: +15,  streak: 11 },
  { id: 'u8',  name: 'Fatima Al-Zahra', avatar: 'FA', country: 'Morocco',     flag: '🇲🇦', badge: 'Green Warrior',  overall: 5_980, transport: 1_300, energy: 1_500, recycling: 1_600, challenges: 1_580, weekly: 400, monthly: 1_620, trend: +55,  streak: 9  },
  { id: 'u9',  name: 'Erik Lindqvist',  avatar: 'EL', country: 'Sweden',      flag: '🇸🇪', badge: 'Green Warrior',  overall: 5_640, transport: 1_200, energy: 1_600, recycling: 1_400, challenges: 1_440, weekly: 380, monthly: 1_540, trend: -10,  streak: 8  },
  { id: 'u10', name: 'Amara Diallo',    avatar: 'AD', country: 'Senegal',     flag: '🇸🇳', badge: 'Green Warrior',  overall: 5_210, transport: 1_100, energy: 1_300, recycling: 1_500, challenges: 1_310, weekly: 360, monthly: 1_420, trend: +40,  streak: 10 },
  { id: 'u11', name: 'Yuki Nakamura',   avatar: 'YN', country: 'Japan',       flag: '🇯🇵', badge: 'Green Warrior',  overall: 4_980, transport: 1_000, energy: 1_400, recycling: 1_300, challenges: 1_280, weekly: 340, monthly: 1_360, trend: +20,  streak: 7  },
  { id: 'u12', name: 'Isabella Costa',  avatar: 'IC', country: 'Brazil',      flag: '🇧🇷', badge: 'Green Warrior',  overall: 4_620, transport:   900, energy: 1_200, recycling: 1_300, challenges: 1_220, weekly: 310, monthly: 1_260, trend: -5,   streak: 6  },
  { id: 'u13', name: 'Omar Hassan',     avatar: 'OH', country: 'Egypt',       flag: '🇪🇬', badge: 'Eco Starter',    overall: 3_840, transport:   800, energy: 1_000, recycling: 1_100, challenges:   940, weekly: 260, monthly: 1_040, trend: +35,  streak: 5  },
  { id: 'u14', name: 'Nina Petrov',     avatar: 'NP', country: 'Russia',      flag: '🇷🇺', badge: 'Eco Starter',    overall: 3_420, transport:   700, energy:   900, recycling:   980, challenges:   840, weekly: 230, monthly:   930, trend: +10,  streak: 4  },
  { id: 'u15', name: 'James Okafor',    avatar: 'JO', country: 'Nigeria',     flag: '🇳🇬', badge: 'Eco Starter',    overall: 2_980, transport:   600, energy:   800, recycling:   880, challenges:   700, weekly: 200, monthly:   810, trend: +25,  streak: 3  },
  { id: 'u16', name: 'Mei Lin',         avatar: 'ML', country: 'Taiwan',      flag: '🇹🇼', badge: 'Eco Starter',    overall: 2_540, transport:   500, energy:   700, recycling:   780, challenges:   560, weekly: 170, monthly:   690, trend: -15,  streak: 2  },
  { id: 'u17', name: 'Carlos Mendez',   avatar: 'CM', country: 'Colombia',    flag: '🇨🇴', badge: 'Eco Starter',    overall: 2_100, transport:   400, energy:   600, recycling:   680, challenges:   420, weekly: 140, monthly:   570, trend: +8,   streak: 2  },
  { id: 'u18', name: 'Hana Müller',     avatar: 'HM', country: 'Germany',     flag: '🇩🇪', badge: 'Eco Starter',    overall: 1_680, transport:   300, energy:   500, recycling:   580, challenges:   300, weekly: 110, monthly:   460, trend: +5,   streak: 1  },
]

export const badgeConfig: Record<BadgeLevel, { icon: string; color: string; bg: string; ring: string; text: string; glow: string; minPoints: number }> = {
  'Eco Starter':  { icon: '🌱', color: '#22ffa8', bg: 'bg-emerald-300/10', ring: 'ring-emerald-200/20', text: 'text-emerald-200', glow: 'rgba(34,255,168,0.15)',  minPoints: 0     },
  'Green Warrior':{ icon: '⚔️', color: '#4ad8ff', bg: 'bg-cyan-300/10',    ring: 'ring-cyan-200/20',    text: 'text-cyan-200',    glow: 'rgba(74,216,255,0.15)',  minPoints: 3_000 },
  'Earth Saver':  { icon: '🌍', color: '#c084fc', bg: 'bg-violet-300/10',  ring: 'ring-violet-200/20',  text: 'text-violet-200',  glow: 'rgba(192,132,252,0.15)', minPoints: 6_000 },
  'Climate Hero': { icon: '🦸', color: '#fbbf24', bg: 'bg-yellow-300/10',  ring: 'ring-yellow-200/20',  text: 'text-yellow-200',  glow: 'rgba(251,191,36,0.15)',  minPoints: 9_000 },
}

export const categoryConfig: Record<CategoryTab, { icon: string; key: keyof LeaderboardUser }> = {
  Overall:    { icon: '🌍', key: 'overall'    },
  Transport:  { icon: '🚴', key: 'transport'  },
  Energy:     { icon: '⚡', key: 'energy'     },
  Recycling:  { icon: '♻️', key: 'recycling'  },
  Challenges: { icon: '🎯', key: 'challenges' },
}

export const timeFilterKey: Record<TimeFilter, keyof LeaderboardUser> = {
  Weekly:   'weekly',
  Monthly:  'monthly',
  'All-Time': 'overall',
}

// "You" user for the highlight card
export const YOU = allUsers.find((u) => u.isYou)!
