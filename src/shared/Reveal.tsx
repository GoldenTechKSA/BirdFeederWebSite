import { fadeUp, REVEAL_TRANSITION, useReducedMotionVariants } from "@/shared/motion";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  amount?: number;
  once?: boolean;
};

/**
 * Scroll-into-view reveal wrapper. Replaces the duplicated
 * initial/whileInView/viewport/variants blocks across every scene and
 * automatically honors prefers-reduced-motion.
 */
const Reveal = ({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  amount = 0.3,
  once = true,
}: Props) => {
  const resolved = useReducedMotionVariants(variants);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={resolved}
      transition={{ ...REVEAL_TRANSITION, delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
