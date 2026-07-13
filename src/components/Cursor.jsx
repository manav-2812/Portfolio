import { useEffect, useRef, useState } from 'react'

const coarsePointerQuery = '(hover: none), (pointer: coarse)'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf = useRef(null)
  const hovered = useRef(false)
  const clicking = useRef(false)
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

  /* Cursor position stays in refs so hovering links never re-renders the app. */
  useEffect(() => {
    if (isMobile) return

    const onMove = (event) => {
      pos.current = { x: event.clientX, y: event.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${event.clientX - 4}px, ${event.clientY - 4}px)`
      }
    }

    const onDown = () => { clicking.current = true }
    const onUp = () => { clicking.current = false }

    const loop = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12

      if (ringRef.current) {
        const size = hovered.current ? 56 : clicking.current ? 24 : 36
        const half = size / 2
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
        ringRef.current.style.transform = `translate(${ringPos.current.x - half}px, ${ringPos.current.y - half}px)`
      }

      raf.current = requestAnimationFrame(loop)
    }

    const setInteractiveState = (isHovered) => {
      hovered.current = isHovered
      if (dotRef.current) dotRef.current.style.background = isHovered ? '#a855f7' : '#ffffff'
      if (ringRef.current) ringRef.current.style.borderColor = isHovered ? '#a855f7' : 'rgba(255,255,255,0.5)'
    }

    const onEnter = () => setInteractiveState(true)
    const onLeave = () => setInteractiveState(false)
    const targets = document.querySelectorAll('a, button, [role="button"], .magnetic')

    targets.forEach((element) => {
      element.addEventListener('mouseenter', onEnter)
      element.addEventListener('mouseleave', onLeave)
    })

    raf.current = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf.current)
      targets.forEach((element) => {
        element.removeEventListener('mouseenter', onEnter)
        element.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#ffffff',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'background 200ms',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.5)',
          pointerEvents: 'none',
          zIndex: 99997,
          transition: 'border-color 200ms, width 200ms, height 200ms',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
    </>
  )
}
