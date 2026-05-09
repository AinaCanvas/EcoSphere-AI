import { useCallback, useState } from 'react'
import { challenges as initialChallenges } from '../data/challengesData'
import type { Challenge, FilterKey } from '../data/challengesData'

function getInitialFilter(): FilterKey {
  if (typeof window !== 'undefined') {
    const p = new URLSearchParams(window.location.search).get('filter') as FilterKey | null
    if (p && ['All', 'Active', 'Popular', 'Completed'].includes(p)) return p
  }
  return 'All'
}

export function useChallenges() {
  const [joined, setJoined] = useState<Set<string>>(new Set())
  const [participantDeltas, setParticipantDeltas] = useState<Record<string, number>>({})
  const [filter, setFilter] = useState<FilterKey>(getInitialFilter)

  const toggleJoin = useCallback((id: string) => {
    setJoined((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        setParticipantDeltas((d) => ({ ...d, [id]: (d[id] ?? 0) - 1 }))
      } else {
        next.add(id)
        setParticipantDeltas((d) => ({ ...d, [id]: (d[id] ?? 0) + 1 }))
      }
      return next
    })
  }, [])

  const changeFilter = useCallback((f: FilterKey) => {
    setFilter(f)
    const params = new URLSearchParams(window.location.search)
    if (f === 'All') params.delete('filter')
    else params.set('filter', f)
    const qs = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? '?' + qs : ''}`)
  }, [])

  const enriched: (Challenge & { isJoined: boolean; displayParticipants: number })[] =
    initialChallenges.map((c) => ({
      ...c,
      isJoined: joined.has(c.id),
      displayParticipants: c.participants + (participantDeltas[c.id] ?? 0),
    }))

  const filtered = enriched.filter((c) => {
    if (filter === 'All') return true
    return c.status === filter
  })

  const featured = enriched.find((c) => c.featured) ?? enriched[0]

  return { challenges: filtered, featured, filter, changeFilter, toggleJoin, joined }
}
