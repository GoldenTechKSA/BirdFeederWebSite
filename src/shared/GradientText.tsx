import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Iridescent hummingbird-gorget highlight for a key word in a display heading. */
const GradientText = ({ children, className = "" }: Props) => (
  <span className={`text-iridescent ${className}`}>{children}</span>
);

export default GradientText;
