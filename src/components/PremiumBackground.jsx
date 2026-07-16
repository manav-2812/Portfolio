import { useEffect, useRef, useState } from 'react'

export default function PremiumBackground() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Detect reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches)
    motionQuery.addEventListener('change', handleMotionChange)
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Handle resizing
    const handleResize = () => {
      if (!canvas) return
      width = (canvas.width = window.innerWidth)
      height = (canvas.height = window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Particles Setup
    const particles = []
    const particleCount = window.innerWidth < 768 ? 22 : 55
    const connectionDistance = 115
    const mouseConnectionDistance = 165

    const mouse = { x: null, y: null }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    // Initialize particles with randomized coordinates and velocity
    // Made radius slightly larger (1.2px - 2.7px) for better visual clarity
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1.2,
      })
    }

    // Animation loop (hardware accelerated requestAnimationFrame)
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw and update particles (Made brighter pine color: opacity 0.28)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        // Boundaries checks
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(60, 74, 63, 0.28)' 
        ctx.fill()
      })

      // Draw connection lines between nearby particles (Brighter lines: alpha scaled to 0.18)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.18
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(60, 74, 63, ${alpha})`
            ctx.lineWidth = 0.85
            ctx.stroke()
          }
        }

        // Draw connections from particles to cursor (Brighter brass links: alpha scaled to 0.28)
        if (mouse.x !== null && mouse.y !== null) {
          const p = particles[i]
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseConnectionDistance) {
            const alpha = (1 - dist / mouseConnectionDistance) * 0.28
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(174, 139, 87, ${alpha})` 
            ctx.lineWidth = 1.1
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReducedMotion])

  return (
    <div
      ref={containerRef}
      className="premium-bg-container"
      aria-hidden="true"
    >
      {/* 1. Dynamic Ambient Blobs */}
      {!prefersReducedMotion && (
        <>
          <div className="ambient-blob blob-brass" />
          <div className="ambient-blob blob-pine" />
          <div className="ambient-blob blob-terracotta" />
        </>
      )}

      {/* 2. Interactive Constellation Canvas Layer */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* 3. Structural Dot Grid */}
      <div className="dot-grid-layer" />
    </div>
  )
}
