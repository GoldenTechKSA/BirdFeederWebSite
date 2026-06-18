import Logo from "@/assets/Logo.png";
import Strings from "@/assets/strings.json";

const Footer = () => {
  return (
  <footer className="bg-primary-100 py-16">
    <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
            <img alt="logo" src={Logo} className="h-auto w-[92px]" />
            <p className="my-5">{Strings.footerSection.WedLoveToHearFromYouWhetherYouHaveQuestions}</p>
            <p>{Strings.footerSection.copyRight}</p>
            <p className="mt-2 text-sm text-gray-500">{Strings.footerSection.PrivacyStatement}</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">{Strings.footerSection.Links}</h4>
          {Strings.footerSection.helpfulLinks.map((link) => (
            <p className="my-5" key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition duration-500 hover:text-primary-500"
              >
                {link.label}
              </a>
            </p>
          ))}
        </div>        
        <div>
          <h4 className="font-bold">{Strings.footerSection.ContactUs}</h4>
          <p className="my-5">{Strings.footerSection.Email}</p>
          <p>{Strings.footerSection.Phone}</p>
          <p>{Strings.footerSection.Address}</p>
          <p>{Strings.footerSection.FollowUs}</p>
          <p>{Strings.footerSection.HoursOfOperation}</p>
        </div>
    </div>
  </footer>
  )
};
export default Footer;