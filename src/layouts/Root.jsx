import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";

const Root = () => {
  return (
    <>
      <h1 className="text-3xl font-inter">This is Root</h1>
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
