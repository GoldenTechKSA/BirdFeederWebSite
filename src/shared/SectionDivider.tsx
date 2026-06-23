type Props = {
  /** Tailwind text-color class drives the fill via currentColor, e.g. "text-botanical-950". */
  className?: string;
  flip?: boolean;
  variant?: "wave" | "hill";
};

const PATHS: Record<NonNullable<Props["variant"]>, string> = {
  wave: "M0,64 C240,128 480,8 720,44 C960,80 1200,128 1440,72 L1440,120 L0,120 Z",
  hill: "M0,96 C360,32 540,32 720,64 C900,96 1080,112 1440,56 L1440,120 L0,120 Z",
};

/** Organic curved divider so sections flow into one another instead of hard rectangles. */
const SectionDivider = ({ className = "", flip = false, variant = "wave" }: Props) => (
  <div aria-hidden="true" className={`pointer-events-none -mb-px leading-[0] ${className}`}>
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`block h-[48px] w-full md:h-[96px] ${flip ? "rotate-180" : ""}`}
    >
      <path fill="currentColor" d={PATHS[variant]} />
    </svg>
  </div>
);

export default SectionDivider;
