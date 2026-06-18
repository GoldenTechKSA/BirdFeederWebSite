import Strings from "@/assets/strings.json";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type SignInForm = {
  email: string;
  password: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (email: string) => void;
};

const SignInModal = ({ isOpen, onClose, onSignIn }: Props) => {
  const inputStyles = "w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>();

  // Close the modal when the user presses Escape.
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const onSubmit = async (data: SignInForm) => {
    // This is a static site with no auth backend, so we simulate the
    // network round-trip and treat any valid input as a successful sign in.
    await new Promise((resolve) => setTimeout(resolve, 600));
    onSignIn(data.email);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl bg-gray-20 p-8 drop-shadow-xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* HEADER */}
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary-500">
                {Strings.signInPage.Title}
              </h2>
              <button type="button" aria-label="Close sign in" onClick={onClose}>
                <XMarkIcon className="h-6 w-6 text-gray-500 transition hover:text-primary-500" />
              </button>
            </div>
            <p className="mb-6 text-sm text-gray-500">{Strings.signInPage.Subtitle}</p>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className={inputStyles}
                type="email"
                placeholder={Strings.signInPage.EmailPlaceholder}
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              {errors.email && (
                <p className="mt-1 text-primary-500">
                  {errors.email.type === "required" && "This field is required."}
                  {errors.email.type === "pattern" && "Invalid email address."}
                </p>
              )}

              <input
                className={`${inputStyles} mt-4`}
                type="password"
                placeholder={Strings.signInPage.PasswordPlaceholder}
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
              />
              {errors.password && (
                <p className="mt-1 text-primary-500">
                  {errors.password.type === "required" && "This field is required."}
                  {errors.password.type === "minLength" &&
                    "Password must be at least 6 characters."}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-lg bg-secondary-500 px-10 py-3 transition duration-500 hover:bg-primary-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? Strings.signInPage.SigningIn : Strings.signInPage.SignIn}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignInModal;
