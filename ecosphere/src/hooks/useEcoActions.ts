import { useCallback, useMemo, useState } from 'react'
import { seedActions } from '../data/actionsData'
import type { ActionCategory, EcoAction, FilterCategory } from '../data/actionsData'
import { calcSummary } from '../utils/pointsCalculator'

let idCounter = seedActions.length + 1

function getInitialFilter(): FilterCategory {
  if (typeof window !== 'undefined') {
    const p = new URLSearchParams(window.location.search).get('cat') as FilterCategory | null
    const valid: FilterCategory[] = ['All', 'Transport', 'Energy', 'Recycling', 'Water', 'Lifestyle']
    if (p && valid.includes(p)) return p
  }
  return 'All'
}

function getInitialSearch(): string {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search).get('q') ?? ''
  }
  return ''
}

export function useEcoActions() {
  const [actions, setActions] = useState<EcoAction[]>(seedActions)
  const [filter, setFilter] = useState<FilterCategory>(getInitialFilter)
  const [search, setSearch] = useState<string>(getInitialSearch)

  // Persist filter + search to URL
  const updateUrl = useCallback((cat: FilterCategory, q: string) => {
    const params = new URLSearchParams(window.location.search)
    if (cat === 'All') params.delete('cat')
    else params.set('cat', cat)
    if (!q) params.delete('q')
    else params.set('q', q)
    const qs = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? '?' + qs : ''}`)
  }, [])

  const changeFilter = useCallback(
    (cat: FilterCategory) => {
      setFilter(cat)
      updateUrl(cat, search)
    },
    [search, updateUrl],
  )

  const changeSearch = useCallback(
    (q: string) => {
      setSearch(q)
      updateUrl(filter, q)
    },
    [filter, updateUrl],
  )

  const addAction = useCallback((action: Omit<EcoAction, 'id'>) => {
    const newAction: EcoAction = { ...action, id: `action-${idCounter++}` }
    setActions((prev) => [newAction, ...prev])
  }, [])

  const removeAction = useCallback((id: string) => {
    setActions((prev) => prev.filter((a) => a.id !== id))
  }, [])

  const filtered = useMemo(() => {
    return actions.filter((a) => {
      const matchCat = filter === 'All' || a.category === filter
      const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [actions, filter, search])

  const summary = useMemo(() => calcSummary(actions), [actions])

  // Category counts for filter badges
  const categoryCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      All: actions.length,
      Transport: 0,
      Energy: 0,
      Recycling: 0,
      Water: 0,
      Lifestyle: 0,
    }
    for (const a of actions) counts[a.category]++
    return counts
  }, [actions])

  return {
    actions: filtered,
    allActions: actions,
    filter,
    search,
    changeFilter,
    changeSearch,
    addAction,
    removeAction,
    summary,
    categoryCounts,
  }
}

// ── Form state helper ─────────────────────────────────────────────────────────
export interface ActionFormState {
  title: string
  category: ActionCategory
  points: string
  date: string
  time: string
  notes: string
}

export function defaultFormState(): ActionFormState {
  const now = new Date()
  return {
    title: '',
    category: 'Transport',
    points: '',
    date: now.toISOString().slice(0, 10),
    time: now.toTimeString().slice(0, 5),
    notes: '',
  }
}
