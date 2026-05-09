import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { CalculationResult } from '../../utils/calculations'
import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'

interface BreakdownChartProps {
  result: CalculationResult
}

const RADIAN = Math.PI / 180

function CustomLabel({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: {
  cx: number; cy: number; midAngle: number; innerRadius: number
  outerRadius: number; percent: number; name?: string
}) {
  if (percent < 0.06) return null
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: { color: string } }[] }) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className="glass rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="font-semibold text-zinc-50">{d.name}</p>
      <p style={{ color: d.payload.color }}>{d.value.toLocaleString()} kg CO₂/yr</p>
    </div>
  )
}

export function BreakdownChart({ result }: BreakdownChartProps) {
  return (
    <motion.div
      className="glass glow-ring rounded-2xl p-5"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={0}
    >
      <p className="mb-1 text-xs font-semibold tracking-[0.15em] text-zinc-200/60">
        EMISSIONS BREAKDOWN
      </p>
      <p className="mb-4 text-sm font-semibold text-zinc-50">By Category</p>

      <div className="flex flex-col items-center gap-6 sm:flex-row">
        {/* Pie */}
        <div className="h-48 w-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={result.breakdown}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={72}
                paddingAngle={3}
                labelLine={false}
                label={CustomLabel as unknown as boolean}
              >
                {result.breakdown.map((entry) => (
                  <Cell
                    key={entry.category}
                    fill={entry.color}
                    stroke="rgba(0,0,0,0.3)"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend + bars */}
        <div className="flex flex-1 flex-col gap-3 w-full">
          {result.breakdown.map((item) => {
            const pct = Math.round((item.value / result.totalKgPerYear) * 100)
            return (
              <div key={item.category}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-zinc-200/80">
                    <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                    {item.category}
                  </span>
                  <span className="font-semibold text-zinc-50">
                    {item.value.toLocaleString()} kg
                    <span className="ml-1 text-zinc-200/50">({pct}%)</span>
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
