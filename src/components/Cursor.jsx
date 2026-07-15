import { useEffect, useRef, useState } from 'react'

const coarsePointerQuery = '(hover: none), (pointer: coarse)'

export default function Cursor() {
  const ringRef = useRef(null)
  const pos     = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf     = useRef(null)
  const hovered = useRef(false)
  const clicking = useRef(false)
  // Track whether cursor is visible on screen (entered the viewport)
  const visible = useRef(false)

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(coarsePointerQuery).matches,
  )

  /* Keep native cursor behavior on touch/coarse-pointer devices. */
  useEffect(() => {
    const mediaQuery = window.matchMedia(coarsePointerQuery)
    const onChange = (event) => setIsMobile(event.matches)
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  /* Hide native cursor only on non-mobile; restore on cleanup. */
  useEffect(() => {
    if (isMobile) return
    document.body.style.cursor = 'none'
    return () => {
      document.body.style.cursor = ''
    }
  }, [isMobile])

  /* Cursor position stays in refs so hovering links never re-renders the app. */
  useEffect(() => {
    if (isMobile) return

    const onMove = (event) => {
      pos.current = { x: event.clientX, y: event.clientY }

      // Make cursor visible on first move
      if (!visible.current) {
        visible.current = true
        if (ringRef.current) ringRef.current.style.opacity = '1'
      }
    }

    const onDown = () => { clicking.current = true }
    const onUp   = () => { clicking.current = false }

    // Hide cursor when it leaves the viewport
    const onLeaveWindow = () => {
      if (ringRef.current) ringRef.current.style.opacity = '0'
      visible.current = false
    }
    const onEnterWindow = () => {
      // Opacity restored on first mousemove inside viewport
    }

    const loop = () => {
      // Tightened lerp: 0.12 → 0.15 for snappier ring tracking
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15

      if (ringRef.current) {
        // Size states: hover=expanded, click=contracted, default=ring
        const size = hovered.current ? 54 : clicking.current ? 22 : 34
        const half = size / 2
        ringRef.current.style.width  = `${size}px`
        ringRef.current.style.height = `${size}px`
        ringRef.current.style.transform = `translate(${ringPos.current.x - half}px, ${ringPos.current.y - half}px)`
      }

      raf.current = requestAnimationFrame(loop)
    }

    const setInteractiveState = (isHovered) => {
      hovered.current = isHovered
      if (ringRef.current) {
        ringRef.current.style.borderColor = isHovered
          ? 'var(--pine-soft)'
          : 'var(--pine)'
        ringRef.current.style.backgroundColor = 'transparent'
      }
    }

    const onEnter = () => setInteractiveState(true)
    const onLeave = () => setInteractiveState(false)

    // Use event delegation instead of attaching to every element individually —
    // this catches dynamically rendered elements (modals, tooltips, etc.)
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
    document.documentElement.addEventListener('mouseenter', onEnterWindow)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow)
      document.documentElement.removeEventListener('mouseenter', onEnterWindow)
      document.removeEventListener('mouseover',  onDocEnter)
      document.removeEventListener('mouseout',   onDocLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    /* Outer ring — lags slightly behind (lerp 0.15) */
    <div
      ref={ringRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        borderRadius:  '50%',
        border:        '1.5px solid var(--pine)',
        background:    'transparent',
        pointerEvents: 'none',
        zIndex:        99998,
        opacity:       0,  // hidden until first mouse move
        transition:    'border-color 200ms ease, background-color 200ms ease, width 180ms cubic-bezier(0.34,1.56,0.64,1), height 180ms cubic-bezier(0.34,1.56,0.64,1), opacity 200ms ease',
        willChange:    'transform',
      }}
    />
  )
}
