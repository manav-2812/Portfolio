import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiOutlineRocketLaunch, HiOutlineAcademicCap, HiOutlineBriefcase } from 'react-icons/hi2'
import { TbBrain } from 'react-icons/tb'

const timeline = [
  {
    year: '2023 – 2027',
    title: 'B.Tech CSE — BBSBEC',
    subtitle: 'Education · Fatehgarh Sahib, Punjab',
    description:
      'Pursuing a Bachelor of Technology in Computer Science & Engineering at Baba Banda Singh Bahadur Engineering College. Currently in the 7th semester with a CGPA of 8.0, focusing on data structures, algorithms, databases, and software engineering fundamentals.',
    Icon: HiOutlineAcademicCap,
    color: '#7c3aed',
    tags: ['B.Tech CSE', 'CGPA 8.0', '7th Semester'],
  },
  {
    year: 'Jun – Aug 2025',
    title: 'Webploot Technologies',
    subtitle: 'Software Developer Intern · Python & Flask',
    description:
      'Completed a web development internship focused on Python and Flask. Worked on backend tasks including building and maintaining web application features, integrating with databases, and contributing to a professional development workflow.',
    Icon: HiOutlineBriefcase,
    color: '#22c55e',
    tags: ['Python', 'Flask', 'Web Development'],
  },
  {
    year: '2026',
    title: 'GrabBite — Shipped',
    subtitle: 'Personal Project · Full Stack',
    description:
      'Built and deployed GrabBite, a full-stack food delivery application with a Python Flask backend, PostgreSQL database, real-time WebSocket order tracking, Razorpay payment integration, and a React frontend. Deployed on Railway.',
    Icon: HiOutlineRocketLaunch,
    color: '#f59e0b',
    tags: ['Python', 'Flask', 'PostgreSQL', 'WebSockets', 'Docker'],
  },
  {
    year: '2026',
    title: 'Synapse — AI Study Tool',
    subtitle: 'Personal Project · Python & AI',
    description:
      'Built Synapse, a Flask-based web application implementing Retrieval-Augmented Generation (RAG). Integrated ChromaDB for vector storage and the Groq LLM API to enable semantic Q&A over uploaded documents.',
    Icon: TbBrain,
    color: '#06b6d4',
    tags: ['Python', 'Flask', 'ChromaDB', 'RAG'],
  },
]

function TimelineItem({ item, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`relative flex md:items-start gap-4 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content card */}
      <motion.div
        className={`flex-1 group ${isLeft ? 'md:pr-14' : 'md:pl-14'}`}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="glass glass-hover rounded-2xl p-7 relative overflow-hidden"
          style={{
            borderLeft:  isLeft ? `2px solid ${item.color}` : 'none',
            borderRight: !isLeft ? `2px solid ${item.color}` : 'none',
            transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = `
              inset 0 1px 0 rgba(255,255,255,0.12),
              0 24px 64px rgba(0,0,0,0.55),
              0 0 60px ${item.color}18`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = ''
          }}
        >
          {/* Gradient bleed */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at ${isLeft ? '-10%' : '110%'} 50%, ${item.color}15 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />

          {/* Top accent sweep line — animates in */}
          <motion.div
            className="absolute top-0 left-0 h-[1.5px] rounded-full"
            style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
            initial={{ width: '0%' }}
            animate={inView ? { width: '60%' } : { width: '0%' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          <div className="relative">
            {/* Year badge + icon */}
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="font-mono text-xs px-2.5 py-1 rounded-full font-bold"
                style={{
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}30`,
                  color: item.color,
                }}
              >
                {item.year}
              </span>
              <item.Icon size={17} style={{ color: item.color, opacity: 0.85 }} aria-hidden="true" />
            </div>

            <h3 className="font-display font-bold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
              {item.title}
            </h3>
            <p className="font-mono text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              {item.subtitle}
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
              {item.description}
            </p>

            {/* Tags — staggered */}
            <motion.div
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="Technologies"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.4 } }, hidden: {} }}
            >
              {item.tags.map(tag => (
                <motion.span
                  key={tag}
                  role="listitem"
                  className="font-mono text-[0.65rem] px-2.5 py-1 rounded-full"
                  style={{
                    background: `${item.color}10`,
                    border: `1px solid ${item.color}25`,
                    color: item.color,
                  }}
                  variants={{
                    hidden:  { opacity: 0, scale: 0.85 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } },
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Center node (desktop) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-7 z-10 flex-col items-center" aria-hidden="true">
        <motion.div
          className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
          style={{
            background: 'var(--base)',
            borderColor: item.color,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView
            ? { scale: 1, opacity: 1, boxShadow: [`0 0 0px ${item.color}`, `0 0 24px ${item.color}90`, `0 0 12px ${item.color}70`] }
            : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
        </motion.div>
      </div>

      {/* Mobile bullet */}
      <div
        className="md:hidden flex-shrink-0 w-3 h-3 rounded-full mt-8"
        style={{ background: item.color, boxShadow: `0 0 12px ${item.color}` }}
        aria-hidden="true"
      />

      {/* Spacer */}
      <div className="hidden md:block flex-1" aria-hidden="true" />
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-num" aria-hidden="true">03 / Experience</span>
            <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} aria-hidden="true" />
          </div>
          <h2
            id="experience-heading"
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text-primary)' }}
          >
            Education &amp;{' '}
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="mt-4 max-w-lg" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            My academic journey, personal projects, and professional experience — in chronological order.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative" role="list" aria-label="Experience timeline">
          {/* Vertical glow line — desktop */}
          <div
            className="absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 hidden md:block"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, var(--accent) 15%, var(--accent-cyan) 85%, transparent 100%)',
              opacity: 0.25,
            }}
            aria-hidden="true"
          />

          {/* Vertical line — mobile */}
          <div
            className="absolute left-[5px] top-4 bottom-4 w-px md:hidden"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, var(--accent) 20%, var(--accent-cyan) 80%, transparent 100%)',
              opacity: 0.25,
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12 md:gap-16" role="list">
            {timeline.map((item, i) => (
              <div key={item.title} role="listitem">
                <TimelineItem item={item} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
