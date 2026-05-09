import { motion } from 'framer-motion'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'
import type { RegionData } from '../../data/regionalData'
import { getAqiColor } from '../../utils/analyticsHelpers'
import { fadeUp } from '../../animations/variants'

const tooltipStyle = {
  backgroundColor: 'rgba(7,10,15,0.95)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  color: '#f4f4f5',
  fontSize: '11px',
}
const axisStyle = { fill: 'rgba(244,244,245,0.4)', fontSize: 9 }

interface GlobalChartsSectionProps {
  regions: RegionData[]
}

export function GlobalChartsSection({ regions }: GlobalChartsSectionProps) {
  // Shorten names for chart labels
  const chartData = regions.map((r) => ({
    name: r.name.split(' ')[0].slice(0, 8),
    AQI: r.aqi,
    CO2: r.co2PerCapita,
    Renewable: r.renewablePercent,
    Water: r.waterQuality,
    fill: getAqiColor(r.aqi),
  }))

  // Radar data for top 5 cleanest
  const top5 = [...regions].sort((a, b) => a.aqi - b.aqi).slice(0, 5)
  const radarData = [
    { metric: 'Air Quality', ...Object.fromEntries(top5.map((r) => [r.name.split(' ')[0], Math.max(0, 100 - r.aqi / 3)])) },
    { metric: 'Renewable', ...Object.fromEntries(top5.map((r) => [r.name.split(' ')[0], r.renewablePercent])) },
    { metric: 'Water', ...Object.fromEntries(top5.map((r) => [r.name.split(' ')[0], r.waterQuality])) },
    { metric: 'Low CO₂', ...Object.fromEntries(top5.map((r) => [r.name.split(' ')[0], Math.max(0, 100 - r.co2PerCapita * 4)])) },
    { metric: 'Forest', ...Object.fromEntries(top5.map((r) => [r.name.split(' ')[0], r.forestCover])) },
  ]

  const radarColors = ['#22ffa8', '#4ad8ff', '#c084fc', '#fb923c', '#fbbf24']

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-1">
        <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">GLOBAL CHARTS</p>
        <p className="mt-1 text-lg font-semibold text-zinc-50">Data Visualisation</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* AQI comparison bar */}
        <motion.div
          className="glass glow-ring rounded-2xl p-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={0}
        >
          <p className="mb-1 text-[10px] font-semibold tracking-[0.15em] text-zinc-200/55">AQI COMPARISON</p>
          <p className="mb-4 text-sm font-semibold text-zinc-50">Air Quality by Region</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number) => [`AQI ${v}`, 'Air Quality Index']}
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              />
              <Bar dataKey="AQI" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* CO₂ bar */}
        <motion.div
          className="glass glow-ring rounded-2xl p-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={1}
        >
          <p className="mb-1 text-[10px] font-semibold tracking-[0.15em] text-zinc-200/55">CO₂ EMISSIONS</p>
          <p className="mb-4 text-sm font-semibold text-zinc-50">Per Capita (tonnes/yr)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number) => [`${v}t CO₂`, 'Per Capita']}
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              />
              <Bar dataKey="CO2" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.CO2 > 10 ? '#f87171' : entry.CO2 > 6 ? '#fb923c' : '#22ffa8'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Renewable energy bar */}
        <motion.div
          className="glass glow-ring rounded-2xl p-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={2}
        >
          <p className="mb-1 text-[10px] font-semibold tracking-[0.15em] text-zinc-200/55">RENEWABLE ENERGY</p>
          <p className="mb-4 text-sm font-semibold text-zinc-50">% of Total Energy Mix</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number) => [`${v}%`, 'Renewable']}
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              />
              <Bar dataKey="Renewable" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.Renewable > 60 ? '#22ffa8' : entry.Renewable > 30 ? '#4ad8ff' : '#fb923c'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Radar — top 5 cleanest */}
        <motion.div
          className="glass glow-ring rounded-2xl p-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={3}
        >
          <p className="mb-1 text-[10px] font-semibold tracking-[0.15em] text-zinc-200/55">SUSTAINABILITY RADAR</p>
          <p className="mb-4 text-sm font-semibold text-zinc-50">Top 5 Cleanest Regions</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(244,244,245,0.45)', fontSize: 9 }} />
              {top5.map((r, i) => (
                <Radar
                  key={r.id}
                  name={r.name.split(' ')[0]}
                  dataKey={r.name.split(' ')[0]}
                  stroke={radarColors[i]}
                  fill={radarColors[i]}
                  fillOpacity={0.08}
                  strokeWidth={1.5}
                />
              ))}
              <Legend wrapperStyle={{ fontSize: '9px', color: 'rgba(244,244,245,0.5)' }} />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}
