import { SelectedPage } from "@/shared/types";
import type { ReactNode } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  children: ReactNode;
  setSelectedPage: (value: SelectedPage) => void;
  variant?: "solid" | "ghost";
  /**
   * When set, the button navigates to this external URL (e.g. the Stripe
   * Payment Link) instead of smooth-scrolling to the contact section.
   */
  href?: string;
};

/**
 * Primary CTA. By default smooth-scrolls to #contactus and marks that page
 * active. Pass `href` to send the visitor to an external URL (e.g. checkout)
 * instead. Either way it keeps the nectar-fill hover and keyboard focus ring.
 */
const ActionButton = ({ children, setSelectedPage, variant = "solid", href }: Props) => {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nectar-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

  const skin =
    variant === "solid"
      ? "bg-nectar-600 text-cream shadow-nectar hover:text-cream"
      : "border border-botanical-700/30 bg-transparent text-botanical-800 hover:text-cream";

  const className = `${base} ${skin}`;

  const inner = (
    <>
      {/* Nectar fill that rises on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 bg-botanical-700 transition-transform duration-300 ease-out group-hover:scale-y-100"
      />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <a className={className} href={href}>
        {inner}
      </a>
    );
  }

  return (
    <AnchorLink
      className={className}
      onClick={() => setSelectedPage(SelectedPage.ContactUs)}
      href="#contactus"
    >
      {inner}
    </AnchorLink>
  );
};

export default ActionButton;
