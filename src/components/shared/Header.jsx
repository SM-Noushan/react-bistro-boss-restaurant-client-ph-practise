import { NavLink } from "react-router-dom";

const navLinks = (
  <>
    <li>
      <NavLink>Navbar Item 2</NavLink>
    </li>
    <li>
      <NavLink>Navbar Item 2</NavLink>
    </li>
    <li>
      <NavLink>Navbar Item 3</NavLink>
    </li>
  </>
);

const Header = () => {
  return (
    <div className="drawer lg:text-white z-10">
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
          <div className="flex-1 px-2 mx-2 text-white">Bistro Boss</div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal gap-x-4">
              {/* Navbar menu content here */}
              {navLinks}
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          {navLinks}
        </ul>
      </div>
    </div>
  );
};

export default Header;
