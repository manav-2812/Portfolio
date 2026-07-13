import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import {
  HiOutlineWifi, HiOutlineLockClosed, HiOutlineCreditCard, HiOutlineChartBar,
  HiOutlineDocument, HiOutlineMagnifyingGlass, HiOutlineCpuChip, HiOutlineLink,
  HiArrowUpRight,
} from 'react-icons/hi2'
import { SiGithub } from 'react-icons/si'
import { TbGrillFork, TbBrain } from 'react-icons/tb'

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
    accentColor: '#f59e0b',
    preview: '/project-previews/grabbite_image.jpg',
    previewAlt: 'Abstract food delivery dashboard with menus and live route tracking',
    github: 'https://github.com/manav-2812/Grabbite',
    live: 'https://grabbite.up.railway.app',
    ProjectIcon: TbGrillFork,
    highlights: [
      { Icon: HiOutlineWifi, text: 'Live order tracking via WebSockets' },
      { Icon: HiOutlineLockClosed, text: 'Session-based authentication' },
      { Icon: HiOutlineCreditCard, text: 'Razorpay payment flow' },
      { Icon: HiOutlineChartBar, text: 'Restaurant management dashboard' },
    ],
    architecture: [
      { title: 'HTML • CSS • JavaScript', detail: 'Menu discovery, cart, and order views' },
      { title: 'Flask API', detail: 'Sessions, orders, and business rules' },
      { title: 'PostgreSQL', detail: 'Relational menu, order, and user data' },
      { title: 'Realtime services', detail: 'WebSockets and Razorpay callbacks' },
    ],
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
    accentColor: '#06b6d4',
    preview: '/project-previews/synapse-workspace.png',
    previewAlt: 'Abstract AI document workspace with vector nodes and answer panel',
    github: 'https://github.com/manav-2812/Synapse',
    live: null,
    ProjectIcon: TbBrain,
    highlights: [
      { Icon: HiOutlineDocument, text: 'PDF and document ingestion' },
      { Icon: HiOutlineMagnifyingGlass, text: 'Semantic vector retrieval' },
      { Icon: HiOutlineCpuChip, text: 'Groq LLM answer generation' },
      { Icon: HiOutlineLink, text: 'LangChain orchestration layer' },
    ],
    architecture: [
      { title: 'HTML • CSS • JavaScript', detail: 'Upload, query, and answer interface' },
      { title: 'Flask service', detail: 'Ingestion and query orchestration' },
      { title: 'ChromaDB', detail: 'Embedded chunks and semantic retrieval' },
      { title: 'Groq + LangChain', detail: 'Context assembly and grounded output' },
    ],
  },
]

