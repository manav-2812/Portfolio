import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

/* ── Glass Sphere ─────────────────────────────────────────────────────── */
function GlassSphere({ mouse }) {
  const meshRef  = useRef()
  const groupRef = useRef()
  const targetRot = useRef({ x: 0, y: 0 })
  const currentRot = useRef({ x: 0, y: 0 })

  useFrame(({ clock }) => {
    if (!meshRef.current || !groupRef.current) return
    const t = clock.getElapsedTime()

    // Slow idle spin
    meshRef.current.rotation.y = t * 0.08
    meshRef.current.rotation.z = t * 0.04

    // Mouse-reactive group tilt (replaces CameraRig — same parallax, no matrix cost)
    targetRot.current.x = mouse.current.y * 0.3
    targetRot.current.y = mouse.current.x * 0.3
    currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.04
    currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.04

    groupRef.current.rotation.x = currentRot.current.x
    groupRef.current.rotation.y = currentRot.current.y
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.8}>
        <mesh ref={meshRef} scale={[2.2, 2.2, 2.2]}>
          <icosahedronGeometry args={[1, 4]} />
          {/*
            Performance notes vs. original:
            • samples: 4 → 1  (biggest single win — halves render-target cost)
            • resolution: 256 → 128  (quarter the texture fill)
            • backside: removed (adds a second render pass, invisible at this scale)
            Visual delta: imperceptible at 2.2× scale with a dark background.
          */}
          <MeshTransmissionMaterial
            samples={1}
            resolution={128}
            transmission={0.96}
            roughness={0.08}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.5}
            distortionScale={0.4}
            temporalDistortion={0.1}
            color="#7c3aed"
            attenuationColor="#a78bfa"
            attenuationDistance={0.5}
          />
        </mesh>
      </Float>
    </group>
  )
}

/* ── Animated Rings ───────────────────────────────────────────────────── */
function InnerRing() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * 0.35
    ref.current.rotation.z = t * 0.18
  })
  return (
    <mesh ref={ref} scale={[3.8, 3.8, 3.8]}>
      <torusGeometry args={[1, 0.004, 12, 180]} />
      <meshBasicMaterial color="#a78bfa" transparent opacity={0.25} />
    </mesh>
  )
}

function OuterRing() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.10
    ref.current.rotation.x = t * 0.05
  })
  return (
    <mesh ref={ref} scale={[5.5, 5.5, 5.5]}>
      <torusGeometry args={[1, 0.003, 8, 220]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.12} />
    </mesh>
  )
}

/* ── Neural Network Particles ─────────────────────────────────────────── */
function NeuralParticles({ count = 80 }) {
  const pointsRef = useRef()
  const linesRef  = useRef()

  const { positions, linePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const radius = 5.5

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = radius * (0.6 + Math.random() * 0.4)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }

    // Build edges between close nodes — capped to keep line count predictable
    const edges = []
    const thresh = 2.2
    const MAX_EDGES = 120
    outer: for (let a = 0; a < count; a++) {
      for (let b = a + 1; b < count; b++) {
        if (edges.length / 6 >= MAX_EDGES) break outer
        const dx = pos[a*3]   - pos[b*3]
        const dy = pos[a*3+1] - pos[b*3+1]
        const dz = pos[a*3+2] - pos[b*3+2]
        if (Math.sqrt(dx*dx + dy*dy + dz*dz) < thresh) {
          edges.push(pos[a*3], pos[a*3+1], pos[a*3+2])
          edges.push(pos[b*3], pos[b*3+1], pos[b*3+2])
        }
      }
    }

    return { positions: pos, linePositions: new Float32Array(edges) }
  }, [count])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.0012        // ~3° in 30 s
      pointsRef.current.rotation.x = Math.sin(t * 0.0009) * 0.004 // barely visible
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.0012
      linesRef.current.rotation.x = Math.sin(t * 0.0009) * 0.004
    }
  })

  return (
    <>
      {/* Node dots */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#a78bfa"
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Edge lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6d28d9"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </lineSegments>
    </>
  )
}

/* ── Ambient Particle Cloud ───────────────────────────────────────────── */
function AmbientParticles({ count = 400 }) {
  const ref = useRef()

  const [positions, colors] = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const col  = new Float32Array(count * 3)
    const c1   = new THREE.Color('#a78bfa')
    const c2   = new THREE.Color('#22d3ee')
    const c3   = new THREE.Color('#ffffff')

    for (let i = 0; i < count; i++) {
      const r     = 7 + Math.random() * 7
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i*3+2] = r * Math.cos(phi)

      const mix = Math.random()
      const base = mix < 0.5 ? c1.clone() : c2.clone()
      const c = base.lerp(c3, Math.random() * 0.25)
      col[i*3]   = c.r
      col[i*3+1] = c.g
      col[i*3+2] = c.b
    }
    return [pos, col]
  }, [count])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.0008  // ~1.4° in 30 s
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.0006) * 0.002
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ── Scene Root ───────────────────────────────────────────────────────── */
function Scene({ mouse, isMobile }) {
  const particleCount = isMobile ? 150 : 400
  const nodeCount     = isMobile ? 40  : 80
  const starCount     = isMobile ? 80  : 300

  return (
    <>
      <ambientLight intensity={0.15} />
      {/* Kept the two key lights that actually shape the glass material.
          Removed spotLight — added shadow-map overhead with no visible payoff
          since MeshTransmissionMaterial doesn't receive shadows. */}
      <pointLight position={[8, 8, 8]}   intensity={4}   color="#7c3aed" />
      <pointLight position={[-8, -6, 6]} intensity={2.5} color="#22d3ee" />

      <GlassSphere mouse={mouse} />
      <InnerRing />
      <OuterRing />
      <NeuralParticles count={nodeCount} />
      <AmbientParticles count={particleCount} />
      <Sparkles count={isMobile ? 15 : 50} scale={[14,14,14]} size={1.5} speed={0.25} opacity={0.45} color="#a78bfa" />
      <Stars radius={90} depth={50} count={starCount} factor={2} fade speed={0.25} />
    </>
  )
}

/* ── Exported Canvas ──────────────────────────────────────────────────── */
export default function Scene3D({ active = true }) {
  const mouse = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const viewportQuery = window.matchMedia('(max-width: 768px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncViewport = (e) => setIsMobile(e.matches)
    const syncMotion = (e) => setReducedMotion(e.matches)

    setIsMobile(viewportQuery.matches)
    setReducedMotion(motionQuery.matches)
    viewportQuery.addEventListener('change', syncViewport)
    motionQuery.addEventListener('change', syncMotion)

    const onMove = e => {
      mouse.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      viewportQuery.removeEventListener('change', syncViewport)
      motionQuery.removeEventListener('change', syncMotion)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  const isLowPower = isMobile || reducedMotion

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 46 }}
      frameloop={active && !reducedMotion ? 'always' : 'demand'}
      gl={{ antialias: !isLowPower, alpha: true, powerPreference: 'high-performance' }}
      dpr={isLowPower ? [1, 1] : [1, 1.5]}
      performance={{ min: 0.5 }}
      style={{ background: 'transparent' }}
    >
      <Scene mouse={mouse} isMobile={isLowPower} />
    </Canvas>
  )
}
