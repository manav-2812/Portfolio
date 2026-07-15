import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  HiOutlineWifi, HiOutlineLockClosed, HiOutlineCreditCard, HiOutlineChartBar,
  HiOutlineDocument, HiOutlineMagnifyingGlass, HiOutlineCpuChip, HiOutlineLink,
} from 'react-icons/hi2'
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
    live: null,
    ProjectIcon: TbBrain,
    highlights: [
      { Icon: HiOutlineDocument, text: 'PDF and document ingestion' },
      { Icon: HiOutlineMagnifyingGlass, text: 'Semantic vector retrieval' },
      { Icon: HiOutlineCpuChip, text: 'Groq LLM answer generation' },
      { Icon: HiOutlineLink, text: 'LangChain orchestration layer' },
    ],
  },
]

function HighlightRow({ Icon, text }) {
  return (
    <div
      role="listitem"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.35rem 0',
        color: 'var(--ink-soft)',
        fontSize: 'var(--text-body)',
      }}
    >
      <Icon size={14} style={{ color: 'var(--pine-soft)', flexShrink: 0 }} aria-hidden="true" />
      <span>{text}</span>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: true, margin: '-80px' })
  const { ProjectIcon } = project

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <article className="card card-hover group relative flex flex-col" style={{ borderRadius: 'var(--radius-card)' }}>
        {/* Top hairline rule */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
          style={{ background: 'var(--hairline-strong)' }}
          aria-hidden="true"
        />

        <div className="p-7 md:p-8 relative z-10 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'var(--paper-deep)',
                border: '1px solid var(--hairline)',
              }}
              aria-hidden="true"
            >
              <ProjectIcon size={20} style={{ color: 'var(--ink-soft)' }} />
            </div>
            <div className="min-w-0">
              <p
                className="font-mono truncate mb-0.5"
                style={{ fontSize: 'var(--text-micro)', color: 'var(--ink-faint)' }}
              >
                {project.tagline}
              </p>
              <h3
                className="font-display font-bold"
                style={{ fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', color: 'var(--ink)' }}
              >
                {project.title}
              </h3>
            </div>
          </div>
          <span
            className="font-mono flex-shrink-0"
            style={{ fontSize: 'var(--text-micro)', color: 'var(--ink-faint)' }}
          >
            {project.num}
          </span>
        </div>

        {/* Preview image */}
        <motion.div
          className="project-preview"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
          transition={{ duration: 0.6, delay: 0.12 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={project.preview} alt={project.previewAlt} loading="lazy" decoding="async" />
        </motion.div>

        {/* Description */}
        <p
          className="leading-relaxed mt-5 mb-5"
          style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}
        >
          {project.description}
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-x-4 mb-5" role="list" aria-label={`${project.title} highlights`}>
          {project.highlights.map((highlight) => (
            <HighlightRow key={highlight.text} Icon={highlight.Icon} text={highlight.text} />
          ))}
        </div>

        {/* What I learned */}
        <div className="project-learned mb-5">
          <p
            className="font-mono mb-1.5 tracking-widest uppercase"
            style={{ fontSize: '0.6rem', color: 'var(--ink-faint)' }}
          >
            what I learned
          </p>
          <p className="leading-relaxed" style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>
            {project.learned}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-6" role="list" aria-label={`${project.title} technologies`}>
          {project.tech.map((technology) => (
            <span
              key={technology}
              role="listitem"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                color: 'var(--ink-faint)',
                border: '1px solid var(--hairline)',
                borderRadius: '999px',
                padding: '0.2rem 0.65rem',
                background: 'transparent',
              }}
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 flex-wrap mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source code on GitHub`}
            className="underline-draw font-mono text-xs"
            style={{ color: 'var(--ink-soft)' }}
          >
            Source ↗
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} live demo`}
              className="underline-draw font-mono text-xs"
              style={{ color: 'var(--ink-soft)' }}
            >
              Live demo ↗
            </a>
          )}
        </div>
        </div>
      </article>
    </motion.div>
  )
}


export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container">
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-num" aria-hidden="true">02 / Projects</span>
            <div className="h-px flex-1" style={{ background: 'var(--hairline)' }} aria-hidden="true" />
          </div>
          <h2
            id="projects-heading"
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'var(--text-h1)', color: 'var(--ink)' }}
          >
            Projects I've <span style={{ color: 'var(--brass)' }}>built</span>
          </h2>
          <p className="mt-4 max-w-lg" style={{ color: 'var(--ink-soft)', fontSize: 'var(--text-body)' }}>
            Product-minded projects with the system choices, practical constraints, and implementation details behind them.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
