import { useState } from 'react'
import styles from './App.module.css'
import Person from './components/Person'
import Timer from './components/Timer'
import LevelSelector from './components/LevelSelector'
import CycleTracker from './components/CycleTracker'
import Identity from './components/Identity'
import { useCycleState, getRank } from './hooks/useCycleState'
import { useTimer } from './hooks/useTimer'

const RANK_CSS_VAR = {
  exposure: { accent: '#4a4a6a' },
  third:    { accent: '#c87941' },
  sixth:    { accent: '#4a9eff' },
  ninth:    { accent: '#a855f7' },
}

export default function App() {
  const {
    level, cycles, activeStart, phase,
    setLevel, startCycle, completeCycle, abandonCycle, resetAll,
  } = useCycleState()

  const { remaining, progress, isComplete, fmt } = useTimer(activeStart, level)
  const rank = getRank(cycles)
  const { accent } = RANK_CSS_VAR[rank]

  const [showReset, setShowReset] = useState(false)

  function handleComplete() {
    completeCycle()
  }

  return (
    <div className={styles.app} style={{ '--accent': accent }}>
      {/* Header */}
      <header className={styles.header}>
        <span className={styles.logo}>Thunq</span>
        <button
          className={styles.resetTrigger}
          onClick={() => setShowReset(true)}
          title="Reset all data"
        >
          ···
        </button>
      </header>

      {/* Main layout */}
      <main className={styles.main}>
        {/* Person + identity */}
        <section className={styles.personSection}>
          <Person phase={phase} rank={rank} progress={progress} />
          <Identity rank={rank} cycles={cycles} level={level} />
        </section>

        {/* Controls */}
        <section className={styles.controls}>
          <LevelSelector
            level={level}
            onSelect={setLevel}
            disabled={phase === 'fasting'}
          />

          {phase === 'idle' && (
            <button className={styles.primaryBtn} onClick={startCycle}>
              Begin Cycle
            </button>
          )}

          {phase === 'fasting' && (
            <>
              <Timer
                remaining={remaining}
                progress={progress}
                fmt={fmt}
                isComplete={isComplete}
                onComplete={handleComplete}
                level={level}
              />
              <button className={styles.abandonBtn} onClick={abandonCycle}>
                Abandon
              </button>
            </>
          )}

          {phase === 'complete' && (
            <div className={styles.completeBanner}>
              <span className={styles.completeEmoji}>✦</span>
              <p>Cycle recorded.</p>
            </div>
          )}

          <CycleTracker cycles={cycles} level={level} />
        </section>
      </main>

      {/* Footer tagline */}
      <footer className={styles.footer}>
        Can you return to control, again and again, over time?
      </footer>

      {/* Reset modal */}
      {showReset && (
        <div className={styles.modalOverlay} onClick={() => setShowReset(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <p className={styles.modalTitle}>Reset all progress?</p>
            <p className={styles.modalSub}>This cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowReset(false)}>Cancel</button>
              <button
                className={styles.dangerBtn}
                onClick={() => { resetAll(); setShowReset(false) }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
