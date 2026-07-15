import { useEffect, useState } from 'react'
import { SECTIONS } from '../constants/sections'

export default function LedgerLine() {
  const [progress, setProgress] = useState(0)
  const [ticks,    setTicks]    = useState([])
  const [activeId, setActiveId] = useState('hero')

  // Measure section positions; re-measure on resize
  useEffect(() => {
    const measure = () => {
      const total = document.documentElement.scrollHeight
      if (total === 0) return
      const pts = SECTIONS.map(({ id, label, name }) => {
        const el = document.getElementById(id)
        if (!el) return null
        const topAbs = el.getBoundingClientRect().top + window.scrollY
        return { id, label, name, topPct: (topAbs / total) * 100 }
      }).filter(Boolean)
      setTicks(pts)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.documentElement)
    return () => ro.disconnect()
  }, [])

  // Keep the ledger labels in sync with the section currently in view without
  // doing per-frame scroll work.
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const activeEntry = entries.find(entry => entry.isIntersecting)
        if (activeEntry) setActiveId(activeEntry.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )

    SECTIONS.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  // Track scroll progress
  useEffect(() => {
    const onScroll = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight
      if (scrollMax <= 0) { setProgress(0); return }
      setProgress((window.scrollY / scrollMax) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="ledger-line-host" aria-hidden="true">
      <div className="ledger-track" />
      <div className="ledger-fill" style={{ height: `${progress}%` }} />
      {ticks.map(({ id, label, name, topPct }) => (
        <div key={id} className={`ledger-tick${activeId === id ? ' is-active' : ''}`} style={{ top: `${topPct}%` }}>
          <div className="ledger-tick-mark" />
          <span className="ledger-tick-label">{label} {name}</span>
        </div>
      ))}
    </div>
  )
}
