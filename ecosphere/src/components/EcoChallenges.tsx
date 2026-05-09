import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'
import { challenges } from '../data/challengesData'
import { Container } from './Container'
import { GlassCard } from './GlassCard'
import { GlowButton } from './GlowButton'
import { SectionHeading } from './SectionHeading'

type Difficulty = 'Easy' | 'Medium' | 'Hard'

const difficultyStyles: Record<Difficulty, string> = {
  Easy:   'bg-emerald-300/10 text-emerald-200 ring-1 ring-emerald-200/20',
  Medium: 'bg-cyan-300/10    text-cyan-200    ring-1 ring-cyan-200/20',
  Hard:   'bg-fuchsia-300/10 text-fuchsia-200 ring-1 ring-fuchsia-200/20',
}

const categoryColors: Record<string, string> = {
  Transport: 'text-cyan-300',
  Energy:    'text-yellow-300',
  Diet:      'text-emerald-300',
  Recycling: 'text-green-300',
  Nature:    'text-lime-300',
  Lifestyle: 'text-purple-300',
}

interface EcoChallengesProps {
  onNavigateChallenges?: () => void
}

export function EcoChallenges({ onNavigateChallenges }: EcoChallengesProps) {
  // Show the first 4 active/popular challenges — same ones visible on the Challenges page
  const featured = challenges.filter((c) => c.status !== 'Completed').slice(0, 4)

  return (
    <section id="challenges" className="relative py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="ECO CHALLENGES"
            title="Turn habits into missions — and missions into momentum."
            subtitle="Join thousands reducing their footprint through community-driven eco challenges."
          />
          {onNavigateChallenges && (
            <GlowButton onClick={onNavigateChallenges} className="shrink-0">
              All Challenges <ArrowRight className="h-4 w-4" />
            </GlowButton>
          )}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.07 * i }}
              className="h-full"
            >
              <GlassCard className="flex h-full flex-col gap-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 text-2xl ring-1 ring-white/10">
                    {c.icon}
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${difficultyStyles[c.difficulty]}`}>
                    {c.difficulty}
                  </span>
                </div>

                {/* Category */}
                <p className={`text-xs font-semibold uppercase tracking-wider ${categoryColors[c.category] ?? 'text-zinc-400'}`}>
                  {c.category}
                </p>

                {/* Title + desc */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-zinc-50">{c.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{c.description}</p>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="mb-1 flex justify-between text-[11px] text-zinc-500">
                    <span>Community progress</span>
                    <span>{c.communityProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.communityProgress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 * i }}
                    />
                  </div>
                </div>

                {/* Footer stats */}
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {c.participants.toLocaleString()}
                  </span>
                  <span className="text-emerald-400 font-medium">+{c.ecoPoints} pts</span>
                </div>

                <GlowButton
                  variant="ghost"
                  className="w-full justify-center text-xs"
                  onClick={onNavigateChallenges}
                >
                  Join Challenge
                </GlowButton>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
