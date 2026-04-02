import styles from './CycleTracker.module.css'
import { getNextMilestone } from '../hooks/useCycleState'

const MILESTONES = [3, 6, 9]
const MILESTONE_LABELS = { 3: 'Third Gate', 6: 'Sixth Path', 9: 'Ninth Seal' }

export default function CycleTracker({ cycles, level }) {
  const next = getNextMilestone(cycles)
  const MAX = Math.max(9, cycles)

  return (
    <div className={styles.wrapper}>
      <p className={styles.heading}>Cycles completed</p>

      <div className={styles.dotRow}>
        {Array.from({ length: MAX }, (_, i) => {
          const num = i + 1
          const done = num <= cycles
          const isMilestone = MILESTONES.includes(num)
          return (
            <span
              key={i}
              className={`${styles.dot} ${done ? styles.dotDone : ''} ${isMilestone ? styles.dotMilestone : ''}`}
              title={isMilestone ? MILESTONE_LABELS[num] : `Cycle ${num}`}
            />
          )
        })}
        {/* Ongoing dot */}
        {cycles < 100 && (
          <span className={`${styles.dot} ${styles.dotNext}`} title="Next" />
        )}
      </div>

      <div className={styles.counts}>
        <span className={styles.big}>{cycles}</span>
        <span className={styles.unit}> × {level}h</span>
      </div>

      {next && (
        <p className={styles.nextMilestone}>
          {next.target - cycles} more to reach <strong>{next.label}</strong>
        </p>
      )}

      {cycles >= 9 && (
        <p className={styles.mastered}>Ninth Seal held. Keep returning.</p>
      )}
    </div>
  )
}
