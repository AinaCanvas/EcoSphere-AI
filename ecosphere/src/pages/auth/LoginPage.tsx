import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff, Leaf, Loader2, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { fadeUp, scaleIn } from '../../animations/variants'
import { AuthBackgroundFX } from '../../components/auth/AuthBackgroundFX'
import { AuthInput } from '../../components/auth/AuthInput'
import { AuthNavbar } from '../../components/auth/AuthNavbar'
import { getSession, mockLogin, validateEmail, validatePassword } from '../../utils/authHelpers'

interface LoginPageProps {
  onNavigateHome?: () => void
  onNavigateRegister?: () => void
  onLoginSuccess?: () => void
}

export function LoginPage({ onNavigateHome, onNavigateRegister, onLoginSuccess }: LoginPageProps) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState<{ email?: string; password?: string; form?: string }>({})
  const [forgotSent, setForgotSent] = useState(false)

  function validate() {
    const e: typeof errors = {}
    const emailErr = validateEmail(email)
    const pwErr    = validatePassword(password)
    if (emailErr) e.email = emailErr
    if (pwErr)    e.password = pwErr
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    setErrors({})
    try {
      await mockLogin(email, password)
      onLoginSuccess?.()
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  function handleForgot(ev: React.MouseEvent) {
    ev.preventDefault()
    if (!validateEmail(email)) {
      setForgotSent(true)
      setTimeout(() => setForgotSent(false), 4000)
    } else {
      setErrors({ email: 'Enter your email first to reset password.' })
    }
  }

  // If already logged in, show a hint
  const existingUser = getSession()

  return (
    <div className="min-h-screen">
      <AuthBackgroundFX />
      <AuthNavbar onNavigateHome={onNavigateHome} />

      <main className="flex min-h-screen items-center justify-center px-4 pt-16">
        <motion.div
          className="w-full max-w-md"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          {/* Card */}
          <div className="glass glow-ring rounded-2xl p-8 shadow-[0_10px_60px_-30px_rgba(0,0,0,0.8)]">

            {/* Header */}
            <motion.div className="mb-8 text-center" variants={fadeUp} custom={0}>
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-300/20">
                <Leaf className="h-7 w-7 text-emerald-300" />
              </div>
              <h1 className="text-2xl font-bold text-zinc-50">Welcome back</h1>
              <p className="mt-1 text-sm text-zinc-400">Sign in to your EcoSphere account</p>
            </motion.div>

            {/* Existing session hint */}
            {existingUser && (
              <motion.div
                className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-sm text-emerald-300"
                variants={fadeUp} custom={0.5}
              >
                Continue as <span className="font-semibold">{existingUser.name}</span>?{' '}
                <button
                  onClick={onLoginSuccess}
                  className="underline underline-offset-2 hover:text-emerald-200"
                >
                  Go to Dashboard
                </button>
              </motion.div>
            )}

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

            {/* Forgot password confirmation */}
            <AnimatePresence>
              {forgotSent && (
                <motion.div
                  className="mb-5 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-sm text-cyan-300"
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                >
                  Password reset link sent to <span className="font-semibold">{email}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} noValidate>
              <motion.div className="flex flex-col gap-5" variants={fadeUp} custom={1}>

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

                <AuthInput
                  label="Password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  icon={<Lock className="h-4 w-4" />}
                  autoComplete="current-password"
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

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-white/5 accent-emerald-400"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={handleForgot}
                    className="text-sm text-emerald-400 transition hover:text-emerald-300 focus:outline-none"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-400/15 px-4 py-3 text-sm font-semibold text-emerald-100 ring-1 ring-emerald-300/25 transition hover:bg-emerald-400/25 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
                >
                  {/* Glow */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(34,255,168,0.55),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(74,216,255,0.35),transparent_55%)]"
                  />
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    'Sign In'
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

            {/* Switch to register */}
            <motion.p className="text-center text-sm text-zinc-400" variants={fadeUp} custom={2.5}>
              Don't have an account?{' '}
              <button
                onClick={onNavigateRegister}
                className="font-semibold text-emerald-400 transition hover:text-emerald-300 focus:outline-none"
              >
                Create one
              </button>
            </motion.p>
          </div>

          {/* Footer note */}
          <motion.p
            className="mt-6 text-center text-xs text-zinc-600"
            variants={fadeUp} custom={3}
          >
            By signing in you agree to our{' '}
            <span className="text-zinc-500 underline underline-offset-2 cursor-pointer">Terms</span>{' '}
            &amp;{' '}
            <span className="text-zinc-500 underline underline-offset-2 cursor-pointer">Privacy Policy</span>
          </motion.p>
        </motion.div>
      </main>
    </div>
  )
}
