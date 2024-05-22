import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "animate.css";
import useAuth from "../../hooks/useAuth";
import useSendData from "../../hooks/useSendData";

const swalWithCustomButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-error text-white",
    cancelButton: "btn btn-info text-white ml-4",
  },
  buttonsStyling: false,
});

const MenuItemCard = ({ item }) => {
  const queryClient = useQueryClient();
  const { name, recipe, image, price, _id } = item || {};
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onSuccess = () => {
    queryClient.invalidateQueries(["totalCartItems"]);
  };

  const { mutateAsync: addToCartMutation } = useSendData(onSuccess);

  const handleCart = async () => {
    if (!user)
      swalWithCustomButtons
        .fire({
          title: "You need to signin first",
          text: "Sign in now?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          showClass: {
            popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
          },
          hideClass: {
            popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/login", {
              state: { from: location },
            });
          }
        });
    else {
      const cartItem = {
        menuID: _id,
        userID: user?.uid,
      };
      // console.log(cartItem);
      try {
        const object = {
          url: "carts",
          data: cartItem,
        };
        const res = await addToCartMutation(object);
        // console.log(res);
        if (res.data?.upsertedCount) toast.success("Added to cart");
        if (res.data?.modifiedCount) toast.success("Increased item quantity");
      } catch (error) {
        console.log(error);
        toast.error("Failed! Try again");
      }
    }
  };

  return (
    <div className="card font-inter w-fit relative">
      <div className="absolute bg-[#111827] text-white font-semibold px-4 py-2 right-6 top-6">
        ${price || 0}
      </div>
      <figure>
        <img src={image} className="w-[424px] h-[300px] rounded-md" />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center text-2xl font-semibold text-dark-001">
          {name || "No Title"}
        </h2>
        <p className="text-dark-003 mb-4">{recipe || "Recipe Not Found"}</p>
        <div className="card-actions justify-center">
          <button
            onClick={handleCart}
            className="btn px-12 uppercase text-xl font-medium bg-dark-006 text-gold-506 border-b-2 border-b-gold-506 hover:bg-dark-001 hover:text-gold-506"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

MenuItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MenuItemCard;
