// ─── AI Planner Utilities ─────────────────────────────────────────────────────

import type { SavedPlan, UserPreferences, WeeklyAction } from '../data/aiPrompts'
import { generateWeeklyPlan } from '../data/aiPrompts'

const PLANS_KEY = 'ecosphere_ai_plans'

export function createPlan(prefs: UserPreferences): SavedPlan {
  const actions = generateWeeklyPlan(prefs)
  return {
    id: `plan-${Date.now()}`,
    createdAt: new Date().toISOString(),
    preferences: prefs,
    actions,
    totalCo2Saved: actions.reduce((s, a) => s + a.co2SavedKg, 0),
  }
}

export function savePlan(plan: SavedPlan): void {
  try {
    const existing = loadPlans()
    // Keep last 5 plans
    const updated = [plan, ...existing].slice(0, 5)
    localStorage.setItem(PLANS_KEY, JSON.stringify(updated))
  } catch { /* noop */ }
}

export function loadPlans(): SavedPlan[] {
  try {
    const raw = localStorage.getItem(PLANS_KEY)
    return raw ? (JSON.parse(raw) as SavedPlan[]) : []
  } catch { return [] }
}

export function updateActionCompletion(
  planId: string,
  actionId: string,
  completed: boolean,
): void {
  try {
    const plans = loadPlans()
    const updated = plans.map((p) =>
      p.id === planId
        ? { ...p, actions: p.actions.map((a) => a.id === actionId ? { ...a, completed } : a) }
        : p,
    )
    localStorage.setItem(PLANS_KEY, JSON.stringify(updated))
  } catch { /* noop */ }
}

export function calcWeeklyCo2(actions: WeeklyAction[]): number {
  return Math.round(actions.reduce((s, a) => s + a.co2SavedKg, 0) * 10) / 10
}

export function calcMonthlyCo2(weekly: number): number {
  return Math.round(weekly * 4.3 * 10) / 10
}

// Global average weekly CO₂ savings from eco actions: ~8 kg
export const GLOBAL_AVG_WEEKLY_SAVING = 8
