import { Helmet } from "react-helmet-async";
import cover from "../../assets/menu/banner3.jpg";
import soupURL from "../../assets/menu/soup-bg.jpg";
import pizzaURL from "../../assets/menu/pizza-bg.jpg";
import saladURL from "../../assets/menu/salad-bg.jpg";
import desertURL from "../../assets/menu/dessert-bg.jpeg";
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
          url: cover,
          heading: "OUR MENU",
          desc: "Would you like to try a dish?",
        }}
        section={{
          heading: "TODAY'S OFFER",
          subHeading: "Don't miss",
        }}
        dataType={{
          key: "todaysOfferMenu",
          category: "offer",
        }}
      />
      {/* desserts */}
      <MenuType
        banner={{
          url: desertURL,
          heading: "DESSERTS",
          desc: "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          type: true,
        }}
        dataType={{
          key: "dessertsMenu",
          category: "desserts",
        }}
      />
      {/* pizzas */}
      <MenuType
        banner={{
          url: pizzaURL,
          heading: "PIZZA",
          desc: "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          type: true,
        }}
        dataType={{
          key: "pizzaMenu",
          category: "pizza",
        }}
      />
      {/* salad */}
      <MenuType
        banner={{
          url: saladURL,
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
          url: soupURL,
          heading: "SOUPS",
          desc: "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          type: true,
        }}
        dataType={{
          key: "soupsMenu",
          category: "soups",
        }}
      />
    </>
  );
};

export default Menu;
