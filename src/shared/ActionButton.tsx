import { SelectedPage } from "@/shared/types";
import type { ReactNode } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  children: ReactNode;
  setSelectedPage: (value: SelectedPage) => void;
  variant?: "solid" | "ghost";
};

/**
 * Primary CTA. Keeps the original contract (smooth-scrolls to #contactus and
 * marks that page active) but adds a nectar-fill hover and a keyboard focus ring.
 */
const ActionButton = ({ children, setSelectedPage, variant = "solid" }: Props) => {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nectar-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

  const skin =
    variant === "solid"
      ? "bg-nectar-600 text-cream shadow-nectar hover:text-cream"
      : "border border-botanical-700/30 bg-transparent text-botanical-800 hover:text-cream";

  return (
    <AnchorLink
      className={`${base} ${skin}`}
      onClick={() => setSelectedPage(SelectedPage.ContactUs)}
      href="#contactus"
    >
      {/* Nectar fill that rises on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 bg-botanical-700 transition-transform duration-300 ease-out group-hover:scale-y-100"
      />
      <span className="relative z-10">{children}</span>
    </AnchorLink>
  );
};

export default ActionButton;
