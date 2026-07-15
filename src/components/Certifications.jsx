import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SiHackerrank } from 'react-icons/si'
import { HiOutlineArrowUpRight } from 'react-icons/hi2'
import CountUp from './CountUp'

/* ── Cert data ─────────────────────────────────────────────────────────── */
const certifications = [
  {
    id: 'deloitte',
    issuer: 'Deloitte',
    IssuerIcon: null,
    issuerInitial: 'D',
    year: '2026',
    certs: [
      {
        name: 'Technology Job Simulation',
        type: 'Job Simulation',
        link: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_6a36683ad4508269f5c396de_1781953593391_completion_certificate.pdf',
        description: 'Software engineering tasks, problem decomposition, and professional development in a technology consulting context.',
      },
    ],
  },
  {
    id: 'hackerrank',
    issuer: 'HackerRank',
    IssuerIcon: SiHackerrank,
    issuerInitial: 'H',
    year: '2026',
    certs: [
      {
        name: 'REST API',
        type: 'Intermediate',
        link: 'https://www.hackerrank.com/certificates/79cba608187f',
        description: 'RESTful API design, HTTP methods, status codes, and API consumption.',
      },
      {
        name: 'Software Engineer Intern',
        type: 'Assessment',
        link: 'https://www.hackerrank.com/certificates/fb2eb20eb5e0',
        description: 'Data structures, algorithms, and core programming concepts.',
      },
      {
        name: 'SQL',
        type: 'Intermediate',
        link: 'https://www.hackerrank.com/certificates/7a366fe416f2',
        description: 'JOINs, subqueries, aggregation, and query optimization.',
      },
      {
        name: 'Problem Solving',
        type: 'Intermediate',
        link: 'https://www.hackerrank.com/certificates/5bf3432878f5',
        description: 'Algorithmic thinking and data structure proficiency.',
      },
    ],
  },
]

/* ── Card variants ─────────────────────────────────────────────────────── */
const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ── Section reveal variants ───────────────────────────────────────────── */
const revealVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
}

/* ── Single cert card ──────────────────────────────────────────────────── */
function CertCard({ cert, issuerData, globalIndex, animate }) {
  const { IssuerIcon, issuerInitial, issuer, year } = issuerData

  return (
    <motion.div
      custom={globalIndex}
      variants={cardVariants}
      initial="hidden"
      animate={animate}
    >
      <a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${cert.name} certificate from ${issuer}`}
      className="card card-hover group relative flex flex-col"
      style={{
        borderRadius: 'var(--radius-card)',
        textDecoration: 'none',
      }}
      >
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Row 1 — issuer badge + verified label + link arrow */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            {/* Issuer icon badge — 32×32px flat square */}
            <div
              style={{
                width: '2rem',
                height: '2rem',
                border: '1px solid var(--hairline)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--paper-deep)',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              {IssuerIcon
                ? <IssuerIcon size={14} style={{ color: 'var(--ink-soft)' }} />
                : <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-soft)' }}>{issuerInitial}</span>
              }
            </div>

            {/* Issuer name + year */}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', color: 'var(--ink-faint)' }}>
              {issuer} · {year}
            </span>
          </div>

          {/* Verified label — plain mono span */}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', color: 'var(--ink-faint)', letterSpacing: '0.08em', flexShrink: 0 }}>
            Verified
          </span>
        </div>

        {/* Row 2 — cert title (grows to fill) */}
        <div className="flex-1">
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--ink)',
              fontSize: 'var(--text-body-lg)',
              fontWeight: 600,
              lineHeight: 1.25,
            }}
          >
            {cert.name}
          </h4>
          <p
            className="mt-1.5 text-xs leading-relaxed line-clamp-2"
            style={{ color: 'var(--ink-faint)', fontFamily: 'var(--font-body)' }}
          >
            {cert.description}
          </p>
        </div>

        {/* Row 3 — type tag + link arrow */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          {/* Type tag — mono pill */}
          <span
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
            {cert.type}
          </span>

          {/* Animated link arrow */}
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-hidden="true"
          >
            <HiOutlineArrowUpRight size={12} style={{ color: 'var(--ink-soft)' }} />
          </span>
        </div>
      </div>
      </a>
    </motion.div>
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
          variants={revealVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-num" aria-hidden="true">04 / Certifications</span>
            <div className="h-px flex-1" style={{ background: 'var(--hairline)' }} aria-hidden="true" />
          </div>
          <h2
            id="certs-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h1)',
              color: 'var(--ink)',
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            Verified credentials
          </h2>
          <p
            className="mt-4 max-w-lg"
            style={{ color: 'var(--ink-soft)', fontSize: 'var(--text-body)', fontFamily: 'var(--font-body)' }}
          >
            Industry certifications validating core software engineering and backend development skills.
          </p>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          className="flex items-center gap-8 mb-12"
          variants={revealVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
        >
          {[
            { value: totalCerts,             label: 'Total Credentials' },
            { value: certifications.length,  label: 'Issuing Organisations' },
            { value: 100, suffix: '%',       label: 'Verified' },
          ].map(({ value, suffix, label }) => (
            <div key={label} className="flex flex-col">
              <CountUp
                value={value}
                suffix={suffix}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: 'var(--ink)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--ink-faint)',
                  marginTop: '0.125rem',
                }}
              >
                {label}
              </span>
            </div>
          ))}
          <div className="h-px flex-1" style={{ background: 'var(--hairline)' }} aria-hidden="true" />
          <a
            href="https://linkedin.com/in/manav-baghel"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-draw font-mono text-xs flex items-center gap-1.5 flex-shrink-0"
            style={{ color: 'var(--pine)' }}
            aria-label="View all credentials on LinkedIn"
          >
            View on LinkedIn
            <HiOutlineArrowUpRight size={12} aria-hidden="true" />
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
