import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import {
  HiOutlineWifi, HiOutlineLockClosed, HiOutlineCreditCard, HiOutlineChartBar,
  HiOutlineDocument, HiOutlineMagnifyingGlass, HiOutlineCpuChip, HiOutlineLink,
} from 'react-icons/hi2'
import MagneticButton from './MagneticButton'

const projects = [
  {
    id: 'grabbite',
    num: '01',
    title: 'GrabBite',
    tagline: 'Full-stack food delivery application',
    description:
      'A full-stack food delivery platform with real-time order tracking, secure checkout, and a restaurant control surface.',
    learned:
      'Deepened understanding of WebSocket session management, payment callbacks, and relational data modeling for orders and menus.',
    challenge:
      'Keep checkout, restaurant updates, and a live delivery state coherent without making the ordering experience feel slow or fragile.',
    outcome:
      'A deployable product flow that pairs real-time WebSockets with a Flask API, PostgreSQL persistence, Razorpay payments, and a React client.',
    tech: ['Python', 'Flask', 'PostgreSQL', 'WebSockets', 'Razorpay', 'React', 'Docker'],
    preview: '/project-previews/grabbite_image.jpg',
    previewAlt: 'Abstract food delivery dashboard with menus and live route tracking',
    github: 'https://github.com/manav-2812/Grabbite',
    live: 'https://grabbite.up.railway.app',
    highlights: [
      { Icon: HiOutlineWifi, text: 'Live order tracking via WebSockets' },
      { Icon: HiOutlineLockClosed, text: 'Session-based authentication' },
      { Icon: HiOutlineCreditCard, text: 'Razorpay payment flow' },
      { Icon: HiOutlineChartBar, text: 'Restaurant management dashboard' },
    ],
    architecture: `
                                        User
                                         │
                                         ▼
                            HTML • CSS • JavaScript
                                   (Frontend)
                                         │
                                  HTTP Requests
                                         │
                                         ▼
                                Python Flask API
                                         │
                                         ▼
                                  PostgreSQL Database
    `,
    specifications: [
      {
        title: 'Stateful WebSocket Sessions',
        description: 'Orchestrates live order status and coordinate broadcasts using Flask-SocketIO. Maps user sessions to isolated namespaces for push notification integrity.'
      },
      {
        title: 'HMAC Webhook Verification',
        description: 'Secures transactional boundaries by validating Razorpay webhook callback signatures using SHA256 hashing before processing database records.'
      },
      {
        title: 'Relational Database Schema',
        description: 'Engineered complex PostgreSQL schemas indexing Order Items, Menus, Users, and Order Logs, optimizing query time with indexed join strategies.'
      }
    ]
  },
  {
    id: 'synapse',
    num: '02',
    title: 'Synapse',
    tagline: 'RAG-based document Q&A assistant',
    description:
      'A document intelligence workspace that grounds answers in uploaded material using a retrieval-augmented generation pipeline.',
    learned:
      'Learned how vector search, retrieval context, and clean external LLM integration produce useful, grounded answers.',
    challenge:
      'Turn mixed document uploads into concise answers while preserving context and keeping the retrieval flow understandable to users.',
    outcome:
      'A focused Flask and React experience that combines document ingestion, ChromaDB vector search, LangChain orchestration, and Groq responses.',
    tech: ['Python', 'Flask', 'ChromaDB', 'Groq API', 'LangChain', 'RAG', 'React'],
    preview: '/project-previews/synapse-workspace.png',
    previewAlt: 'Abstract AI document workspace with vector nodes and answer panel',
    github: 'https://github.com/manav-2812/Synapse',
    live: '#',
    highlights: [
      { Icon: HiOutlineDocument, text: 'PDF and document ingestion' },
      { Icon: HiOutlineMagnifyingGlass, text: 'Semantic vector retrieval' },
      { Icon: HiOutlineCpuChip, text: 'Groq LLM answer generation' },
      { Icon: HiOutlineLink, text: 'LangChain orchestration layer' },
    ],
    architecture: `
                                        User
                                         │
                                         ▼
                            HTML • CSS • JavaScript
                                   (Frontend)
                                         │
                                  HTTP Requests
                                         │
                                         ▼
                                Python FastAPI API
                                         │
                              ┌──────────┴──────────┐
                              ▼                     ▼
                          PostgreSQL          Vector Database
                                         (Embeddings)
                              └──────────┬──────────┘
                                         ▼
                                   AI / LLM Model
                                         │
                                         ▼
                                   Intelligent Response
    `,
    specifications: [
      {
        title: 'Recursive Character Chunking',
        description: 'Implements PyPDF ingestion combined with LangChain character splitting. Controls token budgets using custom chunk size overlap mappings.'
      },
      {
        title: 'Vector Space Indexing',
        description: 'Transforms text chunks into semantic vector spaces using sentence transformers, caching embeddings in ChromaDB for low latency matches.'
      },
      {
        title: 'Contextual Grounding Prompting',
        description: 'Pipes context-matching blocks into Groq API. Leverages custom system prompts and parameter controls to avoid LLM hallucinations.'
      }
    ]
  },
]

