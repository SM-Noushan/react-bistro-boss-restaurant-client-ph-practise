import { Link, NavLink } from "react-router-dom";
import { FaBars, FaCartShopping, FaHotel, FaHouse } from "react-icons/fa6";

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
  return (
    <div className="drawer lg:drawer-open font-cinzel w-fit">
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
        <menu className="menu px-10 py-14 w-80 min-h-dvh bg-gold-054 text-dark-001 text-base space-y-6">
          {/* Sidebar content here */}
          <Link to="/" className="text-2xl font-black mb-14">
            Bistro Boss <br />
            <span className="font-bold text-lg tracking-[4.67px]">
              Restaurant
            </span>
          </Link>
          {menuItem(<FaHouse className="mb-0.5" />, "User Home", "/dashboard")}
          {menuItem(
            <FaHotel className="mb-0.5" />,
            "reservation",
            "reservation"
          )}
          {menuItem(
            <FaCartShopping className="mb-0.5" />,
            "My Cart",
            "my-cart"
          )}
        </menu>
      </div>
    </div>
  );
};

export default Sidebar;
