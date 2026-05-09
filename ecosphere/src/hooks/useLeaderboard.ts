import { useCallback, useMemo, useState } from 'react'
import { allUsers } from '../data/leaderboardData'
import type { CategoryTab, TimeFilter } from '../data/leaderboardData'
import { getRankedUsers, getCommunityStats, findYouRank } from '../utils/rankingUtils'

function getParam<T extends string>(key: string, valid: T[], fallback: T): T {
  if (typeof window !== 'undefined') {
    const v = new URLSearchParams(window.location.search).get(key) as T | null
    if (v && valid.includes(v)) return v
  }
  return fallback
}

function setParam(key: string, value: string) {
  const params = new URLSearchParams(window.location.search)
  params.set(key, value)
  window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`)
}

const TIME_OPTIONS: TimeFilter[]    = ['Weekly', 'Monthly', 'All-Time']
const CAT_OPTIONS:  CategoryTab[]   = ['Overall', 'Transport', 'Energy', 'Recycling', 'Challenges']

export function useLeaderboard() {
  const [time, setTime]     = useState<TimeFilter>(() => getParam('time', TIME_OPTIONS, 'All-Time'))
  const [category, setCat]  = useState<CategoryTab>(() => getParam('cat', CAT_OPTIONS, 'Overall'))

  const changeTime = useCallback((t: TimeFilter) => {
    setTime(t)
    setParam('time', t)
  }, [])

  const changeCategory = useCallback((c: CategoryTab) => {
    setCat(c)
    setParam('cat', c)
  }, [])

  const ranked = useMemo(() => getRankedUsers(allUsers, time, category), [time, category])
  const stats  = useMemo(() => getCommunityStats(allUsers), [])
  const youRank = useMemo(() => findYouRank(ranked), [ranked])

  return { ranked, stats, youRank, time, changeTime, category, changeCategory }
}
