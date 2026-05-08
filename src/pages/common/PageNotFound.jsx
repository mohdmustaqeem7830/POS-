import React, { useEffect, useState } from 'react'

const FloatingParticle = ({ style }) => (
  <div
    className="absolute rounded-full opacity-20 animate-pulse"
    style={style}
  />
)

const PageNotFound = () => {
  const [mounted, setMounted] = useState(false)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const particles = [
    { width: 6, height: 6, background: '#10b981', top: '15%', left: '10%', animationDuration: '3s' },
    { width: 10, height: 10, background: '#10b981', top: '70%', left: '85%', animationDuration: '4s' },
    { width: 4, height: 4, background: '#ffffff', top: '40%', left: '92%', animationDuration: '2.5s' },
    { width: 8, height: 8, background: '#10b981', top: '80%', left: '20%', animationDuration: '5s' },
    { width: 5, height: 5, background: '#ffffff', top: '25%', left: '75%', animationDuration: '3.5s' },
    { width: 7, height: 7, background: '#10b981', top: '60%', left: '5%', animationDuration: '4.5s' },
    { width: 4, height: 4, background: '#ffffff', top: '88%', left: '60%', animationDuration: '2s' },
    { width: 9, height: 9, background: '#10b981', top: '10%', left: '50%', animationDuration: '6s' },
  ]

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-zinc-950 px-6">

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} style={{ ...p, position: 'absolute', animationDelay: `${i * 0.4}s` }} />
      ))}

      {/* Top scan line animation */}
      <div
        className="absolute left-0 right-0 h-px opacity-30 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
          animation: 'scanline 4s linear infinite',
          top: 0,
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* 404 giant text with glitch */}
        <div className="relative select-none mb-2">
          <h1
            className="font-black leading-none tracking-tighter"
            style={{
              fontSize: 'clamp(6rem, 20vw, 12rem)',
              color: '#10b981',
              textShadow: glitch
                ? '4px 0 #ff006e, -4px 0 #00cfff'
                : '0 0 40px rgba(16,185,129,0.4)',
              transform: glitch ? `translate(${Math.random() * 4 - 2}px, 0)` : 'none',
              transition: 'text-shadow 0.1s',
              fontFamily: '"Courier New", monospace',
            }}
          >
            404
          </h1>
          {glitch && (
            <h1
              className="font-black absolute inset-0 leading-none tracking-tighter pointer-events-none"
              style={{
                fontSize: 'clamp(6rem, 20vw, 12rem)',
                color: '#ff006e',
                opacity: 0.3,
                transform: 'translate(3px, -2px)',
                fontFamily: '"Courier New", monospace',
              }}
            >
              404
            </h1>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6 w-full max-w-xs sm:max-w-sm">
          <div className="flex-1 h-px bg-emerald-500 opacity-40" />
          <span className="text-emerald-500 text-xs font-mono opacity-60 tracking-widest">ERROR</span>
          <div className="flex-1 h-px bg-emerald-500 opacity-40" />
        </div>

        {/* Heading */}
        <h2
          className="text-white font-semibold text-xl sm:text-2xl md:text-3xl mb-3 tracking-wide"
          style={{ fontFamily: '"Courier New", monospace' }}
        >
          Page Not Found
        </h2>

        {/* Subtitle */}
        <p className="text-zinc-400 text-sm sm:text-base max-w-xs sm:max-w-md leading-relaxed mb-2">
          The page you're looking for doesn't exist, moved, or is still loading.
        </p>

        {/* Blinking terminal line */}
        <div className="font-mono text-emerald-400 text-xs sm:text-sm mb-8 flex items-center gap-1 opacity-70">
          <span>sys://brythiq-pos/not-found</span>
          <span
            className="inline-block w-2 h-4 bg-emerald-400 ml-1"
            style={{ animation: 'blink 1s step-end infinite' }}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-sm">
          <button
            onClick={() => window.history.back()}
            className="flex-1 px-6 py-3 rounded-lg border border-emerald-500 text-emerald-400 text-sm font-mono font-medium tracking-wide transition-all duration-200 hover:bg-emerald-500 hover:text-black active:scale-95"
          >
            ← Go Back
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 px-6 py-3 rounded-lg bg-emerald-500 text-black text-sm font-mono font-bold tracking-wide transition-all duration-200 hover:bg-emerald-400 active:scale-95"
          >
            Go Home →
          </button>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-4 left-4 font-mono text-zinc-700 text-xs hidden sm:block">
        BRYTHIQ POS v1.0
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-zinc-700 text-xs hidden sm:block">
        STATUS: 404
      </div>

      <style>{`
        @keyframes scanline {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default PageNotFound