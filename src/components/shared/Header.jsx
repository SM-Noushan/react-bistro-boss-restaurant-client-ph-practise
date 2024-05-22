import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useFetchData from "../../hooks/useFetchData";

const navLinks = (
  <>
    <NavLink
      to="/"
      className={({ isActive }) =>
        `uppercase text-xl font-extrabold ${
          isActive ? "text-[#EEFF25]" : "text-dark-001 md:text-white"
        }`
      }
    >
      Home
    </NavLink>
    <NavLink
      to="/contact"
      className={({ isActive }) =>
        `uppercase text-xl font-extrabold ${
          isActive ? "text-[#EEFF25]" : "text-dark-001 md:text-white"
        }`
      }
    >
      Contact
    </NavLink>
    <NavLink
      to="/dashboard"
      className={({ isActive }) =>
        `uppercase text-xl font-extrabold ${
          isActive ? "text-[#EEFF25]" : "text-dark-001 md:text-white"
        }`
      }
    >
      Dashboard
    </NavLink>
    <NavLink
      to="/menu"
      className={({ isActive }) =>
        `uppercase text-xl font-extrabold ${
          isActive ? "text-[#EEFF25]" : "text-dark-001 md:text-white"
        }`
      }
    >
      Our Menu
    </NavLink>
    <NavLink
      to="/shop?category=salad"
      className={({ isActive }) =>
        `uppercase text-xl font-extrabold ${
          isActive ? "text-[#EEFF25]" : "text-dark-001 md:text-white"
        }`
      }
    >
      Our Shop
    </NavLink>
  </>
);

const Header = () => {
  const { user, loading, logOut } = useAuth();
  const { data: totalCartItems } = useFetchData(
    "totalCartItems",
    `carts/total/?userUID=${user?.uid}`,
    user?.uid
  );
  const navigate = useNavigate();

  return (
    <div className="drawer lg:text-white z-10 font-inter">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar lg:bg-dark-001/50 fixed z-10">
          <button className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </button>
          <Link
            to="/"
            className="flex-1 px-2 mx-2 text-white text-[32px] font-cinzel font-black"
          >
            <p>
              Bistro Boss <br />
              <span className="font-bold text-2xl tracking-[6.5px]">
                Restaurant
              </span>
            </p>
          </Link>
          <div className="flex-none hidden lg:flex lg:items-center lg:justify-between lg:gap-20">
            <ul className="menu menu-horizontal gap-x-8">
              {/* Navbar menu content here */}
              {navLinks}
            </ul>
          </div>
          <div className="flex justify-between items-center gap-x-4">
            <NavLink
              to="dashboard/my-cart"
              className={({ isActive }) =>
                `relative uppercase text-xl font-extrabold ml-2.5 bg-green-800 rounded-full p-2.5 mr-20 ${
                  isActive && "*:text-[#EEFF25]"
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <div className="absolute badge badge-error text-white">
                +{totalCartItems?.count || 0}
              </div>
            </NavLink>
            {loading ? (
              <div className="w-20 h-8 rounded-md animate-pulse bg-slate-400/50" />
            ) : user ? (
              <button
                onClick={() => {
                  logOut()
                    .then(() => {
                      toast.success("Signout successful");
                      navigate("/login");
                    })
                    .catch(() => {
                      toast.error("Failed! Try again");
                    });
                }}
                className="uppercase text-xl font-extrabold text-dark-001 md:text-white hover:text-[#EEFF25]"
              >
                Sign Out
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `uppercase text-xl font-extrabold ${
                    isActive ? "text-[#EEFF25]" : "text-dark-001 md:text-white"
                  }`
                }
              >
                Login
              </NavLink>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="42"
              viewBox="0 0 45 42"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M37.8511 35.7854C40.0692 33.8885 41.8362 31.5977 43.043 29.0546C44.2497 26.5115 44.8706 23.7701 44.867 21C44.867 9.78125 34.8753 0.6875 22.5488 0.6875C10.2222 0.6875 0.230484 9.78125 0.230484 21C0.226962 23.7701 0.847765 26.5115 2.05452 29.0546C3.26127 31.5977 5.02832 33.8885 7.24643 35.7854C11.3826 39.3414 16.859 41.3195 22.5488 41.3125C28.2386 41.3195 33.7149 39.3414 37.8511 35.7854ZM9.14635 33.1083C10.7534 31.2784 12.7928 29.8015 15.1131 28.7873C17.4333 27.7731 19.9748 27.2477 22.5488 27.25C25.1227 27.2477 27.6642 27.7731 29.9844 28.7873C32.3047 29.8015 34.3441 31.2784 35.9512 33.1083C34.1978 34.7202 32.1103 35.9992 29.8096 36.8711C27.5089 37.743 25.0409 38.1904 22.5488 38.1875C20.0566 38.1904 17.5886 37.743 15.2879 36.8711C12.9873 35.9992 10.8997 34.7202 9.14635 33.1083ZM31.1327 14.75C31.1327 16.822 30.2283 18.8091 28.6185 20.2743C27.0087 21.7394 24.8254 22.5625 22.5488 22.5625C20.2722 22.5625 18.0888 21.7394 16.479 20.2743C14.8692 18.8091 13.9648 16.822 13.9648 14.75C13.9648 12.678 14.8692 10.6909 16.479 9.22573C18.0888 7.7606 20.2722 6.9375 22.5488 6.9375C24.8254 6.9375 27.0087 7.7606 28.6185 9.22573C30.2283 10.6909 31.1327 12.678 31.1327 14.75Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full space-y-4 bg-base-300">
          {/* Sidebar content here */}
          {navLinks}
        </ul>
      </div>
    </div>
  );
};

export default Header;
