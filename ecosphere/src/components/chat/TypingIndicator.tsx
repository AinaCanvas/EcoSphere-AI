import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

export function TypingIndicator() {
  return (
    <motion.div
      className="flex items-start gap-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-400/15 ring-1 ring-violet-300/25">
        <Bot className="h-4 w-4 text-violet-300" />
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-white/5 px-4 py-3.5 ring-1 ring-white/8">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-violet-400"
            animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </motion.div>
  )
}
