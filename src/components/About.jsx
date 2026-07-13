import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Skills from './Skills'


export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section" ref={ref} aria-labelledby="about-heading">
      <div className="container">

        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-num" aria-hidden="true">01 / About</span>
            <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} aria-hidden="true" />
          </div>
          <h2
            id="about-heading"
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text-primary)' }}
          >
            Engineering with{' '}
            <span className="gradient-text">intent</span>
          </h2>
        </motion.div>

        {/* Bio + Education */}
        <div className="grid md:grid-cols-5 gap-6 mb-24">
          {/* Bio — wider */}
          <motion.div
            className="md:col-span-3 glass glass-hover rounded-3xl p-10 relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            {/* Decorative glow */}
            <div
              className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
              aria-hidden="true"
            />
            <span className="pill mb-6 block w-fit">About Me</span>
            <h3 className="font-display font-bold text-2xl mb-5" style={{ color: 'var(--text-primary)' }}>
              Hi, I'm Manav 👋
            </h3>
            <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              I'm a Backend Developer and 7th-semester B.Tech Computer Science &amp; Engineering student at
              Baba Banda Singh Bahadur Engineering College (BBSBEC), Fatehgarh Sahib, Punjab, currently
              maintaining a CGPA of 8.0.
            </p>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              I enjoy building scalable backend applications using Java, Spring Boot, Python, and Flask, with a
              strong focus on clean architecture, REST APIs, database design, and writing maintainable,
              production-ready code. I'm continuously learning modern backend technologies while building
              real-world projects.
            </p>

            {/* What I Build + Currently Exploring — two column list */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span aria-hidden="true">💼</span> What I Build
                </p>
                <ul className="flex flex-col gap-1.5" role="list">
                  {[
                    'RESTful APIs',
                    'Scalable Backend Systems',
                    'Database-Driven Applications',
                    'Full-Stack Web Applications',
                    'Authentication & Authorization',
                    'Clean Software Architecture',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--accent-light)' }} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span aria-hidden="true">🎯</span> Currently Exploring
                </p>
                <ul className="flex flex-col gap-1.5" role="list">
                  {[
                    'Docker & Containerization',
                    'Kubernetes',
                    'PostgreSQL Optimization',
                    'System Design Fundamentals',
                    'Cloud Deployment',
                    'Backend Performance & Scalability',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--accent-cyan)' }} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Education + quick facts */}
          <motion.div
            className="md:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            {/* Education card */}
            <div className="glass glass-hover rounded-3xl p-8 flex-1 relative overflow-hidden">
              <div
                className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <span className="pill mb-5 block w-fit">Education</span>
              <div className="flex gap-4 items-start">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                  style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.2)' }}
                  aria-hidden="true"
                >
                  🎓
                </div>
                <div>
                  <p className="font-semibold text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>
                    B.Tech Computer Science &amp; Engineering
                  </p>
                  <p className="text-sm mt-1.5 font-medium" style={{ color: 'var(--accent-light)' }}>
                    Baba Banda Singh Bahadur Engineering College
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    Fatehgarh Sahib, Punjab
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    7th Semester · CGPA: 8.0
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    Expected graduation: 2027
                  </p>
                </div>
              </div>
            </div>

            {/* Internship card */}
            <div className="glass glass-hover rounded-2xl px-6 py-5 relative overflow-hidden">
              <div
                className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: '1.4rem' }} aria-hidden="true">💼</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Python Flask Intern</p>
                  <p className="text-xs font-medium" style={{ color: '#22c55e' }}>Webploot Technologies</p>
                </div>
                <span
                  className="ml-auto font-mono text-[0.6rem] px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#22c55e' }}
                >
                  Jun 2025 – Aug 2025
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Worked on backend development and web application features while gaining practical experience
                with the Flask framework and collaborative software development workflows.
              </p>
            </div>

            {/* Projects card */}
            <div className="glass glass-hover rounded-2xl px-6 py-5 relative overflow-hidden">
              <div
                className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: '1.4rem' }} aria-hidden="true">🛠️</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>2 Full-Stack Projects</p>
                  <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>Personal Projects</p>
                </div>
              </div>
              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Designed and developed real-world applications focused on backend architecture,
                REST APIs, database design, and deployment.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Java', 'Spring Boot', 'Flask', 'Docker', 'MySQL', 'PostgreSQL'].map(t => (
                  <span
                    key={t}
                    className="font-mono text-[0.6rem] px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: 'var(--accent-light)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Skills ── */}
        <Skills inView={inView} />

      </div>
    </section>
  )
}
