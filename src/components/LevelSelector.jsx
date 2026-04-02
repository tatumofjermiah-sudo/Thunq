import styles from './LevelSelector.module.css'

const LEVELS = [12, 24, 48, 72, 144]

const LEVEL_DESC = {
  12:  '12 hours',
  24:  '24 hours',
  48:  '48 hours',
  72:  '72 hours',
  144: '144 hours (6 days)',
}

export default function LevelSelector({ level, onSelect, disabled }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Choose your trial</p>
      <div className={styles.options}>
        {LEVELS.map((l) => (
          <button
            key={l}
            className={`${styles.option} ${l === level ? styles.active : ''}`}
            onClick={() => onSelect(l)}
            disabled={disabled}
            title={LEVEL_DESC[l]}
          >
            {l}h
          </button>
        ))}
      </div>
    </div>
  )
}
