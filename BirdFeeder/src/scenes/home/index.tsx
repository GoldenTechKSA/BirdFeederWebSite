import useMediaQuery from "@/hooks/useMediaQuery";
import { SelectedPage } from "@/shared/types";
import ActionButton from "@/shared/ActionButton";
import HomePageText from "@/assets/HomePageText.png";

type Props = {
    setSelectedPAge: (value: SelectedPage) => void;
}

const index = ({ setSelectedPage }: Props) => {
  return  <div>Home</div>
}

export default index