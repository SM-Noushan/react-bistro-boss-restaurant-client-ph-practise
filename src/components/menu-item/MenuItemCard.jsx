import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MenuItemCard = ({ item }) => {
  const { name, recipe, image, _id } = item || {};

  return (
    <div className="card font-inter w-fit">
      <figure>
        <img src={image} className="w-[424px] h-[300px] rounded-md" />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center text-2xl font-semibold text-dark-001">
          {name || "No Title"}
        </h2>
        <p className="text-dark-003 mb-4">{recipe || "Recipe Not Found"}</p>
        <div className="card-actions justify-center">
          <Link
            to={`recipe/:${_id}`}
            className="btn px-12 uppercase text-xl font-medium text-gold-506 border-b-2 border-b-gold-506 hover:bg-dark-001 hover:text-gold-506"
          >
            Add To Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

MenuItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MenuItemCard;
