import TitleBanner from "../../components/shared/title-banner/TitleBanner";
import MenuItem from "../../components/menu-item/MenuItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionHeading from "../../components/home/SectionHeading";
import bannerURL from "../../assets/menu/banner3.jpg";
import bannerURL2 from "../../assets/home/chef-service.jpg";

const Menu = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["allMenu"],
    queryFn: async () => {
      try {
        const res = await axios.get("data/menu.json");
        return await res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <TitleBanner
        imgURL={bannerURL}
        heading={"OUR MENU"}
        desc={"Would you like to try a dish?"}
      />
    </>
  );
};

export default Menu;
