import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'

export function GlowButton({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: Variant
}) {
  return (
    <button
      {...props}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A0F]',
        variant === 'primary' &&
          'bg-emerald-400/15 text-emerald-100 ring-1 ring-emerald-300/25 hover:bg-emerald-400/20',
        variant === 'secondary' &&
          'bg-cyan-400/10 text-cyan-50 ring-1 ring-cyan-200/20 hover:bg-cyan-400/15',
        variant === 'ghost' &&
          'bg-white/0 text-zinc-100 ring-1 ring-white/10 hover:bg-white/5',
        className,
      )}
    >
      {variant !== 'ghost' && (
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100',
            variant === 'primary' &&
              'bg-[radial-gradient(circle_at_30%_20%,rgba(34,255,168,0.55),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(74,216,255,0.35),transparent_55%)]',
            variant === 'secondary' &&
              'bg-[radial-gradient(circle_at_30%_30%,rgba(74,216,255,0.55),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(34,255,168,0.25),transparent_55%)]',
          )}
        />
      )}
      {children}
    </button>
  )
}

