import { Helmet } from "react-helmet-async";
import TitleBanner from "../../components/shared/title-banner/TitleBanner";
import bannerURL from "../../assets/shop/banner2.jpg";
import { useEffect, useState } from "react";
import Tab from "../../components/our-shop/Tab";

const Shop = () => {
  const tabs = ["salad", "pizza", "soups", "desserts", "drinks"];
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    console.log(tabIndex);
  }, [tabIndex]);
  return (
    <>
      <Helmet>
        <title>BistroBoss | Our Shop</title>
      </Helmet>
      <TitleBanner
        imgURL={bannerURL}
        heading="OUR SHOP"
        desc="Would you like to try a dish?"
      />
      <div className="mx-auto container xl:max-w-[1320px] font-inter my-20">
        <div role="tablist" className="tabs w-fit mx-auto space-x-8">
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              sl={idx}
              label={tab}
              index={{ tabIndex, setTabIndex }}
            />
          ))}
        </div>
        <div className="">Tab content Here</div>
      </div>
    </>
  );
};

export default Shop;
