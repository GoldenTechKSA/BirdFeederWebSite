import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Display heading in the brand serif. Sizing/layout is left to the caller. */
const HText = ({ children, className = "" }: Props) => {
  return (
    <h2
      className={`font-serif text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
};

export default HText;
