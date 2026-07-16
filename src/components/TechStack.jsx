import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import useCoarsePointer from '../hooks/useCoarsePointer'
import {
  SiC, SiSpringboot, SiPython, SiFlask, SiPostgresql, SiMysql,
  SiDocker, SiKubernetes, SiGit, SiGithub, SiPostman, SiHibernate,
  SiApachemaven, SiVercel
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa6'
import { VscServer } from 'react-icons/vsc'
import { TbBrandCpp, TbBrandVscode } from 'react-icons/tb'

const allSkills = [
  { name: 'Java', Icon: FaJava, color: '#b07219' },
  { name: 'Python', Icon: SiPython, color: '#3776ab' },
  { name: 'C++', Icon: TbBrandCpp, color: '#659ad2' },
  { name: 'C', Icon: SiC, color: '#a8b9cc' },
  { name: 'Spring Boot', Icon: SiSpringboot, color: '#6aad3d' },
  { name: 'Spring', Icon: SiSpringboot, color: '#6aad3d' },
  { name: 'Flask', Icon: SiFlask, color: 'var(--ink-soft)' },
  { name: 'Hibernate', Icon: SiHibernate, color: '#59666c' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169a1' },
  { name: 'MySQL', Icon: SiMysql, color: '#4479a1' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ed' },
  { name: 'Kubernetes', Icon: SiKubernetes, color: '#326ce5' },
  { name: 'Maven', Icon: SiApachemaven, color: '#c71a36' },
  { name: 'Railway', Icon: VscServer, color: '#7c5cff' },
  { name: 'Git', Icon: SiGit, color: '#f05032' },
  { name: 'GitHub', Icon: SiGithub, color: 'var(--ink-soft)' },
  { name: 'Postman', Icon: SiPostman, color: '#ff6c37' },
  { name: 'VS Code', Icon: TbBrandVscode, color: '#007acc' },
  { name: 'Vercel', Icon: SiVercel, color: 'var(--ink)' },
]

const rows = [
  ['Java', 'Python', 'C++', 'C', 'Spring Boot', 'Spring'],
  ['Flask', 'Hibernate', 'PostgreSQL', 'MySQL', 'Docker'],
  ['Kubernetes', 'Maven', 'Railway', 'Git'],
  ['GitHub', 'Postman', 'VS Code'],
  ['Vercel']
]

const reveal = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.25, 1, 0.5, 1] },
  },
}

const listReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
}

const itemReveal = {
  hidden: { opacity: 0, scale: 0.88, y: 14, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
  },
}

function SkillCard({ name, Icon, color }) {
  const isCoarse = useCoarsePointer()
  const isVar = color.startsWith('var')
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border aspect-square w-[84px] sm:w-[110px] md:w-[120px] flex-shrink-0 group cursor-default"
      style={{ background: 'var(--paper-dim)', borderColor: 'var(--hairline)' }}
      variants={itemReveal}
      onMouseEnter={isCoarse ? undefined : () => setIsHovered(true)}
      onMouseLeave={isCoarse ? undefined : () => setIsHovered(false)}
      whileHover={isCoarse ? undefined : {
        y: -5,
        scale: 1.06,
        borderColor: isVar ? 'rgba(60,74,63,0.3)' : color,
        background: isVar ? 'rgba(60,74,63,0.07)' : `${color}12`,
        boxShadow: isVar ? '0 8px 24px -8px rgba(60,74,63,0.18)' : `0 10px 28px -8px ${color}45`,
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      <motion.div
        className="flex items-center justify-center mb-2"
         whileHover={isCoarse ? undefined : { scale: 1.18 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      >
        <Icon 
          className="text-2xl sm:text-3xl md:text-4xl transition-colors duration-300" 
          style={{ color: (isHovered && !isCoarse) ? color : 'var(--ink-soft)' }} 
          aria-hidden="true" 
        />
      </motion.div>
      <span
        className="font-mono text-[9px] sm:text-xs font-semibold text-center truncate w-full"
        style={{ color: 'var(--ink-soft)' }}
      >
        {name}
      </span>
    </motion.div>
  )
}

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const getSkill = (name) => allSkills.find(s => s.name === name)

  return (
    <section id="tech-stack" className="section" ref={ref} aria-labelledby="skills-heading">
      <div className="container">
        
        {/* Left-Aligned Heading Wrapper */}
        <div className="w-full flex justify-start">
          <motion.div
            className="flex flex-col items-start mb-16"
            variants={reveal}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h2
              id="skills-heading"
              className="font-body font-black uppercase tracking-tighter leading-none select-none text-left"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              <span className="block" style={{ color: 'var(--pine)' }}>Tech</span>
              <span 
                className="block text-stroke-responsive" 
                style={{ 
                  color: 'transparent',
                  opacity: 0.15,
                  marginTop: '-0.2rem'
                }}
              >
                Stack
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Centered Funnel Cards Grid Wrapper */}
        <div className="w-full flex justify-center">
          <motion.div
            className="flex flex-col gap-4 sm:gap-6 items-center w-full max-w-4xl"
            role="region"
            aria-labelledby="skills-heading"
            variants={listReveal}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {rows.map((row, rowIndex) => (
              <div 
                key={rowIndex} 
                className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full"
              >
                {row.map(name => {
                  const skill = getSkill(name)
                  if (!skill) return null
                  return (
                    <SkillCard
                      key={skill.name}
                      name={skill.name}
                      Icon={skill.Icon}
                      color={skill.color}
                    />
                  )
                })}
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
