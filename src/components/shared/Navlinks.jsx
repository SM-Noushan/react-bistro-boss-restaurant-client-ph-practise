import { NavLink } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";

const Navlinks = () => {
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  return (
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
      {user ? (
        isAdmin?.role ? (
          <NavLink
            to="/dashboard/admin"
            className={({ isActive }) =>
              `uppercase text-xl font-extrabold ${
                isActive ? "text-[#EEFF25]" : "text-dark-001 md:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>
        ) : (
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
        )
      ) : null}
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
};

export default Navlinks;
