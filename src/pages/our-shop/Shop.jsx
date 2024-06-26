import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import queryString from "query-string";
import useFetchData from "../../hooks/useFetchData";
import Tab from "../../components/our-shop/Tab";
import bannerURL from "../../assets/shop/banner2.jpg";
import MenuItemCard from "../../components/menu-item/MenuItemCard";
import TitleBanner from "../../components/shared/title-banner/TitleBanner";

const Shop = () => {
  const tabs = ["salad", "pizza", "soups", "desserts", "drinks", "offer"];
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(params.get("category"));

  const handleTab = (label) => {
    setTabIndex(label);
    const currentQuery = { category: label };
    const url = queryString.stringifyUrl({
      url: "/shop",
      query: currentQuery,
    });
    navigate(url);
  };

  const { data, isLoading } = useFetchData(
    `${tabIndex}Menu`,
    `menu?category=${tabIndex}`
  );

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
            <Tab key={idx} label={tab} index={tabIndex} handleTab={handleTab} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
          {isLoading
            ? "Loading"
            : data.length > 0
            ? data.map((item) => <MenuItemCard key={item._id} item={item} />)
            : "No Data"}
        </div>
      </div>
    </>
  );
};

export default Shop;
