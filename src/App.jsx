import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Loader from './components/Loader'

const footerNav = [
  { label: 'About',          href: '#about' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
]

function Footer() {
  return (
    <footer
      className="relative z-10 py-14"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
      aria-label="Site footer"
    >
      <div className="container">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <a
              href="#hero"
              className="font-display font-bold text-2xl tracking-tight"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Manav Baghel — Back to top"
            >
              <span style={{ color: 'var(--accent-light)' }}>M</span>
              <span style={{ color: 'var(--text-muted)', fontWeight: 300 }}>B</span>
            </a>
            <p className="mt-2 text-sm max-w-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Backend Developer · Open to internships &amp; full-time opportunities.
            </p>
            <p className="mt-1 font-mono text-xs" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
              📍 Fatehgarh Sahib, Punjab, India
            </p>
          </div>

          {/* Quick nav */}
          <nav aria-label="Footer navigation">
            <p className="font-mono text-xs mb-3" style={{ color: 'var(--text-muted)' }}>Quick links</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none" role="list">
              {footerNav.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-light)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Glow divider */}
        <div
          className="h-px w-full mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, var(--border-subtle) 30%, var(--border-subtle) 70%, transparent)' }}
          aria-hidden="true"
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            Designed &amp; Developed by{' '}
            <span style={{ color: 'var(--accent-light)' }}>Manav Baghel</span>
            {' '}· {new Date().getFullYear()}
          </p>

          {/* Social + Resume */}
          <div className="flex gap-5 flex-wrap justify-center sm:justify-end">
            <a
              href="https://github.com/manav-2812"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              aria-label="GitHub profile"
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-light)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/manav-baghel"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              aria-label="LinkedIn profile"
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-light)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/manav_baghel"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Instagram profile"
              onMouseEnter={e => e.currentTarget.style.color = '#e1306c'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              Instagram
            </a>
            <a
              href="https://x.com/manav_baghel"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              aria-label="X (Twitter) profile"
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              X
            </a>
            <a
              href="mailto:manavbaghhel@gmail.com"
              className="font-mono text-xs transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-cyan)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              Email
            </a>
            {/* Resume button — intentionally disabled until resume is ready */}
            <a
              href="#"
              onClick={e => e.preventDefault()}
              aria-disabled="true"
              aria-label="Resume — coming soon"
              className="font-mono text-xs transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-light)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              Resume ↓
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setVisible(pct > 0.35)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.button
      id="scroll-top-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll back to top"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16, pointerEvents: visible ? 'auto' : 'none' }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -3, boxShadow: '0 4px 32px rgba(0,0,0,0.5), 0 0 32px rgba(124,58,237,0.3)' }}
      whileTap={{ scale: 0.93 }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </motion.button>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Lenis smooth scroll — v1+ API (removed deprecated direction/smooth options)
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  const handleLoadComplete = () => {
    setLoading(false)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Ambient gradient mesh + third orb */}
          <div className="gradient-mesh" aria-hidden="true">
            <div className="gradient-orb-3" />
          </div>
          <Cursor />
          <Navbar />
          <main id="main-content">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Certifications />
            <Contact />
          </main>
          <Footer />

          {/* Scroll-to-top button */}
          <ScrollTopButton />
        </>
      )}
    </>
  )
}

export default App
