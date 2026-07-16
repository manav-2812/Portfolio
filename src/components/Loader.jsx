import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done,     setDone]     = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(() => onComplete?.(), 80)
      return () => clearTimeout(t)
    }
    const duration = 1100
    let frameId, resolveTimer, completeTimer
    const startedAt = performance.now()
    const tick = (now) => {
      const elapsed = Math.min((now - startedAt) / duration, 1)
      // Expo ease-out for satisfying acceleration then smooth stop
      const eased = 1 - Math.pow(1 - elapsed, 4)
      setProgress(Math.round(eased * 100))
      if (elapsed < 1) { frameId = requestAnimationFrame(tick); return }
      resolveTimer = setTimeout(() => {
        setDone(true)
        completeTimer = setTimeout(() => onComplete?.(), 420)
      }, 120)
    }
    frameId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(resolveTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-10"
          style={{ background: 'var(--paper)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
          aria-label="Loading portfolio"
          aria-live="polite"
        >
          {/* Wordmark — scales up from 0.88 on mount */}
          <motion.p
            className="font-display font-bold select-none"
            style={{ color: 'var(--ink)', letterSpacing: '-0.02em', fontSize: '1.5rem' }}
            initial={{ opacity: 0, scale: 0.88, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            MB
          </motion.p>

          {/* Track + fill */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            aria-hidden="true"
          >
            <div
              className="relative overflow-hidden"
              style={{ width: '140px', height: '1px', background: 'var(--hairline)' }}
            >
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{ background: 'var(--pine)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.04, ease: 'linear' }}
              />
            </div>
            {/* Percentage — mono, tiny, fades in with track */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--ink-faint)',
                letterSpacing: '0.18em',
                tabularNums: 'tabular-nums',
              }}
            >
              {String(progress).padStart(3, '0')}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
