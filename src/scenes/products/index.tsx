import image1 from "@/assets/image1.png"
import image2 from "@/assets/image2.png"
import image3 from "@/assets/image3.png"
import image4 from "@/assets/image4.png"
import image5 from "@/assets/image5.png"
import image6 from "@/assets/image6.png"
import Strings from "@/assets/strings.json"
import HText from '@/shared/HText'
import { ProductType, SelectedPage } from '@/shared/types'
import { motion } from 'framer-motion'
import Product from "./Product"

const products: Array<ProductType> = [
    {
        name: "BIRD FEEDER 1",
        description: "BIRD FEEDER 1 DESCRIPTION",
        image: image1
    },
    {
        name: "BIRD FEEDER 2",
        image: image2
    },
    {
        name: "BIRD FEEDER 3",
        description: "BIRD FEEDER 3 DESCRIPTION",
        image: image3
    },
    {
        name: "BIRD FEEDER 4",
        description: "BIRD FEEDER 4 DESCRIPTION",
        image: image4
    },
    {
        name: "BIRD FEEDER 5",
        image: image5
    },
    {
        name: "BIRD FEEDER 6",
        description: "BIRD FEEDER 6 DESCRIPTION",
        image: image6
    },
]

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
};

const Products = ({ setSelectedPage }: Props) => {
  return (
    <section id="ourproducts" className="w-full bg-primary-100 py-40">
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.Products)}
        >
          <motion.div
            className="mx-auto w-5/6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5}}
            transition={{ duration: 0.5}}
            variants={{ 
              hidden: { opacity: 0, x:-50} , 
              visible: { opacity: 1, x: 0},
            }}
            >
            <div className="md:w-3/5">
                <HText>{Strings.productsPage.Header}</HText>
                <p className="py-5">{Strings.productsPage.description}</p>
            </div>
          </motion.div>
          <div className="mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden">
            <ul className="w-[2800px] whitespace-nowrap">
              {products.map((item, index) => (
                <Product
                  key={`${item.name}-${index}`}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                />
              ))}
            </ul>
          </div>
        </motion.div>
    </section>
  )
};

export default Products;