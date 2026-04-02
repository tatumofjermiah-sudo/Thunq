import styles from './Identity.module.css'
import { getRankLabel } from '../hooks/useCycleState'

export default function Identity({ rank, level }) {
  if (rank === 'exposure') {
    return (
      <div className={styles.wrapper}>
        <p className={styles.exposure}>Exposure Phase</p>
        <p className={styles.sub}>No rank yet. Complete 3 cycles to enter the Third Gate.</p>
      </div>
    )
  }

  const label = getRankLabel(rank)
  const title = `${label} of ${level}`

  return (
    <div className={`${styles.wrapper} ${styles[rank]}`}>
      <p className={styles.identity}>{title}</p>
      <p className={styles.phrase}>
        {rank === 'ninth' && `"I hold the Ninth Seal of ${level}"`}
        {rank === 'sixth' && `"I walk the Sixth Path of ${level}"`}
        {rank === 'third' && `"I passed the Third Gate of ${level}"`}
      </p>
    </div>
  )
}
