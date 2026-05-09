import { motion } from 'framer-motion'
import { AIBackgroundFX } from '../components/aiAdvisor/AIBackgroundFX'
import { AIHero } from '../components/aiAdvisor/AIHero'
import { AINavbar } from '../components/aiAdvisor/AINavbar'
import { CO2Estimator } from '../components/aiAdvisor/CO2Estimator'
import { PersonalizationForm } from '../components/aiAdvisor/PersonalizationForm'
import { SavedPlansPanel } from '../components/aiAdvisor/SavedPlansPanel'
import { SuggestedImprovements } from '../components/aiAdvisor/SuggestedImprovements'
import { WeeklyPlanCard } from '../components/aiAdvisor/WeeklyPlanCard'
import { ChatInterface } from '../components/chat/ChatInterface'
import { staggerContainer } from '../animations/variants'
import { useAIAdvisor } from '../hooks/useAIAdvisor'

interface AIAdvisorPageProps {
  onBack?: () => void
  onDashboard?: () => void
}

export function AIAdvisorPage({ onBack, onDashboard }: AIAdvisorPageProps) {
  const {
    messages, input, setInput, isTyping, sendMessage,
    currentPlan, generatePlan,
    saveCurrentPlan, planSaved, toggleAction,
    savedPlans, loadSavedPlan,
    weeklyCo2, monthlyCo2, completedCount,
    bottomRef,
  } = useAIAdvisor()

  return (
    <div className="min-h-screen bg-[#070A0F]">
      <AIBackgroundFX />
      <AINavbar onBack={onBack} onDashboard={onDashboard} />

      <main className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
        <AIHero />

        <motion.div
          className="grid gap-8 lg:grid-cols-[1fr_420px]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Left column — chat + plan */}
          <div className="flex flex-col gap-6">
            <ChatInterface
              messages={messages}
              input={input}
              setInput={setInput}
              isTyping={isTyping}
              onSend={sendMessage}
              bottomRef={bottomRef}
            />

            {currentPlan && (
              <WeeklyPlanCard
                plan={currentPlan}
                onToggle={toggleAction}
                onSave={saveCurrentPlan}
                saved={planSaved}
              />
            )}
          </div>

          {/* Right column — tools */}
          <div className="flex flex-col gap-6">
            <PersonalizationForm onGenerate={generatePlan} />

            {currentPlan && (
              <CO2Estimator
                weeklyCo2={weeklyCo2}
                monthlyCo2={monthlyCo2}
                completedCount={completedCount}
                totalActions={currentPlan.actions.length}
              />
            )}

            <SuggestedImprovements />

            <SavedPlansPanel plans={savedPlans} onLoad={loadSavedPlan} />
          </div>
        </motion.div>
      </main>
    </div>
  )
}
