import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

const COMMANDS = [
  { id: 'about', title: 'Go to About Me', category: 'Navigation', action: 'scroll', target: '#about' },
  { id: 'skills', title: 'Go to Skills & Expertise', category: 'Navigation', action: 'scroll', target: '#tech-stack' },
  { id: 'projects', title: 'Go to Projects', category: 'Navigation', action: 'scroll', target: '#projects' },
  { id: 'experience', title: 'Go to Experience', category: 'Navigation', action: 'scroll', target: '#experience' },
  { id: 'certifications', title: 'Go to Certifications', category: 'Navigation', action: 'scroll', target: '#certifications' },
  { id: 'contact', title: 'Go to Contact', category: 'Navigation', action: 'scroll', target: '#contact' },
  { id: 'github', title: 'Open GitHub Profile', category: 'External Links', action: 'link', target: 'https://github.com/manav-2812', shortcut: 'G' },
  { id: 'linkedin', title: 'Open LinkedIn Profile', category: 'External Links', action: 'link', target: 'https://linkedin.com/in/manav-baghel', shortcut: 'L' },
  { id: 'resume', title: 'Open Resume PDF', category: 'External Links', action: 'link', target: '/resume.pdf', shortcut: 'R' }
]

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const paletteRef = useRef(null)
  const inputRef = useRef(null)

  // 1. Single letter global shortcuts & Ctrl+K trigger
  useEffect(() => {
    const handleGlobalKeys = (e) => {
      // Ignore shortcuts if the user is typing in forms/inputs
      const activeTag = document.activeElement.tagName
      const isTyping = activeTag === 'INPUT' || activeTag === 'TEXTAREA' || document.activeElement.isContentEditable

      if (isTyping) {
        // Still allow Ctrl+K to close if it is already open and they are focused inside the search box
        if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault()
          setIsOpen(prev => !prev)
        }
        return
      }

      // Ctrl + K or Cmd + K toggles palette
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setIsOpen(prev => !prev)
        return
      }

      // Single-key triggers
      const key = e.key.toLowerCase()
      if (key === 'g') {
        e.preventDefault()
        window.open('https://github.com/manav-2812', '_blank', 'noopener,noreferrer')
      } else if (key === 'l') {
        e.preventDefault()
        window.open('https://linkedin.com/in/manav-baghel', '_blank', 'noopener,noreferrer')
      } else if (key === 'r') {
        e.preventDefault()
        window.open('/resume.pdf', '_blank', 'noopener,noreferrer')
      }
    }

    window.addEventListener('keydown', handleGlobalKeys)
    return () => window.removeEventListener('keydown', handleGlobalKeys)
  }, [])

  // Filter commands based on search
  const filtered = COMMANDS.filter(cmd =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  )

  // Reset index when search changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  // Focus management and layout side-effects when palette opens
  useEffect(() => {
    if (!isOpen) return undefined

    // Disable background page scrolling
    document.body.style.overflow = 'hidden'

    // Auto-focus input field
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 50)

    // Backdrop scroll isolation for screen readers
    const rootEl = document.getElementById('root')
    if (rootEl) {
      rootEl.setAttribute('inert', '')
      rootEl.setAttribute('aria-hidden', 'true')
    }

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
      if (rootEl) {
        rootEl.removeAttribute('inert')
        rootEl.removeAttribute('aria-hidden')
      }
    }
  }, [isOpen])

  // Execute selected command action
  const executeCommand = (cmd) => {
    if (!cmd) return
    setIsOpen(false)
    setSearch('')

    if (cmd.action === 'scroll') {
      const el = document.querySelector(cmd.target)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } else if (cmd.action === 'link') {
      window.open(cmd.target, '_blank', 'noopener,noreferrer')
    }
  }

  // Keyboard navigation within the active palette list
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (filtered.length > 0 ? (prev + 1) % filtered.length : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered[selectedIndex]) {
          executeCommand(filtered[selectedIndex])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filtered, selectedIndex])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="command-palette-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false)
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            ref={paletteRef}
            className="command-palette-container"
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Search Header */}
            <div className="command-palette-search-wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ color: 'var(--ink-soft)' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="command-palette-input"
                placeholder="Search commands or navigate..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-autocomplete="list"
                aria-controls="command-listbox"
                aria-activedescendant={filtered[selectedIndex] ? `cmd-${filtered[selectedIndex].id}` : undefined}
              />
              <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint border border-hairline-strong px-2 py-0.5 rounded bg-paper">
                ESC
              </span>
            </div>

            {/* List Results */}
            <div id="command-listbox" role="listbox" className="command-palette-list max-h-[300px] overflow-y-auto mt-2">
              {filtered.length === 0 ? (
                <div className="p-5 text-center font-mono text-xs text-ink-faint">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex
                  return (
                    <div
                      key={cmd.id}
                      id={`cmd-${cmd.id}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`command-palette-option ${isSelected ? 'is-selected' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-ink-faint w-24 flex-shrink-0">
                          {cmd.category}
                        </span>
                        <span className="font-body text-sm font-medium text-ink">
                          {cmd.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {cmd.shortcut ? (
                          <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint border border-hairline-strong px-1.5 py-0.5 rounded bg-paper">
                            {cmd.shortcut}
                          </span>
                        ) : cmd.action === 'scroll' ? (
                          <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint border border-hairline-strong px-1.5 py-0.5 rounded bg-paper">
                            Go
                          </span>
                        ) : null}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Footer Help Bar */}
            <div className="command-palette-footer">
              <div className="flex gap-4">
                <span className="flex items-center gap-1 font-mono text-[9px] text-ink-faint">
                  <span className="border border-hairline-strong px-1 rounded bg-paper">↑↓</span> Navigate
                </span>
                <span className="flex items-center gap-1 font-mono text-[9px] text-ink-faint">
                  <span className="border border-hairline-strong px-1.5 rounded bg-paper">Enter</span> Select
                </span>
              </div>
              <span className="font-mono text-[9px] text-ink-faint">
                Press <span className="border border-hairline-strong px-1 rounded bg-paper">Ctrl</span> + <span className="border border-hairline-strong px-1.5 rounded bg-paper">K</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
