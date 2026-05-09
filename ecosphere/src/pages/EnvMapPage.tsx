import { motion } from 'framer-motion'
import { DashboardBackgroundFX } from '../components/dashboard/DashboardBackgroundFX'
import { EnvMapNavbar } from '../components/environmentMap/EnvMapNavbar'
import { EnvMapHero } from '../components/environmentMap/EnvMapHero'
import { MetricFilterBar } from '../components/environmentMap/MetricFilterBar'
import { RegionGrid } from '../components/environmentMap/RegionGrid'
import { RegionDetailPanel } from '../components/environmentMap/RegionDetailPanel'
import { GlobalChartsSection } from '../components/environmentMap/GlobalChartsSection'
import { RegionalRankingBoard } from '../components/environmentMap/RegionalRankingBoard'
import { InsightsPanel } from '../components/environmentMap/InsightsPanel'
import { LiveAQIWidget } from '../components/environmentMap/LiveAQIWidget'
import { useEnvironmentalData } from '../hooks/useEnvironmentalData'
import { staggerContainer, fadeUp } from '../animations/variants'

interface EnvMapPageProps {
  onBack: () => void
  onDashboard: () => void
  onEcoLog: () => void
}

export function EnvMapPage({ onBack, onDashboard, onEcoLog }: EnvMapPageProps) {
  const { regions, filter, changeFilter, selected, selectRegion, ranked, insights } =
    useEnvironmentalData()

  return (
    <div className="min-h-screen bg-[#070A0F]">
      <DashboardBackgroundFX />
      <EnvMapNavbar onBack={onBack} onDashboard={onDashboard} onEcoLog={onEcoLog} />

      <main className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
        <EnvMapHero />

        <motion.div
          className="flex flex-col gap-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Live AQI from external API */}
          <motion.section variants={fadeUp} custom={0}>
            <div className="mb-3">
              <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">LIVE DATA</p>
              <p className="mt-1 text-lg font-semibold text-zinc-50">Real-Time Air Quality</p>
            </div>
            <LiveAQIWidget />
          </motion.section>

          {/* Region selector */}
          <section>
            <motion.div
              className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
              variants={fadeUp}
              custom={0}
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">
                  REGION SELECTOR
                </p>
                <h2 className="mt-1 text-lg font-semibold text-zinc-50">
                  Select a Region to Explore
                  {selected && (
                    <span className="ml-2 text-sm font-normal text-cyan-300">
                      — {selected.name}
                    </span>
                  )}
                </h2>
              </div>
              <MetricFilterBar active={filter} onChange={changeFilter} />
            </motion.div>

            <RegionGrid
              regions={regions}
              selected={selected}
              filter={filter}
              onSelect={selectRegion}
            />
          </section>

          {/* Detail panel — shown when a region is selected */}
          <RegionDetailPanel region={selected} onClose={() => selectRegion(null)} />

          {/* Global charts */}
          <GlobalChartsSection regions={regions} />

          {/* Ranking board */}
          <section>
            <div className="mb-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-zinc-200/60">RANKINGS</p>
              <p className="mt-1 text-lg font-semibold text-zinc-50">Regional Leaderboard</p>
            </div>
            <RegionalRankingBoard
              cleanest={ranked.cleanest}
              mostPolluted={ranked.mostPolluted}
              filter={filter}
              onSelect={(id) => selectRegion(id)}
            />
          </section>

          {/* AI Insights */}
          <InsightsPanel insights={insights} onSelect={(id) => selectRegion(id)} />
        </motion.div>
      </main>
    </div>
  )
}
