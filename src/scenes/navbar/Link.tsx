import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Link = ({ page, selectedPage, setSelectedPage }: Props) => {
  const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;
  const isActive = selectedPage === lowerCasePage;

  return (
    <AnchorLink
      className={`relative pb-1 transition-colors duration-300 ${
        isActive ? "text-botanical-700" : "text-ink/70 hover:text-botanical-700"
      }`}
      href={`#${lowerCasePage}`}
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
      {isActive && (
        <motion.span
          layoutId="navUnderline"
          className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full bg-iridescent"
        />
      )}
    </AnchorLink>
  );
};

export default Link;
