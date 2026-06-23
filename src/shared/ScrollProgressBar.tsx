import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Thin iridescent reading-progress bar pinned to the top of the viewport —
 * the storytelling "scroll progress" cue. Hidden when reduced motion is on.
 */
const ScrollProgressBar = () => {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[45] h-[3px] origin-left bg-iridescent"
    />
  );
};

export default ScrollProgressBar;
