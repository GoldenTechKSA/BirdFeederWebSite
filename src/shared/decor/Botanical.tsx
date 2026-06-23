import { EASE_OUT } from "@/shared/motion";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
  flip?: boolean;
};

const LEAVES = [
  "M60,150 C40,140 30,120 36,104 C52,112 64,128 60,150 Z",
  "M60,122 C80,114 92,96 86,80 C70,86 56,104 60,122 Z",
  "M60,96 C42,88 32,70 38,54 C54,62 66,78 60,96 Z",
  "M60,70 C80,62 92,44 86,28 C70,34 56,52 60,70 Z",
];

const STEM = "M60,156 C60,120 58,84 60,48 C61,30 60,18 60,8";

/** Hand-drawn line-art botanical branch that draws itself on when scrolled into view. */
const Botanical = ({ className = "", flip = false }: Props) => {
  const prefersReduced = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 160"
      fill="none"
      className={`${flip ? "-scale-x-100" : ""} ${className}`}
    >
      <motion.path
        d={STEM}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={prefersReduced ? false : { pathLength: 0 }}
        whileInView={prefersReduced ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
      />
      {LEAVES.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth="1.6"
          fill="currentColor"
          fillOpacity={0.08}
          strokeLinejoin="round"
          initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={prefersReduced ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.35 + i * 0.18 }}
        />
      ))}
    </svg>
  );
};

export default Botanical;
