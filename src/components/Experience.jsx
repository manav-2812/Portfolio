import { motion, useInView, useScroll, useTransform } from 'framer-motion'
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
    tags: ['B.Tech CSE', 'CGPA 8.0', '7th Semester'],
  },
  {
    year: 'Jun – Aug 2025',
    title: 'Webploot Technologies',
    subtitle: 'Software Developer Intern · Python & Flask',
    description:
      'Completed a web development internship focused on Python and Flask. Worked on backend tasks including building and maintaining web application features, integrating with databases, and contributing to a professional development workflow.',
    Icon: HiOutlineBriefcase,
    tags: ['Python', 'Flask', 'Web Development'],
  },
  {
    year: '2026',
    title: 'GrabBite — Shipped',
    subtitle: 'Personal Project · Full Stack',
    description:
      'Built and deployed GrabBite, a full-stack food delivery application with a Python Flask backend, PostgreSQL database, real-time WebSocket order tracking, Razorpay payment integration, and a React frontend. Deployed on Railway.',
    Icon: HiOutlineRocketLaunch,
    tags: ['Python', 'Flask', 'PostgreSQL', 'WebSockets', 'Docker'],
  },
  {
    year: '2026',
    title: 'Synapse — AI Study Tool',
    subtitle: 'Personal Project · Python & AI',
    description:
      'Built Synapse, a Flask-based web application implementing Retrieval-Augmented Generation (RAG). Integrated ChromaDB for vector storage and the Groq LLM API to enable semantic Q&A over uploaded documents.',
    Icon: TbBrain,
    tags: ['Python', 'Flask', 'ChromaDB', 'RAG'],
  },
]

/* ── Animated Timeline Line ───────────────────────────────────────────────── */
function TimelineLine() {
  const lineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 80%', 'end 20%'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      ref={lineRef}
      className="absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 hidden md:block"
      aria-hidden="true"
    >
      {/* Background track */}
      <div
        className="absolute inset-0"
        style={{ background: 'var(--hairline)' }}
      />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        style={{
          scaleY,
          height: '100%',
          background: 'var(--pine)',
          opacity: 1,
        }}
      />
    </div>
  )
}

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
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="card"
          style={{ padding: '1.75rem' }}
        >
          <div className="relative">
            {/* Year badge + icon */}
            <div className="flex items-center gap-2.5 mb-4">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--ink-faint)',
                  padding: '0.15rem 0.5rem',
                  border: '1px solid var(--hairline)',
                  borderRadius: '999px',
                }}
              >
                {item.year}
              </span>
              <item.Icon size={15} style={{ color: 'var(--pine)', opacity: 0.85 }} aria-hidden="true" />
            </div>

            <h3
              className="font-display font-bold mb-1"
              style={{ fontSize: 'var(--text-h2)', color: 'var(--ink)' }}
            >
              {item.title}
            </h3>
            <p
              className="mb-4"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                color: 'var(--ink-faint)',
              }}
            >
              {item.subtitle}
            </p>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: 'var(--ink-soft)' }}
            >
              {item.description}
            </p>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="Technologies"
            >
              {item.tags.map(tag => (
                <span
                  key={tag}
                  role="listitem"
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
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Center tick mark (desktop) */}
      <div
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-7 z-10 items-center justify-center"
        aria-hidden="true"
      >
        <motion.div
          className="w-px h-3 flex-shrink-0"
          style={{ background: 'var(--pine)' }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={inView ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Mobile bullet */}
      <div
        className="md:hidden flex-shrink-0 w-1.5 h-1.5 rounded-full mt-8"
        style={{ background: 'var(--pine)' }}
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-num" aria-hidden="true">03 / Experience</span>
            <div className="h-px flex-1" style={{ background: 'var(--hairline)' }} aria-hidden="true" />
          </div>
          <h2
            id="experience-heading"
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'var(--text-h1)', color: 'var(--ink)' }}
          >
            Education &amp;{' '}
            <span style={{ color: 'var(--pine)' }}>Experience</span>
          </h2>
          <p className="mt-4 max-w-lg" style={{ color: 'var(--ink-soft)', fontSize: 'var(--text-body)' }}>
            My academic journey, personal projects, and professional experience — in chronological order.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative" role="list" aria-label="Experience timeline">
          {/* Animated vertical line — desktop */}
          <TimelineLine />

          {/* Vertical line — mobile */}
          <div
            className="absolute left-[5px] top-4 bottom-4 w-px md:hidden"
            style={{
              background: 'var(--pine-soft)',
              opacity: 0.4,
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
