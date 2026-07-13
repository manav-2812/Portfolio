import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SiHackerrank } from 'react-icons/si'
import { HiOutlineCheckBadge, HiOutlineArrowUpRight } from 'react-icons/hi2'

/* ── Cert data ─────────────────────────────────────────────────────────── */
const certifications = [
  {
    id: 'deloitte',
    issuer: 'Deloitte',
    IssuerIcon: null,
    issuerInitial: 'D',
    color: '#86efac',
    year: '2026',
    certs: [
      {
        name: 'Technology Job Simulation',
        type: 'Job Simulation',
        link: 'https://linkedin.com/in/manav-baghel',
        description: 'Software engineering tasks, problem decomposition, and professional development in a technology consulting context.',
      },
    ],
  },
  {
    id: 'hackerrank',
    issuer: 'HackerRank',
    IssuerIcon: SiHackerrank,
    issuerInitial: 'H',
    color: '#4ade80',
    year: '2026',
    certs: [
      {
        name: 'REST API',
        type: 'Intermediate',
        link: 'https://linkedin.com/in/manav-baghel',
        description: 'RESTful API design, HTTP methods, status codes, and API consumption.',
      },
      {
        name: 'Software Engineer Intern',
        type: 'Assessment',
        link: 'https://linkedin.com/in/manav-baghel',
        description: 'Data structures, algorithms, and core programming concepts.',
      },
      {
        name: 'SQL',
        type: 'Intermediate',
        link: 'https://linkedin.com/in/manav-baghel',
        description: 'JOINs, subqueries, aggregation, and query optimization.',
      },
      {
        name: 'Problem Solving',
        type: 'Intermediate',
        link: 'https://linkedin.com/in/manav-baghel',
        description: 'Algorithmic thinking and data structure proficiency.',
      },
    ],
  },
]

/* ── Card variants ─────────────────────────────────────────────────────── */
const cardVariants = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ── Single cert card ──────────────────────────────────────────────────── */
function CertCard({ cert, issuerData, globalIndex, animate }) {
  const { IssuerIcon, issuerInitial, color, issuer, year } = issuerData

  return (
    <motion.a
      custom={globalIndex}
      variants={cardVariants}
      initial="hidden"
      animate={animate}
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${cert.name} certificate from ${issuer} on LinkedIn`}
      className="group relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.25s',
        textDecoration: 'none',
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}45`
        e.currentTarget.style.boxShadow = `0 8px 40px rgba(0,0,0,0.3), 0 0 0 0.5px ${color}30`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2)'
      }}
    >
      {/* Top accent line */}
      <div
        className="h-[1.5px] w-full"
        style={{ background: `linear-gradient(90deg, ${color}90, ${color}20, transparent)` }}
        aria-hidden="true"
      />

      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Row 1 — issuer badge + verified + link arrow */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            {/* Issuer icon badge */}
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `${color}15`,
                border: `1px solid ${color}30`,
              }}
              aria-hidden="true"
            >
              {IssuerIcon
                ? <IssuerIcon size={15} style={{ color }} />
                : <span className="font-display font-bold text-sm" style={{ color }}>{issuerInitial}</span>
              }
            </div>

            {/* Issuer name */}
            <span className="font-semibold text-xs" style={{ color: 'var(--text-secondary)' }}>
              {issuer}
            </span>
          </div>

          {/* Verified pill */}
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              background: `${color}10`,
              border: `1px solid ${color}28`,
            }}
          >
            <HiOutlineCheckBadge size={11} style={{ color }} aria-hidden="true" />
            <span className="font-mono text-[0.6rem]" style={{ color }}>Verified</span>
          </div>
        </div>

        {/* Row 2 — cert name (grows to fill) */}
        <div className="flex-1">
          <h4
            className="font-display font-bold text-base leading-snug"
            style={{ color: 'var(--text-primary)' }}
          >
            {cert.name}
          </h4>
          <p
            className="mt-1.5 text-xs leading-relaxed line-clamp-2"
            style={{ color: 'var(--text-muted)' }}
          >
            {cert.description}
          </p>
        </div>

        {/* Row 3 — type tag + year + arrow */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-2">
            {/* Type badge */}
            <span
              className="font-mono text-[0.6rem] px-2 py-0.5 rounded-full"
              style={{
                color,
                background: `${color}12`,
                border: `1px solid ${color}25`,
              }}
            >
              {cert.type}
            </span>
            {/* Year */}
            <span className="font-mono text-[0.6rem]" style={{ color: 'var(--text-muted)' }}>
              {year}
            </span>
          </div>

          {/* Animated link arrow */}
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
            style={{
              background: `${color}15`,
              border: `1px solid ${color}30`,
              color,
              transform: 'translateX(-4px)',
            }}
            aria-hidden="true"
          >
            <HiOutlineArrowUpRight size={12} />
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
  const totalCerts = certifications.reduce((n, g) => n + g.certs.length, 0)

  // Flatten with global index for stagger
  const flatCerts = certifications.flatMap(issuerData =>
    issuerData.certs.map(cert => ({ cert, issuerData }))
  )

  return (
    <section id="certifications" className="section" ref={ref} aria-labelledby="certs-heading">
      <div className="container">

        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-num" aria-hidden="true">04 / Certifications</span>
            <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} aria-hidden="true" />
          </div>
          <h2
            id="certs-heading"
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text-primary)' }}
          >
            Verified{' '}
            <span className="gradient-text">credentials</span>
          </h2>
          <p className="mt-4 max-w-lg" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Industry certifications validating core software engineering and backend development skills.
          </p>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          className="flex items-center gap-8 mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {[
            { value: totalCerts,                  label: 'Total Credentials' },
            { value: certifications.length,        label: 'Issuing Organisations' },
            { value: '100%',                       label: 'Verified' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col">
              <span
                className="font-display font-bold text-2xl"
                style={{ color: 'var(--text-primary)' }}
              >
                {value}
              </span>
              <span className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {label}
              </span>
            </div>
          ))}
          <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} aria-hidden="true" />
          <a
            href="https://linkedin.com/in/manav-baghel"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs flex items-center gap-1.5 flex-shrink-0"
            style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
            aria-label="View all credentials on LinkedIn"
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-light)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            View on LinkedIn
            <HiOutlineArrowUpRight size={12} />
          </a>
        </motion.div>

        {/* Cards — unified grid, all certs side-by-side */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          role="list"
          aria-label="Certifications"
        >
          {flatCerts.map(({ cert, issuerData }, i) => (
            <div key={`${issuerData.id}-${cert.name}`} role="listitem">
              <CertCard
                cert={cert}
                issuerData={issuerData}
                globalIndex={i}
                animate={inView ? 'visible' : 'hidden'}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
