import Strings from "@/assets/strings.json";
import BrandMark from "@/shared/BrandMark";

// Social links — destinations are placeholders for the brand to fill in.
const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    path: "M13.5 21v-7h2.3l.4-2.9h-2.7V9.3c0-.8.3-1.4 1.5-1.4h1.3V5.3C17.6 5.2 16.8 5 15.8 5c-2 0-3.4 1.2-3.4 3.5v2.6H10V14h2.4v7h1.1z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M17.5 5h2.4l-5.3 6 6.2 8h-4.9l-3.8-5-4.4 5H5.3l5.6-6.4L4.9 5h5l3.4 4.5L17.5 5zm-.9 12.4h1.3L8.1 6.3H6.7l9.9 11.1z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    path: "M6.9 8.5A1.6 1.6 0 1 0 6.9 5.3a1.6 1.6 0 0 0 0 3.2zM5.6 19h2.6v-9H5.6v9zm5 0h2.6v-4.8c0-1.3.9-1.6 1.3-1.6.4 0 1.2.3 1.2 1.6V19h2.6v-4.8c0-2.7-1.3-3.9-3-3.9-1.4 0-2 .8-2.3 1.3V10h-2.4v9z",
  },
];

const footerNav = [
  { label: Strings.navBarSection.Home, href: "#home" },
  { label: Strings.navBarSection.Benefits, href: "#benefits" },
  { label: Strings.navBarSection.OurProducts, href: "#ourproducts" },
  { label: Strings.navBarSection.ContactUs, href: "#contactus" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-botanical-950 text-cream">
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-24 h-80 w-80 rounded-full bg-iris-emerald/15 blur-3xl"
      />

      <div className="relative mx-auto w-5/6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark className="h-9 w-9 text-cream" idSuffix="footer" />
              <span className="font-serif text-xl font-bold tracking-tight text-cream">
                Nectar Haven
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/65">
              {Strings.footerSection.WedLoveToHearFromYouWhetherYouHaveQuestions}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-300 hover:bg-cream hover:text-botanical-900"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-cream">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream/65 transition-colors duration-300 hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* HELPFUL LINKS */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-cream">
              {Strings.footerSection.Links}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {Strings.footerSection.helpfulLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/65 transition-colors duration-300 hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-cream">
              {Strings.footerSection.ContactUs}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/65">
              <li>
                <a
                  href={`mailto:${Strings.footerSection.Email}`}
                  className="transition-colors duration-300 hover:text-cream"
                >
                  {Strings.footerSection.Email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${Strings.footerSection.Phone.replace(/[^\d+]/g, "")}`}
                  className="transition-colors duration-300 hover:text-cream"
                >
                  {Strings.footerSection.Phone}
                </a>
              </li>
              <li>{Strings.footerSection.Address}</li>
              <li>{Strings.footerSection.HoursOfOperation}</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{Strings.footerSection.copyRight}</p>
          <p>{Strings.footerSection.PrivacyStatement}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
