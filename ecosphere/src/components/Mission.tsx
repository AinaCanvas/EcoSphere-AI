import { motion } from 'framer-motion'
import { Brain, Leaf, ShieldCheck, Users2, Zap } from 'lucide-react'
import { Container } from './Container'
import { GlassCard } from './GlassCard'
import { SectionHeading } from './SectionHeading'

const pillars = [
  {
    icon: <Brain className="h-5 w-5 text-emerald-200" />,
    title: 'Smart tracking',
    desc: 'AI-powered signals turn daily actions into clear carbon insights.',
    accent: 'emerald',
  },
  {
    icon: <Zap className="h-5 w-5 text-cyan-200" />,
    title: 'Actionable habits',
    desc: 'Micro-changes with measurable impact — suggested and prioritized.',
    accent: 'cyan',
  },
  {
    icon: <Users2 className="h-5 w-5 text-emerald-200" />,
    title: 'Community challenges',
    desc: 'Join missions, compete with friends, and build better streaks.',
    accent: 'emerald',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-cyan-200" />,
    title: 'Trust & transparency',
    desc: 'Clear assumptions, easy exports, and privacy-first defaults.',
    accent: 'cyan',
  },
] as const

export function Mission() {
  return (
    <section id="about" className="relative py-16 sm:py-20">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="OUR MISSION"
              title="Make sustainability feel effortless, measurable, and shared."
              subtitle="EcoSphere turns climate intent into daily momentum — track your footprint, complete challenges, and learn habits that compound."
            />

            <div className="mt-8 grid gap-3">
              {[
                'Track emissions across transport, energy, and lifestyle',
                'Earn streaks and badges through eco missions',
                'Learn high-impact green habits with personalized recommendations',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
                >
                  <Leaf className="mt-0.5 h-5 w-5 text-emerald-200" />
                  <p className="text-sm leading-relaxed text-zinc-200/80">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: 0.06 * i }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                      {p.icon}
                    </div>
                    <p className="text-sm font-semibold text-zinc-50">
                      {p.title}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-200/75">
                    {p.desc}
                  </p>
                  <div
                    className={
                      p.accent === 'emerald'
                        ? 'mt-6 h-px w-full bg-gradient-to-r from-emerald-300/50 to-transparent'
                        : 'mt-6 h-px w-full bg-gradient-to-r from-cyan-300/50 to-transparent'
                    }
                  />
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

