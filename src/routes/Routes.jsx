import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/home/Home";
import Menu from "../pages/menu/Menu";
import Shop from "../pages/our-shop/Shop";
import Login from "../pages/auth/login/Login";
import Dashboard from "../layouts/Dashboard";
import MyCart from "../pages/dashboard/user/my-cart/MyCart";
import PrivateRoutes from "../routes/PrivateRoutes";
import AllUsers from "../pages/dashboard/admin/all-users/AllUsers";
import AdminRoutes from "./AdminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: "none",
      },
      {
        path: "my-cart",
        element: <MyCart />,
      },

      // admin routes
      {
        path: "admin/users",
        element: (
          <AdminRoutes>
            <AllUsers />,
          </AdminRoutes>
        ),
      },
    ],
  },
  { path: "login", element: <Login /> },
]);

export default router;
