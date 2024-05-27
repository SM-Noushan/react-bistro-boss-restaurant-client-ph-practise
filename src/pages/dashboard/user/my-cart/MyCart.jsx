import { FaPencil, FaTrashCan } from "react-icons/fa6";
import SectionHeading from "../../../../components/home/SectionHeading";
import Spinner from "../../../../components/shared/Spinner";
import useAuth from "../../../../hooks/useAuth";
import useFetchData from "../../../../hooks/useFetchData";
import Swal from "sweetalert2";
import "animate.css";
import { useQueryClient } from "@tanstack/react-query";
import useSendData from "../../../../hooks/useSendData";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const swalWithCustomButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-error text-white",
    cancelButton: "btn btn-info text-white ml-4",
  },
  buttonsStyling: false,
});

const MyCart = ({ role = null }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data, isLoading } = useFetchData(
    `${role === "manage" ? "allMenuItem" : "myCartData"}`,
    `${role === "manage" ? "menu" : `carts?userId=${user.uid}`}`,
    {},
    `${role === "manage" ? false : true}`
  );

  const onSuccess = () => {
    role === "manage"
      ? queryClient.invalidateQueries(["allMenuItem"])
      : queryClient.invalidateQueries(["totalCartItems, myCartData"]);
  };

  const { mutateAsync: removeItemMutation } = useSendData(onSuccess);

  const handleDelete = (id) => {
    swalWithCustomButtons
      .fire({
        title: "Do you want to proceed?",
        text: `Item will be ${
          role === "manage" ? "deleted" : "removed from the cart"
        }`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: role === "manage" ? "Delete" : "Remove",
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
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const object = {
              method: "delete",
              url:
                role === "manage" ? `menu/${id}` : `cart/${id}?uid=${user.uid}`,
            };

            const res = await removeItemMutation(object);
            // console.log(res);
            if (res.data?.deletedCount)
              Swal.fire({
                title: role === "manage" ? "Deleted" : "Removed",
                text:
                  role === "manage"
                    ? "Successfully deleted"
                    : "Successfully removed from cart",
                icon: "success",
              });
          } catch (error) {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Please try again",
              icon: "error",
            });
          }
        } else
          Swal.fire({
            title: "Cancelled!",
            text: "Request Cancelled",
            icon: "error",
          });
      });
  };

  return (
    <>
      <SectionHeading
        heading={role === "manage" ? "MANAGE ALL ITEMS" : "WANNA ADD MORE?"}
        subHeading={role === "manage" ? "Hurry Up" : "My Cart"}
      />

      <div>
        <div className="overflow-x-auto rounded-t-xl font-inter">
          {isLoading ? (
            <Spinner />
          ) : data?.length > 0 ? (
            <>
              <div className="flex justify-between items-center font-cinzel font-bold text-dark-001 text-[32px] mb-6">
                <h1>
                  Total {role === "manage" ? "Items" : "Orders"}: {data.length}{" "}
                </h1>
                {role !== "manage" && (
                  <>
                    <h1>
                      Total Price: $
                      {data
                        .reduce(
                          (acc, curr) =>
                            acc +
                            Number.parseFloat(curr.quantity) *
                              Number.parseFloat(curr.details.price),
                          0
                        )
                        .toFixed(2)}
                    </h1>
                    <Link
                      to="/dashboard/reservation"
                      className="bg-gold-054 hover:brightness-90 px-4 py-3 rounded-md text-xl text-white"
                    >
                      Pay{" "}
                    </Link>
                  </>
                )}
              </div>

              <table className="table *:text-base">
                {/* head */}
                <thead className="bg-gold-054">
                  <tr className="uppercase text-white font-semibold">
                    <th />
                    <th>Item Image</th>
                    <th>Item Name</th>
                    <th>{role === "manage" ? "Price" : "Base"}</th>
                    {role !== "manage" && <th>Quantity</th>}
                    {role !== "manage" && <th>Price</th>}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row */}
                  {data.map((item, idx) => (
                    <tr key={item._id} className="text-dark-003 hover">
                      <th>{idx + 1}</th>
                      <td>
                        <img
                          src={item.details?.image || item.image}
                          alt="menu-image"
                          className="size-[75px] rounded-md object-cover object-center"
                        />
                      </td>
                      <td className="">{item.details?.name || item.name}</td>
                      <td>${item.details?.price || item.price}</td>
                      {role !== "manage" && <td>{item.quantity}</td>}
                      {role !== "manage" && (
                        <td>
                          $
                          {(
                            Number.parseFloat(item.quantity) *
                            Number.parseFloat(item.details.price)
                          ).toFixed(2)}
                        </td>
                      )}
                      <td className="space-x-4">
                        {role === "manage" && (
                          <Link
                            to={`/dashboard/admin/item/update/${item._id}`}
                            className="btn bg-gold-054/80 hover:bg-gold-054 w-fit p-3.5 rounded-lg text-white"
                          >
                            <FaPencil />
                          </Link>
                        )}
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-c1c/80 hover:bg-red-c1c w-fit p-3.5 rounded-lg text-white"
                        >
                          <FaTrashCan />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div
              role="alert"
              className="alert alert-info flex justify-center rounded-md my-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Empty Cart</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

MyCart.propTypes = {
  role: PropTypes.string,
};

export default MyCart;
