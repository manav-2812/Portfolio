import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Contact from './components/Contact'
import Loader from './components/Loader'
import NotFound from './components/NotFound'
import PremiumBackground from './components/PremiumBackground'
import Cursor from './components/Cursor'
import CommandPalette from './components/CommandPalette'

const Projects = lazy(() => import('./components/Projects'))
const TechStack = lazy(() => import('./components/TechStack'))
const Experience = lazy(() => import('./components/Experience'))
const Certifications = lazy(() => import('./components/Certifications'))

const footerNav = [
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#tech-stack' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
]

function Footer({ currentPath }) {
  const isHome = !currentPath || currentPath === '/' || currentPath.toLowerCase() === '/index.html'
  return (
    <footer
      className="relative z-10 pt-14 pb-32"
      style={{
        borderTop: '1px solid var(--hairline)',
        background: 'var(--paper)',
      }}
      aria-label="Site footer"
    >
      <div className="container">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <a
              href={isHome ? "#hero" : "/"}
              className="font-display font-bold text-2xl"
              style={{ color: 'var(--ink)' }}
              aria-label="MB — Manav Baghel Back to top"
            >
              MB
            </a>
            <p className="mt-2 text-sm max-w-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)', lineHeight: 1.6 }}>
              Web Developer · Open to internships &amp; full-time opportunities.
            </p>
            <p className="mt-1 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}>
              Punjab,IN
            </p>
          </div>

          {/* Quick nav */}
          <nav aria-label="Footer navigation">
            <p className="text-xs mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}>Quick links</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none" role="list">
              {footerNav.map(link => (
                <li key={link.href}>
                  <a
                    href={isHome ? link.href : `/${link.href}`}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'var(--ink-faint)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--pine)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-faint)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-8"
          style={{ background: 'var(--hairline)' }}
          aria-hidden="true"
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}>
            Designed &amp; Developed by{' '}
            <span style={{ color: 'var(--pine)' }}>Manav Baghel</span>
            {' '}· {new Date().getFullYear()}
          </p>

          {/* Social + Resume */}
          <div className="flex gap-2 flex-wrap justify-center sm:justify-end items-center">
            <a
              href="https://github.com/manav-2812"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-draw font-mono text-xs transition-colors duration-200 footer-social-link"
              style={{ color: 'var(--ink-faint)' }}
              aria-label="GitHub profile"
              onMouseEnter={e => e.currentTarget.style.color = 'var(--pine)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-faint)'}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/manav-baghel"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-draw font-mono text-xs transition-colors duration-200 footer-social-link"
              style={{ color: 'var(--ink-faint)' }}
              aria-label="LinkedIn profile"
              onMouseEnter={e => e.currentTarget.style.color = 'var(--pine)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-faint)'}
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/3manav_"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-draw font-mono text-xs transition-colors duration-200 footer-social-link"
              style={{ color: 'var(--ink-faint)' }}
              aria-label="Instagram profile"
              onMouseEnter={e => e.currentTarget.style.color = 'var(--pine)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-faint)'}
            >
              Instagram
            </a>
            <a
              href="https://x.com/baghell_"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-draw font-mono text-xs transition-colors duration-200 footer-social-link"
              style={{ color: 'var(--ink-faint)' }}
              aria-label="X (Twitter) profile"
              onMouseEnter={e => e.currentTarget.style.color = 'var(--pine)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-faint)'}
            >
              X
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=manavbaghhel@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-draw font-mono text-xs transition-colors duration-200 footer-social-link"
              style={{ color: 'var(--ink-faint)' }}
              aria-label="Send email to Manav Baghel"
              onMouseEnter={e => e.currentTarget.style.color = 'var(--pine)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-faint)'}
            >
              Email
            </a>
            {/* Resume button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume"
              className="underline-draw font-mono text-xs transition-colors duration-200 footer-social-link"
              style={{ color: 'var(--ink-faint)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--pine)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-faint)'}
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
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.93 }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </motion.button>
  )
}

function SectionFallback() {
  return (
    <div className="section min-h-[30vh] flex items-center justify-center" aria-hidden="true">
      <div className="w-12 h-[1px] animate-pulse" style={{ background: 'var(--hairline-strong)' }} />
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handleLocationChange)

    const originalPushState = window.history.pushState
    window.history.pushState = function (...args) {
      originalPushState.apply(this, args)
      handleLocationChange()
    }

    const originalReplaceState = window.history.replaceState
    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args)
      handleLocationChange()
    }

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.history.pushState = originalPushState
      window.history.replaceState = originalReplaceState
    }
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

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

  const isHome = currentPath === '/' || currentPath.toLowerCase() === '/index.html'

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <PremiumBackground />
      <Navbar currentPath={currentPath} />
      <main id="main-content" aria-hidden={loading || undefined}>
        {isHome ? (
          <>
            <Hero />
            <About />
            <Suspense fallback={<SectionFallback />}>
              <TechStack />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Experience />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Certifications />
            </Suspense>
            <Contact />
          </>
        ) : (
          <NotFound onNavigate={setCurrentPath} />
        )}
      </main>
      <Footer currentPath={currentPath} />

      {/* Scroll-to-top button */}
      {!loading && isHome && <ScrollTopButton />}

      <Cursor />
      <CommandPalette />
    </>
  )
}

export default App
