import {
  BIRD_BEAK,
  BIRD_BODY,
  BIRD_GORGET,
  BIRD_TAIL,
  BIRD_WING,
} from "@/shared/hummingbirdPath";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * The signature element: a hummingbird that hovers (idle bob + fast wing flap)
 * and drifts down the page along the scroll, threading the chapters together.
 * Desktop-only, decorative, pointer-events-none, and disabled for reduced motion.
 */
const Hummingbird = () => {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], ["14vh", "74vh"]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["0vw", "-7vw", "1.5vw", "-5vw", "0vw"],
  );
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-7, 6, -2]);
  const opacity = useTransform(scrollYProgress, [0, 0.04, 0.86, 1], [0, 0.95, 0.95, 0]);

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ y, x, rotate, opacity }}
      className="pointer-events-none fixed right-[5vw] top-0 z-20 hidden md:block"
    >
      {/* Idle vertical hover */}
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="96" height="96" viewBox="0 0 120 120" fill="none">
          <defs>
            <linearGradient id="hbGorget" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="50%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
            <linearGradient id="hbWing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#15803D" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Wing (flapping) */}
          <motion.path
            d={BIRD_WING}
            fill="url(#hbWing)"
            stroke="#15803D"
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{ transformBox: "fill-box", transformOrigin: "center top" }}
            animate={{ scaleY: [1, 0.28, 1] }}
            transition={{ duration: 0.13, repeat: Infinity, ease: "easeInOut" }}
          />

          <path
            d={BIRD_BODY}
            fill="#FBF7EF"
            stroke="#15803D"
            strokeWidth="2.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path d={BIRD_TAIL} stroke="#15803D" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d={BIRD_BEAK} fill="#15803D" />
          <path d={BIRD_GORGET} fill="url(#hbGorget)" />
          <circle cx="43.5" cy="48" r="1.9" fill="#0F172A" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Hummingbird;
