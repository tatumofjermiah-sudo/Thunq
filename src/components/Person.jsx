import styles from './Person.module.css'

const RANK_COLORS = {
  exposure: { primary: '#4a4a6a', glow: 'rgba(74,74,106,0.3)', skin: '#8b7355', cloth: '#2a2a4a' },
  third:    { primary: '#c87941', glow: 'rgba(200,121,65,0.4)', skin: '#c4916e', cloth: '#5c3a1e' },
  sixth:    { primary: '#4a9eff', glow: 'rgba(74,158,255,0.4)', skin: '#7ab8ff', cloth: '#0d2d55' },
  ninth:    { primary: '#a855f7', glow: 'rgba(168,85,247,0.5)', skin: '#c084fc', cloth: '#2d0d55' },
}

export default function Person({ phase, rank, progress }) {
  const colors = RANK_COLORS[rank]
  const isFasting = phase === 'fasting'
  const isComplete = phase === 'complete'

  const eyesClosed = isFasting
  const breathe = isFasting ? styles.breathe : ''
  const glow = isFasting ? styles.glowPulse : isComplete ? styles.glowBurst : ''

  return (
    <div className={`${styles.wrapper} ${glow}`} style={{ '--glow': colors.glow, '--accent': colors.primary }}>
      <svg
        viewBox="0 0 120 200"
        width="160"
        height="267"
        className={`${styles.person} ${breathe}`}
        aria-label={`Person in ${phase} state at ${rank} rank`}
      >
        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softglow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="skinGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={lighten(colors.skin, 0.15)} />
            <stop offset="100%" stopColor={colors.skin} />
          </radialGradient>
          <linearGradient id="clothGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lighten(colors.cloth, 0.1)} />
            <stop offset="100%" stopColor={colors.cloth} />
          </linearGradient>
        </defs>

        {/* Aura ring when ranked */}
        {rank !== 'exposure' && (
          <ellipse
            cx="60" cy="195"
            rx="35" ry="5"
            fill={colors.primary}
            opacity="0.25"
            filter="url(#glow)"
          />
        )}

        {/* Body / torso */}
        <rect
          x="35" y="92" width="50" height="62"
          rx="8"
          fill="url(#clothGrad)"
          filter={isFasting ? 'url(#softglow)' : undefined}
        />

        {/* Left arm */}
        <g className={isFasting ? styles.armMeditate : isComplete ? styles.armRaise : styles.armRest}>
          <rect x="16" y="96" width="18" height="10" rx="5" fill="url(#clothGrad)" />
          {/* forearm */}
          <rect x="10" y="106" width="12" height="22" rx="5" fill={colors.skin} />
          {/* hand */}
          <circle cx="16" cy="130" r="6" fill={colors.skin} />
        </g>

        {/* Right arm */}
        <g className={isFasting ? styles.armMeditateR : isComplete ? styles.armRaiseR : styles.armRestR}>
          <rect x="86" y="96" width="18" height="10" rx="5" fill="url(#clothGrad)" />
          <rect x="98" y="106" width="12" height="22" rx="5" fill={colors.skin} />
          <circle cx="104" cy="130" r="6" fill={colors.skin} />
        </g>

        {/* Legs */}
        <rect x="36" y="150" width="20" height="40" rx="6" fill="url(#clothGrad)" />
        <rect x="64" y="150" width="20" height="40" rx="6" fill="url(#clothGrad)" />

        {/* Shoes */}
        <ellipse cx="46" cy="192" rx="14" ry="7" fill={darken(colors.cloth, 0.3)} />
        <ellipse cx="74" cy="192" rx="14" ry="7" fill={darken(colors.cloth, 0.3)} />

        {/* Neck */}
        <rect x="50" y="78" width="20" height="18" rx="4" fill={colors.skin} />

        {/* Head */}
        <ellipse
          cx="60" cy="62"
          rx="28" ry="30"
          fill="url(#skinGrad)"
          filter={rank === 'ninth' ? 'url(#softglow)' : undefined}
        />

        {/* Hair */}
        <HairByRank rank={rank} color={darken(colors.cloth, 0.2)} />

        {/* Eyes */}
        {eyesClosed ? (
          <>
            <path d="M46 58 Q50 54 54 58" stroke={darken(colors.skin, 0.5)} strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M66 58 Q70 54 74 58" stroke={darken(colors.skin, 0.5)} strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="50" cy="58" rx="5" ry={isComplete ? 5 : 4} fill={darken(colors.primary, 0.2)} />
            <ellipse cx="70" cy="58" rx="5" ry={isComplete ? 5 : 4} fill={darken(colors.primary, 0.2)} />
            {/* Pupils */}
            <circle cx="50" cy="58" r="2.5" fill="#0a0a0f" />
            <circle cx="70" cy="58" r="2.5" fill="#0a0a0f" />
            {/* Eye shine */}
            <circle cx="51.5" cy="56.5" r="1" fill="white" opacity="0.7" />
            <circle cx="71.5" cy="56.5" r="1" fill="white" opacity="0.7" />
          </>
        )}

        {/* Eyebrows */}
        <path
          d={isFasting ? 'M43 50 Q50 47 57 50' : isComplete ? 'M43 49 Q50 45 57 49' : 'M44 51 Q50 48 56 51'}
          stroke={darken(colors.skin, 0.5)}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={isFasting ? 'M63 50 Q70 47 77 50' : isComplete ? 'M63 49 Q70 45 77 49' : 'M64 51 Q70 48 76 51'}
          stroke={darken(colors.skin, 0.5)}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Mouth */}
        <Mouth phase={phase} color={darken(colors.skin, 0.4)} />

        {/* Progress ring around head when fasting */}
        {isFasting && progress > 0 && (
          <ProgressArc progress={progress} color={colors.primary} />
        )}

        {/* Rank mark on forehead */}
        {rank !== 'exposure' && (
          <RankMark rank={rank} color={colors.primary} />
        )}

        {/* Complete flash — star burst */}
        {isComplete && (
          <g className={styles.starBurst}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="60" y1="32"
                x2={60 + 18 * Math.cos((angle * Math.PI) / 180)}
                y2={32 + 18 * Math.sin((angle * Math.PI) / 180)}
                stroke={colors.primary}
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#glow)"
              />
            ))}
            <circle cx="60" cy="32" r="5" fill={colors.primary} filter="url(#glow)" />
          </g>
        )}
      </svg>
    </div>
  )
}

