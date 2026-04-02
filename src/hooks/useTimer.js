import { useState, useEffect } from 'react'

export function useTimer(activeStart, levelHours) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!activeStart) return
    const id = setInterval(() => {
      setElapsed(Date.now() - activeStart)
    }, 1000)
    return () => clearInterval(id)
  }, [activeStart])

  const targetMs = levelHours * 60 * 60 * 1000
  const currentElapsed = activeStart ? elapsed : 0
  const progress = Math.min(currentElapsed / targetMs, 1)
  const remaining = Math.max(targetMs - currentElapsed, 0)
  const isComplete = currentElapsed >= targetMs

  function fmt(ms) {
    const totalSec = Math.floor(ms / 1000)
    const h = Math.floor(totalSec / 3600)
    const m = Math.floor((totalSec % 3600) / 60)
    const s = totalSec % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  return { elapsed: currentElapsed, remaining, progress, isComplete, fmt }
}
