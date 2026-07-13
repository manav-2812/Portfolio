import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * MagneticButton
 * Wraps any child in a tiny magnetic hover — the element gently pulls
 * toward the cursor on hover, then springs back. No scaling.
 *
 * Props:
 *   strength  — max pixel pull (default 6)
 *   children  — button / anchor / any element
 *   ...rest   — forwarded straight to the motion.div wrapper
 */
export default function MagneticButton({ strength = 6, children, ...rest }) {
  const ref = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Spring config: low stiffness + moderate damping = smooth magnetic feel
  const x = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.5 })

  const handleMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width  / 2)   // –1 … +1
    const dy = (e.clientY - cy) / (rect.height / 2)   // –1 … +1
    rawX.set(dx * strength)
    rawY.set(dy * strength)
  }, [rawX, rawY, strength])

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, display: 'inline-block' }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
