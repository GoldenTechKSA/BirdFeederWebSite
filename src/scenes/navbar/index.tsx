import Logo from "@/assets/Logo.png";
import Strings from "@/assets/strings.json";
import useMediaQuery from "@/hooks/useMediaQuery";
import ActionButton from "@/shared/ActionButton";
import { SelectedPage } from "@/shared/types";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
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
 const [ isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
 const [ isSignInOpen, setIsSignInOpen ] = useState<boolean>(false);
 const [ user, setUser ] = useState<string | null>(null);
 const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
 const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";

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

 const authControl = user ? (
   <div className={`${flexBetween} gap-4 text-sm`}>
     <span className="whitespace-nowrap">
       {Strings.signInPage.Greeting}, <span className="font-bold text-primary-500">{displayName}</span>
     </span>
     <button
       onClick={handleSignOut}
       className="transition duration-500 hover:text-primary-300"
     >
       {Strings.navBarSection.SignOut}
     </button>
   </div>
 ) : (
   <button
     onClick={() => setIsSignInOpen(true)}
     className="transition duration-500 hover:text-primary-300"
   >
     {Strings.navBarSection.SignIn}
   </button>
 );
  return <nav>
    <div className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}
    >
        <div className = {`${flexBetween} mx-auto w-5/6`}>
            <div className = {`${flexBetween} w-full gap-16`}>
                {/* LEFT SIDE */}
                <img alt="logo" src={Logo} className="h-auto w-[92px]" />

                {/* RIGHT SIDE */}
                {isAboveMediumScreens ? (
                <div className={`${flexBetween} w-full`}>
                   <div className = {`${flexBetween} gap-8 text-sm`}>
                    <Link 
                    page={Strings.navBarSection.Home}
                    selectedPage ={selectedPage}
                    setSelectedPage={setSelectedPage}
                    />
                    <Link 
                    page={Strings.navBarSection.Benefits}
                    selectedPage ={selectedPage}
                    setSelectedPage={setSelectedPage}
                    />
                    <Link 
                    page={Strings.navBarSection.OurProducts}
                    selectedPage ={selectedPage}
                    setSelectedPage={setSelectedPage}
                    />
                    <Link 
                    page ={Strings.navBarSection.ContactUs}
                    selectedPage ={selectedPage}
                    setSelectedPage={setSelectedPage}
                    />
                   </div>
                   <div className = {`${flexBetween} gap-8`}>
                    {authControl}
                    <ActionButton setSelectedPage={setSelectedPage}>{Strings.navBarSection.BecomeMember}</ActionButton>
                   </div>
                </div> 
                ) : ( 
                    <button
                     className="rounded-full bg-secondary-500 p-2"
                     onClick={() => setIsMenuToggled(!isMenuToggled)}
                    >
                        <Bars3Icon className="h-6 w-6 text-white" />
                    </button>
                   )}
            </div>
        </div>
    </div>

    {/* MOBILE MENU MODAL */}
    {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
            {/*CLOSE ICON*/}
            <div className="flex justify-end p-12">
                <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                  <XMarkIcon className="h-6 w-6 text-gray-400" />
                </button>
            </div>

        {/*MENU ITEMS */}
        <div className = "ml-[33%] flex flex-col gap-10 text-2xl">
            <Link 
            page={Strings.navBarSection.Home}
            selectedPage ={selectedPage}
            setSelectedPage={setSelectedPage}
            />
            <Link 
            page={Strings.navBarSection.Benefits}
            selectedPage ={selectedPage}
            setSelectedPage={setSelectedPage}
            />
            <Link 
            page={Strings.navBarSection.OurProducts}
            selectedPage ={selectedPage}
            setSelectedPage={setSelectedPage}
            />
            <Link
            page ={Strings.navBarSection.ContactUs}
            selectedPage ={selectedPage}
            setSelectedPage={setSelectedPage}
            />
            {user ? (
              <div className="flex flex-col gap-4">
                <span>
                  {Strings.signInPage.Greeting},{" "}
                  <span className="font-bold text-primary-500">{displayName}</span>
                </span>
                <button
                  className="text-left transition duration-500 hover:text-primary-300"
                  onClick={handleSignOut}
                >
                  {Strings.navBarSection.SignOut}
                </button>
              </div>
            ) : (
              <button
                className="text-left transition duration-500 hover:text-primary-300"
                onClick={() => {
                  setIsMenuToggled(false);
                  setIsSignInOpen(true);
                }}
              >
                {Strings.navBarSection.SignIn}
              </button>
            )}
            </div>
        </div>
    )}

    {/* SIGN IN MODAL */}
    <SignInModal
      isOpen={isSignInOpen}
      onClose={() => setIsSignInOpen(false)}
      onSignIn={handleSignIn}
    />
  </nav>;
  
};

export default Navbar;