// Spring transition configs for elite micro-interaction glide
const springConfig = { stiffness: 90, damping: 22 }

/* ─── Project Card (3D Tilt & Parallax Elements) ─── */
function ProjectCard({ project, index, onClick }) {
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: true, margin: '-80px' })

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  // Spring values for premium organic tilt
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), springConfig)
  const scale = useSpring(1, springConfig)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    x.set(mouseX / width)
    y.set(mouseY / height)
    scale.set(1.025) // Smooth liftoff effect

    card.style.setProperty('--project-mouse-x', `${mouseX}px`)
    card.style.setProperty('--project-mouse-y', `${mouseY}px`)
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
    scale.set(1) // Smooth landing
  }

  return (
    <div className="perspective-container h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-label={`View details for project ${project.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        }}
        className="group relative cursor-pointer h-full"
      >
        <motion.article
          layoutId={`bg-${project.id}`}
          className="card card-hover preserve-3d group relative flex flex-col h-full"
          style={{
            borderRadius: '12px',
            background: 'rgba(246, 244, 239, 0.65)',
            borderColor: 'var(--hairline)',
            padding: '2rem',
          }}
        >
          {/* Card Border Spotlight Layer */}
          <div className="project-card-spotlight" aria-hidden="true" />

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-5 relative z-10" style={{ transform: 'translateZ(25px)' }}>
            <div className="min-w-0">
              <p className="font-mono truncate mb-0.5" style={{ fontSize: 'var(--text-micro)', color: 'var(--ink-faint)' }}>
                {project.tagline}
              </p>
              <motion.h3
                layoutId={`title-${project.id}`}
                className="font-display font-bold leading-snug"
                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', color: 'var(--ink)' }}
              >
                {project.title}
              </motion.h3>
            </div>
            <span className="font-mono text-xs text-ink-faint flex-shrink-0">
              {project.num}
            </span>
          </div>

          {/* Image */}
          <motion.div
            layoutId={`image-${project.id}`}
            className="project-preview rounded-lg overflow-hidden border border-hairline mb-5 relative"
            style={{ transform: 'translateZ(15px)' }}
          >
            <img
              src={project.preview}
              alt={project.previewAlt}
              loading="lazy"
              className="w-full object-cover aspect-video transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>

          {/* Description snippet */}
          <p
            className="leading-relaxed mb-6 text-sm text-ink-soft"
            style={{ transform: 'translateZ(10px)' }}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-6 mt-auto" style={{ transform: 'translateZ(5px)' }}>
            {project.tech.map((technology) => (
              <span key={technology} className="tech-tag-premium">
                {technology}
              </span>
            ))}
          </div>

          {/* Bottom links and details trigger */}
          <div 
            className="flex items-center justify-between mt-4 pt-4 border-t border-hairline relative z-10" 
            style={{ transform: 'translateZ(25px)', borderColor: 'var(--hairline)' }}
          >
            {/* Case Study Trigger Button - Styled as a Pill */}
            <MagneticButton strength={4}>
              <button
                onClick={onClick}
                className="btn-ghost text-[9px] uppercase tracking-widest px-3.5 py-1.5 rounded-full flex items-center gap-1 font-bold text-pine cursor-pointer"
                style={{
                  borderColor: 'var(--hairline-strong)',
                  background: 'transparent',
                }}
                aria-label={`Open case study for ${project.title}`}
              >
                Case Study ↗
              </button>
            </MagneticButton>

            {/* Action buttons (Code, Demo) - Pill shaped with icons */}
            <div className="flex items-center gap-2">
              <MagneticButton strength={4}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="btn-primary text-[9px] uppercase tracking-widest px-3.5 py-1.5 rounded-full flex items-center gap-1 font-bold"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  Code
                </a>
              </MagneticButton>
              {project.live && (
                <MagneticButton strength={4}>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn-ghost text-[9px] uppercase tracking-widest px-3.5 py-1.5 rounded-full flex items-center gap-1 font-bold"
                    style={{
                      borderColor: 'var(--hairline-strong)',
                      background: 'transparent',
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    Demo
                  </a>
                </MagneticButton>
              )}
            </div>
          </div>

        </motion.article>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null)
  const closeBtnRef = useRef(null)
  const lastActiveElement = useRef(null)
  const modalRef = useRef(null)

  // Scroll lock when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeProject])

  // Focus management, tab trap, escape close, and background inert isolation
  useEffect(() => {
    if (!activeProject) {
      if (lastActiveElement.current) {
        lastActiveElement.current.focus()
        lastActiveElement.current = null
      }
      return
    }

    lastActiveElement.current = document.activeElement

    // 1. Move focus to close button
    const timer = setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus()
      }
    }, 50)

    // 2. Set background container inert
    const rootEl = document.getElementById('root')
    if (rootEl) {
      rootEl.setAttribute('inert', '')
      rootEl.setAttribute('aria-hidden', 'true')
    }

    // 3. Tab focus trap handler & Escape key handler
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveProject(null)
        e.preventDefault()
        return
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return
        const focusableElementsString = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        const focusableElements = Array.from(modalRef.current.querySelectorAll(focusableElementsString))
        if (focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        // Force focus back into the modal if it ever escapes
        if (!modalRef.current.contains(document.activeElement)) {
          if (e.shiftKey) {
            lastElement.focus()
          } else {
            firstElement.focus()
          }
          e.preventDefault()
          return
        }

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(timer)
      if (rootEl) {
        rootEl.removeAttribute('inert')
        rootEl.removeAttribute('aria-hidden')
      }
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeProject])

  // Staggered layout child components for the modal text entry cascade
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.15,
      }
    }
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] // Custom easeOutExpo
      }
    }
  }

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            id="projects-heading"
            className="font-body font-black uppercase tracking-tighter leading-none select-none"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
          >
            <span className="block" style={{ color: 'var(--pine)' }}>Recent</span>
            <span 
              className="block" 
              style={{ 
                color: 'transparent',
                WebkitTextStroke: '2px var(--ink)',
                opacity: 0.15,
                marginTop: '-0.2rem'
              }}
            >
              Projects
            </span>
          </h2>
        </motion.div>

        {/* Project Card Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Shared Layout Morphing Detailed Modal (Rendered in Portal) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeProject && (
            <motion.div
              ref={modalRef}
              className="modal-backdrop"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onClick={(e) => {
                if (e.target === e.currentTarget) setActiveProject(null)
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                className="relative w-full max-w-5xl max-h-[88vh] flex flex-col m-4 sm:m-6 rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                
                {/* Card Container - Spacious Padding and data-lenis-prevent */}
                <motion.div
                  layoutId={`bg-${activeProject.id}`}
                  className="bg-paper border border-hairline w-full h-full overflow-y-auto rounded-xl shadow-2xl"
                  data-lenis-prevent
                  style={{
                    background: 'rgba(250, 248, 244, 0.98)',
                    borderColor: 'var(--hairline-strong)',
                    isolation: 'isolate',
                    transform: 'translateZ(0)',
                  }}
                >
                  <div className="px-5 sm:px-8 md:px-12 pb-5 sm:pb-8 md:pb-12 relative" style={{ paddingTop: '2rem' }}>
                    
                    {/* Header Metadata with Direct Top Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10 pb-6 border-b border-hairline" style={{ borderColor: 'var(--hairline-strong)' }}>
                      <div>
                        <div className="flex items-center gap-3 mb-2.5">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-pine font-medium">
                            {activeProject.tagline}
                          </span>
                        </div>
                        <motion.h3
                          id="modal-title"
                          layoutId={`title-${activeProject.id}`}
                          className="font-display font-bold leading-tight"
                          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--ink)' }}
                        >
                          {activeProject.title}
                        </motion.h3>
                      </div>

                      {/* Header controls: links & close button inline */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <MagneticButton strength={4}>
                          <a
                            href={activeProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-[10px] uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-1.5 font-bold"
                            style={{ fontSize: '9px' }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                            Code
                          </a>
                        </MagneticButton>
                        {activeProject.live && (
                          <MagneticButton strength={4}>
                            <a
                              href={activeProject.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-ghost text-[10px] uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-1.5 font-bold"
                              style={{ fontSize: '9px', background: 'transparent', borderColor: 'var(--hairline-strong)' }}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                              </svg>
                              Demo
                            </a>
                          </MagneticButton>
                        )}

                        {/* Inline Close Button - Styled as a matching pill */}
                        <MagneticButton strength={4}>
                          <button
                            ref={closeBtnRef}
                            onClick={() => setActiveProject(null)}
                            className="btn-ghost text-[10px] uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-1.5 font-bold cursor-pointer flex-shrink-0"
                            style={{ fontSize: '9px', background: 'transparent', borderColor: 'var(--hairline-strong)' }}
                            aria-label="Close project details"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            Close
                          </button>
                        </MagneticButton>
                      </div>
                    </div>

                    {/* Main Preview Image with technology badge overlay */}
                    <motion.div
                      layoutId={`image-${activeProject.id}`}
                      className="relative w-full rounded-xl overflow-hidden mb-12 border border-hairline shadow-lg"
                      style={{ borderColor: 'var(--hairline-strong)' }}
                    >
                      <img
                        src={activeProject.preview}
                        alt={activeProject.previewAlt}
                        loading="lazy"
                        className="w-full object-cover max-h-[380px]"
                      />
                    </motion.div>

                    {/* Grid Case Study Content - Increased gap and staggered fade-ups */}
                    <motion.div 
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="grid md:grid-cols-5 gap-8 md:gap-14"
                    >
                      {/* Left Column (Summary, Architecture, Challenges, Solutions) */}
                      <div className="md:col-span-3 flex flex-col gap-10">
                        <motion.div variants={staggerItem}>
                          <div className="flex items-center gap-2 mb-3.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-pine" />
                            <h4 className="font-mono text-[9px] uppercase tracking-widest text-ink-faint font-bold">
                              Project Summary
                            </h4>
                          </div>
                          <p className="text-[15px] leading-relaxed text-ink-soft">
                            {activeProject.description}
                          </p>
                        </motion.div>

                        {/* System Architecture Diagram */}
                        <motion.div variants={staggerItem} className="border-t border-hairline pt-8 mt-2" style={{ borderColor: 'var(--hairline)' }}>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="h-1.5 w-1.5 rounded-full bg-pine" />
                            <h4 className="font-mono text-[9px] uppercase tracking-widest text-ink-faint font-bold">
                              System Architecture
                            </h4>
                          </div>
                          <pre 
                            className="font-mono text-[10px] leading-relaxed overflow-x-auto no-scrollbar"
                            style={{ 
                              color: 'var(--ink)', 
                              whiteSpace: 'pre', 
                              fontFamily: 'var(--font-mono)' 
                            }}
                          >
                            {activeProject.architecture}
                          </pre>
                        </motion.div>

                        <motion.div variants={staggerItem} className="border-t border-hairline pt-8 mt-2" style={{ borderColor: 'var(--hairline)' }}>
                          <div className="flex items-center gap-2 mb-3.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-pine" />
                            <h4 className="font-mono text-[9px] uppercase tracking-widest text-ink-faint font-bold">
                              Challenges &amp; Constraints
                            </h4>
                          </div>
                          <p className="text-[15px] leading-relaxed text-ink-soft">
                            {activeProject.challenge}
                          </p>
                        </motion.div>

                        <motion.div variants={staggerItem} className="border-t border-hairline pt-8 mt-2" style={{ borderColor: 'var(--hairline)' }}>
                          <div className="flex items-center gap-2 mb-3.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-pine" />
                            <h4 className="font-mono text-[9px] uppercase tracking-widest text-ink-faint font-bold">
                              Core Outcome &amp; Solutions
                            </h4>
                          </div>
                          <p className="text-[15px] leading-relaxed text-ink-soft">
                            {activeProject.outcome}
                          </p>
                        </motion.div>
                      </div>

                      {/* Right Column (Learnings, Specs, Stack, Links) */}
                      <div className="md:col-span-2 flex flex-col gap-10">
                        <motion.div variants={staggerItem}>
                          <div className="flex items-center gap-2 mb-3.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-pine" />
                            <h4 className="font-mono text-[9px] uppercase tracking-widest text-ink-faint font-bold">
                              What I Learned
                            </h4>
                          </div>
                          <p className="leading-relaxed text-[15px] text-ink-soft">
                            {activeProject.learned}
                          </p>
                        </motion.div>

                        {/* Technical Specifications - Standard typography list (No boxes around items) */}
                        <motion.div variants={staggerItem} className="border-t border-hairline pt-8 mt-2" style={{ borderColor: 'var(--hairline)' }}>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="h-1.5 w-1.5 rounded-full bg-pine" />
                            <h4 className="font-mono text-[9px] uppercase tracking-widest text-ink-faint font-bold">
                              Technical Specifications
                            </h4>
                          </div>
                          <ul className="flex flex-col gap-6 pl-0 list-none">
                            {activeProject.specifications.map((spec, specIdx) => (
                              <li key={specIdx} className="text-sm text-ink-soft">
                                <div className="flex items-baseline gap-2 mb-1">
                                  <span className="h-1.5 w-1.5 bg-pine-soft rounded-sm flex-shrink-0" />
                                  <strong className="font-mono text-[11px] text-pine uppercase tracking-wider block">
                                    {spec.title}
                                  </strong>
                                </div>
                                <p className="pl-3.5 leading-relaxed text-sm text-ink-soft">
                                  {spec.description}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </motion.div>

                        <motion.div variants={staggerItem} className="border-t border-hairline pt-8 mt-2" style={{ borderColor: 'var(--hairline)' }}>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="h-1.5 w-1.5 rounded-full bg-pine" />
                            <h4 className="font-mono text-[9px] uppercase tracking-widest text-ink-faint font-bold">
                              Key Highlights
                            </h4>
                          </div>
                          <div className="flex flex-col gap-3.5">
                            {activeProject.highlights.map((highlight, index) => (
                              <div key={index} className="flex items-center gap-2.5 text-sm text-ink-soft">
                                <highlight.Icon size={14} style={{ color: 'var(--pine-soft)', flexShrink: 0 }} />
                                <span>{highlight.text}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div variants={staggerItem} className="border-t border-hairline pt-8 mt-2" style={{ borderColor: 'var(--hairline)' }}>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="h-1.5 w-1.5 rounded-full bg-pine" />
                            <h4 className="font-mono text-[9px] uppercase tracking-widest text-ink-faint font-bold">
                              Project Stack
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {activeProject.tech.map((t) => (
                              <span key={t} className="tech-tag-premium">
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>

                        {/* Modal Action Links at Bottom - Styled as premium pill buttons matching top */}
                        <motion.div variants={staggerItem} className="border-t border-hairline pt-8 mt-auto flex items-center gap-3" style={{ borderColor: 'var(--hairline)' }}>
                          <a
                            href={activeProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-[9px] uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-1.5 font-bold"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                            Code
                          </a>
                          {activeProject.live && (
                            <a
                              href={activeProject.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-ghost text-[9px] uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-1.5 font-bold"
                              style={{ background: 'transparent', borderColor: 'var(--hairline-strong)' }}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                              </svg>
                              Demo
                            </a>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>

                  </div>
                </motion.div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
