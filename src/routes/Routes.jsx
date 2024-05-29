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
import Reservation from "../pages/dashboard/user/reservation/Reservation";
import PaymentHistory from "../pages/dashboard/user/payment-history/PaymentHistory";
import AddItem from "../pages/dashboard/admin/items/add-item/AddItem";
import AdminHome from "../pages/dashboard/admin/home/AdminHome";
import UserHome from "../pages/dashboard/user/home/UserHome";

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
        element: <UserHome />,
      },
      {
        path: "reservation",
        element: <Reservation />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "my-cart",
        element: <MyCart />,
      },

      // admin routes
      {
        path: "admin",
        element: (
          <AdminRoutes>
            <AdminHome />,
          </AdminRoutes>
        ),
      },
      {
        path: "admin/users",
        element: (
          <AdminRoutes>
            <AllUsers />,
          </AdminRoutes>
        ),
      },
      {
        path: "admin/item/add",
        element: (
          <AdminRoutes>
            <AddItem />,
          </AdminRoutes>
        ),
      },
      {
        path: "admin/item/manage",
        element: (
          <AdminRoutes>
            <MyCart role="manage" />,
          </AdminRoutes>
        ),
      },
      {
        path: `admin/item/update/:id`,
        element: (
          <AdminRoutes>
            <AddItem update={true} />,
          </AdminRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/menu/${params.id}`),
      },
    ],
  },
  { path: "login", element: <Login /> },
]);

export default router;
