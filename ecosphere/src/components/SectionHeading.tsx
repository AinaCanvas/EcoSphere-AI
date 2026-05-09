import { cn } from '../lib/cn'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={cn(align === 'center' && 'text-center')}>
      <p className="text-xs font-semibold tracking-[0.22em] text-emerald-200/80">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-zinc-200/80">
          {subtitle}
        </p>
      )}
    </div>
  )
}

