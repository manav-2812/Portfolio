import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import useCoarsePointer from '../hooks/useCoarsePointer'

/* ── Framer Motion Variants ──────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.25, 1, 0.5, 1] },
  },
}

const cardGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 28, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
}

const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
  },
}

const WHAT_I_BUILD = [
  'RESTful APIs',
  'Backend systems built for real load',
  'Database-driven applications',
  'Full-stack web applications',
  'Authentication and authorization',
  'Architecture that stays readable',
]

const CURRENTLY_EXPLORING = [
  'Docker and containerization',
  'Kubernetes fundamentals',
  'PostgreSQL query optimization',
  'System design fundamentals',
  'Cloud deployment',
  'Backend performance and scalability',
]

export default function About() {
  const isCoarse = useCoarsePointer()
  const introRef = useRef(null)
  const introInView = useInView(introRef, { once: true, margin: '-8%' })

  // Dynamic mouse position tracking for premium spotlight glow effects
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container">

        {/* ── Premium Split Column Layout ── */}
        <div className="w-full flex justify-center">
          <motion.div
            ref={introRef}
            className="grid grid-cols-12 gap-y-8 gap-x-8 md:gap-x-12 w-full max-w-5xl"
            variants={containerVariants}
            initial="hidden"
            animate={introInView ? 'visible' : 'hidden'}
          >
            {/* Left Column: Heading and Interactive Profile Badges (Col span 5) */}
            <div className="about-heading-column col-span-12 md:col-span-5 flex flex-col justify-start gap-8">
              
              {/* Stacked Heading with Letter Reveal Accent */}
              <motion.h2
                id="about-heading"
                className="font-body font-black uppercase tracking-tighter leading-none select-none"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
                variants={itemVariants}
              >
                <span className="block" style={{ color: 'var(--pine)' }}>About</span>
                <span 
                  className="block text-stroke-responsive" 
                  style={{ 
                    color: 'transparent',
                    opacity: 0.15,
                    marginTop: '-0.2rem'
                  }}
                >
                  Me
                </span>
              </motion.h2>

              {/* Separate Pill-shaped Meta List — broad pill shapes */}
              <motion.div 
                className="about-meta-list flex w-full flex-col items-start gap-2.5" 
                style={{ fontFamily: 'var(--font-mono)' }}
                variants={itemVariants}
              >
                {/* Pill 1: FOCUS */}
                <div
                  className="flex h-12 w-[18rem] max-w-full items-center whitespace-nowrap"
                  style={{
                    border: '1px solid var(--hairline)',
                    borderRadius: '999px',
                    background: 'var(--paper-dim)',
                    minHeight: '36px',
                    padding: '0 1.25rem',
                  }}
                  role="status"
                  aria-label="Focus: Backend Development"
                >
                  <span className="w-12 text-[10px] uppercase tracking-widest" style={{ color: 'var(--ink-faint)', fontWeight: 500, letterSpacing: '0.05em' }}>Focus</span>
                  <span className="ml-3 text-[11px] font-semibold" style={{ color: 'var(--ink)', letterSpacing: '0.01em' }}>Backend Development</span>
                </div>

                {/* Pill 2: STATUS */}
                <div
                  className="flex h-12 w-[18rem] max-w-full items-center whitespace-nowrap"
                  style={{
                    border: '1px solid var(--hairline)',
                    borderRadius: '999px',
                    background: 'var(--paper-dim)',
                    minHeight: '36px',
                    padding: '0 1.25rem',
                  }}
                  role="status"
                  aria-label="Status: Open to opportunities"
                >
                  <span className="w-12 text-[10px] uppercase tracking-widest" style={{ color: 'var(--ink-faint)', fontWeight: 500, letterSpacing: '0.05em' }}>Status</span>
                  <span className="ml-3 flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: 'var(--ink)', letterSpacing: '0.01em' }}>
                    <span 
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse bg-emerald-500" 
                      style={{ boxShadow: '0 0 6px rgba(16, 185, 129, 0.6)' }} 
                      aria-hidden="true"
                    />
                    Open to opportunities
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Profile Details (Col span 7, vertically centered on desktop) */}
            <div className="about-right-col col-span-12 md:col-span-7 flex flex-col justify-center gap-6 md:min-h-[220px]">
              {/* Copy paragraphs with staggered entrance & left alignment */}
              <div className="about-copy flex flex-col gap-5 text-left">
                <motion.p 
                  className="text-sm sm:text-base leading-relaxed text-ink"
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    letterSpacing: '0.01em',
                    borderLeft: '2px solid var(--pine)',
                    paddingLeft: '1.25rem',
                  }}
                  variants={itemVariants}
                >
                  I'm a backend-focused engineer finishing my B.Tech in Computer Science at Baba Banda Singh Bahadur Engineering College &mdash; currently in my 7th semester with an 8.0 CGPA.
                </motion.p>
                <motion.p 
                  className="text-sm sm:text-base leading-relaxed text-ink-soft"
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    letterSpacing: '0.01em',
                    paddingLeft: '1.25rem',
                  }}
                  variants={itemVariants}
                >
                  My core stack is Java, Spring Boot, Python, and Flask. I care most about the parts of backend work that are easy to skip: clean data models, sane API contracts, and systems that fail predictably instead of silently.
                </motion.p>
              </div>

              {/* Combined Stat Capsule — all three stats in one wide pill */}
              <motion.div 
                className="about-stats mt-4 pl-[1.25rem]"
                variants={itemVariants}
                role="region"
                aria-label="Academic statistics"
              >
                <div
                  className="flex items-center"
                  style={{
                    border: '1px solid var(--hairline)',
                    borderRadius: '999px',
                    background: 'var(--paper-dim)',
                    fontFamily: 'var(--font-mono)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Stat: CGPA */}
                  <div className="flex flex-col items-center flex-1 px-2 py-3 sm:px-5" role="text" aria-label="CGPA 8.0">
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 'bold', color: 'var(--ink)', lineHeight: 1.1 }}>8.0</span>
                    <span style={{ fontSize: '9px', color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '3px' }}>CGPA</span>
                  </div>
                  {/* Divider */}
                  <div style={{ width: '1px', alignSelf: 'stretch', background: 'var(--hairline)' }} />
                  {/* Stat: Apps shipped */}
                  <div className="flex flex-col items-center flex-1 px-2 py-3 sm:px-5" role="text" aria-label="2 Apps shipped">
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 'bold', color: 'var(--ink)', lineHeight: 1.1 }}>02</span>
                    <span style={{ fontSize: '9px', color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '3px' }}>Apps shipped</span>
                  </div>
                  {/* Divider */}
                  <div style={{ width: '1px', alignSelf: 'stretch', background: 'var(--hairline)' }} />
                  {/* Stat: Graduating */}
                  <div className="flex flex-col items-center flex-1 px-2 py-3 sm:px-5" role="text" aria-label="Graduating in 2027">
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 'bold', color: 'var(--ink)', lineHeight: 1.1 }}>2027</span>
                    <span style={{ fontSize: '9px', color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '3px' }}>Graduating</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="about-card-grid col-span-12 grid sm:grid-cols-2 gap-8 mt-12"
              variants={cardGridVariants}
            >
              
              {/* Card 1: What I Build */}
              <motion.div
                className="about-card card glass-card relative overflow-hidden group"
                style={{
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--hairline)',
                  borderTop: '2px solid var(--pine)',
                  background: 'var(--paper-dim)',
                  padding: '4rem 2.25rem 2.25rem 2.25rem',
                }}
                onMouseMove={handleMouseMove}
                variants={cardVariant}
                whileHover={isCoarse ? undefined : {
                  borderColor: 'rgba(60, 74, 63, 0.28)',
                  y: -6,
                  boxShadow: '0 20px 40px -20px rgba(25, 23, 20, 0.14)',
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              >
                {/* Shimmering Multi-color Spotlight Radial Glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle 260px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(60, 74, 63, 0.08) 0%, rgba(174, 139, 87, 0.03) 55%, transparent 100%)',
                    zIndex: 0,
                  }}
                />
                
                {/* Top Left Title Badge */}
                <div className="absolute top-4 left-6 z-20">
                  <span 
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--ink-soft)',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      borderRadius: '999px',
                      border: '1px solid var(--hairline)',
                      background: 'var(--paper-dim)',
                      padding: '6px 12px',
                    }}
                  >
                    What I Build
                  </span>
                </div>

                <div className="relative z-10 mt-6">
                  <motion.ul
                    className="flex flex-col list-none p-0 m-0"
                    variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                  >
                    {WHAT_I_BUILD.map((item) => (
                      <motion.li
                        key={item}
                        className="text-[13px] leading-relaxed text-ink-soft py-[9px] hover:text-ink transition-colors duration-200 flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                        variants={listItemVariants}
                      >
                        <span className="flex-shrink-0" style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--pine)' }} />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>

              {/* Card 2: Currently Exploring */}
              <motion.div
                className="about-card card glass-card relative overflow-hidden group"
                style={{
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--hairline)',
                  borderTop: '2px solid var(--brass)',
                  background: 'var(--paper-dim)',
                  padding: '4rem 2.25rem 2.25rem 2.25rem',
                }}
                onMouseMove={handleMouseMove}
                variants={cardVariant}
                whileHover={isCoarse ? undefined : {
                  borderColor: 'rgba(60, 74, 63, 0.28)',
                  y: -6,
                  boxShadow: '0 20px 40px -20px rgba(25, 23, 20, 0.14)',
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              >
                {/* Shimmering Multi-color Spotlight Radial Glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle 260px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(60, 74, 63, 0.08) 0%, rgba(174, 139, 87, 0.03) 55%, transparent 100%)',
                    zIndex: 0,
                  }}
                />

                {/* Top Left Title Badge */}
                <div className="absolute top-4 left-6 z-20">
                  <span 
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--ink-soft)',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      borderRadius: '999px',
                      border: '1px solid var(--hairline)',
                      background: 'var(--paper-dim)',
                      padding: '6px 12px',
                    }}
                  >
                    Currently Exploring
                  </span>
                </div>

                <div className="relative z-10 mt-6">
                  <motion.ul
                    className="flex flex-col list-none p-0 m-0"
                    variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                  >
                    {CURRENTLY_EXPLORING.map((item) => (
                      <motion.li
                        key={item}
                        className="text-[13px] leading-relaxed text-ink-soft py-[9px] hover:text-ink transition-colors duration-200 flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                        variants={listItemVariants}
                      >
                        <span className="flex-shrink-0" style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--brass)' }} />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  )
}
