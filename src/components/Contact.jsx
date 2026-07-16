import { useRef, useState } from 'react'
import MagneticButton from './MagneticButton'
import { motion, useInView } from 'framer-motion'
import {
  HiOutlineMapPin,
} from 'react-icons/hi2'

const socials = [
  {
    name: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=manavbaghhel@gmail.com',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/manav-2812',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/manav-baghel',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/3manav_',
  },
  {
    name: 'X',
    href: 'https://x.com/baghell_',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'
  const [copied, setCopied] = useState(false)
  const statusId = 'form-status'

  // Dynamic mouse position tracking for card spotlight glow effects
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

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

        {/* Section Header */}
        <motion.div
          className="contact-header mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            id="contact-heading"
            className="font-body font-black uppercase tracking-tighter leading-none select-none"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
          >
            <span className="block" style={{ color: 'var(--pine)' }}>Let's work</span>
            <span 
              className="block" 
              style={{ 
                color: 'transparent',
                WebkitTextStroke: '2px var(--ink)',
                opacity: 0.15,
                marginTop: '-0.2rem'
              }}
            >
              Together
            </span>
          </h2>
        </motion.div>

        <div className="contact-layout grid md:grid-cols-5 gap-8 max-w-5xl w-full">

          {/* Left — Form Card (Redesigned with premium container and responsive layout grid) */}
          <motion.div
            className="md:col-span-3 min-w-0"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative z-10 flex flex-col gap-8 w-full"
              aria-label="Contact form"
            >
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-8">
                
                {/* Name field */}
                <div className="flex flex-col min-w-0">
                  <label
                    htmlFor="field-name"
                    className="font-body text-xs font-semibold mb-2"
                    style={{ color: 'var(--ink-soft)' }}
                  >
                    Name
                  </label>
                  <input
                    id="field-name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    aria-required="true"
                    className="block w-full text-sm border transition-all duration-200 outline-none"
                    style={{
                      borderColor: 'var(--hairline-strong)',
                      background: 'var(--paper-deep)',
                      color: 'var(--ink)',
                      padding: '1.15rem 1.5rem',
                      borderRadius: '12px'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--pine)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(60, 74, 63, 0.15)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--hairline-strong)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Email field */}
                <div className="flex flex-col min-w-0">
                  <label
                    htmlFor="field-email"
                    className="font-body text-xs font-semibold mb-2"
                    style={{ color: 'var(--ink-soft)' }}
                  >
                    Email
                  </label>
                  <input
                    id="field-email"
                    name="email"
                    type="email"
                    placeholder="Your@email.com"
                    required
                    aria-required="true"
                    className="block w-full text-sm border transition-all duration-200 outline-none"
                    style={{
                      borderColor: 'var(--hairline-strong)',
                      background: 'var(--paper-deep)',
                      color: 'var(--ink)',
                      padding: '1.15rem 1.5rem',
                      borderRadius: '12px'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--pine)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(60, 74, 63, 0.15)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--hairline-strong)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>

              {/* Subject field */}
              <div className="flex flex-col">
                <label
                  htmlFor="field-subject"
                  className="font-body text-xs font-semibold mb-2"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  Subject
                </label>
                <input
                  id="field-subject"
                  name="subject"
                  type="text"
                  placeholder="What is this about?"
                  className="block w-full text-sm border transition-all duration-200 outline-none"
                  style={{
                    borderColor: 'var(--hairline-strong)',
                    background: 'var(--paper-deep)',
                    color: 'var(--ink)',
                    padding: '1.15rem 1.5rem',
                    borderRadius: '12px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--pine)'
                    e.target.style.boxShadow = '0 0 0 3px rgba(60, 74, 63, 0.15)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--hairline-strong)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col">
                <label
                  htmlFor="message-field"
                  className="font-body text-xs font-semibold mb-2"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  Message
                </label>
                <textarea
                  id="message-field"
                  name="message"
                  rows={5}
                  placeholder="Message"
                  required
                  aria-required="true"
                  className="block w-full text-sm border transition-all duration-200 outline-none resize-y min-h-[9rem]"
                  style={{
                    borderColor: 'var(--hairline-strong)',
                    background: 'var(--paper-deep)',
                    color: 'var(--ink)',
                    padding: '1.15rem 1.5rem',
                    borderRadius: '12px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--pine)'
                    e.target.style.boxShadow = '0 0 0 3px rgba(60, 74, 63, 0.15)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--hairline-strong)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Submit button */}
              <div className="flex flex-col gap-4 mt-2">
                <MagneticButton strength={6} className="w-full" style={{ display: 'block', width: '100%' }}>
                  <motion.button
                    type="submit"
                    className="w-full justify-center flex items-center gap-2 text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer"
                    disabled={status === 'sending'}
                    aria-busy={status === 'sending'}
                    aria-describedby={statusId}
                    style={{
                      background: 'var(--pine)',
                      color: 'var(--paper)',
                      border: 'none',
                      padding: '1.2rem 2rem',
                      borderRadius: '12px',
                      display: 'flex',
                    }}
                    whileHover={{ 
                      y: -2,
                      background: 'var(--pine-soft)',
                    }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span>
                      {status === 'sending' ? 'Sending…' :
                       status === 'sent' ? 'Sent!' :
                       status === 'error' ? 'Failed' :
                       'Submit'}
                    </span>
                  </motion.button>
                </MagneticButton>

                <div className="min-h-[1.25rem] flex items-center justify-center">
                  <p
                    id={statusId}
                    role="status"
                    aria-live="polite"
                    style={{
                      fontSize: 'var(--text-caption)',
                      fontFamily: 'var(--font-mono)',
                      color: status === 'sending'
                        ? 'var(--ink-soft)'
                        : status === 'sent'
                        ? 'var(--pine)'
                        : status === 'error'
                        ? '#8B3A3A'
                        : 'transparent',
                    }}
                  >
                    {status === 'sent' ? 'Your message is on its way — thank you.' :
                     status === 'error' ? 'Connection failed. Please retry.' :
                     status === 'sending' ? 'Connecting to message server…' : ''}
                  </p>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Right — Info Cards Stack */}
          <motion.div
            className="md:col-span-2 min-w-0 flex flex-col gap-6"
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Email Card */}
            <motion.div
              className="card relative overflow-hidden group transition-colors"
              onMouseMove={handleMouseMove}
              style={{
                background: 'var(--paper-dim)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-card)',
                padding: '1.75rem',
              }}
              whileHover={{ y: -5, borderColor: 'rgba(60, 74, 63, 0.25)' }}
              transition={{ duration: 0.25 }}
            >
              {/* Mouse Follow Spotlight Glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle 160px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(174, 139, 87, 0.1) 0%, rgba(60, 74, 63, 0.04) 60%, transparent 100%)',
                  zIndex: 0,
                }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <p
                  className="font-mono text-[9px] uppercase tracking-widest mb-3"
                  style={{ color: 'var(--ink-faint)' }}
                >
                  Preferred contact
                </p>
                <div className="flex items-center justify-between gap-3 mb-1">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=manavbaghhel@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm font-semibold block truncate min-w-0"
                    style={{ color: 'var(--pine)', transition: 'color 0.2s' }}
                  >
                    manavbaghhel@gmail.com
                  </a>
                  <MagneticButton strength={4}>
                    <motion.button
                      onClick={handleCopy}
                      className="select-none flex-shrink-0 cursor-pointer text-center"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-micro)',
                        color: copied ? 'var(--pine)' : 'var(--ink-soft)',
                        border: '1px solid',
                        borderColor: copied ? 'var(--pine)' : 'var(--hairline)',
                        borderRadius: '999px',
                        padding: '0.2rem 0.65rem',
                        background: copied ? 'rgba(60, 74, 63, 0.08)' : 'var(--paper)',
                        transition: 'border-color 0.15s, background-color 0.15s, color 0.15s',
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: 'var(--pine)',
                        color: copied ? 'var(--pine)' : 'var(--ink)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      title="Copy email to clipboard"
                      aria-label={copied ? 'Email copied!' : 'Copy email address'}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </motion.button>
                  </MagneticButton>
                </div>
                <p className="text-xs" style={{ color: 'var(--ink-faint)' }}>
                  Usually replies within 24 hours
                </p>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div
              className="card relative overflow-hidden group transition-colors"
              onMouseMove={handleMouseMove}
              style={{
                background: 'var(--paper-dim)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-card)',
                padding: '1.5rem',
              }}
              whileHover={{ y: -5, borderColor: 'rgba(60, 74, 63, 0.25)' }}
              transition={{ duration: 0.25 }}
            >
              {/* Mouse Follow Spotlight Glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle 160px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(174, 139, 87, 0.1) 0%, rgba(60, 74, 63, 0.04) 60%, transparent 100%)',
                  zIndex: 0,
                }}
              />

              <div className="relative z-10 flex items-center gap-4">
                <HiOutlineMapPin size={22} style={{ color: 'var(--pine)', flexShrink: 0 }} aria-hidden="true" />
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>
                    Fatehgarh Sahib, Punjab
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--ink-faint)' }}>India · Open to remote</p>
                </div>
              </div>
            </motion.div>

            {/* Availability Card (Seeking roles) */}
            <motion.div
              className="card relative overflow-hidden group transition-colors"
              onMouseMove={handleMouseMove}
              style={{
                background: 'var(--paper-dim)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-card)',
                padding: '1.75rem',
              }}
              whileHover={{ y: -5, borderColor: 'rgba(60, 74, 63, 0.25)' }}
              transition={{ duration: 0.25 }}
            >
              {/* Mouse Follow Spotlight Glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle 160px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(174, 139, 87, 0.1) 0%, rgba(60, 74, 63, 0.04) 60%, transparent 100%)',
                  zIndex: 0,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e]" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'var(--pine)' }}>
                    Available now
                  </span>
                </div>
                <p className="font-semibold mb-1" style={{ color: 'var(--ink)' }}>
                  Seeking Backend Developer roles
                </p>
                <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
                  Internships &amp; full-time opportunities
                </p>
              </div>
            </motion.div>

            {/* Social profiles links bar */}
            <div className="flex flex-wrap gap-2.5" aria-label="Social profiles">
              {socials.map(s => (
                <MagneticButton key={s.name} strength={1.5}>
                  <motion.a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${s.name} profile`}
                    className="select-none flex-shrink-0 cursor-pointer block text-center"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-micro)',
                      color: 'var(--ink-soft)',
                      border: '1px solid var(--hairline)',
                      borderRadius: '999px',
                      padding: '0.25rem 0.7rem',
                      background: 'var(--paper)',
                      transition: 'border-color 0.15s, background-color 0.15s, color 0.15s',
                    }}
                    whileHover={{
                      scale: 1.05,
                      borderColor: 'var(--pine)',
                      color: 'var(--ink)',
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {s.name}
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
