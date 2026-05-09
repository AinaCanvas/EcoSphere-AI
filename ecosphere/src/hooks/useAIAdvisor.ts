import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChatMessage, SavedPlan, UserPreferences, WeeklyAction } from '../data/aiPrompts'
import { getMockAIResponse } from '../data/aiPrompts'
import {
  calcMonthlyCo2,
  calcWeeklyCo2,
  createPlan,
  loadPlans,
  savePlan,
  updateActionCompletion,
} from '../utils/aiPlanner'

let msgId = 0
function nextId() { return `msg-${++msgId}` }

const WELCOME: ChatMessage = {
  id: nextId(),
  role: 'ai',
  content: `Hello! 👋 I'm your **AI Sustainability Advisor**.\n\nI can help you build a personalised green action plan, estimate your CO₂ savings, and give you science-backed eco tips.\n\nTry one of the quick prompts below, or ask me anything about sustainability!`,
  timestamp: new Date(),
}

export function useAIAdvisor() {
  const [messages, setMessages]         = useState<ChatMessage[]>([WELCOME])
  const [input, setInput]               = useState('')
  const [isTyping, setIsTyping]         = useState(false)
  const [currentPlan, setCurrentPlan]   = useState<SavedPlan | null>(null)
  const [savedPlans, setSavedPlans]     = useState<SavedPlan[]>(() => loadPlans())
  const [showPlanner, setShowPlanner]   = useState(false)
  const [planSaved, setPlanSaved]       = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = useCallback(async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content) return

    const userMsg: ChatMessage = { id: nextId(), role: 'user', content, timestamp: new Date() }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking delay (800–1400ms)
    const delay = 800 + Math.random() * 600
    await new Promise((r) => setTimeout(r, delay))

    const reply = getMockAIResponse(content)
    const aiMsg: ChatMessage = { id: nextId(), role: 'ai', content: reply, timestamp: new Date() }
    setMessages((m) => [...m, aiMsg])
    setIsTyping(false)
  }, [input])

  const generatePlan = useCallback((prefs: UserPreferences) => {
    const plan = createPlan(prefs)
    setCurrentPlan(plan)
    setShowPlanner(false)
    setPlanSaved(false)
  }, [])

  const saveCurrentPlan = useCallback(() => {
    if (!currentPlan) return
    savePlan(currentPlan)
    setSavedPlans(loadPlans())
    setPlanSaved(true)
  }, [currentPlan])

  const toggleAction = useCallback((actionId: string, completed: boolean) => {
    if (!currentPlan) return
    const updated: SavedPlan = {
      ...currentPlan,
      actions: currentPlan.actions.map((a) =>
        a.id === actionId ? { ...a, completed } : a,
      ),
    }
    setCurrentPlan(updated)
    updateActionCompletion(currentPlan.id, actionId, completed)
  }, [currentPlan])

  const loadSavedPlan = useCallback((plan: SavedPlan) => {
    setCurrentPlan(plan)
    setPlanSaved(true)
  }, [])

  const weeklyCo2  = currentPlan ? calcWeeklyCo2(currentPlan.actions) : 0
  const monthlyCo2 = calcMonthlyCo2(weeklyCo2)
  const completedCount = currentPlan?.actions.filter((a) => a.completed).length ?? 0

  return {
    messages, input, setInput, isTyping, sendMessage,
    currentPlan, showPlanner, setShowPlanner, generatePlan,
    saveCurrentPlan, planSaved, toggleAction,
    savedPlans, loadSavedPlan,
    weeklyCo2, monthlyCo2, completedCount,
    bottomRef,
  }
}
