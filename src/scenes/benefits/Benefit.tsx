import { REVEAL_TRANSITION, scaleIn, useReducedMotionVariants } from "@/shared/motion";
import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  icon: JSX.Element;
  title: string;
  description: string;
  setSelectedPage: (value: SelectedPage) => void;
};

const Benefit = ({ icon, title, description, setSelectedPage }: Props) => {
  const variants = useReducedMotionVariants(scaleIn);

  return (
    <motion.div
      variants={variants}
      transition={REVEAL_TRANSITION}
      className="group relative flex flex-col rounded-organic border border-botanical-700/10 bg-cream p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-botanical-50 text-botanical-700 ring-1 ring-botanical-700/10 transition-colors duration-300 group-hover:bg-botanical-700 group-hover:text-cream">
        {icon}
      </div>
      <h3 className="font-serif text-xl font-bold text-ink">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">{description}</p>
      <AnchorLink
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-botanical-700"
        onClick={() => setSelectedPage(SelectedPage.ContactUs)}
        href={`#${SelectedPage.ContactUs}`}
      >
        Learn more
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </AnchorLink>
    </motion.div>
  );
};

export default Benefit;
