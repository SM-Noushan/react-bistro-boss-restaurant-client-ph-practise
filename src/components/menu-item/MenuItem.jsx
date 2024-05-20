import PropTypes from "prop-types";

const MenuItem = ({ item }) => {
  const { image, price, name, recipe } = item || {};
  return (
    <div className="flex lg:flex-row gap-8 rounded-md">
      <img
        src={image}
        alt="recipe-image"
        className="w-[118px] h-[104px] rounded-tl-[8px] rounded-tr-[288px] rounded-b-[288px]"
      />
      <div className="flex-1 flex justify-between">
        <div>
          <h1 className="text-xl text-dark-001 font-cinzel uppercase">
            {name || "Unknown"} ------------------
          </h1>
          <p className="text-dark-003 max-w-[400px]">{recipe || "Not Found"}</p>
        </div>
        <h2 className="text-[#BB8506] text-xl">${price || "00"}</h2>
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MenuItem;
