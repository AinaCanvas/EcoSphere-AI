import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'
import type { ChatMessage } from '../../data/aiPrompts'

// Minimal markdown-like renderer: bold **text**, newlines, bullet •
function renderContent(text: string) {
  return text.split('\n').map((line, i) => {
    // Bold
    const parts = line.split(/\*\*(.*?)\*\*/g)
    const rendered = parts.map((part, j) =>
      j % 2 === 1 ? <strong key={j} className="font-semibold text-zinc-100">{part}</strong> : part,
    )
    return (
      <span key={i} className="block">
        {rendered}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    )
  })
}

interface ChatBubbleProps {
  message: ChatMessage
  index: number
}

export function ChatBubble({ message, index }: ChatBubbleProps) {
  const isAI = message.role === 'ai'

  return (
    <motion.div
      className={`flex gap-3 ${isAI ? 'items-start' : 'items-start flex-row-reverse'}`}
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Avatar */}
      <div
        className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl ring-1 ${
          isAI
            ? 'bg-violet-400/15 ring-violet-300/25'
            : 'bg-emerald-400/15 ring-emerald-300/25'
        }`}
      >
        {isAI
          ? <Bot className="h-4 w-4 text-violet-300" />
          : <User className="h-4 w-4 text-emerald-300" />
        }
      </div>

      {/* Bubble */}
      <div
        className={`relative max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isAI
            ? 'rounded-tl-sm bg-white/5 text-zinc-200 ring-1 ring-white/8 shadow-[0_0_20px_rgba(139,92,246,0.08)]'
            : 'rounded-tr-sm bg-emerald-400/10 text-emerald-100 ring-1 ring-emerald-300/20 shadow-[0_0_20px_rgba(34,255,168,0.08)]'
        }`}
      >
        {isAI && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl rounded-tl-sm bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.12),transparent_60%)]" />
        )}
        <div className="relative">{renderContent(message.content)}</div>
        <p className="mt-1.5 text-[10px] text-zinc-600">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  )
}
