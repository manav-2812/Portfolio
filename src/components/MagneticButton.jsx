import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * MagneticButton
 * Wraps any child in a magnetic hover — pulls toward cursor, springs back.
 * Props:
 *   strength  — max pixel pull (default 6)
 *   children  — button / anchor / any element
 */
export default function MagneticButton({ strength = 6, children, ...rest }) {
  const ref = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Tighter spring = snappier, more premium feel
  const x = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.4 })

  const handleMouseMove = useCallback((e) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width  / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rawX.set(dx * strength)
    rawY.set(dy * strength)
  }, [rawX, rawY, strength])

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  const { style: customStyle, ...otherRest } = rest

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, display: 'inline-block', ...customStyle }}
      {...otherRest}
    >
      {children}
    </motion.div>
  )
}
