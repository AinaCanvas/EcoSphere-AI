import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Bot, Sparkles } from 'lucide-react'
import type { RefObject } from 'react'
import type { ChatMessage } from '../../data/aiPrompts'
import { QUICK_PROMPTS } from '../../data/aiPrompts'
import { ChatBubble } from './ChatBubble'
import { TypingIndicator } from './TypingIndicator'

interface ChatInterfaceProps {
  messages: ChatMessage[]
  input: string
  setInput: (v: string) => void
  isTyping: boolean
  onSend: (text?: string) => void
  bottomRef: RefObject<HTMLDivElement>
}

export function ChatInterface({
  messages, input, setInput, isTyping, onSend, bottomRef,
}: ChatInterfaceProps) {
  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend() }
  }

  return (
    <div className="glass glow-ring flex flex-col overflow-hidden rounded-2xl" style={{ minHeight: 520 }}>
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-white/5 px-5 py-4">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-400/15 ring-1 ring-violet-300/25">
          <Bot className="h-5 w-5 text-violet-300" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-100">EcoSphere AI</p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(34,255,168,0.9)]" />
            <span className="text-[11px] text-zinc-500">Online · Sustainability expert</span>
          </div>
        </div>
        <div className="ml-auto">
          <span className="rounded-full bg-violet-400/10 px-2.5 py-1 text-[10px] font-semibold text-violet-300 ring-1 ring-violet-300/20">
            AI-Powered
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-5" style={{ maxHeight: 380 }}>
        {messages.map((msg, i) => (
          <ChatBubble key={msg.id} message={msg} index={i} />
        ))}
        <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      {messages.length <= 1 && (
        <div className="border-t border-white/5 px-5 py-3">
          <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-zinc-600 uppercase">
            <Sparkles className="h-3 w-3" /> Quick prompts
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.slice(0, 4).map((p) => (
              <button
                key={p}
                onClick={() => onSend(p)}
                className="rounded-xl bg-white/5 px-3 py-1.5 text-xs text-zinc-400 ring-1 ring-white/10 transition hover:bg-violet-400/10 hover:text-violet-200 hover:ring-violet-300/20 focus:outline-none"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-white/5 px-4 py-4">
        <div className="flex items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask me anything about sustainability…"
            rows={1}
            className="flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-violet-400/40 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]"
            style={{ maxHeight: 120 }}
          />
          <motion.button
            onClick={() => onSend()}
            disabled={!input.trim() || isTyping}
            whileTap={{ scale: 0.93 }}
            className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-400/15 ring-1 ring-violet-300/25 transition hover:bg-violet-400/25 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none"
          >
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle,rgba(139,92,246,0.5),transparent_60%)]" />
            <ArrowUp className="h-4 w-4 text-violet-200" />
          </motion.button>
        </div>
        <p className="mt-2 text-center text-[10px] text-zinc-700">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
