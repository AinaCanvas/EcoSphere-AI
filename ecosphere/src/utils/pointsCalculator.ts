import type { EcoAction, ActionCategory } from '../data/actionsData'

export interface PointsSummary {
  total: number
  byCategory: Record<ActionCategory, number>
  weeklyTotal: number
  weeklyTarget: number
  weeklyPct: number
  mostActiveCategory: ActionCategory | null
  totalActions: number
  todayTotal: number
  streak: number
}

function startOfWeek(): Date {
  const d = new Date()
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Monday
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function calcSummary(actions: EcoAction[]): PointsSummary {
  const total = actions.reduce((s, a) => s + a.points, 0)

  const byCategory: Record<ActionCategory, number> = {
    Transport: 0,
    Energy: 0,
    Recycling: 0,
    Water: 0,
    Lifestyle: 0,
  }
  for (const a of actions) {
    byCategory[a.category] += a.points
  }

  const weekStart = startOfWeek()
  const weeklyTotal = actions
    .filter((a) => new Date(a.date) >= weekStart)
    .reduce((s, a) => s + a.points, 0)

  const weeklyTarget = 1000
  const weeklyPct = Math.min(Math.round((weeklyTotal / weeklyTarget) * 100), 100)

  const mostActiveCategory = (
    Object.entries(byCategory) as [ActionCategory, number][]
  ).reduce<ActionCategory | null>((best, [cat, pts]) => {
    if (best === null) return cat
    return pts > byCategory[best] ? cat : best
  }, null)

  const today = new Date().toISOString().slice(0, 10)
  const todayTotal = actions
    .filter((a) => a.date === today)
    .reduce((s, a) => s + a.points, 0)

  // Simple streak: count consecutive days with at least one action
  const uniqueDays = [...new Set(actions.map((a) => a.date))].sort().reverse()
  let streak = 0
  let cursor = new Date()
  cursor.setHours(0, 0, 0, 0)
  for (const day of uniqueDays) {
    const d = new Date(day)
    d.setHours(0, 0, 0, 0)
    const diff = Math.round((cursor.getTime() - d.getTime()) / 86_400_000)
    if (diff === 0 || diff === 1) {
      streak++
      cursor = d
    } else {
      break
    }
  }

  return {
    total,
    byCategory,
    weeklyTotal,
    weeklyTarget,
    weeklyPct,
    mostActiveCategory,
    totalActions: actions.length,
    todayTotal,
    streak,
  }
}
