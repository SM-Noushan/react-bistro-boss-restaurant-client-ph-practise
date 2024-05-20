import TitleBanner from "../../components/shared/title-banner/TitleBanner";
import MenuItem from "../../components/menu-item/MenuItem";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import SectionHeading from "../../components/home/SectionHeading";
import bannerURL from "../../assets/menu/banner3.jpg";
import bannerURL2 from "../../assets/home/chef-service.jpg";
import useMenu from "../../hooks/useMenu";

const Menu = () => {
  
  return (
    <>
      <Helmet>
        <title>BistroBoss | Our Menu</title>
      </Helmet>
      <TitleBanner
        imgURL={bannerURL}
        heading={"OUR MENU"}
        desc={"Would you like to try a dish?"}
      />
    </>
  );
};

export default Menu;
