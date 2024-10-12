import Logo from "@/assets/Logo.png";
import Strings from "@/assets/strings.json";

const Footer = () => {
  return (
  <footer className="bg-primary-100 py-16">
    <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
            <img alt="logo" src={Logo}/>
            <p className="my-5">{Strings.footerSection.WedLoveToHearFromYouWhetherYouHaveQuestions}</p>
            <p>{Strings.footerSection.copyRight}</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">{Strings.footerSection.Links}</h4>
          <p className="my-5"> link 1, fill later </p>
          <p className="my-5"> link 2, fill later </p>
          <p> TEXT TEXT </p>
        </div>        
        <div>
          <h4 className="font-bold">{Strings.footerSection.ContactUs}</h4>
          <p className="my-5">{Strings.footerSection.Email}</p>
          <p>{Strings.footerSection.Phone}</p>
          <p>{Strings.footerSection.Address}</p>
          <p>{Strings.footerSection.FollowUs}</p>
          <p>{Strings.footerSection.HoursOfOperation}</p>  
          <p>{Strings.footerSection.ContactForm}</p>  
        </div>
    </div>
  </footer>
  )
};
export default Footer;