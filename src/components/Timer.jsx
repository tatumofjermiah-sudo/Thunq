import styles from './Timer.module.css'

export default function Timer({ remaining, progress, fmt, isComplete, onComplete, level }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ring}>
        <svg viewBox="0 0 100 100" width="100" height="100">
          <circle
            cx="50" cy="50" r="44"
            fill="none"
            stroke="var(--border)"
            strokeWidth="4"
          />
          <circle
            cx="50" cy="50" r="44"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 44 * progress} ${2 * Math.PI * 44 * (1 - progress)}`}
            strokeLinecap="round"
            transform="rotate(-90, 50, 50)"
            style={{ transition: 'stroke-dasharray 1s linear' }}
          />
        </svg>
        <div className={styles.ringLabel}>
          <span className={styles.pct}>{Math.round(progress * 100)}%</span>
        </div>
      </div>

      <div className={styles.time}>
        {isComplete ? (
          <span className={styles.done}>Done!</span>
        ) : (
          <>
            <span className={styles.label}>remaining</span>
            <span className={styles.clock}>{fmt(remaining)}</span>
            <span className={styles.target}>{level}h target</span>
          </>
        )}
      </div>

      {isComplete && (
        <button className={styles.completeBtn} onClick={onComplete}>
          Complete Cycle →
        </button>
      )}
    </div>
  )
}
