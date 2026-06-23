import heroImage from "@/assets/hero/hero.webp";
import Sponsor1 from "@/assets/Sponsor1.png";
import Sponsor2 from "@/assets/Sponsor2.png";
import Sponsor3 from "@/assets/Sponsor3.png";
import Strings from "@/assets/strings.json";
import ActionButton from "@/shared/ActionButton";
import GradientText from "@/shared/GradientText";
import { fadeUp, REVEAL_TRANSITION, slideInRight, staggerContainer, useReducedMotionVariants } from "@/shared/motion";
import { SelectedPage } from "@/shared/types";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const sponsors = [
  { src: Sponsor1, alt: "Partner brand one" },
  { src: Sponsor2, alt: "Partner brand two" },
  { src: Sponsor3, alt: "Partner brand three" },
];

const Home = ({ setSelectedPage }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, -70]);
  const container = useReducedMotionVariants(staggerContainer(0.08));
  const item = useReducedMotionVariants(fadeUp);
  const imageReveal = useReducedMotionVariants(slideInRight);

  return (
    <section ref={sectionRef} id="home" className="relative overflow-hidden bg-cream">
      {/* iridescent mesh + grain background */}
      <div aria-hidden="true" className="absolute inset-0 bg-iridescent-mesh" />
      <div aria-hidden="true" className="noise-overlay" />

      <motion.div
        className="relative mx-auto flex min-h-screen w-5/6 flex-col items-center gap-12 pt-32 pb-16 md:flex-row md:gap-8 md:pt-24"
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >
        {/* COPY */}
        <motion.div
          className="md:basis-1/2"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.p
            variants={item}
            transition={REVEAL_TRANSITION}
            className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-botanical-700"
          >
            <span className="h-px w-8 bg-botanical-700" />
            {Strings.homePage.Eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            transition={REVEAL_TRANSITION}
            className="font-serif text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl"
          >
            {Strings.homePage.HeadlinePre}{" "}
            <GradientText>{Strings.homePage.HeadlineHighlight}</GradientText>{" "}
            {Strings.homePage.HeadlinePost}
          </motion.h1>

          <motion.p
            variants={item}
            transition={REVEAL_TRANSITION}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70"
          >
            {Strings.homePage.Lead}
          </motion.p>

          <motion.div
            variants={item}
            transition={REVEAL_TRANSITION}
            className="mt-9 flex flex-wrap items-center gap-6"
          >
            <ActionButtonRow setSelectedPage={setSelectedPage} />
          </motion.div>

          {/* STATS */}
          <motion.div
            variants={item}
            transition={REVEAL_TRANSITION}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-botanical-700/15 pt-7"
          >
            <Stat value={Strings.homePage.Stat1Value} label={Strings.homePage.Stat1Label} />
            <Stat value={Strings.homePage.Stat2Value} label={Strings.homePage.Stat2Label} />
            <Stat value={Strings.homePage.Stat3Value} label={Strings.homePage.Stat3Label} />
          </motion.div>
        </motion.div>

        {/* HERO IMAGE */}
        <motion.div
          className="relative flex w-full justify-center md:basis-1/2"
          initial="hidden"
          animate="visible"
          variants={imageReveal}
          transition={REVEAL_TRANSITION}
        >
          <div
            aria-hidden="true"
            className="absolute inset-6 rounded-blob bg-iridescent opacity-30 blur-3xl"
          />
          <motion.div
            style={{ y: imageY }}
            className="rounded-blob relative aspect-square w-full max-w-md overflow-hidden shadow-lift ring-1 ring-botanical-700/10"
          >
            <img
              src={heroImage}
              alt="A hummingbird hovering at a Nectar Haven feeder"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* floating accent chip */}
          <div className="absolute -bottom-4 left-2 hidden rounded-2xl bg-cream/90 px-4 py-3 shadow-soft backdrop-blur md:block">
            <p className="font-serif text-lg font-bold text-botanical-700">Year-round</p>
            <p className="text-xs text-ink/60">feeding, even in frost</p>
          </div>
        </motion.div>
      </motion.div>

      {/* TRUST BAND */}
      <div className="relative border-t border-botanical-700/10 bg-bone/60">
        <div className="mx-auto flex w-5/6 flex-col items-center gap-5 py-6 sm:flex-row sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
            Trusted by birders nationwide
          </p>
          <div className="flex items-center gap-10 opacity-50 grayscale">
            {sponsors.map((s) => (
              <img key={s.alt} src={s.src} alt={s.alt} className="h-7 w-auto" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <p className="font-serif text-3xl font-bold text-ink">{value}</p>
    <p className="mt-1 text-xs leading-snug text-ink/55">{label}</p>
  </div>
);

const ActionButtonRow = ({
  setSelectedPage,
}: {
  setSelectedPage: (value: SelectedPage) => void;
}) => (
  <>
    <ActionButton setSelectedPage={setSelectedPage}>Buy Now</ActionButton>
    <AnchorLink
      className="group inline-flex items-center gap-2 text-sm font-semibold text-botanical-700"
      onClick={() => setSelectedPage(SelectedPage.Benefits)}
      href={`#${SelectedPage.Benefits}`}
    >
      <span className="border-b-2 border-transparent transition-colors group-hover:border-botanical-700">
        Learn more
      </span>
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </AnchorLink>
  </>
);

export default Home;
