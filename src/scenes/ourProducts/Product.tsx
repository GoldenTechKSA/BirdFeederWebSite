import { REVEAL_TRANSITION, scaleIn, useReducedMotionVariants } from "@/shared/motion";
import { motion } from "framer-motion";

type Props = {
  name: string;
  tag?: string;
  description?: string;
  image: string;
};

const Product = ({ name, tag, description, image }: Props) => {
  const variants = useReducedMotionVariants(scaleIn);

  return (
    <motion.div
      variants={variants}
      transition={REVEAL_TRANSITION}
      className="group overflow-hidden rounded-organic bg-botanical-900 shadow-lift ring-1 ring-cream/10 transition-all duration-300 hover:-translate-y-1.5 hover:ring-iris-teal/40"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        {tag && (
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-botanical-200">
            {tag}
          </p>
        )}
        <h3 className="mt-1 font-serif text-2xl font-bold text-cream">{name}</h3>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-cream/70">{description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default Product;
