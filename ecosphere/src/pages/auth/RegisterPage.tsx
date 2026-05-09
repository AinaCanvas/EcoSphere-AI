import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff, Leaf, Loader2, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { fadeUp, scaleIn } from '../../animations/variants'
import { AuthBackgroundFX } from '../../components/auth/AuthBackgroundFX'
import { AuthInput } from '../../components/auth/AuthInput'
import { AuthNavbar } from '../../components/auth/AuthNavbar'
import {
  mockRegister,
  validateConfirm,
  validateEmail,
  validateName,
  validatePassword,
} from '../../utils/authHelpers'

interface RegisterPageProps {
  onNavigateHome?: () => void
  onNavigateLogin?: () => void
  onRegisterSuccess?: () => void
}

export function RegisterPage({ onNavigateHome, onNavigateLogin, onRegisterSuccess }: RegisterPageProps) {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [showCf, setShowCf]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState<{
    name?: string; email?: string; password?: string; confirm?: string; form?: string
  }>({})

  // Password strength
  function pwStrength(pw: string): { level: number; label: string; color: string } {
    if (!pw) return { level: 0, label: '', color: '' }
    let score = 0
    if (pw.length >= 8) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    if (score <= 1) return { level: 1, label: 'Weak', color: 'bg-red-400' }
    if (score === 2) return { level: 2, label: 'Fair', color: 'bg-yellow-400' }
    if (score === 3) return { level: 3, label: 'Good', color: 'bg-emerald-400' }
    return { level: 4, label: 'Strong', color: 'bg-emerald-300' }
  }

  const strength = pwStrength(password)

  function validate() {
    const e: typeof errors = {}
    const nameErr    = validateName(name)
    const emailErr   = validateEmail(email)
    const pwErr      = validatePassword(password)
    const confirmErr = validateConfirm(password, confirm)
    if (nameErr)    e.name    = nameErr
    if (emailErr)   e.email   = emailErr
    if (pwErr)      e.password = pwErr
    if (confirmErr) e.confirm  = confirmErr
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    setErrors({})
    try {
      await mockRegister(name, email, password)
      onRegisterSuccess?.()
    } catch {
      setErrors({ form: 'Registration failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <AuthBackgroundFX />
      <AuthNavbar onNavigateHome={onNavigateHome} />

      <main className="flex min-h-screen items-center justify-center px-4 py-24">
        <motion.div
          className="w-full max-w-md"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <div className="glass glow-ring rounded-2xl p-8 shadow-[0_10px_60px_-30px_rgba(0,0,0,0.8)]">

            {/* Header */}
            <motion.div className="mb-8 text-center" variants={fadeUp} custom={0}>
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/10 ring-1 ring-cyan-300/20">
                <Leaf className="h-7 w-7 text-cyan-300" />
              </div>
              <h1 className="text-2xl font-bold text-zinc-50">Join EcoSphere</h1>
              <p className="mt-1 text-sm text-zinc-400">Create your account and start your green journey</p>
            </motion.div>

            {/* Form error */}
            <AnimatePresence>
              {errors.form && (
                <motion.div
                  className="mb-5 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-400"
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                >
                  {errors.form}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} noValidate>
              <motion.div className="flex flex-col gap-5" variants={fadeUp} custom={1}>

                <AuthInput
                  label="Full Name"
                  type="text"
                  placeholder="Alex Green"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                  icon={<User className="h-4 w-4" />}
                  autoComplete="name"
                />

                <AuthInput
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  icon={<Mail className="h-4 w-4" />}
                  autoComplete="email"
                />

                <div className="flex flex-col gap-1.5">
                  <AuthInput
                    label="Password"
                    type={showPw ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    icon={<Lock className="h-4 w-4" />}
                    autoComplete="new-password"
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        className="text-zinc-500 transition hover:text-zinc-300 focus:outline-none"
                        aria-label={showPw ? 'Hide password' : 'Show password'}
                      >
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                  />
                  {/* Strength bar */}
                  {password && (
                    <div className="flex items-center gap-2">
                      <div className="flex flex-1 gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              i <= strength.level ? strength.color : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-zinc-500">{strength.label}</span>
                    </div>
                  )}
                </div>

                <AuthInput
                  label="Confirm Password"
                  type={showCf ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  error={errors.confirm}
                  icon={<Lock className="h-4 w-4" />}
                  autoComplete="new-password"
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowCf((v) => !v)}
                      className="text-zinc-500 transition hover:text-zinc-300 focus:outline-none"
                      aria-label={showCf ? 'Hide password' : 'Show password'}
                    >
                      {showCf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-cyan-400/15 px-4 py-3 text-sm font-semibold text-cyan-100 ring-1 ring-cyan-300/25 transition hover:bg-cyan-400/25 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_30%,rgba(74,216,255,0.55),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(34,255,168,0.25),transparent_55%)]"
                  />
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating account…
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div className="my-6 flex items-center gap-3" variants={fadeUp} custom={2}>
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-zinc-600">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </motion.div>

            <motion.p className="text-center text-sm text-zinc-400" variants={fadeUp} custom={2.5}>
              Already have an account?{' '}
              <button
                onClick={onNavigateLogin}
                className="font-semibold text-emerald-400 transition hover:text-emerald-300 focus:outline-none"
              >
                Sign in
              </button>
            </motion.p>
          </div>

          <motion.p
            className="mt-6 text-center text-xs text-zinc-600"
            variants={fadeUp} custom={3}
          >
            By creating an account you agree to our{' '}
            <span className="text-zinc-500 underline underline-offset-2 cursor-pointer">Terms</span>{' '}
            &amp;{' '}
            <span className="text-zinc-500 underline underline-offset-2 cursor-pointer">Privacy Policy</span>
          </motion.p>
        </motion.div>
      </main>
    </div>
  )
}
