import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import {
  SiSpringboot, SiPython, SiFlask,
  SiPostgresql, SiMysql, SiDocker,
  SiKubernetes, SiGit, SiGithub,
  SiLinux, SiPostman, SiHibernate,
  SiApachemaven, SiRedis,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa6'
import { VscServer } from 'react-icons/vsc'
import { TbBrandCpp } from 'react-icons/tb'

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
const categories = [
  {
    id: 'lang',
    label: 'Languages',
    skills: [
      { name: 'Java',   Icon: FaJava,     color: '#f59e0b', tip: 'Primary backend language' },
      { name: 'Python', Icon: SiPython,   color: '#3b82f6', tip: 'Scripting & Flask APIs'   },
      { name: 'C++',    Icon: TbBrandCpp, color: '#7dd3fc', tip: 'Systems & algorithms'     },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Spring Boot', Icon: SiSpringboot, color: '#22c55e', tip: 'REST APIs · MVC · Security' },
      { name: 'Spring',      Icon: SiSpringboot, color: '#6aad3d', tip: 'IoC · DI · AOP'             },
      { name: 'Flask',       Icon: SiFlask,      color: '#a5b4fc', tip: 'Lightweight Python APIs'    },
      { name: 'Hibernate',   Icon: SiHibernate,  color: '#e8873a', tip: 'ORM & persistence layer'   },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    skills: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#06b6d4', tip: 'Advanced SQL · JSONB' },
      { name: 'MySQL',      Icon: SiMysql,      color: '#f59e0b', tip: 'Relational DB design' },
      { name: 'Redis',      Icon: SiRedis,      color: '#ef4444', tip: 'Caching & sessions'   },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    skills: [
      { name: 'Docker',     Icon: SiDocker,      color: '#0ea5e9', tip: 'Containerization & Compose' },
      { name: 'Kubernetes', Icon: SiKubernetes,  color: '#3b82f6', tip: 'Orchestration & scaling'   },
      { name: 'Maven',      Icon: SiApachemaven, color: '#ef4444', tip: 'Build & dependency mgmt'   },
      { name: 'Railway',    Icon: VscServer,     color: '#a855f7', tip: 'Cloud deployment'           },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    skills: [
      { name: 'Git',     Icon: SiGit,     color: '#f97316', tip: 'Version control & branching' },
      { name: 'GitHub',  Icon: SiGithub,  color: '#e2e8f0', tip: 'Collaboration & CI'         },
      { name: 'Postman', Icon: SiPostman, color: '#f97316', tip: 'API testing & docs'          },
      { name: 'Linux',   Icon: SiLinux,   color: '#f59e0b', tip: 'Server environments'         },
    ],
  },
]

const totalSkills = categories.reduce((n, c) => n + c.skills.length, 0)

/* ─────────────────────────────────────────────────────────────────────────────
   TOOLTIP
───────────────────────────────────────────────────────────────────────────── */
function Tooltip({ text, color, visible }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 5 }}
      transition={{ duration: 0.12 }}
      style={{ pointerEvents: 'none', zIndex: 60 }}
      className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
      aria-hidden="true"
    >
      <div
        className="px-2.5 py-1 rounded-lg font-mono text-[0.58rem] leading-none relative"
        style={{
          background: 'rgba(5,5,12,0.96)',
          border: `1px solid ${color}28`,
          color,
          boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 8px ${color}14`,
          backdropFilter: 'blur(16px)',
        }}
      >
        {text}
        <span
          className="absolute left-1/2 -translate-x-1/2 -bottom-[5px] w-2.5 h-2.5 rotate-45"
          style={{
            background: 'rgba(5,5,12,0.96)',
            borderRight: `1px solid ${color}28`,
            borderBottom: `1px solid ${color}28`,
          }}
        />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SKILL TILE
   Barely-there at rest. Brand color blooms on hover only.
───────────────────────────────────────────────────────────────────────────── */
const tileAnim = {
  hidden:  { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.038, ease: [0.22, 1, 0.36, 1] },
  }),
}

function SkillTile({ skill, index, animate }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 300, damping: 24, mass: 0.3 })
  const y = useSpring(rawY, { stiffness: 300, damping: 24, mass: 0.3 })

  const onMove = useCallback((e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - r.left - r.width  / 2) * 0.14)
    rawY.set((e.clientY - r.top  - r.height / 2) * 0.14)
  }, [rawX, rawY])

  const onLeave = useCallback(() => {
    rawX.set(0); rawY.set(0)
    setHovered(false)
  }, [rawX, rawY])

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={tileAnim}
      initial="hidden"
      animate={animate}
      style={{ x, y, position: 'relative' }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      role="listitem"
      aria-label={skill.name}
    >
      <Tooltip text={skill.tip} color={skill.color} visible={hovered} />

      <motion.div
        className="flex flex-col items-center rounded-2xl select-none"
        style={{
          width: '4.75rem',
          padding: '0.6rem 0.5rem 0.5rem',
          gap: '0.4rem',
          background: hovered
            ? 'rgba(255,255,255,0.06)'
            : 'rgba(255,255,255,0.022)',
          border: `1px solid ${hovered
            ? 'rgba(255,255,255,0.13)'
            : 'rgba(255,255,255,0.048)'}`,
          boxShadow: hovered
            ? `inset 0 1px 0 rgba(255,255,255,0.14),
               0 4px 20px rgba(0,0,0,0.3),
               0 0 14px ${skill.color}14`
            : 'inset 0 1px 0 rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
          cursor: 'default',
        }}
        animate={{ y: hovered ? -3 : 0 }}
        transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Icon container */}
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: hovered ? `${skill.color}14` : 'rgba(255,255,255,0.038)',
            border: `1px solid ${hovered
              ? skill.color + '30'
              : 'rgba(255,255,255,0.055)'}`,
            boxShadow: hovered ? `0 0 10px ${skill.color}20` : 'none',
            transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
          }}
          aria-hidden="true"
        >
          <skill.Icon
            size={15}
            style={{
              color: hovered ? skill.color : 'rgba(255,255,255,0.32)',
              transition: 'color 0.2s',
              flexShrink: 0,
            }}
          />
        </div>

        {/* Label */}
        <span
          style={{
            fontSize: '0.6rem',
            fontWeight: 500,
            textAlign: 'center',
            lineHeight: 1.2,
            color: hovered ? 'var(--text-primary)' : 'var(--text-muted)',
            transition: 'color 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          {skill.name}
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   CATEGORY LABEL — pure typographic divider, no box, no border
───────────────────────────────────────────────────────────────────────────── */
function CategoryLabel({ label, first }) {
  return (
    <div
      style={{
        gridColumn: '1 / -1',
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        paddingTop: first ? 0 : '1.5rem',
        paddingBottom: '0.35rem',
      }}
    >
      {/* Short violet tick — the only accent decoration */}
      <div
        style={{
          width: '2px',
          height: '0.75rem',
          borderRadius: '999px',
          background: 'rgba(167,139,250,0.5)',
          flexShrink: 0,
        }}
        aria-hidden="true"
      />
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.58rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        {label}
      </span>
      {/* Hairline rule to the right */}
      <div
        style={{
          flex: 1,
          height: '1px',
          background: 'rgba(255,255,255,0.048)',
        }}
        aria-hidden="true"
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SKILLS SECTION
───────────────────────────────────────────────────────────────────────────── */
export default function Skills({ inView }) {
  const tilesAnimate = inView ? 'visible' : 'hidden'

  // Build flat grid items: [label, ...tiles, label, ...tiles, …]
  // Each is either { type:'label', … } or { type:'tile', … }
  let globalIndex = 0
  const gridItems = []
  categories.forEach((cat, ci) => {
    gridItems.push({ type: 'label', id: cat.id, label: cat.label, first: ci === 0 })
    cat.skills.forEach((skill) => {
      gridItems.push({ type: 'tile', id: `${cat.id}-${skill.name}`, skill, index: globalIndex++ })
    })
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Section heading */}
      <div className="flex items-baseline gap-4 mb-8">
        <h3
          id="skills-heading"
          className="font-display font-bold text-2xl flex-shrink-0"
          style={{ color: 'var(--text-primary)' }}
        >
          Technical Skills
        </h3>
        <div
          className="flex-1 self-center h-px"
          style={{ background: 'var(--border-subtle)' }}
          aria-hidden="true"
        />
        <span
          className="font-mono flex-shrink-0"
          style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}
          aria-label={`${totalSkills} technologies across ${categories.length} categories`}
        >
          {totalSkills} technologies · {categories.length} categories
        </span>
      </div>

      {/* One unified glass panel */}
      <div
        className="rounded-3xl"
        style={{
          background: 'rgba(255,255,255,0.024)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.078)',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.09),
            inset 0 -1px 0 rgba(0,0,0,0.18),
            0 4px 48px rgba(0,0,0,0.36),
            0 1px 8px rgba(0,0,0,0.22),
            0 0 0 0.5px rgba(255,255,255,0.04)
          `,
        }}
        role="region"
        aria-labelledby="skills-heading"
      >
        {/* Single inset top-edge lit highlight — only on the panel */}
        <div
          style={{
            height: '1px',
            borderRadius: '999px 999px 0 0',
            background: 'linear-gradient(90deg, transparent 5%, rgba(167,139,250,0.38) 50%, transparent 95%)',
          }}
          aria-hidden="true"
        />

        {/*
          Auto-fill grid. Labels receive gridColumn: '1 / -1' so they act as
          full-width row separators. Tiles auto-place into the next available cells.
          Because every grid item (label + tiles) is a direct child, CSS grid handles
          the flow — no empty rows, no height-mismatch gaps.
        */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 4.75rem)',
            gap: '0.45rem',
            padding: '1.5rem 1.75rem 1.75rem',
            alignItems: 'start',
          }}
          role="list"
          aria-label="Technical skills"
        >
          {gridItems.map((item) => {
            if (item.type === 'label') {
              return (
                <CategoryLabel
                  key={item.id}
                  label={item.label}
                  first={item.first}
                />
              )
            }
            return (
              <SkillTile
                key={item.id}
                skill={item.skill}
                index={item.index}
                animate={tilesAnimate}
              />
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