function HairByRank({ rank, color }) {
  if (rank === 'ninth') {
    return (
      <>
        <ellipse cx="60" cy="35" rx="28" ry="10" fill={color} />
        <rect x="32" y="34" width="56" height="6" rx="3" fill={color} />
        {/* flowing strands */}
        <path d="M32 40 Q25 55 28 70" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M88 40 Q95 55 92 70" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
      </>
    )
  }
  if (rank === 'sixth') {
    return (
      <>
        <ellipse cx="60" cy="36" rx="27" ry="9" fill={color} />
        <rect x="33" y="35" width="54" height="5" rx="3" fill={color} />
      </>
    )
  }
  return (
    <ellipse cx="60" cy="37" rx="26" ry="8" fill={color} />
  )
}

function Mouth({ phase, color }) {
  if (phase === 'complete') {
    return <path d="M48 72 Q60 82 72 72" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
  }
  if (phase === 'fasting') {
    return <path d="M53 72 Q60 70 67 72" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
  }
  return <path d="M50 72 Q60 78 70 72" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
}

function ProgressArc({ progress, color }) {
  const cx = 60, cy = 62, r = 34
  const circ = 2 * Math.PI * r
  const dash = circ * progress

  return (
    <circle
      cx={cx} cy={cy} r={r}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeDasharray={`${dash} ${circ - dash}`}
      strokeDashoffset="0"
      strokeLinecap="round"
      transform={`rotate(-90, ${cx}, ${cy})`}
      opacity="0.7"
      filter="url(#glow)"
    />
  )
}

function RankMark({ rank, color }) {
  if (rank === 'third') {
    return <circle cx="60" cy="40" r="3.5" fill={color} filter="url(#softglow)" />
  }
  if (rank === 'sixth') {
    return (
      <>
        <circle cx="55" cy="40" r="2.5" fill={color} filter="url(#softglow)" />
        <circle cx="65" cy="40" r="2.5" fill={color} filter="url(#softglow)" />
      </>
    )
  }
  if (rank === 'ninth') {
    return (
      <polygon
        points="60,34 63,41 70,41 64.5,45 66.5,52 60,48 53.5,52 55.5,45 50,41 57,41"
        fill={color}
        filter="url(#glow)"
        opacity="0.9"
      />
    )
  }
  return null
}

function lighten(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, (num >> 16) + Math.round(amount * 255))
  const g = Math.min(255, ((num >> 8) & 0xff) + Math.round(amount * 255))
  const b = Math.min(255, (num & 0xff) + Math.round(amount * 255))
  return `rgb(${r},${g},${b})`
}

function darken(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, (num >> 16) - Math.round(amount * 255))
  const g = Math.max(0, ((num >> 8) & 0xff) - Math.round(amount * 255))
  const b = Math.max(0, (num & 0xff) - Math.round(amount * 255))
  return `rgb(${r},${g},${b})`
}
