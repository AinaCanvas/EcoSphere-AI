import type {
  LeaderboardUser,
  TimeFilter,
  CategoryTab,
} from '../data/leaderboardData'
import { timeFilterKey, categoryConfig } from '../data/leaderboardData'

export interface RankedUser extends LeaderboardUser {
  rank: number
  score: number
}

/** Sort users by the active time-filter × category and attach rank numbers. */
export function getRankedUsers(
  users: LeaderboardUser[],
  time: TimeFilter,
  category: CategoryTab,
): RankedUser[] {
  // For Weekly/Monthly we use the time key; for All-Time we use the category key
  const scoreKey: keyof LeaderboardUser =
    time === 'All-Time'
      ? (categoryConfig[category].key as keyof LeaderboardUser)
      : timeFilterKey[time]

  return [...users]
    .sort((a, b) => (b[scoreKey] as number) - (a[scoreKey] as number))
    .map((u, i) => ({ ...u, rank: i + 1, score: u[scoreKey] as number }))
}

/** Community-level summary stats */
export function getCommunityStats(users: LeaderboardUser[]) {
  const scores = users.map((u) => u.overall)
  const total = scores.reduce((s, v) => s + v, 0)
  const avg = Math.round(total / users.length)
  const highest = Math.max(...scores)
  const totalCo2Saved = Math.round(users.reduce((s, u) => s + u.overall * 0.004, 0)) // rough kg
  return { totalUsers: users.length, avg, highest, totalCo2Saved }
}

/** Find the "you" entry in a ranked list */
export function findYouRank(ranked: RankedUser[]): RankedUser | undefined {
  return ranked.find((u) => u.isYou)
}

/** Next badge threshold above current score */
export function getNextBadgeInfo(score: number): { name: string; threshold: number; pct: number } | null {
  const thresholds: { name: string; threshold: number }[] = [
    { name: 'Green Warrior', threshold: 3_000 },
    { name: 'Earth Saver',   threshold: 6_000 },
    { name: 'Climate Hero',  threshold: 9_000 },
  ]
  const next = thresholds.find((t) => score < t.threshold)
  if (!next) return null
  const prev = thresholds.find((t) => t.threshold === next.threshold - 3_000)?.threshold ?? 0
  const pct = Math.round(((score - prev) / (next.threshold - prev)) * 100)
  return { name: next.name, threshold: next.threshold, pct }
}
