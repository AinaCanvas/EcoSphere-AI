import { Leaf } from 'lucide-react'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Leaf className="h-5 w-5 text-emerald-200" />
          </span>
          <div>
            <p className="text-sm font-semibold text-zinc-50">EcoSphere</p>
            <p className="text-xs text-zinc-200/60">
              Futuristic sustainability platform
            </p>
          </div>
        </div>

        <p className="text-xs text-zinc-200/55">
          © {new Date().getFullYear()} EcoSphere. Frontend demo for hackathon-style
          landing page.
        </p>
      </Container>
    </footer>
  )
}

