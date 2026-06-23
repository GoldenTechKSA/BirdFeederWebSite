import {
  BIRD_BEAK,
  BIRD_BODY,
  BIRD_GORGET,
  BIRD_TAIL,
  BIRD_WING,
} from "@/shared/hummingbirdPath";

type Props = {
  className?: string;
  title?: string;
  /** unique suffix so multiple marks on a page keep distinct gradient ids */
  idSuffix?: string;
};

/**
 * The Nectar Haven mark: a monoline hummingbird with an iridescent gorget and an
 * amber nectar drop. Strokes use currentColor so it can render on light or dark
 * surfaces; the gorget + nectar stay branded in both.
 */
const BrandMark = ({ className = "", title = "Nectar Haven", idSuffix = "a" }: Props) => {
  const gorgetId = `bm-gorget-${idSuffix}`;
  const wingId = `bm-wing-${idSuffix}`;

  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={title} fill="none" className={className}>
      <defs>
        <linearGradient id={gorgetId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>
        <linearGradient id={wingId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#15803D" stopOpacity="0.16" />
        </linearGradient>
      </defs>

      <path
        d={BIRD_WING}
        fill={`url(#${wingId})`}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d={BIRD_BODY}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d={BIRD_TAIL} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d={BIRD_BEAK} fill="currentColor" />
      <path d={BIRD_GORGET} fill={`url(#${gorgetId})`} />
      {/* nectar drop at the beak tip */}
      <path
        d="M5,61 C7,57 11,59 10.5,63 C10,67 4.5,67 4.5,63 C4.5,62 4.7,61.5 5,61 Z"
        fill="#D97706"
      />
      <circle cx="43" cy="48" r="2" fill="currentColor" />
    </svg>
  );
};

export default BrandMark;
