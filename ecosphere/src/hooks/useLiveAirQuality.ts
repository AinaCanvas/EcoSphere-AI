// Fetches live AQI data from Open-Meteo Air Quality API (free, no API key required)
// Docs: https://open-meteo.com/en/docs/air-quality-api

import { useEffect, useState } from 'react'

export interface LiveAQIData {
  aqi: number | null          // European AQI (0–500)
  pm25: number | null         // µg/m³
  pm10: number | null         // µg/m³
  no2: number | null          // µg/m³
  o3: number | null           // µg/m³
  updatedAt: string | null    // ISO timestamp
  loading: boolean
  error: string | null
}

// Default coords: London (used as a global reference point)
const DEFAULT_LAT = 51.5074
const DEFAULT_LON = -0.1278

export function useLiveAirQuality(lat = DEFAULT_LAT, lon = DEFAULT_LON): LiveAQIData {
  const [data, setData] = useState<LiveAQIData>({
    aqi: null, pm25: null, pm10: null, no2: null, o3: null,
    updatedAt: null, loading: true, error: null,
  })

  useEffect(() => {
    let cancelled = false

    async function fetchAQI() {
      setData((d) => ({ ...d, loading: true, error: null }))
      try {
        const url =
          `https://air-quality-api.open-meteo.com/v1/air-quality` +
          `?latitude=${lat}&longitude=${lon}` +
          `&current=european_aqi,pm10,pm2_5,nitrogen_dioxide,ozone` +
          `&timezone=auto`

        const res = await fetch(url)
        if (!res.ok) throw new Error(`API error ${res.status}`)
        const json = await res.json()

        if (cancelled) return

        const c = json.current ?? {}
        setData({
          aqi:       c.european_aqi       ?? null,
          pm25:      c.pm2_5              ?? null,
          pm10:      c.pm10               ?? null,
          no2:       c.nitrogen_dioxide   ?? null,
          o3:        c.ozone              ?? null,
          updatedAt: c.time               ?? new Date().toISOString(),
          loading:   false,
          error:     null,
        })
      } catch (err) {
        if (!cancelled) {
          setData((d) => ({
            ...d,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to fetch air quality data',
          }))
        }
      }
    }

    fetchAQI()
    // Refresh every 10 minutes
    const interval = setInterval(fetchAQI, 10 * 60 * 1000)
    return () => { cancelled = true; clearInterval(interval) }
  }, [lat, lon])

  return data
}
