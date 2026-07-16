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
    const duration = 950
    let frameId, resolveTimer, completeTimer
    const startedAt = performance.now()
    const tick = (now) => {
      const elapsed = Math.min((now - startedAt) / duration, 1)
      const eased   = 1 - Math.pow(1 - elapsed, 3)
      setProgress(Math.round(eased * 100))
      if (elapsed < 1) { frameId = requestAnimationFrame(tick); return }
      resolveTimer  = setTimeout(() => {
        setDone(true)
        completeTimer = setTimeout(() => onComplete?.(), 300)
      }, 80)
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
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: 'var(--paper)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Loading portfolio"
          aria-live="polite"
        >
          {/* Wordmark */}
          <p className="font-display font-semibold text-lg mb-12"
             style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>
            MB
          </p>

          {/* Track */}
          <div className="relative w-48 h-px" style={{ background: 'var(--hairline)' }}
               aria-hidden="true">
            {/* Fill line */}
            <motion.div
              className="absolute top-0 left-0 h-full"
              style={{ background: 'var(--pine)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
