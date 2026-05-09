import { useCallback, useMemo, useState } from 'react'
import { regions } from '../data/regionalData'
import type { FilterMetric, RegionData } from '../data/regionalData'
import { getRankedRegions, getInsights } from '../utils/analyticsHelpers'

function getInitialFilter(): FilterMetric {
  if (typeof window !== 'undefined') {
    const p = new URLSearchParams(window.location.search).get('metric') as FilterMetric | null
    if (p && ['AQI', 'CO2', 'Renewable', 'Pollution'].includes(p)) return p
  }
  return 'AQI'
}

function getInitialRegion(): string | null {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search).get('region')
  }
  return null
}

export function useEnvironmentalData() {
  const [filter, setFilter] = useState<FilterMetric>(getInitialFilter)
  const [selectedId, setSelectedId] = useState<string | null>(getInitialRegion)

  const changeFilter = useCallback((m: FilterMetric) => {
    setFilter(m)
    const params = new URLSearchParams(window.location.search)
    params.set('metric', m)
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`)
  }, [])

  const selectRegion = useCallback((id: string | null) => {
    setSelectedId(id)
    const params = new URLSearchParams(window.location.search)
    if (id) params.set('region', id)
    else params.delete('region')
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`)
  }, [])

  const selected: RegionData | null = useMemo(
    () => regions.find((r) => r.id === selectedId) ?? null,
    [selectedId],
  )

  const ranked = useMemo(() => getRankedRegions(regions, filter), [filter])
  const insights = useMemo(() => getInsights(regions), [])

  return {
    regions,
    filter,
    changeFilter,
    selected,
    selectRegion,
    ranked,
    insights,
  }
}
