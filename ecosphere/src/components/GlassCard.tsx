import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

export function GlassCard({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      {...props}
      className={cn(
        'glass glow-ring rounded-2xl p-5 shadow-[0_10px_60px_-30px_rgba(0,0,0,0.8)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

