import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePaperAirplane,
  HiOutlineUser,
} from 'react-icons/hi2'
import MagneticButton from './MagneticButton'

const socials = [
  {
    name: 'Email',
    href: 'mailto:manavbaghhel@gmail.com',
    color: '#a78bfa',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m2 7 10 7 10-7"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/manav-2812',
    color: '#f0f0f5',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/manav-baghel',
    color: '#0a66c2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/manav_baghel',
    color: '#e1306c',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/manav_baghel',
    color: '#e7e7e7',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

function MagneticIcon({ social }) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width  / 2) * 0.45
    const y = (e.clientY - rect.top  - rect.height / 2) * 0.45
    ref.current.style.transform = `translate(${x}px, ${y}px)`
    ref.current.style.transition = 'transform 0.1s ease'
  }
  const onMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)'
  }

  return (
    <a
      ref={ref}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${social.name} profile`}
      className="group flex items-center gap-3 px-5 py-3 rounded-2xl glass glass-hover"
      style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={e => e.currentTarget.style.color = social.color}
    >
      {social.icon}
      <span className="text-sm font-medium">{social.name}</span>
      <svg
        width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5"
        className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 transition-transform duration-200"
        aria-hidden="true"
      >
        <path d="M7 17L17 7M17 7H7M17 7v10"/>
      </svg>
    </a>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'
  const [focused, setFocused] = useState(null)
  const [copied, setCopied] = useState(false)
  const statusId = 'form-status'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('manavbaghhel@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email: ', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)

    // Key lives in .env as VITE_WEB3FORMS_KEY — never commit the real value to git
    data.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY ?? '')
    data.append('subject', `Portfolio Contact: ${data.get('subject') || 'New Message'}`)
    data.append('from_name', data.get('name') || 'Portfolio Visitor')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setStatus('sent')
        form.reset()
        setTimeout(() => setStatus(null), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus(null), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(null), 4000)
    }
  }

  return (
    <section id="contact" className="section contact-section" ref={ref} aria-labelledby="contact-heading">
      <div className="container contact-container">

        {/* Header */}
        <motion.div
          className="contact-header mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4 min-w-0">
            <span className="section-num" aria-hidden="true">05 / Contact</span>
            <div className="h-px flex-1 min-w-0" style={{ background: 'var(--border-subtle)' }} aria-hidden="true" />
          </div>
          <h2
            id="contact-heading"
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text-primary)' }}
          >
            Let's build something{' '}
            <span className="gradient-text">great</span>
          </h2>
          <p className="mt-4 max-w-lg" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Open to Backend Developer internships and full-time roles. Also happy to chat about projects, technology, or collaboration.
          </p>
        </motion.div>

        <div className="contact-layout grid md:grid-cols-5 gap-8 max-w-5xl w-full">

          {/* Left — form (wider) */}
          <motion.div
            className="md:col-span-3 min-w-0"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="glass contact-form-card rounded-3xl overflow-hidden w-full">
              {/* Form header — macOS-style traffic lights */}
              <div
                className="contact-titlebar px-5 py-4 sm:px-8 sm:py-5 flex items-center gap-3"
                aria-hidden="true"
              >
                <div className="flex gap-1.5">
                  {['#ef4444','#f59e0b','#22c55e'].map(c => (
                    <div key={c} className="contact-traffic-light w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <span className="contact-file-name font-mono text-xs">
                  new_message.md
                </span>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="contact-form-body p-5 sm:p-8"
                aria-label="Contact form"
              >
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <FormField label="Name" name="name" placeholder="Your name" icon={HiOutlineUser} required focused={focused} setFocused={setFocused} />
                  <FormField label="Email" name="email" type="email" placeholder="you@example.com" icon={HiOutlineEnvelope} required focused={focused} setFocused={setFocused} />
                </div>
                <div className="mb-4">
                  <FormField label="Subject" name="subject" placeholder="What's this about?" icon={HiOutlinePaperAirplane} focused={focused} setFocused={setFocused} />
                </div>
                <div className="mb-7">
                  <label className="contact-label" htmlFor="message-field">
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <div className="contact-input-shell contact-textarea-shell">
                    <HiOutlineChatBubbleLeftRight className="contact-field-icon" size={17} aria-hidden="true" />
                    <textarea
                      id="message-field"
                      name="message"
                      rows={5}
                      placeholder="Tell me about the role, project, or opportunity..."
                      required
                      className="contact-input contact-textarea"
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      aria-required="true"
                    />
                  </div>
                </div>

                <MagneticButton strength={4} className="w-full">
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    aria-describedby={statusId}
                    aria-busy={status === 'sending'}
                    whileTap={status === 'sending' ? undefined : { scale: 0.98 }}
                    className={`contact-submit ${
                      status === 'sending' ? 'contact-submit--sending' :
                      status === 'sent' ? 'contact-submit--sent' :
                      status === 'error' ? 'contact-submit--error' : ''
                    }`}
                  >
                    {status === 'sending' && <span className="contact-spinner" aria-hidden="true" />}
                    <span>
                      {status === 'sending' ? 'Sending message…' :
                       status === 'sent' ? 'Message sent!' :
                       status === 'error' ? 'Try sending again' :
                       'Send Message'}
                    </span>
                    {status !== 'sending' && <HiOutlinePaperAirplane size={17} aria-hidden="true" />}
                  </motion.button>
                </MagneticButton>

                <p
                  id={statusId}
                  role="status"
                  aria-live="polite"
                  className={`contact-status ${status ? `contact-status--${status}` : ''}`}
                >
                  {status === 'sent' ? 'Your message is on its way — thank you.' :
                   status === 'error' ? 'Something went wrong. Please try again in a moment.' :
                   status === 'sending' ? 'Connecting to the message service…' : ''}
                </p>
              </form>
            </div>
          </motion.div>

          {/* Right — info */}
          <motion.div
            className="md:col-span-2 min-w-0 flex flex-col gap-5"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Email card */}
            <div className="glass glass-hover rounded-2xl p-7 relative overflow-hidden">
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <p className="font-mono text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                Preferred contact
              </p>
              <div className="flex items-center justify-between gap-3 mb-1">
                <a
                  href="mailto:manavbaghhel@gmail.com"
                  className="font-mono text-sm font-medium block truncate"
                  style={{ color: 'var(--accent-light)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-cyan)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--accent-light)'}
                >
                  manavbaghhel@gmail.com
                </a>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-mono select-none"
                  style={{
                    background: copied ? 'rgba(34, 197, 94, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${copied ? 'rgba(34, 197, 94, 0.25)' : 'rgba(255, 255, 255, 0.06)'}`,
                    color: copied ? '#4ade80' : 'var(--text-muted)',
                    fontSize: '0.65rem',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  title="Copy email to clipboard"
                  aria-label={copied ? "Email copied!" : "Copy email address"}
                  onMouseEnter={e => {
                    if (!copied) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                      e.currentTarget.style.color = 'var(--text-primary)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!copied) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                      e.currentTarget.style.color = 'var(--text-muted)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
                    }
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? 'copied' : 'copy'}
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.9 }}
                      transition={{ duration: 0.12 }}
                      className="flex items-center gap-1"
                    >
                      {copied ? (
                        <>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          <span>Copy</span>
                        </>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Usually replies within 24 hours
              </p>
            </div>

            {/* Location card */}
            <div className="glass glass-hover rounded-2xl px-6 py-5 flex items-center gap-4">
              <HiOutlineMapPin size={20} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} aria-hidden="true" />
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  Fatehgarh Sahib, Punjab
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>India · Open to remote</p>
              </div>
            </div>

            {/* Availability card */}
            <div className="glass glass-hover rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#22c55e' }} />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: '#22c55e' }} />
                </span>
                <span className="font-mono text-xs" style={{ color: '#22c55e' }}>Available now</span>
              </div>
              <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                Seeking Backend Developer roles
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Internships &amp; full-time opportunities
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3" role="list" aria-label="Social profiles">
              {socials.map(s => (
                <div key={s.name} role="listitem">
                  <MagneticIcon social={s} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FormField({ label, name, type = 'text', placeholder, icon: Icon, required, focused, setFocused }) {
  const id = `field-${name}`
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="contact-label">
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <div className="contact-input-shell">
        <Icon className="contact-field-icon" size={17} aria-hidden="true" />
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          aria-required={required}
          className="contact-input"
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused(null)}
        />
      </div>
    </div>
  )
}
