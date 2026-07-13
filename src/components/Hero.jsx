import { Suspense, lazy, useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ErrorBoundary from './ErrorBoundary'

const Scene3D = lazy(() => import('./Scene3D'))

const sentence = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
}
const letter = {
  hidden:  { opacity: 0, y: 60, rotateX: -25, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const metrics = [
  { value: '02', label: 'APIs built' },
  { value: '18', label: 'technologies' },
  { value: '8.0', label: 'CGPA' },
  { value: '01', label: 'live deployment' },
]

function AnimatedText({ text, className, style, variant }) {
  // variant='gradient' → animated sweep gradient (used on "Baghel")
  // variant='static'   → white base + ::after shimmer highlight (used on "Manav")
  const variantClass = variant === 'gradient' ? 'name-gradient'
                     : variant === 'static'   ? 'name-static'
                     : ''

  return (
    <motion.span
      className={className}
      style={{ perspective: '900px', display: 'block' }}
      variants={sentence}
      initial="hidden"
      animate="visible"
      aria-label={text}
      role="text"
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={letter}
          // data-text mirrors the character so ::after can read it for the shimmer
          data-text={char === ' ' ? '\u00A0' : char}
          className={variantClass}
          style={{
            display: 'inline-block',
            // Carry over any explicit style (font, size, tracking) but let
            // the CSS class own color / gradient so animations work cleanly.
            ...(!variantClass ? style : {
              fontFamily: style?.fontFamily,
              fontSize:   style?.fontSize,
              fontWeight: style?.fontWeight,
              letterSpacing: style?.letterSpacing,
            }),
          }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const orbRef   = useRef(null)
  const heroInView = useInView(heroRef, { amount: 0.08 })

  /* Mouse-reactive ambient orb */
  useEffect(() => {
    const onMove = e => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (orbRef.current) {
        orbRef.current.style.transform =
          `translate(${e.clientX * 0.04}px, ${e.clientY * 0.04}px)`
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex items-center justify-center"
      style={{ minHeight: '100svh' }}
      aria-label="Introduction"
    >
      {/* 3D Background Scene */}
      <ErrorBoundary>
        <Suspense fallback={<div className="absolute inset-0" style={{ background: 'var(--base)' }} />}>
          <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
            <Scene3D active={heroInView} />
          </div>
        </Suspense>
      </ErrorBoundary>

      {/* Mouse-reactive floating orb */}
      <div
        ref={orbRef}
        className="absolute z-[1] pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
          transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
        aria-hidden="true"
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 25%, rgba(7,7,15,0.88) 100%)',
        }}
      />

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center text-center pt-24">

        {/* Status badge */}
        <motion.div
          className="pill mb-10 gap-2"
          initial={{ opacity: 0, y: -24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          aria-label="Status: Available for opportunities"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: '#4ade80' }}
            />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#4ade80' }} />
          </span>
          Available for opportunities
        </motion.div>

        {/* Name */}
        <div style={{ lineHeight: 1, marginBottom: '1.75rem' }}>
          {/* "Manav" — white with a soft travelling light shimmer via ::after */}
          <AnimatedText
            text="Manav"
            variant="static"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(3.8rem, 11vw, 9.5rem)',
              letterSpacing: '-0.03em',
            }}
          />
          {/* "Baghel" — slow animated gradient sweep */}
          <AnimatedText
            text="Baghel"
            variant="gradient"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(3.8rem, 11vw, 9.5rem)',
              letterSpacing: '-0.03em',
            }}
          />
        </div>

        {/* Role line with caret */}
        <motion.div
          className="flex items-center gap-3 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <div
            className="h-px w-10 hidden sm:block"
            style={{ background: 'linear-gradient(90deg, transparent, var(--accent-light))' }}
            aria-hidden="true"
          />
          <p
            className="font-mono text-sm md:text-base tracking-wide"
            style={{ color: 'var(--text-secondary)' }}
          >
            Backend Developer &mdash;{' '}
            <span style={{ color: 'var(--accent-light)' }}>Java</span>
            {' · '}
            <span style={{ color: 'var(--accent-light)' }}>Spring Boot</span>
            {' · '}
            <span style={{ color: 'var(--accent-cyan)' }}>Python</span>
            {' · '}
            <span style={{ color: 'var(--accent-cyan)' }}>Flask</span>
            <span className="caret" aria-hidden="true" />
          </p>
          <div
            className="h-px w-10 hidden sm:block"
            style={{ background: 'linear-gradient(90deg, var(--accent-light), transparent)' }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-sm md:text-base mb-12 max-w-lg"
          style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
        >
          Designing scalable REST APIs, database-backed systems, and cloud-deployed backends.
        </motion.p>

        {/* Compact proof strip — enough signal without competing with the name. */}
        <motion.ul
          className="hero-metrics mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Selected metrics"
        >
          {metrics.map((metric) => (
            <li key={metric.label} className="hero-metric">
              <span className="hero-metric-value">{metric.value}</span>
              <span className="hero-metric-label">{metric.label}</span>
            </li>
          ))}
        </motion.ul>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <MagneticButton href="#projects" primary>
            View My Work
          </MagneticButton>
          <MagneticButton href="#contact">
            Get In Touch
          </MagneticButton>
          <MagneticButton href="#" isResume>
            Resume ↓
          </MagneticButton>
        </motion.div>


      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-5 h-9 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full"
            style={{ background: 'var(--accent-cyan)' }}
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>
          scroll
        </span>
      </motion.div>
    </section>
  )
}

function MagneticButton({ href, children, primary, isResume }) {
  const ref = useRef(null)

  const onMouseMove = e => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width  / 2) * 0.25
    const y = (e.clientY - rect.top  - rect.height / 2) * 0.25
    ref.current.style.transform = `translate(${x}px, ${y}px)`
    ref.current.style.transition = 'transform 0.1s ease'
  }

  const onMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
    ref.current.style.transition = 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)'
  }

  const baseStyle = {
    color: '#fff',
    transition: 'box-shadow 0.3s ease, opacity 0.2s',
  }

  if (primary) {
    Object.assign(baseStyle, {
      background: 'linear-gradient(135deg, var(--accent-mid), var(--accent-light))',
      boxShadow: '0 0 32px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.22)',
    })
  } else if (isResume) {
    Object.assign(baseStyle, {
      background: 'transparent',
      border: '1px solid rgba(34,211,238,0.25)',
      color: 'var(--accent-cyan)',
    })
  } else {
    Object.assign(baseStyle, {
      background: 'transparent',
      border: '1px solid var(--border-glass)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
    })
  }

  return (
    <a
      ref={ref}
      href={href}
      onClick={isResume ? e => e.preventDefault() : undefined}
      aria-disabled={isResume ? 'true' : undefined}
      aria-label={isResume ? 'Resume — coming soon' : undefined}
      className="magnetic relative px-8 py-3.5 rounded-full font-semibold text-sm overflow-hidden"
      style={baseStyle}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={e => {
        if (primary) e.currentTarget.style.boxShadow = '0 0 60px rgba(124,58,237,0.65), inset 0 1px 0 rgba(255,255,255,0.22)'
        else if (!isResume) e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.12), 0 0 24px rgba(124,58,237,0.14)'
        else e.currentTarget.style.boxShadow = '0 0 20px rgba(34,211,238,0.25)'
      }}
    >
      {children}
    </a>
  )
}
