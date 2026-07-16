import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiOutlineArrowUpRight } from 'react-icons/hi2'

/* ── Cert data ─────────────────────────────────────────────────────────── */
const certifications = [
  {
    id: 'deloitte',
    issuer: 'Deloitte',
    IssuerIcon: null,
    year: '2026',
    accentColor: '#00A3E0', // Deloitte blue
    certs: [
      {
        name: 'Technology Job Simulation',
        type: 'Job Simulation',
        link: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_6a36683ad4508269f5c396de_1781953593391_completion_certificate.pdf',
        description: 'Software engineering task prioritization, problem decomposition, and technology consulting deliverables.',
      },
    ],
  },
  {
    id: 'hackerrank',
    issuer: 'HackerRank',
    year: '2026',
    accentColor: '#2EC866', // HackerRank green
    certs: [
      {
        name: 'REST API',
        type: 'Intermediate',
        link: 'https://www.hackerrank.com/certificates/79cba608187f',
        description: 'RESTful API design, standard HTTP response codes, query parsing, and endpoints architecture.',
      },
      {
        name: 'Software Engineer Intern',
        type: 'Assessment',
        link: 'https://www.hackerrank.com/certificates/fb2eb20eb5e0',
        description: 'Core assessment covering data structures, algorithmic design, and problem solving efficiency.',
      },
      {
        name: 'SQL',
        type: 'Intermediate',
        link: 'https://www.hackerrank.com/certificates/7a366fe416f2',
        description: 'Advanced query constructs, complex JOIN relations, subquery optimization, and aggregations.',
      },
      {
        name: 'Problem Solving',
        type: 'Intermediate',
        link: 'https://www.hackerrank.com/certificates/5bf3432878f5',
        description: 'Validated proficiency in sorting algorithms, string parsing, search, and dynamic arrays.',
      },
    ],
  },
]

/* ── Entrance animations ────────────────────────────────────────────────── */
const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ── Single cert card ──────────────────────────────────────────────────── */
function CertCard({ cert, issuerData }) {
  const { issuer, year } = issuerData

  // Track mouse coordinates for premium spotlight glow
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${cert.name} certificate from ${issuer}`}
      className="card relative overflow-hidden group flex flex-col h-full"
      onMouseMove={handleMouseMove}
      style={{
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--hairline)',
        background: 'var(--paper-dim)',
        textDecoration: 'none',
      }}
      whileHover={{
        y: -6,
        borderColor: 'var(--pine-soft)',
        boxShadow: '0 12px 30px -10px rgba(25, 23, 20, 0.05)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {/* Neutral Pine Accent Mouse Follow Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle 220px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(60, 74, 63, 0.08) 0%, rgba(60, 74, 63, 0.01) 60%, transparent 100%)',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col flex-1 py-8 px-8 sm:px-10 gap-5">
        {/* Row 1 — issuer pill + year pill + verified status pill */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 min-w-0">
            {/* Issuer Pill */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--ink-soft)',
                border: '1px solid var(--hairline)',
                borderRadius: '999px',
                padding: '0.25rem 0.7rem',
                background: 'var(--paper)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
              }}
            >
              {issuer}
            </span>
            
            {/* Year Pill */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--ink-soft)',
                border: '1px solid var(--hairline)',
                borderRadius: '999px',
                padding: '0.25rem 0.7rem',
                background: 'var(--paper)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
              }}
            >
              {year}
            </span>
          </div>

          {/* Verified Text */}
          <div className="flex items-center font-mono text-[9px] uppercase tracking-widest text-pine flex-shrink-0">
            <span>Verified</span>
          </div>
        </div>

        {/* Row 2 — cert title + description */}
        <div className="flex-1">
          <h3
            className="transition-colors duration-250 font-display font-bold text-xl text-ink leading-snug"
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            {cert.name}
          </h3>
          <p
            className="mt-1.5 text-xs leading-relaxed line-clamp-2"
            style={{ color: 'var(--ink-soft)', fontFamily: 'var(--font-body)' }}
          >
            {cert.description}
          </p>
        </div>

        {/* Row 3 — normal type text + link arrow */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          {/* Normal type text */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: 'var(--ink-soft)',
              border: '1px solid var(--hairline)',
              borderRadius: '999px',
              padding: '0.25rem 0.7rem',
              background: 'var(--paper)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
          >
            {cert.type}
          </span>

          {/* Animated link arrow */}
          <span
            className="translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out"
            aria-hidden="true"
          >
            <HiOutlineArrowUpRight size={13} style={{ color: 'var(--pine)' }} />
          </span>
        </div>
      </div>
    </motion.a>
  )
}

/* ── Exported section ──────────────────────────────────────────────────── */
export default function Certifications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Flatten with global index for stagger
  const flatCerts = certifications.flatMap(issuerData =>
    issuerData.certs.map(cert => ({ cert, issuerData }))
  )

  return (
    <section 
      id="certifications" 
      className="section" 
      ref={ref} 
      aria-labelledby="certs-heading"
    >
      <div className="container">

        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          variants={revealVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2
            id="certs-heading"
            className="font-body font-black uppercase tracking-tighter leading-none select-none"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
          >
            <span className="block" style={{ color: 'var(--pine)' }}>Verified</span>
            <span 
              className="block" 
              style={{ 
                color: 'transparent',
                WebkitTextStroke: '2px var(--ink)',
                opacity: 0.15,
                marginTop: '-0.2rem'
              }}
            >
              Credentials
            </span>
          </h2>
        </motion.div>

        {/* Cards Grid Layout — matches Projects and Experience structure exactly */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          role="list"
          aria-label="Certifications"
        >
          {flatCerts.map(({ cert, issuerData }) => (
            <motion.div
              key={`${issuerData.id}-${cert.name}`}
              variants={cardVariants}
              role="listitem"
              className="w-full h-full"
            >
              <CertCard
                cert={cert}
                issuerData={issuerData}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
