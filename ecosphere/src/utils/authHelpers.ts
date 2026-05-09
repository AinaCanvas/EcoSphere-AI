// ─── Auth Helpers (frontend-only mock) ───────────────────────────────────────

export type TransportHabit = 'Car' | 'Public' | 'Bike' | 'Walk'
export type DietType       = 'Vegan' | 'Vegetarian' | 'Mixed' | 'Heavy Meat'
export type EcoGoal        = 'Reduce Carbon' | 'Save Energy' | 'Waste Reduction' | 'All of the above'

export interface SustainabilityProfile {
  transport: TransportHabit
  diet: DietType
  goal: EcoGoal
}

export interface AuthUser {
  id: string
  name: string
  email: string
  avatar: string          // 2-letter initials
  joinedAt: string        // ISO date
  profile?: SustainabilityProfile
}

const SESSION_KEY = 'ecosphere_user'

// ── Validation ────────────────────────────────────────────────────────────────
export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.'
  return null
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required.'
  if (password.length < 6) return 'Password must be at least 6 characters.'
  return null
}

export function validateName(name: string): string | null {
  if (!name.trim()) return 'Full name is required.'
  if (name.trim().length < 2) return 'Name must be at least 2 characters.'
  return null
}

export function validateConfirm(password: string, confirm: string): string | null {
  if (!confirm) return 'Please confirm your password.'
  if (password !== confirm) return 'Passwords do not match.'
  return null
}

// ── Mock auth operations ──────────────────────────────────────────────────────
function makeAvatar(name: string): string {
  const parts = name.trim().split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

/** Simulate login — always succeeds for any non-empty credentials */
export async function mockLogin(email: string, _password: string): Promise<AuthUser> {
  await delay(900)
  const existing = getSession()
  if (existing && existing.email === email) return existing
  // Create a guest user from the email
  const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const user: AuthUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    avatar: makeAvatar(name),
    joinedAt: new Date().toISOString(),
  }
  saveSession(user)
  return user
}

/** Simulate registration */
export async function mockRegister(name: string, email: string, _password: string): Promise<AuthUser> {
  await delay(1100)
  const user: AuthUser = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    avatar: makeAvatar(name),
    joinedAt: new Date().toISOString(),
  }
  saveSession(user)
  return user
}

/** Save sustainability profile to the stored user */
export function saveProfile(profile: SustainabilityProfile): void {
  const user = getSession()
  if (!user) return
  saveSession({ ...user, profile })
}

// ── Session helpers ───────────────────────────────────────────────────────────
export function saveSession(user: AuthUser): void {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(user)) } catch { /* noop */ }
}

export function getSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch { return null }
}

export function clearSession(): void {
  try { localStorage.removeItem(SESSION_KEY) } catch { /* noop */ }
}

function delay(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms))
}
