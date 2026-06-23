import Strings from "@/assets/strings.json";
import Botanical from "@/shared/decor/Botanical";
import ActionButton from "@/shared/ActionButton";
import GradientText from "@/shared/GradientText";
import HText from "@/shared/HText";
import { fadeUp, REVEAL_TRANSITION, staggerContainer, useReducedMotionVariants } from "@/shared/motion";
import Reveal from "@/shared/Reveal";
import SectionDivider from "@/shared/SectionDivider";
import { BenefitType, SelectedPage } from "@/shared/types";
import {
  AcademicCapIcon,
  CameraIcon,
  FaceSmileIcon,
  HeartIcon,
  SparklesIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Benefit from "./Benefit";

const iconClass = "h-7 w-7";

const benefits: Array<BenefitType> = [
  {
    icon: <SparklesIcon className={iconClass} />,
    title: Strings.benefitsPage.Benefit1,
    description: Strings.benefitsPage.BenefitDecription1,
  },
  {
    icon: <HeartIcon className={iconClass} />,
    title: Strings.benefitsPage.Benefit2,
    description: Strings.benefitsPage.BenefitDecription2,
  },
  {
    icon: <AcademicCapIcon className={iconClass} />,
    title: Strings.benefitsPage.Benefit3,
    description: Strings.benefitsPage.BenefitDecription3,
  },
  {
    icon: <SunIcon className={iconClass} />,
    title: Strings.benefitsPage.Benefit4,
    description: Strings.benefitsPage.BenefitDecription4,
  },
  {
    icon: <CameraIcon className={iconClass} />,
    title: Strings.benefitsPage.Benefit5,
    description: Strings.benefitsPage.BenefitDecription5,
  },
  {
    icon: <FaceSmileIcon className={iconClass} />,
    title: Strings.benefitsPage.Benefit6,
    description: Strings.benefitsPage.BenefitDecription6,
  },
];

const testimonials = [
  Strings.benefitsPage.HappyMembersQuote2,
  Strings.benefitsPage.HappyMembersQuote3,
  Strings.benefitsPage.HappyMembersQuote4,
  Strings.benefitsPage.HappyMembersQuote5,
  Strings.benefitsPage.HappyMembersQuote6,
  Strings.benefitsPage.HappyMembersQuote7,
];

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Benefits = ({ setSelectedPage }: Props) => {
  const gridVariants = useReducedMotionVariants(staggerContainer(0.07));
  const cardVariants = useReducedMotionVariants(fadeUp);

  return (
    <section id="benefits" className="relative overflow-hidden bg-cream">
      <Botanical className="pointer-events-none absolute right-[7%] top-16 hidden h-56 w-40 text-botanical-700/15 lg:block" />
      <motion.div
        className="relative mx-auto w-5/6 py-24 md:py-28"
        onViewportEnter={() => setSelectedPage(SelectedPage.Benefits)}
      >
        {/* HEADER */}
        <Reveal className="max-w-2xl" variants={fadeUp}>
          <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-botanical-700">
            <span className="h-px w-8 bg-botanical-700" />
            Why a feeder
          </p>
          <HText>
            Small feeder, <GradientText>big</GradientText> joy.
          </HText>
          <p className="mt-5 text-lg leading-relaxed text-ink/65">
            {Strings.benefitsPage.BenefitsDescription}
          </p>
        </Reveal>

        {/* BENEFIT CARDS */}
        <motion.div
          className="mt-14 grid gap-7 sm:grid-cols-2 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {benefits.map((benefit) => (
            <Benefit
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              setSelectedPage={setSelectedPage}
            />
          ))}
        </motion.div>

        {/* TESTIMONIALS */}
        <div className="mt-28">
          <Reveal className="max-w-2xl" variants={fadeUp}>
            <HText>
              {Strings.benefitsPage.HappyMembers1}{" "}
              <GradientText>love</GradientText> {Strings.benefitsPage.HappyMembers2}
            </HText>
            <p className="mt-5 text-lg leading-relaxed text-ink/65">
              {Strings.benefitsPage.HappyMembersQuote1}
            </p>
          </Reveal>

          <motion.div
            className="mt-12 grid gap-7 sm:grid-cols-2 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={gridVariants}
          >
            {testimonials.map((quote) => (
              <motion.figure
                key={quote}
                variants={cardVariants}
                transition={REVEAL_TRANSITION}
                className="rounded-organic border border-botanical-700/10 bg-bone/50 p-7 shadow-soft"
              >
                <span aria-hidden="true" className="font-serif text-5xl leading-none text-botanical-700/30">
                  &ldquo;
                </span>
                <blockquote className="-mt-4 text-[15px] italic leading-relaxed text-ink/75">
                  {quote}
                </blockquote>
              </motion.figure>
            ))}
          </motion.div>

          {/* CHAPTER CTA */}
          <Reveal className="mt-14" variants={fadeUp}>
            <ActionButton setSelectedPage={setSelectedPage}>Shop the collection</ActionButton>
          </Reveal>
        </div>
      </motion.div>

      {/* transition into the dark "night garden" products chapter */}
      <SectionDivider className="text-botanical-950" />
    </section>
  );
};

export default Benefits;
