import { motion, AnimatePresence } from 'framer-motion'
import { Activity, RefreshCw, Wind } from 'lucide-react'
import { useLiveAirQuality } from '../../hooks/useLiveAirQuality'

function aqiLabel(aqi: number): { label: string; color: string; bg: string } {
  if (aqi <= 20)  return { label: 'Good',        color: 'text-emerald-300', bg: 'bg-emerald-400/10' }
  if (aqi <= 40)  return { label: 'Fair',         color: 'text-cyan-300',    bg: 'bg-cyan-400/10' }
  if (aqi <= 60)  return { label: 'Moderate',     color: 'text-yellow-300',  bg: 'bg-yellow-400/10' }
  if (aqi <= 80)  return { label: 'Poor',         color: 'text-orange-300',  bg: 'bg-orange-400/10' }
  if (aqi <= 100) return { label: 'Very Poor',    color: 'text-red-300',     bg: 'bg-red-400/10' }
  return           { label: 'Extremely Poor', color: 'text-red-400',     bg: 'bg-red-400/15' }
}

export function LiveAQIWidget() {
  const { aqi, pm25, pm10, no2, updatedAt, loading, error } = useLiveAirQuality()

  const status = aqi !== null ? aqiLabel(aqi) : null
  const timeStr = updatedAt
    ? new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null

  return (
    <motion.div
      className="glass glow-ring rounded-2xl p-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-300/20">
            <Wind className="h-4 w-4 text-cyan-300" />
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-200">Live Air Quality</p>
            <p className="text-[10px] text-zinc-500">London · Open-Meteo API</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {loading && <RefreshCw className="h-3.5 w-3.5 animate-spin text-zinc-500" />}
          {!loading && !error && (
            <span className="flex items-center gap-1 text-[10px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(34,255,168,0.8)]" />
              Live
            </span>
          )}
          {timeStr && <span className="text-[10px] text-zinc-600">{timeStr}</span>}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3 py-2"
          >
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 flex-1 animate-pulse rounded-xl bg-white/5" />
            ))}
          </motion.div>
        )}

        {error && !loading && (
          <motion.p
            key="error"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-xs text-red-400"
          >
            Could not load live data. Showing cached regional data below.
          </motion.p>
        )}

        {!loading && !error && aqi !== null && status && (
          <motion.div
            key="data"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Main AQI */}
            <div className="flex items-center gap-4">
              <div className={`flex h-16 w-16 flex-col items-center justify-center rounded-2xl ring-1 ring-white/10 ${status.bg}`}>
                <span className={`text-2xl font-bold ${status.color}`}>{aqi}</span>
                <span className="text-[9px] text-zinc-500">AQI</span>
              </div>
              <div>
                <p className={`text-base font-semibold ${status.color}`}>{status.label}</p>
                <p className="text-xs text-zinc-400">European Air Quality Index</p>
                <div className="mt-1.5 flex items-center gap-1">
                  <Activity className="h-3 w-3 text-zinc-500" />
                  <span className="text-[10px] text-zinc-500">Real-time from Open-Meteo</span>
                </div>
              </div>
            </div>

            {/* Pollutant breakdown */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'PM2.5', value: pm25, unit: 'µg/m³', color: 'text-cyan-300' },
                { label: 'PM10',  value: pm10,  unit: 'µg/m³', color: 'text-emerald-300' },
                { label: 'NO₂',   value: no2,   unit: 'µg/m³', color: 'text-yellow-300' },
              ].map((p) => (
                <div key={p.label} className="rounded-xl bg-white/5 p-2.5 ring-1 ring-white/8 text-center">
                  <p className="text-[10px] text-zinc-500">{p.label}</p>
                  <p className={`mt-0.5 text-sm font-semibold ${p.color}`}>
                    {p.value !== null ? p.value.toFixed(1) : '—'}
                  </p>
                  <p className="text-[9px] text-zinc-600">{p.unit}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
