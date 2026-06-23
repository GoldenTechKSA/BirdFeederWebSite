import feeder1 from "@/assets/products/feeder-01.webp";
import feeder2 from "@/assets/products/feeder-02.webp";
import feeder3 from "@/assets/products/feeder-03.webp";
import feeder4 from "@/assets/products/feeder-04.webp";
import feeder5 from "@/assets/products/feeder-05.webp";
import feeder6 from "@/assets/products/feeder-06.webp";
import Strings from "@/assets/strings.json";
import GradientText from "@/shared/GradientText";
import { staggerContainer, useReducedMotionVariants } from "@/shared/motion";
import Reveal from "@/shared/Reveal";
import SectionDivider from "@/shared/SectionDivider";
import { ClassType, SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import Product from "./Product";

const images = [feeder1, feeder2, feeder3, feeder4, feeder5, feeder6];

const products: Array<ClassType> = Strings.productsPage.items.map((item, i) => ({
  name: item.name,
  tag: item.tag,
  description: item.description,
  image: images[i],
}));

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const OurProducts = ({ setSelectedPage }: Props) => {
  const gridVariants = useReducedMotionVariants(staggerContainer(0.08));

  return (
    <section id="ourproducts" className="relative overflow-hidden bg-botanical-950 text-cream">
      {/* ambient glows */}
      <div
        aria-hidden="true"
        className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-iris-emerald/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-32 h-96 w-96 rounded-full bg-iris-ruby/15 blur-3xl"
      />

      <motion.div
        className="relative mx-auto w-5/6 py-24 md:py-28"
        onViewportEnter={() => setSelectedPage(SelectedPage.OurProducts)}
      >
        {/* HEADER */}
        <Reveal className="max-w-2xl">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-botanical-200">
            <span className="h-px w-8 bg-botanical-200" />
            {Strings.productsPage.Eyebrow}
          </p>
          <h2 className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-cream md:text-5xl">
            Feeders made for the <GradientText>garden</GradientText>.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-cream/70">
            {Strings.productsPage.description}
          </p>
        </Reveal>

        {/* PRODUCT GRID */}
        <motion.div
          className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={gridVariants}
        >
          {products.map((item) => (
            <Product
              key={item.name}
              name={item.name}
              tag={item.tag}
              description={item.description}
              image={item.image}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* transition back into the light contact chapter */}
      <SectionDivider className="text-cream" />
    </section>
  );
};

export default OurProducts;
