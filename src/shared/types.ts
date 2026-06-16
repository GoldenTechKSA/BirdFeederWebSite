export enum SelectedPage {
    Home = "home",
    Benefits = "benefits",
    Products = "ourproducts",
    ContactUs = "contactus"
  }
  

  export interface BenefitType {
    icon: JSX.Element;
    title: string;
    description: string;
  }

  export interface ProductType {
    name: string;
    description?: string;
    image: string;
  }