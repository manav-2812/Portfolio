import { useRef, useState } from 'react'
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
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-4 min-w-0">
            <span className="section-num" aria-hidden="true">05 / Contact</span>
            <div className="h-px flex-1 min-w-0" style={{ background: 'var(--hairline)' }} aria-hidden="true" />
          </div>
          <h2
            id="contact-heading"
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'var(--text-h1)', color: 'var(--ink)' }}
          >
            Let's build something great
          </h2>
          <p className="mt-4 max-w-lg" style={{ color: 'var(--ink-soft)', fontSize: 'var(--text-body)' }}>
            Open to Backend Developer internships and full-time roles. Also happy to chat about projects, technology, or collaboration.
          </p>
        </motion.div>

        <div className="contact-layout grid md:grid-cols-5 gap-8 max-w-5xl w-full">

          {/* Left — form (wider) */}
          <motion.div
            className="md:col-span-3 min-w-0"
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="card card-hover" style={{ borderRadius: '8px' }}>
              {/* Form titlebar */}
              <div
                style={{
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid var(--hairline)',
                  background: 'var(--paper-deep)',
                  borderRadius: '7px 7px 0 0',
                }}
                aria-hidden="true"
              >
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--ink-faint)',
                  letterSpacing: '0.1em',
                }}>
                  new_message.md
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-5 sm:p-8"
                aria-label="Contact form"
              >
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {/* Name field */}
                  <div className="contact-field min-w-0">
                    <label
                      htmlFor="field-name"
                      className="contact-label"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-micro)',
                        color: 'var(--ink-faint)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '0.35rem',
                      }}
                    >
                      Name *
                    </label>
                    <input
                      id="field-name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                      aria-required="true"
                      className="contact-input"
                    />
                  </div>
                  {/* Email field */}
                  <div className="contact-field min-w-0">
                    <label
                      htmlFor="field-email"
                      className="contact-label"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-micro)',
                        color: 'var(--ink-faint)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '0.35rem',
                      }}
                    >
                      Email *
                    </label>
                    <input
                      id="field-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      aria-required="true"
                      className="contact-input"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="contact-field mb-4">
                  <label
                    htmlFor="field-subject"
                    className="contact-label"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-micro)',
                      color: 'var(--ink-faint)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Subject
                  </label>
                  <input
                    id="field-subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    className="contact-input"
                  />
                </div>

                {/* Message field */}
                <div className="contact-field mb-7">
                  <label
                    htmlFor="message-field"
                    className="contact-label"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-micro)',
                      color: 'var(--ink-faint)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message-field"
                    name="message"
                    rows={5}
                    placeholder="Tell me about the role, project, or opportunity..."
                    required
                    aria-required="true"
                    className="contact-input contact-textarea"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                  disabled={status === 'sending'}
                  aria-busy={status === 'sending'}
                  aria-describedby={statusId}
                  aria-label={status === 'sending' ? 'Sending message' : undefined}
                >
                  <span className={`submit-label${status === 'sending' ? ' is-loading' : ''}`}>
                    {status === 'sending' ? 'Sending…' :
                     status === 'sent' ? 'Message sent!' :
                     status === 'error' ? 'Try again' :
                     'Send Message'}
                  </span>
                  {status === 'sending' && <span className="submit-spinner" aria-hidden="true" />}
                </button>

                <p
                  id={statusId}
                  role="status"
                  aria-live="polite"
                  style={{
                    marginTop: '0.75rem',
                    fontSize: 'var(--text-caption)',
                    minHeight: '1.25rem',
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
                   status === 'error' ? 'Something went wrong. Please try again in a moment.' :
                   status === 'sending' ? 'Connecting to the message service…' : ''}
                </p>
              </form>
            </div>
          </motion.div>

          {/* Right — info */}
          <motion.div
            className="md:col-span-2 min-w-0 flex flex-col gap-5"
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Email card */}
            <div
              className="card card-hover"
              style={{
                background: 'var(--paper-dim)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-card)',
                padding: '1.75rem',
              }}
            >
              <p
                className="font-mono text-xs mb-3"
                style={{ color: 'var(--ink-faint)' }}
              >
                Preferred contact
              </p>
              <div className="flex items-center justify-between gap-3 mb-1">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=manavbaghhel@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm font-medium block truncate"
                  style={{ color: 'var(--pine)' }}
                >
                  manavbaghhel@gmail.com
                </a>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-mono select-none flex-shrink-0"
                  style={{
                    border: '1px solid var(--hairline)',
                    background: 'transparent',
                    color: 'var(--ink-faint)',
                    fontSize: '0.65rem',
                    transition: 'color 0.2s var(--ease-editorial)',
                    cursor: 'pointer',
                  }}
                  title="Copy email to clipboard"
                  aria-label={copied ? 'Email copied!' : 'Copy email address'}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-xs" style={{ color: 'var(--ink-faint)' }}>
                Usually replies within 24 hours
              </p>
            </div>

            {/* Location card */}
            <div
              className="card card-hover"
              style={{
                background: 'var(--paper-dim)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-card)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <HiOutlineMapPin size={20} style={{ color: 'var(--pine-soft)', flexShrink: 0 }} aria-hidden="true" />
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>
                  Fatehgarh Sahib, Punjab
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--ink-faint)' }}>India · Open to remote</p>
              </div>
            </div>

            {/* Availability card */}
            <div
              className="card card-hover"
              style={{
                background: 'var(--paper-dim)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-card)',
                padding: '1.75rem',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span
                    className="relative inline-flex rounded-full h-2.5 w-2.5"
                    style={{ background: 'var(--pine)' }}
                  />
                </span>
                <span className="font-mono text-xs" style={{ color: 'var(--pine)' }}>Available now</span>
              </div>
              <p className="font-semibold mb-1" style={{ color: 'var(--ink)' }}>
                Seeking Backend Developer roles
              </p>
              <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
                Internships &amp; full-time opportunities
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-4" aria-label="Social profiles">
              {socials.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${s.name} profile`}
                  className="underline-draw font-mono text-xs"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
