import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

function formatValue(value, decimals, minimumDigits, suffix) {
  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()
  const [whole, fraction] = formatted.split('.')
  const paddedWhole = whole.padStart(minimumDigits, '0')
  return `${paddedWhole}${fraction ? `.${fraction}` : ''}${suffix}`
}

export default function CountUp({ value, suffix = '', duration = 950, className, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const prefersReducedMotion = useReducedMotion()
  const valueString = String(value)
  const target = Number(valueString)
  const decimals = valueString.includes('.') ? valueString.split('.')[1].length : 0
  const minimumDigits = valueString.includes('.') ? valueString.split('.')[0].length : valueString.length
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? target : 0)

  useEffect(() => {
    if (!inView) return undefined
    if (prefersReducedMotion) {
      setDisplayValue(target)
      return undefined
    }

    let frameId
    let startedAt
    const tick = (now) => {
      startedAt ??= now
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(target * eased)
      if (progress < 1) frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [duration, inView, prefersReducedMotion, target])

  return (
    <span ref={ref} className={className} style={style}>
      {formatValue(displayValue, decimals, minimumDigits, suffix)}
    </span>
  )
}
