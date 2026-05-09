import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { CalculationResult } from '../../utils/calculations'
import { MONTHLY_TREND } from '../../utils/calculations'
import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'

interface ComparisonSectionProps {
  result: CalculationResult
}

const tooltipStyle = {
  backgroundColor: 'rgba(7,10,15,0.95)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  color: '#f4f4f5',
  fontSize: '11px',
}

const axisStyle = { fill: 'rgba(244,244,245,0.45)', fontSize: 10 }

export function ComparisonSection({ result }: ComparisonSectionProps) {
  // Build comparison bar data
  const compData = [
    { name: 'You', value: result.totalKgPerYear, fill: '#22ffa8' },
    { name: 'Global Avg', value: result.globalAvgKgPerYear, fill: '#4ad8ff' },
    { name: 'EU Avg', value: 8_200, fill: '#a78bfa' },
    { name: 'US Avg', value: 14_000, fill: '#fb923c' },
    { name: 'Target', value: 2_000, fill: '#34d399' },
  ]

  // Adjust monthly trend to scale with result
  const scaleFactor = result.totalKgPerYear / 12 / 510
  const trendData = MONTHLY_TREND.map((d) => ({
    ...d,
    you: Math.round(d.you * scaleFactor),
    avg: Math.round(d.avg * scaleFactor),
  }))

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Bar comparison */}
      <motion.div
        className="glass glow-ring rounded-2xl p-5"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        custom={0}
      >
        <p className="mb-1 text-xs font-semibold tracking-[0.15em] text-zinc-200/60">
          COMPARISON
        </p>
        <p className="mb-4 text-sm font-semibold text-zinc-50">
          You vs Global Benchmarks
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={compData} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}t`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v: number) => [`${v.toLocaleString()} kg CO₂`, '']}
              cursor={{ fill: 'rgba(255,255,255,0.03)' }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {compData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Monthly trend */}
      <motion.div
        className="glass glow-ring rounded-2xl p-5"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        custom={1}
      >
        <p className="mb-1 text-xs font-semibold tracking-[0.15em] text-zinc-200/60">
          TREND
        </p>
        <p className="mb-4 text-sm font-semibold text-zinc-50">
          Monthly Carbon Trend
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v}kg`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v: number) => [`${v} kg CO₂`, '']}
            />
            <Legend
              wrapperStyle={{ fontSize: '10px', color: 'rgba(244,244,245,0.6)' }}
            />
            <Line
              type="monotone"
              dataKey="you"
              name="You"
              stroke="#22ffa8"
              strokeWidth={2}
              dot={{ fill: '#22ffa8', r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="avg"
              name="Global Avg"
              stroke="#4ad8ff"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Savings card */}
      <motion.div
        className="glass glow-ring rounded-2xl p-5 lg:col-span-2"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        custom={2}
      >
        <p className="mb-4 text-xs font-semibold tracking-[0.15em] text-zinc-200/60">
          POTENTIAL YEARLY SAVINGS
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              label: 'Your Annual Footprint',
              value: `${(result.totalKgPerYear / 1000).toFixed(1)}t`,
              sub: 'CO₂ per year',
              color: 'text-zinc-50',
              bg: 'bg-white/5 ring-white/10',
            },
            {
              label: 'Potential Reduction',
              value: `${(result.potentialSavingsKgPerYear / 1000).toFixed(1)}t`,
              sub: 'achievable with tips',
              color: 'text-emerald-200',
              bg: 'bg-emerald-300/10 ring-emerald-200/15',
            },
            {
              label: 'vs Global Average',
              value: result.totalKgPerYear > result.globalAvgKgPerYear
                ? `+${((result.totalKgPerYear - result.globalAvgKgPerYear) / 1000).toFixed(1)}t`
                : `-${((result.globalAvgKgPerYear - result.totalKgPerYear) / 1000).toFixed(1)}t`,
              sub: result.totalKgPerYear > result.globalAvgKgPerYear ? 'above average' : 'below average',
              color: result.totalKgPerYear > result.globalAvgKgPerYear ? 'text-orange-300' : 'text-emerald-300',
              bg: result.totalKgPerYear > result.globalAvgKgPerYear
                ? 'bg-orange-300/10 ring-orange-200/15'
                : 'bg-emerald-300/10 ring-emerald-200/15',
            },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl p-4 ring-1 ${stat.bg}`}>
              <p className="text-xs text-zinc-200/60">{stat.label}</p>
              <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="mt-0.5 text-[11px] text-zinc-200/50">{stat.sub}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
