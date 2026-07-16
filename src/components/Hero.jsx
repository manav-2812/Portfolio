import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import MagneticButton from './MagneticButton'


/* ── Animation variants for staggered load ────────────────────────────────── */
const fadeUpContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}


export default function Hero() {
  const heroRef = useRef(null)

  // Motion values for premium mouse-tracking spring parallax depth
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 50, stiffness: 140 })
  const springY = useSpring(mouseY, { damping: 50, stiffness: 140 })

  // Transform coordinates for subtle depth layers (Glow tracks further, Ring tracks closer)
  const glowX = useTransform(springX, (x) => `${x * 0.08}px`)
  const glowY = useTransform(springY, (y) => `${y * 0.08}px`)
  const ringX = useTransform(springX, (x) => `${x * 0.04}px`)
  const ringY = useTransform(springY, (y) => `${y * 0.04}px`)

  // Detect reduced-motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Track scroll rate for parallax fade-out
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Smooth scroll transformations
  const contentY       = useTransform(scrollYProgress, [0, 0.8], prefersReducedMotion ? [0, 0]   : [0, -40])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], prefersReducedMotion ? [1, 1]   : [1, 0])

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    // Reset to center
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Introduction"
    >
      {/* Content wrapper with scroll reactives */}
      <motion.div
        className="hero-content container relative z-10 w-full pt-40 pb-28"
        style={{ y: contentY, opacity: contentOpacity }}
        variants={fadeUpContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-12 gap-y-12 gap-x-8 lg:gap-x-12 items-center w-full">
          {/* Left Column: text content (approx 58% width on desktop) */}
          <div className="col-span-12 lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Badge */}
            <motion.div
              variants={fadeUpItem}
              className="hero-status cursor-default select-none"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.95rem',
                borderRadius: '999px',
                marginBottom: '1.25rem',
                background: 'var(--paper-deep)',
                border: '1px solid var(--hairline)',
                color: 'var(--pine)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                letterSpacing: '0.08em',
              }}
              whileHover={{ y: -1, borderColor: 'rgba(60, 74, 63, 0.2)' }}
              aria-label="Status: Available for opportunities"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#10b981' }} />
              </span>
              Available for opportunities
            </motion.div>

            {/* Name: Large scale, solid+outline pattern */}
            <motion.h1
              className="hero-name font-body font-black uppercase tracking-tighter select-none mb-14 flex flex-col items-start leading-[0.95]"
              style={{ fontSize: 'clamp(2.75rem, 9vw, 6.75rem)', letterSpacing: '-0.02em' }}
              variants={fadeUpItem}
              id="hero-name"
            >
              <span className="block" style={{ color: 'var(--pine)' }}>
                Manav
              </span>
              <span 
                className="block" 
                style={{ 
                  color: 'transparent',
                  WebkitTextStroke: '2px var(--ink)',
                  opacity: 0.15,
                  marginTop: '0.05em'
                }}
              >
                Baghel
              </span>
            </motion.h1>

            {/* Role Tagline Line */}
            <motion.div
              className="hero-role flex items-center gap-3 mb-6"
              variants={fadeUpItem}
              role="text"
              aria-label="Backend Developer specializing in Java, Spring Boot, Python, and Flask"
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

            {/* Tagline / Subtext */}
            <motion.p
              className="hero-tagline text-sm md:text-base mb-28 max-w-lg"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--ink-soft)',
                lineHeight: 1.8,
              }}
              variants={fadeUpItem}
              id="hero-tagline"
            >
              Designing scalable REST APIs, database-backed systems, and cloud-deployed backends.
            </motion.p>

            {/* CTA Actions */}
            <motion.div
              className="hero-actions flex flex-wrap gap-4 justify-start"
              style={{ marginTop: '3.5rem' }}
              variants={fadeUpItem}
            >
              <MagneticButton strength={10}>
                <a href="#projects" className="btn-primary">
                  View My Work
                </a>
              </MagneticButton>
              <MagneticButton strength={10}>
                <a href="#contact" className="btn-ghost">
                  Get In Touch
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Premium Constellation Space Design */}
          <div className="col-span-12 lg:col-span-5 hidden lg:flex justify-center items-center relative select-none z-0" aria-hidden="true">
            {/* Enhanced ambient glow */}
            <motion.div
              className="absolute pointer-events-none"
              aria-hidden="true"
              style={{
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, var(--pine) 0%, transparent 55%)',
                x: glowX,
                y: glowY,
                filter: 'blur(120px)',
                opacity: 0.05,
              }}
            />

            {/* Constellation Pattern */}
            <motion.div
              className="relative"
              style={{
                width: '500px',
                height: '500px',
                x: ringX,
                y: ringY,
              }}
              aria-hidden="true"
            >
              {/* Central star with enhanced glow */}
              <motion.div
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.7, 0.85, 0.7],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: 'var(--pine)',
                    boxShadow: '0 0 20px 6px rgba(60, 74, 63, 0.3), 0 0 40px 12px rgba(60, 74, 63, 0.12)',
                  }}
                />
              </motion.div>

              {/* Inner orbiting dots with enhanced interactivity */}
              {[...Array(6)].map((_, i) => {
                const angle = (i * 60) * (Math.PI / 180)
                const radius = 150
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                
                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      x: [x, x * 1.15, x],
                      y: [y, y * 1.15, y],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.2,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: i % 2 === 0 ? 'var(--pine)' : 'var(--ink-soft)',
                        opacity: 0.7,
                        boxShadow: i % 2 === 0 ? '0 0 12px 4px rgba(60, 74, 63, 0.4)' : '0 0 8px 3px rgba(25, 23, 20, 0.3)',
                      }}
                    />
                  </motion.div>
                )
              })}

              {/* Middle ring dots */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45) * (Math.PI / 180)
                const radius = 200
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                
                return (
                  <motion.div
                    key={`mid-${i}`}
                    className="absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      x: [x, x * 1.08, x],
                      y: [y, y * 1.08, y],
                    }}
                    transition={{
                      duration: 5 + i * 0.3,
                      repeat: Infinity,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.25,
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: 'var(--ink-soft)',
                        opacity: 0.25,
                        boxShadow: '0 0 10px 3px rgba(25, 23, 20, 0.15)',
                      }}
                    />
                  </motion.div>
                )
              })}

              {/* Outer ring dots */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 + 15) * (Math.PI / 180)
                const radius = 230
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                
                return (
                  <motion.div
                    key={`outer-${i}`}
                    className="absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      x: [x, x * 0.97, x],
                      y: [y, y * 0.97, y],
                    }}
                    transition={{
                      duration: 6 + i * 0.25,
                      repeat: Infinity,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.15,
                    }}
                  >
                    <div
                      className="w-1 h-1 rounded-full"
                      style={{
                        background: 'var(--ink-faint)',
                        opacity: 0.18,
                      }}
                    />
                  </motion.div>
                )
              })}

              {/* Enhanced connection lines with glow */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.12 }}>
                {[...Array(6)].map((_, i) => {
                  const angle = (i * 60) * (Math.PI / 180)
                  const nextAngle = ((i + 1) * 60) * (Math.PI / 180)
                  const radius = 150
                  const x1 = 250 + Math.cos(angle) * radius
                  const y1 = 250 + Math.sin(angle) * radius
                  const x2 = 250 + Math.cos(nextAngle) * radius
                  const y2 = 250 + Math.sin(nextAngle) * radius
                  
                  return (
                    <line
                      key={`line-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      style={{
                        stroke: 'var(--pine)',
                        strokeWidth: 0.75,
                      }}
                    />
                  )
                })}
                {/* Outer connection lines */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 45) * (Math.PI / 180)
                  const nextAngle = ((i + 1) * 45) * (Math.PI / 180)
                  const radius = 200
                  const x1 = 250 + Math.cos(angle) * radius
                  const y1 = 250 + Math.sin(angle) * radius
                  const x2 = 250 + Math.cos(nextAngle) * radius
                  const y2 = 250 + Math.sin(nextAngle) * radius
                  
                  return (
                    <line
                      key={`outer-line-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      style={{
                        stroke: 'var(--ink-soft)',
                        strokeWidth: 0.4,
                      }}
                    />
                  )
                })}
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator with delayed entrance */}
      <motion.div
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        aria-hidden="true"
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'var(--hairline-strong)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '16px',
              background: 'linear-gradient(to bottom, transparent, var(--pine), transparent)',
            }}
            animate={{
              y: [-16, 40],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
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
