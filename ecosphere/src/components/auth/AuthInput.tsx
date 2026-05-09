import { type InputHTMLAttributes, type ReactNode, useState } from 'react'
import { cn } from '../../lib/cn'

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string | null
  icon?: ReactNode
  rightElement?: ReactNode
}

export function AuthInput({ label, error, icon, rightElement, className, ...props }: AuthInputProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
        {label}
      </label>

      <div className="relative">
        {/* Left icon */}
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
            {icon}
          </span>
        )}

        <input
          {...props}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e)  => { setFocused(false); props.onBlur?.(e) }}
          className={cn(
            'w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200',
            !!icon && 'pl-10',
            !!rightElement && 'pr-10',
            focused
              ? 'border-emerald-400/50 shadow-[0_0_0_3px_rgba(34,255,168,0.08),0_0_16px_rgba(34,255,168,0.12)]'
              : 'border-white/10 hover:border-white/20',
            error && 'border-red-400/50 shadow-[0_0_0_3px_rgba(248,113,113,0.08)]',
            className,
          )}
        />

        {/* Right element (e.g. show/hide password) */}
        {rightElement && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightElement}
          </span>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-400">
          <span className="inline-block h-1 w-1 rounded-full bg-red-400" />
          {error}
        </p>
      )}
    </div>
  )
}
