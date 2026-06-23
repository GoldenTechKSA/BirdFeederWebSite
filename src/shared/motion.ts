import { useReducedMotion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";

// Easing tokens — ease-out for entrances, ease-in for exits (skill UX guidance).
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN: [number, number, number, number] = [0.7, 0, 0.84, 0];

// Durations stay snappy: micro-interactions ~200ms, reveals ~500ms.
export const DURATION = { micro: 0.2, base: 0.5, slow: 0.65 } as const;
export const STAGGER = { tight: 0.04, normal: 0.06 } as const;

// Shared reveal transition applied by the <Reveal> wrapper and reveal children.
export const REVEAL_TRANSITION: Transition = {
  duration: DURATION.base,
  ease: EASE_OUT,
};

// Reveal variants hold only from/to values; transition is applied at the element
// so that a parent staggerContainer can orchestrate child timing cleanly.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0 },
};

export const staggerContainer = (
  staggerChildren: number = STAGGER.normal,
  delayChildren: number = 0,
): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

// When the user prefers reduced motion, content appears with no transform/animation.
const REDUCED: Variants = { hidden: { opacity: 1 }, visible: { opacity: 1 } };

export function useReducedMotionVariants(variants: Variants): Variants {
  const prefersReduced = useReducedMotion();
  return prefersReduced ? REDUCED : variants;
}
