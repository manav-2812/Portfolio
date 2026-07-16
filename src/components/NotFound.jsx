import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

export default function NotFound({ onNavigate }) {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Save original title
    const prevTitle = document.title
    document.title = '404 Page Not Found — Manav Baghel'

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }

    // Set initial size
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      // Restore original title
      document.title = prevTitle
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleGoHome = (e) => {
    e.preventDefault()
    window.history.pushState({}, '', '/')
    onNavigate('/')
  }

  // Animation variants
  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center justify-center overflow-hidden min-h-svh w-full px-6 py-24 select-none"
      style={{ background: 'var(--paper)' }}
      aria-label="404 Page Not Found"
    >
      {/* Interactive Grid overlay that reacts to mouse */}
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
        {/* Fine background grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, var(--hairline) 1px, transparent 1px),
                              linear-gradient(to bottom, var(--hairline) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Laser Coordinates intersection indicator */}
        {dimensions.width > 0 && (
          <svg className="absolute inset-0 w-full h-full">
            {/* Horizontal line */}
            <line
              x1="0"
              y1={mousePos.y}
              x2={dimensions.width}
              y2={mousePos.y}
              stroke="var(--hairline-strong)"
              strokeWidth="0.75"
              strokeDasharray="4 4"
            />
            {/* Vertical line */}
            <line
              x1={mousePos.x}
              y1="0"
              x2={mousePos.x}
              y2={dimensions.height}
              stroke="var(--hairline-strong)"
              strokeWidth="0.75"
              strokeDasharray="4 4"
            />
            {/* Pulse circle at intersection */}
            <circle
              cx={mousePos.x}
              cy={mousePos.y}
              r="4"
              fill="var(--pine)"
              opacity="0.7"
            />
          </svg>
        )}

        {/* Live Coordinate readout text trailing the cursor */}
        <div
          className="absolute text-[10px] tracking-widest font-mono pointer-events-none"
          style={{
            left: `${mousePos.x + 12}px`,
            top: `${mousePos.y + 12}px`,
            color: 'var(--ink-soft)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          X: {Math.round(mousePos.x)} / Y: {Math.round(mousePos.y)}
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        {/* Status Code / Category Label */}
        <motion.div
          {...fadeIn(0)}
          className="mb-6 font-mono text-xs uppercase tracking-widest"
          style={{ color: 'var(--pine)', fontFamily: 'var(--font-mono)' }}
        >
          System Code: 404 // ROUTE_UNRESOLVED
        </motion.div>

        {/* Huge Serif Display Title */}
        <div className="relative mb-6">
          {/* Subtle Brass background glow */}
          <div
            className="absolute pointer-events-none opacity-20"
            style={{
              width: '280px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, var(--brass) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(40px)',
            }}
          />
          <motion.h1
            {...fadeIn(0.1)}
            className="font-display text-7xl md:text-8xl font-bold tracking-tight relative z-10"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            Lost here?
          </motion.h1>
        </div>

        {/* Main description */}
        <motion.p
          {...fadeIn(0.2)}
          className="text-sm md:text-base mb-10 leading-relaxed"
          style={{ color: 'var(--ink-soft)', fontFamily: 'var(--font-body)' }}
        >
          The page you requested (
          <code
            className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{ background: 'var(--paper-dim)', color: 'var(--ink)' }}
          >
            {window.location.pathname}
          </code>
          ) cannot be found. Either it never existed, or it has been archived into
          an unmapped memory block.
        </motion.p>

        {/* Go back CTA */}
        <motion.div {...fadeIn(0.3)}>
          <MagneticButton strength={6}>
            <a
              href="/"
              onClick={handleGoHome}
              className="btn-primary text-xs px-7 py-3.5 rounded-full inline-flex items-center gap-2 font-medium tracking-wide shadow-sm"
              style={{
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Go Back Home
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Corner coordinate references for a technical blueprint feel */}
      <div className="absolute bottom-4 left-6 hidden md:block text-[9px] font-mono opacity-30 select-none uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
        SYS_STATUS: ACTIVE // PATH: '{window.location.pathname}'
      </div>
      <div className="absolute bottom-4 right-6 hidden md:block text-[9px] font-mono opacity-30 select-none uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
        LOC: {new Date().toISOString().split('T')[0]} // RES: {dimensions.width}x{dimensions.height}
      </div>
    </section>
  )
}
