import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { label: 'About',          href: '#about',          id: 'about' },
  { label: 'Projects',       href: '#projects',       id: 'projects' },
  { label: 'Experience',     href: '#experience',     id: 'experience' },
  { label: 'Certifications', href: '#certifications', id: 'certifications' },
  { label: 'Contact',        href: '#contact',        id: 'contact' },
]

export default function Navbar({ currentPath }) {
  const isHome = !currentPath || currentPath === '/' || currentPath.toLowerCase() === '/index.html'
  const [scrolled, setScrolled]           = useState(false)
  const [hidden, setHidden]               = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollPct, setScrollPct]         = useState(0)
  const lastY = useRef(0)

  useEffect(() => {
    /* ── Scroll progress + hide-on-scroll ── */
    const onScroll = () => {
      const y   = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(max > 0 ? (y / max) * 100 : 0)
      setScrolled(y > 50)
      setHidden(y > lastY.current + 4 && y > 220)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    /* ── Active section detection ── */
    const ids = ['hero', ...navLinks.map(l => l.id)]
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })

    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  return (
    <>
      {/* ── Scroll Progress Bar ── */}
      <div
        id="scroll-progress"
        style={{
          transform: `scaleX(${scrollPct / 100})`,
          background: 'var(--pine)',
        }}
        aria-hidden="true"
      />

      <motion.nav
        className="fixed top-0 left-0 right-0 z-[999]"
        initial={{ y: -80 }}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Main navigation"
      >
        <div className={`navbar-surface${scrolled ? ' is-scrolled' : ''}`}>
          <div className="container flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href={isHome ? "#hero" : "/"}
              className="font-display font-bold text-xl tracking-tight"
              style={{ color: 'var(--ink)' }}
              aria-label="Manav Baghel — Back to top"
            >
              MB
            </a>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-8 list-none" role="list">
              {navLinks.map(link => (
                <li key={link.href}>
                  <NavLink
                    href={isHome ? link.href : `/${link.href}`}
                    label={link.label}
                    active={isHome && activeSection === link.id}
                  />
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <div>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Resume"
                  className="btn-primary text-xs px-5 py-2 rounded-full flex items-center gap-1.5"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Resume
                </a>
              </div>

              <div>
                <a
                  href={isHome ? "#contact" : "/#contact"}
                  className="btn-primary text-xs px-5 py-2 rounded-full"
                >
                  Hire Me
                </a>
              </div>
            </div>

            {/* Mobile menu */}
            <MobileMenu activeSection={activeSection} isHome={isHome} />
          </div>
        </div>
      </motion.nav>
    </>
  )
}

function NavLink({ href, label, active }) {
  return (
    <a
      href={href}
      className="relative text-sm font-medium underline-draw"
      style={{
        color: active ? 'var(--ink)' : 'var(--ink-soft)',
        transition: 'color 200ms',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--ink)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--ink-soft)' }}
    >
      {label}
      {/* Shared layoutId underline — slides between active links */}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-0.5 left-0 right-0 h-px"
          style={{ background: 'var(--pine)' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      )}
    </a>
  )
}

function MobileMenu({ activeSection, isHome }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-1.5 p-2"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="block h-px w-5"
            style={{ background: 'var(--ink)' }}
            animate={{
              rotate:  open ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
              y:       open ? (i === 0 ? 6  : i === 2 ? -6  : 0) : 0,
              opacity: open && i === 1 ? 0 : 1,
            }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            className="absolute top-16 left-0 right-0"
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--hairline)',
              borderTop: 'none',
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col gap-1 p-4 list-none" role="list">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={isHome ? link.href : `/${link.href}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2.5 px-3 text-sm font-medium rounded-lg transition-all duration-150"
                style={{
                  color: isHome && activeSection === link.id ? 'var(--pine)' : 'var(--ink-soft)',
                  background: isHome && activeSection === link.id ? 'var(--paper-dim)' : 'transparent',
                }}
              >
                {isHome && activeSection === link.id && (
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--pine)' }} aria-hidden="true" />
                )}
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2 flex gap-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-primary flex-1 py-2.5 px-3 text-sm font-semibold rounded-lg text-center justify-center flex items-center gap-1.5"
            >
              Resume ↓
            </a>
            <a
              href={isHome ? "#contact" : "/#contact"}
              onClick={() => setOpen(false)}
              className="btn-primary flex-1 py-2.5 px-3 text-sm font-semibold rounded-lg text-center justify-center"
            >
              Hire Me
            </a>
          </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
