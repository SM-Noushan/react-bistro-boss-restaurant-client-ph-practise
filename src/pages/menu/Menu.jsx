import { Helmet } from "react-helmet-async";
import bannerURL from "../../assets/menu/banner3.jpg";
import bannerURL2 from "../../assets/home/chef-service.jpg";
import MenuType from "../../components/menu-item/MenuType";

const Menu = () => {
  return (
    <>
      <Helmet>
        <title>BistroBoss | Our Menu</title>
      </Helmet>
      {/* page banner and toady's offer */}
      <MenuType
        banner={{
          url: bannerURL,
          heading: "OUR MENU",
          desc: "Would you like to try a dish?",
        }}
        section={{
          heading: "TODAY'S OFFER",
          subHeading: "Don't miss",
        }}
        dataType={{
          key: "popularMenu",
          category: "popular",
        }}
      />
      {/* desserts */}
      <MenuType
        banner={{
          url: bannerURL2,
          heading: "DESSERTS",
          desc: "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          type: true,
        }}
        dataType={{
          key: "dessertMenu",
          category: "dessert",
        }}
      />
      {/* pizzas */}
      <MenuType
        banner={{
          url: bannerURL2,
          heading: "PIZZA",
          desc: "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          type: true,
        }}
        dataType={{
          key: "pizzaMenu",
          category: "pizza",
        }}
      />
      {/* salads */}
      <MenuType
        banner={{
          url: bannerURL2,
          heading: "SALADS",
          desc: "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          type: true,
        }}
        dataType={{
          key: "saladMenu",
          category: "salad",
        }}
      />
      {/* soups */}
      <MenuType
        banner={{
          url: bannerURL2,
          heading: "SOUPS",
          desc: "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          type: true,
        }}
        dataType={{
          key: "soupMenu",
          category: "soup",
        }}
      />
    </>
  );
};

export default Menu;
