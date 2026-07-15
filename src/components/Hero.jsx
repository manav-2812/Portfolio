import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import CountUp from './CountUp'

const metrics = [
  { value: '02', label: 'APIs built' },
  { value: '18', label: 'technologies' },
  { value: '8.0', label: 'CGPA' },
  { value: '01', label: 'live deployment' },
]

/* ── Hero Section ─────────────────────────────────────────────────────────── */
export default function Hero() {
  const heroRef = useRef(null)

  // Detect reduced-motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Scroll-reactive: track how far the hero has scrolled out of view
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Hero content parallax: fade + translate as user scrolls
  // Disabled when prefers-reduced-motion is set
  const contentY       = useTransform(scrollYProgress, [0, 0.8], prefersReducedMotion ? [0, 0]   : [0, -50])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], prefersReducedMotion ? [1, 1]   : [1, 0])

  // Shared entrance animation helpers
  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, transition: {} }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex items-center justify-center"
      style={{ minHeight: '100svh' }}
      aria-label="Introduction"
    >
      {/* Content — parallax on scroll */}
      <motion.div
        className="hero-content container relative z-10 flex flex-col items-center text-center pt-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >

        {/* Status badge */}
        <motion.div
          {...(prefersReducedMotion
            ? { initial: { opacity: 1, y: 0, scale: 1 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: {} }
            : { initial: { opacity: 0, y: -24, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
          )}
          className="hero-status"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.3rem 0.875rem',
            borderRadius: '999px',
            marginBottom: '2.5rem',
            background: 'var(--paper-deep)',
            border: '1px solid var(--hairline)',
            color: 'var(--ink-soft)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            letterSpacing: '0.08em',
          }}
          aria-label="Status: Available for opportunities"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#4ade80' }} />
          </span>
          Available for opportunities
        </motion.div>

        {/* Name + Brass Glow wrapper */}
        <div className="hero-name-wrap relative" style={{ marginBottom: '1.75rem' }}>
          {/* Brass Glow — behind the h1 */}
          <motion.div
            className="absolute pointer-events-none"
            aria-hidden="true"
            style={{
              width: '560px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, var(--brass) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(70px)',
            }}
            animate={prefersReducedMotion ? { opacity: 0.14 } : { opacity: [0.1, 0.18, 0.1] }}
            transition={prefersReducedMotion ? {} : { duration: 10, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* A quiet ring gives the brass bloom a crisp second layer. */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '340px',
              height: '340px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            aria-hidden="true"
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                border: '1px solid var(--brass)',
                borderRadius: '50%',
              }}
              animate={prefersReducedMotion ? { opacity: 0.16, scale: 1 } : { opacity: 0.16, scale: [1, 1.04, 1] }}
              transition={prefersReducedMotion ? {} : { duration: 10, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Name — single fade-up h1 */}
          <motion.h1
            className="hero-name font-display"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-display)',
              color: 'var(--ink)',
              fontWeight: 600,
              letterSpacing: '-0.015em',
              lineHeight: 1.05,
              position: 'relative',
              zIndex: 1,
            }}
            {...fadeUp(0)}
          >
            Manav Baghel
          </motion.h1>
        </div>

        {/* Role line */}
        <motion.div
          className="hero-role flex items-center gap-3 mb-5"
          {...fadeUp(prefersReducedMotion ? 0 : 0.15)}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'var(--ink-soft)',
              letterSpacing: '0.01em',
            }}
          >
            Backend Developer &mdash;{' '}
            <span style={{ color: 'var(--pine)' }}>Java</span>
            {' · '}
            <span style={{ color: 'var(--pine)' }}>Spring Boot</span>
            {' · '}
            <span style={{ color: 'var(--pine)' }}>Python</span>
            {' · '}
            <span style={{ color: 'var(--pine)' }}>Flask</span>
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="hero-tagline text-sm md:text-base mb-12 max-w-lg"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--ink-soft)',
            lineHeight: 1.7,
          }}
          {...fadeUp(prefersReducedMotion ? 0 : 0.25)}
        >
          Designing scalable REST APIs, database-backed systems, and cloud-deployed backends.
        </motion.p>

        {/* Metrics strip */}
        <motion.ul
          className="hero-metrics"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            border: '1px solid var(--hairline)',
            background: 'var(--paper-dim)',
            borderRadius: 'var(--radius-card)',
            marginBottom: '3rem',
            overflow: 'hidden',
            listStyle: 'none',
            padding: 0,
            margin: '0 0 3rem 0',
          }}
          {...fadeUp(prefersReducedMotion ? 0 : 0.35)}
          aria-label="Selected metrics"
        >
          {metrics.map((metric, i) => (
            <li
              key={metric.label}
              className="hero-metric"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 1.25rem',
                borderLeft: i > 0 ? '1px solid var(--hairline)' : 'none',
              }}
            >
              <CountUp
                value={metric.value}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--ink-faint)',
                  marginTop: '0.25rem',
                  letterSpacing: '0.04em',
                }}
              >
                {metric.label}
              </span>
            </li>
          ))}
        </motion.ul>

        {/* CTA Buttons */}
        <motion.div
          className="hero-actions flex flex-wrap gap-4 justify-center mb-16"
          {...fadeUp(prefersReducedMotion ? 0 : 0.45)}
        >
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-ghost">
            Get In Touch
          </a>
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReducedMotion ? {} : { delay: 2.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'var(--ink-faint)',
            opacity: 0.7,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--ink-faint)',
          }}
        >
          scroll
        </span>
      </motion.div>
    </section>
  )
}
