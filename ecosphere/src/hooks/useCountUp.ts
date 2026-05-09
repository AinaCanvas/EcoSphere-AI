import { useEffect, useRef, useState } from 'react'

export function useCountUp({
  to,
  durationMs = 900,
  start = false,
}: {
  to: number
  durationMs?: number
  start?: boolean
}) {
  const [value, setValue] = useState(0)
  const startAtRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return
    if (startAtRef.current === null) startAtRef.current = performance.now()
    const startAt = startAtRef.current

    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - startAt) / durationMs)
      setValue(Math.round(to * t))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [durationMs, start, to])

  return value
}

