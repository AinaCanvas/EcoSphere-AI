import { AnimatePresence, motion } from 'framer-motion'
import { X, Wind, Zap, Droplets, Trees } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { RegionData } from '../../data/regionalData'
import { aqiConfig } from '../../data/regionalData'
import { getAqiColor, getAqiLabel } from '../../utils/analyticsHelpers'
import { fadeUp } from '../../animations/variants'

const tooltipStyle = {
  backgroundColor: 'rgba(7,10,15,0.95)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  color: '#f4f4f5',
  fontSize: '11px',
}
const axisStyle = { fill: 'rgba(244,244,245,0.4)', fontSize: 10 }
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

interface RegionDetailPanelProps {
  region: RegionData | null
  onClose: () => void
}

export function RegionDetailPanel({ region, onClose }: RegionDetailPanelProps) {
  return (
    <AnimatePresence>
      {region && (
        <motion.div
          key={region.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="glass glow-ring relative overflow-hidden rounded-2xl p-6"
        >
          {/* Background glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(700px circle at 20% 30%, ${aqiConfig[region.pollutionLevel].glow}, transparent 55%)`,
            }}
          />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10"
          >
            <X className="h-4 w-4 text-zinc-200/70" />
          </button>

          <div className="relative">
            {/* Header */}
            <div className="flex items-center gap-4">
              <span className="text-4xl">{region.flag}</span>
              <div>
                <h2 className="text-xl font-bold text-zinc-50">{region.name}</h2>
                <p className="text-sm text-zinc-200/55">{region.country}</p>
              </div>
              <span
                className={`ml-auto rounded-xl px-3 py-1.5 text-xs font-bold ring-1 ${aqiConfig[region.pollutionLevel].bg} ${aqiConfig[region.pollutionLevel].ring} ${aqiConfig[region.pollutionLevel].text}`}
              >
                {region.pollutionLevel} · {aqiConfig[region.pollutionLevel].label}
              </span>
            </div>

            <p className="mt-3 text-sm text-zinc-200/60">{region.description}</p>

            {/* Stat grid */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  icon: <Wind className="h-4 w-4" />,
                  label: 'Air Quality Index',
                  value: region.aqi,
                  sub: getAqiLabel(region.aqi),
                  color: getAqiColor(region.aqi),
                  bg: 'bg-cyan-300/10 ring-cyan-200/15',
                },
                {
                  icon: <span className="text-base">🏭</span>,
                  label: 'CO₂ per Capita',
                  value: `${region.co2PerCapita}t`,
                  sub: 'tonnes/year',
                  color: region.co2PerCapita > 10 ? '#f87171' : '#22ffa8',
                  bg: 'bg-orange-300/10 ring-orange-200/15',
                },
                {
                  icon: <Zap className="h-4 w-4" />,
                  label: 'Renewable Energy',
                  value: `${region.renewablePercent}%`,
                  sub: 'of total energy',
                  color: '#22ffa8',
                  bg: 'bg-emerald-300/10 ring-emerald-200/15',
                },
                {
                  icon: <Droplets className="h-4 w-4" />,
                  label: 'Water Quality',
                  value: `${region.waterQuality}/100`,
                  sub: 'quality score',
                  color: '#60a5fa',
                  bg: 'bg-blue-300/10 ring-blue-200/15',
                },
              ].map((s) => (
                <div key={s.label} className={`rounded-xl p-3 ring-1 ${s.bg}`}>
                  <div className="flex items-center gap-1.5 text-zinc-200/60 text-xs mb-1">
                    {s.icon}
                    <span>{s.label}</span>
                  </div>
                  <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[10px] text-zinc-200/45">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Extra stats */}
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[
                { icon: <span>🌡️</span>, label: 'Avg Temp', value: `${region.temperature}°C` },
                { icon: <Trees className="h-4 w-4 text-emerald-300" />, label: 'Forest Cover', value: `${region.forestCover}%` },
                { icon: <span>⚠️</span>, label: 'Top Issue', value: region.topIssue },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <div className="flex items-center gap-1.5 text-zinc-200/50 text-[10px] mb-1">
                    {s.icon}
                    <span>{s.label}</span>
                  </div>
                  <p className="text-xs font-semibold text-zinc-50 leading-snug">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Strength */}
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-300/8 px-4 py-2.5 ring-1 ring-emerald-200/15">
              <span className="text-lg">✅</span>
              <div>
                <p className="text-[10px] text-zinc-200/50">Top Strength</p>
                <p className="text-xs font-semibold text-emerald-200">{region.topStrength}</p>
              </div>
            </div>

            {/* Charts row */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {/* AQI 7-day trend */}
              <motion.div
                className="rounded-xl bg-white/3 p-4 ring-1 ring-white/8"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <p className="mb-3 text-[10px] font-semibold tracking-[0.15em] text-zinc-200/50">
                  AQI — 7-DAY TREND
                </p>
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={region.aqiTrend.map((v, i) => ({ day: DAYS[i], aqi: v }))}>
                    <defs>
                      <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={getAqiColor(region.aqi)} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={getAqiColor(region.aqi)} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
                    <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={28} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area
                      type="monotone"
                      dataKey="aqi"
                      stroke={getAqiColor(region.aqi)}
                      strokeWidth={2}
                      fill="url(#aqiGrad)"
                      dot={{ fill: getAqiColor(region.aqi), r: 3 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* CO₂ 6-month trend */}
              <motion.div
                className="rounded-xl bg-white/3 p-4 ring-1 ring-white/8"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                <p className="mb-3 text-[10px] font-semibold tracking-[0.15em] text-zinc-200/50">
                  CO₂ — 6-MONTH TREND
                </p>
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={region.co2Trend.map((v, i) => ({ month: MONTHS[i], co2: v }))}>
                    <defs>
                      <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fb923c" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#fb923c" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                    <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={28} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area
                      type="monotone"
                      dataKey="co2"
                      stroke="#fb923c"
                      strokeWidth={2}
                      fill="url(#co2Grad)"
                      dot={{ fill: '#fb923c', r: 3 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
