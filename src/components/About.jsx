import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Skills from './Skills'

/* ── Animation variants ───────────────────────────────────────────────────── */
const staggerParent = {
  hidden:  {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.1 } },
}

const revealVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
}

const metaItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
}

const copyVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.12, staggerChildren: 0.12 } },
}

/* ── Meta items ───────────────────────────────────────────────────────────── */
const META_ITEMS = [
  { label: 'Location', value: 'Fatehgarh Sahib, Punjab' },
  { label: 'Focus',    value: 'Backend Development' },
  { label: 'Status',   value: 'Open to opportunities' },
]

/* ── List content ─────────────────────────────────────────────────────────── */
const WHAT_I_BUILD = [
  'RESTful APIs',
  'Scalable Backend Systems',
  'Database-Driven Applications',
  'Full-Stack Web Applications',
  'Authentication & Authorization',
  'Clean Software Architecture',
]

const CURRENTLY_EXPLORING = [
  'Docker & Containerization',
  'Kubernetes',
  'PostgreSQL Optimization',
  'System Design Fundamentals',
  'Cloud Deployment',
  'Backend Performance & Scalability',
]

export default function About() {
  const headerRef = useRef(null)
  const introRef = useRef(null)
  const educationRef = useRef(null)
  const profileRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' })
  const introInView = useInView(introRef, { once: true, margin: '-12%' })
  const educationInView = useInView(educationRef, { once: true, margin: '-12%' })
  const profileInView = useInView(profileRef, { once: true, margin: '-12%' })

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          className="mb-14 md:mb-16"
          variants={revealVariants}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-num" aria-hidden="true">01 / About</span>
            <motion.div
              className="h-px flex-1 origin-left"
              style={{ background: 'var(--hairline)' }}
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
          </div>
          <h2
            id="about-heading"
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'var(--text-h1)', color: 'var(--ink)' }}
          >
            Engineering with intent
          </h2>
        </motion.div>

        {/* ── Two-column editorial layout ────────────────────────────────── */}
        <motion.div
          ref={introRef}
          className="about-intro grid md:grid-cols-4 gap-10 mb-14 md:mb-16"
          variants={staggerParent}
          initial="hidden"
          animate={introInView ? 'visible' : 'hidden'}
        >
          {/* Meta column */}
          <motion.div
            className="about-meta md:col-span-1 flex flex-col gap-5"
            variants={staggerParent}
          >
            {META_ITEMS.map(({ label, value }) => (
              <motion.div key={label} variants={metaItemVariants}>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--ink-faint)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.25rem',
                }}>
                  {label}
                </p>
                <p style={{ color: 'var(--ink-soft)', fontSize: 'var(--text-body)', fontFamily: 'var(--font-body)' }}>
                  {value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Body column */}
          <motion.div
            className="md:col-span-3 about-copy"
            variants={copyVariants}
          >
            <motion.p variants={revealVariants} style={{
              color: 'var(--ink-soft)',
              maxWidth: '62ch',
              lineHeight: 1.7,
              fontSize: 'var(--text-body)',
              fontFamily: 'var(--font-body)',
              marginBottom: '1rem',
            }}>
              I'm a Backend Developer and 7th-semester B.Tech Computer Science &amp; Engineering student at
              Baba Banda Singh Bahadur Engineering College (BBSBEC), Fatehgarh Sahib, Punjab, currently
              maintaining a CGPA of 8.0.
            </motion.p>
            <motion.p variants={revealVariants} style={{
              color: 'var(--ink-soft)',
              maxWidth: '62ch',
              lineHeight: 1.7,
              fontSize: 'var(--text-body)',
              fontFamily: 'var(--font-body)',
              marginBottom: '2rem',
            }}>
              I enjoy building scalable backend applications using Java, Spring Boot, Python, and Flask, with a
              strong focus on clean architecture, REST APIs, database design, and writing maintainable,
              production-ready code. I'm continuously learning modern backend technologies while building
              real-world projects.
            </motion.p>

            {/* What I Build + Currently Exploring */}
            <motion.div className="about-capabilities grid sm:grid-cols-2 gap-8" variants={revealVariants}>
              <div>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--ink-faint)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}>
                  What I Build
                </p>
                <ul className="flex flex-col gap-2" role="list">
                  {WHAT_I_BUILD.map(item => (
                    <li
                      key={item}
                      className="flex items-center gap-2"
                      style={{ color: 'var(--ink-soft)', fontSize: 'var(--text-body)', fontFamily: 'var(--font-body)' }}
                    >
                      <span
                        className="flex-shrink-0"
                        style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--pine-soft)', display: 'inline-block' }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--ink-faint)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}>
                  Currently Exploring
                </p>
                <ul className="flex flex-col gap-2" role="list">
                  {CURRENTLY_EXPLORING.map(item => (
                    <li
                      key={item}
                      className="flex items-center gap-2"
                      style={{ color: 'var(--ink-soft)', fontSize: 'var(--text-body)', fontFamily: 'var(--font-body)' }}
                    >
                      <span
                        className="flex-shrink-0"
                        style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--pine-soft)', display: 'inline-block' }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Education card (flat .card) ────────────────────────────────── */}
        <motion.div
          ref={educationRef}
          className="mb-12"
          variants={revealVariants}
          initial="hidden"
          animate={educationInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="card about-education relative overflow-hidden" style={{ padding: '1.75rem' }}>
            <motion.span
              className="absolute top-0 left-0 right-0 h-px origin-left"
              style={{ background: 'var(--pine-soft)' }}
              initial={{ scaleX: 0 }}
              animate={educationInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-micro)',
              color: 'var(--ink-faint)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              Education
            </p>
            <p
              className="font-semibold leading-snug"
              style={{ color: 'var(--ink)', fontSize: 'var(--text-body)', marginBottom: '0.35rem' }}
            >
              B.Tech Computer Science &amp; Engineering
            </p>
            <p style={{ color: 'var(--pine)', fontSize: 'var(--text-body)', fontFamily: 'var(--font-body)', marginBottom: '0.25rem' }}>
              Baba Banda Singh Bahadur Engineering College
            </p>
            <p style={{ color: 'var(--ink-faint)', fontSize: 'var(--text-caption)', fontFamily: 'var(--font-mono)' }}>
              Fatehgarh Sahib, Punjab · 7th Semester · CGPA: 8.0 · Expected graduation: 2027
            </p>
          </div>
        </motion.div>

        {/* ── Internship + Projects — borderless typographic text blocks ──── */}
        <motion.div
          ref={profileRef}
          className="about-profile grid sm:grid-cols-2 gap-10 mb-16"
          variants={staggerParent}
          initial="hidden"
          animate={profileInView ? 'visible' : 'hidden'}
        >
          {/* Internship */}
          <motion.div variants={revealVariants}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-micro)',
              color: 'var(--ink-faint)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}>
              Internship
            </p>
            <p
              className="font-semibold"
              style={{ color: 'var(--ink)', fontSize: 'var(--text-body)', marginBottom: '0.2rem' }}
            >
              Python Flask Intern
            </p>
            <p style={{ color: 'var(--pine-soft)', fontSize: 'var(--text-body)', fontFamily: 'var(--font-body)', marginBottom: '0.2rem' }}>
              Webploot Technologies
            </p>
            <p style={{
              color: 'var(--ink-faint)',
              fontSize: 'var(--text-caption)',
              fontFamily: 'var(--font-mono)',
              marginBottom: '0.6rem',
            }}>
              Jun 2025 – Aug 2025
            </p>
            <p style={{ color: 'var(--ink-soft)', fontSize: 'var(--text-body)', lineHeight: 1.7, maxWidth: '52ch' }}>
              Worked on backend development and web application features while gaining practical experience
              with the Flask framework and collaborative software development workflows.
            </p>
          </motion.div>

          {/* Projects quick block */}
          <motion.div variants={revealVariants}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-micro)',
              color: 'var(--ink-faint)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}>
              Personal Projects
            </p>
            <p
              className="font-semibold"
              style={{ color: 'var(--ink)', fontSize: 'var(--text-body)', marginBottom: '0.2rem' }}
            >
              2 Full-Stack Projects
            </p>
            <p style={{ color: 'var(--ink-soft)', fontSize: 'var(--text-body)', lineHeight: 1.7, marginBottom: '0.75rem', maxWidth: '52ch' }}>
              Designed and developed real-world applications focused on backend architecture,
              REST APIs, database design, and deployment.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Java', 'Spring Boot', 'Flask', 'Docker', 'MySQL', 'PostgreSQL'].map(t => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-micro)',
                    color: 'var(--ink-faint)',
                    border: '1px solid var(--hairline)',
                    borderRadius: '999px',
                    padding: '0.2rem 0.65rem',
                    background: 'transparent',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Skills ─────────────────────────────────────────────────────── */}
        <Skills />

      </div>
    </section>
  )
}