function HighlightRow({ Icon, text, accent }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      role="listitem"
      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5"
      style={{
        background: hovered ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.028)',
        border: `1px solid ${hovered ? accent + '30' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered
          ? 'inset 0 1px 0 rgba(255,255,255,0.10), 0 2px 12px rgba(0,0,0,0.25)'
          : 'inset 0 1px 0 rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: hovered ? `${accent}18` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hovered ? accent + '35' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: hovered ? `0 0 8px ${accent}20` : 'none',
          transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
        }}
        aria-hidden="true"
      >
        <Icon size={13} style={{ color: hovered ? accent : 'rgba(255,255,255,0.45)', transition: 'color 0.2s' }} />
      </div>
      <span className="text-xs leading-snug" style={{ color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)', transition: 'color 0.2s' }}>
        {text}
      </span>
    </div>
  )
}

function ProjectCard({ project, index, onOpenDetails }) {
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: true, margin: '-80px' })
  const { accentColor, ProjectIcon } = project

  const onMouseMove = (event) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 3.5
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 3.5
    cardRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) translateZ(4px)`
    cardRef.current.style.borderColor = `${accentColor}48`
    cardRef.current.style.boxShadow = `
      inset 0 1px 0 rgba(255,255,255,0.16),
      inset 0 -1px 0 rgba(0,0,0,0.20),
      0 20px 80px rgba(0,0,0,0.55),
      0 4px 20px rgba(0,0,0,0.32),
      0 0 80px ${accentColor}14`
  }

  const onMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)'
    cardRef.current.style.borderColor = 'rgba(255,255,255,0.08)'
    cardRef.current.style.boxShadow = ''
  }

  return (
    <motion.article
      ref={cardRef}
      className="project-card group relative rounded-3xl overflow-hidden flex flex-col"
      style={{
        '--project-accent': accentColor,
        background: 'rgba(255,255,255,0.028)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.18), 0 4px 48px rgba(0,0,0,0.38), 0 1px 8px rgba(0,0,0,0.28), 0 0 0 0.5px rgba(255,255,255,0.06)',
        transition: 'transform 0.1s ease, border-color 0.35s ease, box-shadow 0.35s ease',
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10" style={{ background: `linear-gradient(90deg, transparent 5%, ${accentColor}45 50%, transparent 95%)` }} aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: `radial-gradient(ellipse 80% 55% at 50% 0%, ${accentColor}09 0%, transparent 70%)` }} aria-hidden="true" />
      <div className="card-num" aria-hidden="true">{project.num}</div>

      <div className="p-7 md:p-8 relative z-10 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}30`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.12), 0 0 20px ${accentColor}18` }}
              aria-hidden="true"
            >
              <ProjectIcon size={20} style={{ color: accentColor }} />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[0.63rem] mb-0.5 truncate" style={{ color: accentColor }}>{project.tagline}</p>
              <h3 className="font-display font-bold" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', color: 'var(--text-primary)' }}>{project.title}</h3>
            </div>
          </div>
          <span className="project-card-number font-mono" style={{ color: accentColor }}>{project.num}</span>
        </div>

        <button
          type="button"
          className="project-preview"
          onClick={() => onOpenDetails(project)}
          aria-label={`Open ${project.title} case study`}
        >
          <img src={project.preview} alt={project.previewAlt} loading="lazy" decoding="async" />
          <span className="project-preview-spotlight" aria-hidden="true" />
          <span className="project-preview-caption"><span>Explore case study</span><HiArrowUpRight size={15} /></span>
        </button>

        <p className="leading-relaxed mt-5 mb-5" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{project.description}</p>

        <div className="grid grid-cols-2 gap-2 mb-5" role="list" aria-label={`${project.title} highlights`}>
          {project.highlights.map((highlight) => (
            <HighlightRow key={highlight.text} Icon={highlight.Icon} text={highlight.text} accent={accentColor} />
          ))}
        </div>

        <div className="project-learned mb-5">
          <p className="font-mono text-[0.6rem] mb-1.5 tracking-widest uppercase" style={{ color: accentColor }}>what I learned</p>
          <p className="text-[0.8rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.learned}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6" role="list" aria-label={`${project.title} technologies`}>
          {project.tech.map((technology) => (
            <span key={technology} role="listitem" className="font-mono text-[0.65rem] px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${accentColor}28`, color: accentColor, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}>
              {technology}
            </span>
          ))}
        </div>

        <div className="glow-line mb-5 mt-auto" aria-hidden="true" />
        <div className="flex items-center gap-3 flex-wrap">
          <button type="button" className="project-detail-button" onClick={() => onOpenDetails(project)}>
            Case study <HiArrowUpRight size={14} aria-hidden="true" />
          </button>
          <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub`} className="project-source-button">
            <SiGithub size={14} aria-hidden="true" /> Source
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo`} className="project-live-button">
              Live demo <HiArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function ArchitectureDiagram({ project }) {
  return (
    <div className="project-architecture" role="list" aria-label={`${project.title} architecture`}>
      {project.architecture.map((node, index) => (
        <div className="project-architecture-item" key={node.title}>
          <div className="project-architecture-node" role="listitem">
            <span className="project-architecture-index">0{index + 1}</span>
            <div>
              <p>{node.title}</p>
              <span>{node.detail}</span>
            </div>
          </div>
          {index < project.architecture.length - 1 && <span className="project-architecture-connector" aria-hidden="true" />}
        </div>
      ))}
    </div>
  )
}

function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
        >
          <motion.section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ '--project-accent': project.accentColor }}
          >
            <button type="button" className="project-modal-close" onClick={onClose} aria-label="Close project details" autoFocus>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>

            <div className="project-modal-visual">
              <img src={project.preview} alt={project.previewAlt} />
            </div>

            <div className="project-modal-content">
              <p className="project-modal-kicker">{project.num} / Case study</p>
              <h2 id="project-modal-title">{project.title}</h2>
              <p className="project-modal-tagline">{project.tagline}</p>
              <p className="project-modal-description">{project.description}</p>

              <section className="project-modal-section" aria-labelledby="architecture-heading">
                <div className="project-modal-section-heading">
                  <p id="architecture-heading">Architecture</p>
                  <span>System flow</span>
                </div>
                <ArchitectureDiagram project={project} />
              </section>

              <div className="project-modal-insights">
                <section>
                  <p>Challenge</p>
                  <span>{project.challenge}</span>
                </section>
                <section>
                  <p>Outcome</p>
                  <span>{project.outcome}</span>
                </section>
              </div>

              <div className="project-modal-actions">
                <a href={project.github} target="_blank" rel="noopener noreferrer"><SiGithub size={15} aria-hidden="true" /> View source</a>
                {project.live ? (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-modal-live">Open live demo <HiArrowUpRight size={15} aria-hidden="true" /></a>
                ) : (
                  <span className="project-modal-coming">Live demo in progress</span>
                )}
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container">
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-num" aria-hidden="true">02 / Projects</span>
            <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} aria-hidden="true" />
          </div>
          <h2 id="projects-heading" className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text-primary)' }}>
            Projects I've <span className="gradient-text">built</span>
          </h2>
          <p className="mt-4 max-w-lg" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Product-minded projects with the system choices, practical constraints, and implementation details behind them.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpenDetails={setSelectedProject} />
          ))}
        </div>
      </div>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
