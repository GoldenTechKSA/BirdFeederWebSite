import contactImage from "@/assets/graphics/contact.webp";
import Strings from "@/assets/strings.json";
import GradientText from "@/shared/GradientText";
import { fadeUp, REVEAL_TRANSITION, slideInRight, useReducedMotionVariants } from "@/shared/motion";
import Reveal from "@/shared/Reveal";
import SectionDivider from "@/shared/SectionDivider";
import { SelectedPage } from "@/shared/types";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FormEvent, useRef } from "react";
import { useForm } from "react-hook-form";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const ContactUs = ({ setSelectedPage }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [50, -50]);
  const imageVariants = useReducedMotionVariants(slideInRight);

  const inputStyles =
    "w-full rounded-2xl border border-botanical-700/15 bg-white px-5 py-3.5 text-ink placeholder-ink/35 shadow-sm transition focus:border-botanical-600 focus:outline-none focus:ring-2 focus:ring-botanical-600/30";
  const labelStyles = "mb-1.5 block text-sm font-medium text-ink/80";
  const errorStyles = "mt-1.5 text-sm text-iris-ruby";

  const {
    register,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Always stop the native submit first: an async handler can't call
    // preventDefault() after an await (the browser has already navigated),
    // so we validate, then submit the form manually only if it's valid.
    e.preventDefault();
    const form = e.currentTarget;
    const isValid = await trigger();
    if (isValid) form.submit();
  };

  return (
    <section ref={sectionRef} id="contactus" className="relative bg-cream">
      <motion.div
        className="mx-auto w-5/6 py-24 md:py-28"
        onViewportEnter={() => setSelectedPage(SelectedPage.ContactUs)}
      >
        <div className="items-center gap-12 md:flex">
          {/* FORM */}
          <Reveal className="md:basis-3/5" variants={fadeUp}>
            <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-botanical-700">
              <span className="h-px w-8 bg-botanical-700" />
              {Strings.buyNowPage.Eyebrow}
            </p>
            <h2 className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl">
              {Strings.buyNowPage.HeadlinePre}{" "}
              <GradientText>{Strings.buyNowPage.HeadlineHighlight}</GradientText>{" "}
              {Strings.buyNowPage.HeadlinePost}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/65">
              {Strings.buyNowPage.description}
            </p>

            <form
              onSubmit={onSubmit}
              action="https://formsubmit.co/GOLDENTECHKSA@hotmail.com"
              method="POST"
              className="mt-8 max-w-xl"
            >
              {/* FormSubmit config (hidden fields) */}
              <input type="hidden" name="_subject" value="New Contact Us message — Nectar Haven" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://nectarhavenfeeders.com" />

              <div className="mb-5">
                <label htmlFor="contact-name" className={labelStyles}>
                  {Strings.contactUsPage.NameLabel}
                </label>
                <input
                  id="contact-name"
                  className={inputStyles}
                  type="text"
                  autoComplete="name"
                  placeholder={Strings.contactUsPage.NamePlaceholder}
                  {...register("name", { required: true, maxLength: 100 })}
                />
                {errors.name && (
                  <p className={errorStyles}>
                    {errors.name.type === "required" && "This field is required."}
                    {errors.name.type === "maxLength" && "Max length is 100 characters."}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label htmlFor="contact-email" className={labelStyles}>
                  {Strings.contactUsPage.EmailLabel}
                </label>
                <input
                  id="contact-email"
                  className={inputStyles}
                  type="email"
                  autoComplete="email"
                  placeholder={Strings.contactUsPage.EmailPlaceholder}
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                />
                {errors.email && (
                  <p className={errorStyles}>
                    {errors.email.type === "required" && "This field is required."}
                    {errors.email.type === "pattern" && "Invalid email address."}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="contact-message" className={labelStyles}>
                  {Strings.contactUsPage.MessageLabel}
                </label>
                <textarea
                  id="contact-message"
                  className={inputStyles}
                  placeholder={Strings.contactUsPage.MessagePlaceholder}
                  rows={4}
                  {...register("message", { required: true, maxLength: 2000 })}
                />
                {errors.message && (
                  <p className={errorStyles}>
                    {errors.message.type === "required" && "This field is required."}
                    {errors.message.type === "maxLength" && "Max length is 2000 characters."}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-nectar-600 px-10 py-3.5 text-sm font-semibold tracking-wide text-cream shadow-nectar transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nectar-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-botanical-700 transition-transform duration-300 ease-out group-hover:scale-y-100"
                />
                <span className="relative z-10">
                  {isSubmitting ? Strings.contactUsPage.Sending : Strings.contactUsPage.Submit}
                </span>
              </button>
            </form>
          </Reveal>

          {/* IMAGE */}
          <motion.div
            className="relative mt-14 flex justify-center md:mt-0 md:basis-2/5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
            transition={REVEAL_TRANSITION}
          >
            <div
              aria-hidden="true"
              className="absolute inset-6 rounded-blob-2 bg-iridescent opacity-25 blur-3xl"
            />
            <motion.div
              style={{ y: imageY }}
              className="rounded-blob-2 relative aspect-square w-full max-w-sm overflow-hidden shadow-lift ring-1 ring-botanical-700/10"
            >
              <img
                src={contactImage}
                alt="A hummingbird visiting a blossom-shaped Nectar Haven feeder"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* transition into the footer */}
      <SectionDivider className="text-botanical-950" />
    </section>
  );
};

export default ContactUs;
