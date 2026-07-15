import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiC, SiSpringboot, SiPython, SiFlask, SiPostgresql, SiMysql,
  SiDocker, SiKubernetes, SiGit, SiGithub, SiPostman, SiHibernate,
  SiApachemaven,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa6'
import { VscServer } from 'react-icons/vsc'
import { TbBrandCpp } from 'react-icons/tb'

const categories = [
  {
    label: 'Languages',
    skills: [
      { name: 'Java', Icon: FaJava, color: '#b07219' },
      { name: 'Python', Icon: SiPython, color: '#3776ab' },
      { name: 'C++', Icon: TbBrandCpp, color: '#659ad2' },
      { name: 'C', Icon: SiC, color: '#a8b9cc' },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Spring Boot', Icon: SiSpringboot, color: '#6aad3d' },
      { name: 'Spring', Icon: SiSpringboot, color: '#6aad3d' },
      { name: 'Flask', Icon: SiFlask, color: 'var(--ink-soft)' },
      { name: 'Hibernate', Icon: SiHibernate, color: '#59666c' },
    ],
  },
  {
    label: 'Database',
    skills: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169a1' },
      { name: 'MySQL', Icon: SiMysql, color: '#4479a1' },
    ],
  },
  {
    label: 'DevOps',
    skills: [
      { name: 'Docker', Icon: SiDocker, color: '#2496ed' },
      { name: 'Kubernetes', Icon: SiKubernetes, color: '#326ce5' },
      { name: 'Maven', Icon: SiApachemaven, color: '#c71a36' },
      { name: 'Railway', Icon: VscServer, color: '#7c5cff' },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Git', Icon: SiGit, color: '#f05032' },
      { name: 'GitHub', Icon: SiGithub, color: 'var(--ink-soft)' },
      { name: 'Postman', Icon: SiPostman, color: '#ff6c37' },
    ],
  },
]

const totalSkills = categories.reduce((count, category) => count + category.skills.length, 0)

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
}

const rowReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <div ref={ref} className="skills-section">
      <motion.div
        className="flex items-baseline gap-4 mb-8"
        variants={reveal}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <h3
          id="skills-heading"
          className="font-display font-bold text-2xl flex-shrink-0"
          style={{ color: 'var(--ink)' }}
        >
          Skills
        </h3>
        <motion.div
          className="flex-1 self-center h-px origin-left"
          style={{ background: 'var(--hairline)' }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
        <span
          className="font-mono flex-shrink-0"
          style={{ fontSize: '0.65rem', color: 'var(--ink-faint)', letterSpacing: '0.04em' }}
          aria-label={`${totalSkills} technologies across ${categories.length} categories`}
        >
          {totalSkills} technologies · {categories.length} categories
        </span>
      </motion.div>

      <motion.div
        className="skills-index card"
        role="region"
        aria-labelledby="skills-heading"
        variants={reveal}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ delay: 0.1 }}
      >
        <div role="list" aria-label="Technical skills">
          {categories.map((category, index) => (
            <motion.div
              key={category.label}
              className="skills-row"
              role="listitem"
              custom={index}
              variants={rowReveal}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <p className="skills-row-label">{category.label}</p>
              <div className="skills-tags">
                {category.skills.map(({ name, Icon, color }) => (
                  <span key={name} className="skill-item">
                    <Icon size={15} style={{ color }} aria-hidden="true" />
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
