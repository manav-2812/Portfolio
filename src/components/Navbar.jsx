import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import MagneticButton from './MagneticButton'

const navLinks = [
  { label: 'About',          href: '#about',          id: 'about' },
  { label: 'Projects',       href: '#projects',       id: 'projects' },
  { label: 'Experience',     href: '#experience',     id: 'experience' },
  { label: 'Certifications', href: '#certifications', id: 'certifications' },
  { label: 'Contact',        href: '#contact',        id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false)
  const [hidden, setHidden]             = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollPct, setScrollPct]       = useState(0)
  const lastY = useRef(0)

  useEffect(() => {
    /* ── Scroll progress + hide-on-scroll ── */
    const onScroll = () => {
      const y = window.scrollY
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
        style={{ transform: `scaleX(${scrollPct / 100})` }}
        aria-hidden="true"
      />

      <motion.nav
        className="fixed top-0 left-0 right-0 z-[999]"
        initial={{ y: -80 }}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        aria-label="Main navigation"
      >
        <div
          className={`transition-all duration-500 ${scrolled ? 'glass' : 'bg-transparent'}`}
          style={{
            borderBottom: scrolled ? '1px solid var(--border-subtle)' : 'none',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          <div className="container flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#hero"
              className="relative group font-display font-bold text-xl tracking-tight"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Manav Baghel — Back to top"
            >
              <span
                className="relative z-10"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-light), var(--accent-cyan))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                M
              </span>
              <span style={{ color: 'var(--text-muted)', fontWeight: 300 }}>B</span>
              {/* Animated underline */}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: 'linear-gradient(90deg, var(--accent-light), var(--accent-cyan))' }}
                aria-hidden="true"
              />
            </a>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-8 list-none" role="list">
              {navLinks.map(link => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    label={link.label}
                    active={activeSection === link.id}
                  />
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#"
                onClick={e => e.preventDefault()}
                aria-disabled="true"
                aria-label="Resume — coming soon"
                className="flex items-center gap-1.5 font-mono text-xs px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-glass)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--accent-cyan)'
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)'
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(34,211,238,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.borderColor = 'var(--border-glass)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Resume
              </a>

              <MagneticButton strength={5}>
                <a
                  href="#contact"
                  className="hire-me-btn relative font-semibold text-xs px-5 py-2 rounded-full overflow-hidden block"
                >
                  <span className="relative z-10 tracking-wide">Hire Me</span>
                </a>
              </MagneticButton>
            </div>

            {/* Mobile menu */}
            <MobileMenu activeSection={activeSection} />
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
      className="relative text-sm font-medium group"
      style={{
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        transition: 'color 200ms',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-primary)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)' }}
    >
      {label}
      {/* Shared layoutId underline — slides between active links */}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-0.5 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, var(--accent-light), var(--accent-cyan))',
            boxShadow: '0 0 8px rgba(167,139,250,0.7)',
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden="true"
        />
      )}
      {/* Hover underline (only when not active) */}
      {!active && (
        <span
          className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
          style={{ background: 'var(--border-glass)' }}
          aria-hidden="true"
        />
      )}
    </a>
  )
}

function MobileMenu({ activeSection }) {
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
            style={{ background: open ? 'var(--accent-light)' : 'var(--text-primary)' }}
            animate={{
              rotate: open ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
              y:      open ? (i === 0 ? 6  : i === 2 ? -6  : 0) : 0,
              opacity: open && i === 1 ? 0 : 1,
            }}
            transition={{ duration: 0.22 }}
          />
        ))}
      </button>

      <motion.div
        id="mobile-menu"
        className="absolute top-16 left-0 right-0 glass"
        style={{ borderTop: '1px solid var(--border-subtle)', overflow: 'hidden' }}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-1 p-4 list-none" role="list">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2.5 px-3 text-sm font-medium rounded-xl transition-all duration-150"
                style={{
                  color: activeSection === link.id ? 'var(--accent-light)' : 'var(--text-secondary)',
                  background: activeSection === link.id ? 'rgba(124,58,237,0.08)' : 'transparent',
                }}
              >
                {activeSection === link.id && (
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--accent-cyan)' }} />
                )}
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2 flex gap-2">
            <a
              href="#"
              onClick={e => { e.preventDefault(); setOpen(false) }}
              aria-disabled="true"
              className="flex-1 py-2.5 px-3 text-sm font-medium rounded-xl text-center"
              style={{ color: 'var(--accent-cyan)', border: '1px solid rgba(34,211,238,0.2)' }}
            >
              Resume ↓
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="hire-me-btn flex-1 py-2.5 px-3 text-sm font-semibold rounded-xl text-center"
            >
              Hire Me
            </a>
          </li>
        </ul>
      </motion.div>
    </div>
  )
}
