import BenefitsPageGraphic from "@/assets/BenefitsPageGraphic.png";
import Strings from "@/assets/strings.json";
import ActionButton from "@/shared/ActionButton";
import HText from "@/shared/HText";
import { BenefitType, SelectedPage } from "@/shared/types";
import {
  AcademicCapIcon,
  HomeModernIcon,
  UserGroupIcon
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Benefit from "./Benefit";

const benefit1 = Strings.benefitsPage.Benefit1;
const desp1 = Strings.benefitsPage.BenefitDecription1;
const benefit2 = Strings.benefitsPage.Benefit2;
const desp2 = Strings.benefitsPage.BenefitDecription2;
const benefit3 = Strings.benefitsPage.Benefit3;
const desp3 = Strings.benefitsPage.BenefitDecription3;
const HappyMembers1 = Strings.benefitsPage.HappyMembers1;
const HappyMembers2 = Strings.benefitsPage.HappyMembers2;
const HappyMembersQuote1 = Strings.benefitsPage.HappyMembersQuote1;
const HappyMembersQuote2 = Strings.benefitsPage.HappyMembersQuote2;
const HappyMembersQuote3 = Strings.benefitsPage.HappyMembersQuote3; 
const HappyMembersQuote4 = Strings.benefitsPage.HappyMembersQuote4; 
const HappyMembersQuote5 = Strings.benefitsPage.HappyMembersQuote5; 
const HappyMembersQuote6 = Strings.benefitsPage.HappyMembersQuote6; 
const HappyMembersQuote7 = Strings.benefitsPage.HappyMembersQuote7; 

const benefits: Array<BenefitType> = [
    {
        icon: <HomeModernIcon className="h-6 w-6" />,
        title: benefit1,
        description: desp1,
    },
    {
        icon: <UserGroupIcon className="h-6 w-6" />,
        title: benefit2,
        description: desp2,
    },
    {
        icon: <AcademicCapIcon className="h-6 w-6" />,
        title: benefit3,
        description: desp3,
    },
]

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 }
    }
}

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Benefits = ({setSelectedPage}: Props) => {
  return (
    <section
    id="benefits"
    className="mx-auto min-h-full w-5/6 py-20">
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.Benefits)}>
        {/* HEADER */}
        <motion.div 
          className="md:my-5 md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5}}
          transition={{ duration: 0.5}}
          variants={{ hidden: { opacity: 0, x:-50} , visible: { opacity: 1, x: 0},}}>
              <HText>{Strings.benefitsPage.Header}</HText>
              <p className = "my-5 text-sm">{Strings.benefitsPage.BenefitsDescription}</p>
        </motion.div>

        {/* BENEFITS */}
        <motion.div 
          className="mt-5 items-center justify-between gap-8 md:flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5}}
          variants={container}
          >
            {benefits.map((benefit: BenefitType) => (
              <Benefit
                key={benefit.title}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                setSelectedPage={setSelectedPage}
              />
            ))}
        </motion.div>

        {/* GRAPHICS AND DSECRIPTION */}
        <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
          {/* GRAPHIC */}
          <img className="mx-auto" alt="benefits-page-graphic" src={BenefitsPageGraphic} />

          {/* DESCRIPTION */}
            <div>
                {/* TITLE */}
                <div className="relative">
                  <div className="before:absolute before:-top-20 before:-left-20 before:z-[-1] before:content-abstractwaves">
                    <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5}}
                    transition={{ duration: 0.5}}
                    variants={{ 
                        hidden: { opacity: 0, x: 50} , 
                        visible: { opacity: 1, x: 0},
                    }}>
                        <HText>
                          {HappyMembers1} {" "}
                          <span className="text-primary-500">Love</span>
                          {" "} {HappyMembers2}
                        </HText>
                    </motion.div>
                  </div>
                </div>

                {/* DESCRIPT */}
                <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5}}
                transition={{ delay: 0.2, duration: 0.5}}
                variants={{ 
                    hidden: { opacity: 0, x: 50} , 
                    visible: { opacity: 1, x: 0},
                }}>
                  <p className="my-5">{HappyMembersQuote1}</p>
                  <p className="mb-5">{HappyMembersQuote2}</p>
                  <p className="mb-5">{HappyMembersQuote3}</p>
                  <p className="mb-5">{HappyMembersQuote4}</p>
                  <p className="mb-5">{HappyMembersQuote5}</p>
                  <p className="mb-5">{HappyMembersQuote6}</p>
                  <p className="mb-5">{HappyMembersQuote7}</p>
                </motion.div>

                {/* BUTTON */}
                <div className="relative mt-16">
                  <div className="before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-sparkles">
                    <ActionButton setSelectedPage={setSelectedPage}>
                        Buy Now
                    </ActionButton>
                  </div>
                </div>
            </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Benefits;