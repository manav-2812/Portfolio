import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Entrance reveal variants ───────────────────────────────────────────── */
const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } },
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Dynamic mouse position tracking for card spotlight glow effects
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <section id="experience" className="section experience-section" ref={ref} aria-labelledby="experience-heading">
      <div className="container">
        
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-20"
          variants={revealVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2
            id="experience-heading"
            className="font-body font-black uppercase tracking-tighter leading-none select-none"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
          >
            <span className="block" style={{ color: 'var(--pine)' }}>Education &amp;</span>
            <span 
              className="block" 
              style={{ 
                color: 'transparent',
                WebkitTextStroke: '2px var(--ink)',
                opacity: 0.15,
                marginTop: '-0.2rem'
              }}
            >
              Experience
            </span>
          </h2>
        </motion.div>

        {/* 2-Column Parallel Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-5xl">
          
          {/* Left Column — Education */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="card relative overflow-hidden group transition-colors"
              onMouseMove={handleMouseMove}
              style={{
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--hairline)',
                background: 'var(--paper-dim)',
                padding: '2.25rem 2.5rem',
              }}
              whileHover={{ y: -5, borderColor: 'rgba(60, 74, 63, 0.25)' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Mouse Follow Spotlight Glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle 200px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(174, 139, 87, 0.08) 0%, rgba(60, 74, 63, 0.03) 60%, transparent 100%)',
                  zIndex: 0,
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col gap-5">
                {/* Embedded Header */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-pine uppercase">Education</span>
                  <div className="h-px flex-1 bg-hairline" style={{ background: 'var(--hairline)', opacity: 0.5 }} aria-hidden="true" />
                </div>
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: 'var(--ink-soft)',
                      border: '1px solid var(--hairline)',
                      borderRadius: '999px',
                      padding: '0.25rem 0.7rem',
                      background: 'var(--paper)',
                    }}
                  >
                    2023 — 2027
                  </span>
                  
                  {/* Location Badge */}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: 'var(--pine)',
                      border: '1px solid var(--pine-soft)',
                      borderRadius: '999px',
                      padding: '0.22rem 0.65rem',
                      background: 'rgba(60, 74, 63, 0.06)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 600,
                    }}
                  >
                    Fatehgarh Sahib, Punjab
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-ink leading-snug">
                    Baba Banda Singh Bahadur Engineering College
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-pine mt-1">
                    B.Tech Computer Science &amp; Engineering
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-ink-soft" style={{ fontFamily: 'var(--font-body)' }}>
                  Currently in the 7th semester, maintaining an 8.0 CGPA. Focused on data structures, database systems, algorithm optimization, and backend engineering foundations.
                </p>

                {/* Animated tech tags */}
                <div className="flex flex-wrap gap-2 mt-1" role="list" aria-label="Education metrics">
                  {['CGPA 8.0', '7th Semester', 'CSE Core'].map(tag => (
                    <motion.span
                      key={tag}
                      role="listitem"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: 'var(--ink-soft)',
                        border: '1px solid var(--hairline)',
                        borderRadius: '999px',
                        padding: '0.25rem 0.7rem',
                        background: 'var(--paper)',
                        cursor: 'default',
                        display: 'inline-block',
                      }}
                      whileHover={{ scale: 1.05, borderColor: 'var(--pine)', color: 'var(--ink)' }}
                      transition={{ duration: 0.15 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column — Experience */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="card relative overflow-hidden group transition-colors"
              onMouseMove={handleMouseMove}
              style={{
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--hairline)',
                background: 'var(--paper-dim)',
                padding: '2.25rem 2.5rem',
              }}
              whileHover={{ y: -5, borderColor: 'rgba(60, 74, 63, 0.25)' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Mouse Follow Spotlight Glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle 200px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(174, 139, 87, 0.08) 0%, rgba(60, 74, 63, 0.03) 60%, transparent 100%)',
                  zIndex: 0,
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col gap-5">
                {/* Embedded Header */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-pine uppercase">Experience</span>
                  <div className="h-px flex-1 bg-hairline" style={{ background: 'var(--hairline)', opacity: 0.5 }} aria-hidden="true" />
                </div>
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: 'var(--ink-soft)',
                      border: '1px solid var(--hairline)',
                      borderRadius: '999px',
                      padding: '0.25rem 0.7rem',
                      background: 'var(--paper)',
                    }}
                  >
                    Jun — Aug 2025
                  </span>
                  
                  {/* Internship Badge */}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: 'var(--pine)',
                      border: '1px solid var(--pine-soft)',
                      borderRadius: '999px',
                      padding: '0.22rem 0.65rem',
                      background: 'rgba(60, 74, 63, 0.06)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 600,
                    }}
                  >
                    Internship
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-ink leading-snug">
                    Webplat Technologies Pvt. Ltd.
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-pine mt-1">
                    Web Development
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-ink-soft" style={{ fontFamily: 'var(--font-body)' }}>
                  Completed a web development internship focused on Python and Flask. Worked on backend tasks including building API endpoints, database interactions, and professional lifecycle controls.
                </p>

                {/* Animated tech tags */}
                <div className="flex flex-wrap gap-2 mt-1" role="list" aria-label="Internship skills">
                  {['Python', 'Flask', 'Web Development'].map(tag => (
                    <motion.span
                      key={tag}
                      role="listitem"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: 'var(--ink-soft)',
                        border: '1px solid var(--hairline)',
                        borderRadius: '999px',
                        padding: '0.25rem 0.7rem',
                        background: 'var(--paper)',
                        cursor: 'default',
                        display: 'inline-block',
                      }}
                      whileHover={{ scale: 1.05, borderColor: 'var(--pine)', color: 'var(--ink)' }}
                      transition={{ duration: 0.15 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
