import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [resolving, setResolving] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const reducedMotionTimer = setTimeout(onComplete, 80)
      return () => clearTimeout(reducedMotionTimer)
    }

    const duration = 620
    let frameId
    let resolveTimer
    let completeTimer
    const startedAt = performance.now()

    const tick = (now) => {
      const elapsed = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      setProgress(Math.round(eased * 100))

      if (elapsed < 1) {
        frameId = requestAnimationFrame(tick)
        return
      }

      setResolving(true)
      resolveTimer = setTimeout(() => {
        setDone(true)
        completeTimer = setTimeout(onComplete, 340)
      }, 180)
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
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'var(--base)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015, filter: 'blur(4px)' }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="loader-orb mb-9"
            initial={{ opacity: 0, scale: 0.74 }}
            animate={resolving
              ? { opacity: 0.12, scale: 1.52, filter: 'blur(2px)' }
              : { opacity: 1, scale: 1, rotate: 0 }}
            transition={resolving
              ? { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            aria-hidden="true"
          >
            <span className="loader-orb-ring loader-orb-ring--outer" />
            <span className="loader-orb-ring loader-orb-ring--inner" />
            <span className="loader-orb-core">MB</span>
          </motion.div>

          <motion.div
            className="font-mono text-4xl font-medium tabular-nums"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: resolving ? 0 : 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span style={{ color: 'var(--accent-light)' }}>{String(progress).padStart(3, '0')}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}> %</span>
          </motion.div>

          <motion.p
            className="mt-3 text-[0.68rem] tracking-[0.24em] uppercase font-mono"
            style={{ color: 'var(--text-muted)' }}
            animate={{ opacity: resolving ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {resolving ? 'Launching scene' : 'Preparing portfolio'}
          </motion.p>

          <motion.div
            className="absolute bottom-0 left-0 h-px"
            style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-light), var(--accent-cyan))' }}
            animate={{ width: `${progress}%`, opacity: resolving ? 0 : 1 }}
            transition={{ duration: 0.05, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
