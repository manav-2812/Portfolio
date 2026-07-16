import { useState, useEffect } from 'react'

export default function useCoarsePointer() {
  const [isCoarse, setIsCoarse] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(hover: none), (pointer: coarse)')
    setIsCoarse(media.matches)
    
    const listener = (e) => {
      setIsCoarse(e.matches)
    }
    
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  return isCoarse
}
