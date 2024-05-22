import { FaTrashCan } from "react-icons/fa6";
import SectionHeading from "../../../components/home/SectionHeading";
import Spinner from "../../../components/shared/Spinner";
import useAuth from "../../../hooks/useAuth";
import useFetchData from "../../../hooks/useFetchData";

const MyCart = () => {
  const { user } = useAuth();
  const { data, isLoading } = useFetchData(
    "myCartData",
    `carts?userId=${user.uid}`
  );
  
  return (
    <>
      <SectionHeading heading="WANNA ADD MORE?" subHeading="---My Cart---" />

      <div>
        <div className="overflow-x-auto rounded-t-xl font-inter">
          {isLoading ? (
            <Spinner />
          ) : data?.length > 0 ? (
            <table className="table *:text-base">
              {/* head */}
              <thead className="bg-gold-054">
                <tr className="uppercase text-white font-semibold">
                  <th />
                  <th>Item Image</th>
                  <th>Item Name</th>
                  <th>Base</th>
                  <th>Quantity</th>
                  <th>Price</th>
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
                        src={item.details.image}
                        alt="menu-image"
                        className="size-[75px] rounded-md object-cover object-center"
                      />
                    </td>
                    <td className="">{item.details.name}</td>
                    <td>${item.details.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      $
                      {(
                        Number.parseFloat(item.quantity) *
                        Number.parseFloat(item.details.price)
                      ).toFixed(2)}
                    </td>
                    <td>
                      <button className="bg-red-c1c/80 hover:bg-red-c1c w-fit p-3.5 rounded-lg text-white">
                        <FaTrashCan />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default MyCart;
