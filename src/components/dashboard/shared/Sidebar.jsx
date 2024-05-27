import { Link, NavLink } from "react-router-dom";
import {
  FaBars,
  FaBook,
  FaCartShopping,
  FaHotel,
  FaHouse,
  FaList,
  FaUsersGear,
  FaUtensils,
  FaWallet,
} from "react-icons/fa6";
import useAdmin from "../../../hooks/useAdmin";

const menuItem = (icon, name, url) => (
  <NavLink
    to={url}
    className={({ isActive }) =>
      `uppercase  font-extrabold flex items-center gap-x-2 hover:text-white/80 ${
        isActive ? "text-white font-bold" : "font-medium"
      }`
    }
    end
  >
    {icon}
    {name}
  </NavLink>
);

const Sidebar = () => {
  const { isAdmin } = useAdmin();
  return (
    <div className="drawer !min-h-full lg:drawer-open font-cinzel w-fit z-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <label
        htmlFor="my-drawer-2"
        className="p-2 drawer-button lg:hidden absolute"
      >
        <FaBars className="size-6" />
      </label>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <menu className="menu px-10 py-14 w-80 min-h-full bg-gold-054 text-dark-001 text-base space-y-6">
          {/* Sidebar content here */}
          <Link to="/" className="text-2xl font-black mb-14">
            Bistro Boss <br />
            <span className="font-bold text-lg tracking-[4.67px]">
              Restaurant
            </span>
          </Link>
          {isAdmin?.role ? (
            <>
              {menuItem(
                <FaHouse className="mb-0.5" />,
                "Admin Home",
                "/dashboard/admin/home"
              )}
              {menuItem(
                <FaUtensils className="mb-0.5" />,
                "Add Item",
                "/dashboard/admin/item/add"
              )}
              {menuItem(
                <FaList className="mb-0.5" />,
                "Manage Items",
                "/dashboard/admin/item/manage"
              )}
              {menuItem(
                <FaBook className="mb-0.5" />,
                "Manage Bookings",
                "/dashboard/admin/bookings/manage"
              )}
              {menuItem(
                <FaUsersGear className="mb-0.5" />,
                "All Users",
                "/dashboard/admin/users"
              )}
            </>
          ) : (
            <>
              {menuItem(
                <FaHouse className="mb-0.5" />,
                "User Home",
                "/dashboard"
              )}
              {menuItem(
                <FaHotel className="mb-0.5" />,
                "reservation",
                "reservation"
              )}
              {menuItem(
                <FaWallet className="mb-0.5" />,
                "Payment History",
                "payment-history"
              )}
              {menuItem(
                <FaCartShopping className="mb-0.5" />,
                "My Cart",
                "my-cart"
              )}
            </>
          )}
        </menu>
      </div>
    </div>
  );
};

export default Sidebar;
