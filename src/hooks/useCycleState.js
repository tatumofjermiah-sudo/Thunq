import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'thunq_state'

const DEFAULT_STATE = {
  level: 12,
  cycles: 0,
  activeStart: null,
  phase: 'idle', // 'idle' | 'fasting' | 'complete'
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    return { ...DEFAULT_STATE, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_STATE
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

export function getRank(cycles) {
  if (cycles >= 9) return 'ninth'
  if (cycles >= 6) return 'sixth'
  if (cycles >= 3) return 'third'
  return 'exposure'
}

export function getRankLabel(rank) {
  switch (rank) {
    case 'ninth': return 'Ninth Seal'
    case 'sixth': return 'Sixth Path'
    case 'third': return 'Third Gate'
    default: return 'Exposure'
  }
}

export function getNextMilestone(cycles) {
  if (cycles < 3) return { target: 3, label: 'Third Gate' }
  if (cycles < 6) return { target: 6, label: 'Sixth Path' }
  if (cycles < 9) return { target: 9, label: 'Ninth Seal' }
  return null
}

export function useCycleState() {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const setLevel = useCallback((level) => {
    setState(s => ({ ...s, level, activeStart: null, phase: 'idle' }))
  }, [])

  const startCycle = useCallback(() => {
    setState(s => ({ ...s, activeStart: Date.now(), phase: 'fasting' }))
  }, [])

  const completeCycle = useCallback(() => {
    setState(s => ({
      ...s,
      cycles: s.cycles + 1,
      activeStart: null,
      phase: 'complete',
    }))
    setTimeout(() => {
      setState(s => (s.phase === 'complete' ? { ...s, phase: 'idle' } : s))
    }, 3000)
  }, [])

  const abandonCycle = useCallback(() => {
    setState(s => ({ ...s, activeStart: null, phase: 'idle' }))
  }, [])

  const resetAll = useCallback(() => {
    setState(DEFAULT_STATE)
  }, [])

  return {
    ...state,
    setLevel,
    startCycle,
    completeCycle,
    abandonCycle,
    resetAll,
  }
}
