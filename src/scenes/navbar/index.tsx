import Strings from "@/assets/strings.json";
import useMediaQuery from "@/hooks/useMediaQuery";
import ActionButton from "@/shared/ActionButton";
import BrandMark from "@/shared/BrandMark";
import { SelectedPage } from "@/shared/types";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Link from "./Link";
import SignInModal from "./SignInModal";

type Props = {
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const USER_STORAGE_KEY = "birdfeeder.user";

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const navbarBackground = isTopOfPage
    ? "py-6"
    : "bg-cream/85 py-4 shadow-soft backdrop-blur-md";

  // Restore a previously signed-in user so the session survives a page reload.
  useEffect(() => {
    const storedUser = window.localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) setUser(storedUser);
  }, []);

  const handleSignIn = (email: string) => {
    setUser(email);
    window.localStorage.setItem(USER_STORAGE_KEY, email);
  };

  const handleSignOut = () => {
    setUser(null);
    window.localStorage.removeItem(USER_STORAGE_KEY);
  };

  // Show the part of the email before the "@" as a friendly display name.
  const displayName = user ? user.split("@")[0] : "";

  const navLinks = [
    Strings.navBarSection.Home,
    Strings.navBarSection.Benefits,
    Strings.navBarSection.OurProducts,
    Strings.navBarSection.ContactUs,
  ];

  const authControl = user ? (
    <div className={`${flexBetween} gap-4 text-sm`}>
      <span className="whitespace-nowrap text-ink/70">
        {Strings.signInPage.Greeting},{" "}
        <span className="font-semibold text-botanical-700">{displayName}</span>
      </span>
      <button
        onClick={handleSignOut}
        className="text-ink/70 transition-colors duration-300 hover:text-botanical-700"
      >
        {Strings.navBarSection.SignOut}
      </button>
    </div>
  ) : (
    <button
      onClick={() => setIsSignInOpen(true)}
      className="text-ink/70 transition-colors duration-300 hover:text-botanical-700"
    >
      {Strings.navBarSection.SignIn}
    </button>
  );

  return (
    <nav>
      <div className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full transition-all duration-300`}>
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* BRAND */}
            <AnchorLink
              href="#home"
              onClick={() => setSelectedPage(SelectedPage.Home)}
              className="flex items-center gap-2.5"
            >
              <BrandMark className="h-9 w-9 text-botanical-700" idSuffix="nav" />
              <span className="font-serif text-xl font-bold tracking-tight text-ink">
                Nectar Haven
              </span>
            </AnchorLink>

            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                <div className="flex items-center gap-8 text-sm font-medium">
                  {navLinks.map((page) => (
                    <Link
                      key={page}
                      page={page}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                  ))}
                </div>
                <div className={`${flexBetween} gap-8`}>
                  {authControl}
                  <ActionButton setSelectedPage={setSelectedPage}>
                    {Strings.navBarSection.BecomeMember}
                  </ActionButton>
                </div>
              </div>
            ) : (
              <button
                className="rounded-full bg-botanical-700 p-2 shadow-soft"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
                aria-label="Open menu"
              >
                <Bars3Icon className="h-6 w-6 text-cream" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {!isAboveMediumScreens && isMenuToggled && (
          <motion.div
            className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-cream shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="flex justify-end p-10">
              <button onClick={() => setIsMenuToggled(false)} aria-label="Close menu">
                <XMarkIcon className="h-6 w-6 text-ink/70 transition hover:text-botanical-700" />
              </button>
            </div>

            <div className="ml-[15%] flex flex-col gap-8 text-2xl font-serif">
              {navLinks.map((page) => (
                <div key={page} onClick={() => setIsMenuToggled(false)}>
                  <Link
                    page={page}
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                </div>
              ))}
              {user ? (
                <div className="flex flex-col gap-3 text-base">
                  <span className="text-ink/70">
                    {Strings.signInPage.Greeting},{" "}
                    <span className="font-semibold text-botanical-700">{displayName}</span>
                  </span>
                  <button
                    className="text-left text-ink/70 transition hover:text-botanical-700"
                    onClick={handleSignOut}
                  >
                    {Strings.navBarSection.SignOut}
                  </button>
                </div>
              ) : (
                <button
                  className="text-left text-base text-ink/70 transition hover:text-botanical-700"
                  onClick={() => {
                    setIsMenuToggled(false);
                    setIsSignInOpen(true);
                  }}
                >
                  {Strings.navBarSection.SignIn}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIGN IN MODAL */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSignIn={handleSignIn}
      />
    </nav>
  );
};

export default Navbar;
