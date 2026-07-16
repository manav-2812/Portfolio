import { useEffect, useRef, useState } from 'react'

const coarsePointerQuery = '(hover: none), (pointer: coarse)'

export default function Cursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)
  const pos     = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf     = useRef(null)
  const hovered = useRef(false)
  const clicking = useRef(false)
  const visible = useRef(false)

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(coarsePointerQuery).matches,
  )
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  /* Keep native cursor behavior on touch/coarse-pointer devices. */
  useEffect(() => {
    const mediaQuery = window.matchMedia(coarsePointerQuery)
    const onChange = (event) => setIsMobile(event.matches)
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  /* Listen to prefers-reduced-motion queries dynamically */
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event) => setPrefersReducedMotion(event.matches)
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  /* Hide native cursor only on non-mobile; restore on cleanup. */
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return
    document.body.style.cursor = 'none'
    return () => {
      document.body.style.cursor = ''
    }
  }, [isMobile, prefersReducedMotion])

  /* Cursor position stays in refs so hovering links never re-renders the app. */
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return

    const onMove = (event) => {
      pos.current = { x: event.clientX, y: event.clientY }

      // Make cursor visible on first move
      if (!visible.current) {
        visible.current = true
        if (ringRef.current) ringRef.current.style.opacity = '1'
        if (dotRef.current) dotRef.current.style.opacity = '1'
      }
    }

    const onDown = () => { clicking.current = true }
    const onUp   = () => { clicking.current = false }

    const onLeaveWindow = () => {
      if (ringRef.current) ringRef.current.style.opacity = '0'
      if (dotRef.current) dotRef.current.style.opacity = '0'
      visible.current = false
    }

    const loop = () => {
      // Outer ring smooth lerping (lag)
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15

      if (ringRef.current) {
        // Expand ring on hover, compress on click
        const size = hovered.current ? 48 : clicking.current ? 18 : 28
        const half = size / 2
        ringRef.current.style.width  = `${size}px`
        ringRef.current.style.height = `${size}px`
        ringRef.current.style.transform = `translate(${ringPos.current.x - half}px, ${ringPos.current.y - half}px)`
      }

      if (dotRef.current) {
        // Inner dot follows coordinate exactly (zero lag)
        const size = clicking.current ? 3 : 5
        const half = size / 2
        dotRef.current.style.width = `${size}px`
        dotRef.current.style.height = `${size}px`
        dotRef.current.style.transform = `translate(${pos.current.x - half}px, ${pos.current.y - half}px)`
      }

      raf.current = requestAnimationFrame(loop)
    }

    const setInteractiveState = (isHovered) => {
      hovered.current = isHovered
      if (ringRef.current) {
        ringRef.current.style.borderColor = isHovered ? 'var(--pine-soft)' : 'var(--pine)'
        ringRef.current.style.backgroundColor = isHovered ? 'rgba(60, 74, 63, 0.05)' : 'transparent'
      }
      if (dotRef.current) {
        dotRef.current.style.backgroundColor = isHovered ? 'var(--brass)' : 'var(--pine)'
      }
    }

    const onEnter = () => setInteractiveState(true)
    const onLeave = () => setInteractiveState(false)

    // Event delegation for links, buttons, and custom controls
    const onDocEnter = (event) => {
      const t = event.target
      if (t.closest('a, button, [role="button"], .magnetic')) onEnter()
    }
    const onDocLeave = (event) => {
      const t = event.relatedTarget
      if (!t || !t.closest('a, button, [role="button"], .magnetic')) onLeave()
    }

    document.addEventListener('mouseover',  onDocEnter, { passive: true })
    document.addEventListener('mouseout',   onDocLeave, { passive: true })

    raf.current = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    document.documentElement.addEventListener('mouseleave', onLeaveWindow)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow)
      document.removeEventListener('mouseover',  onDocEnter)
      document.removeEventListener('mouseout',   onDocLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [isMobile, prefersReducedMotion])

  if (isMobile || prefersReducedMotion) return null

  return (
    <>
      {/* Outer ring (smooth follow) */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          borderRadius:  '50%',
          border:        '1px solid var(--pine)',
          background:    'transparent',
          pointerEvents: 'none',
          zIndex:        99999,
          opacity:       0,
          transition:    'border-color 200ms ease, background-color 200ms ease, width 180ms cubic-bezier(0.34,1.56,0.64,1), height 180ms cubic-bezier(0.34,1.56,0.64,1), opacity 200ms ease',
          willChange:    'transform',
        }}
      />
      {/* Inner dot (instant tracking) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         '5px',
          height:        '5px',
          borderRadius:  '50%',
          backgroundColor: 'var(--pine)',
          pointerEvents: 'none',
          zIndex:        99999,
          opacity:       0,
          transition:    'opacity 200ms ease, background-color 200ms ease',
          willChange:    'transform',
        }}
      />
    </>
  )
}
