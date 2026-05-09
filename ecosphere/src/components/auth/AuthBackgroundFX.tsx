export function AuthBackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#070A0F]" />

      {/* Top-left emerald orb */}
      <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[120px]" />

      {/* Bottom-right cyan orb */}
      <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Center subtle glow */}
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/5 blur-[100px]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,216,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(74,216,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-emerald-300/30"
          style={{
            left: `${8 + i * 8}%`,
            top: `${10 + ((i * 37) % 80)}%`,
            animation: `float-particle ${4 + (i % 4)}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes float-particle {
          from { transform: translateY(0px) scale(1); opacity: 0.3; }
          to   { transform: translateY(-20px) scale(1.4); opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}
