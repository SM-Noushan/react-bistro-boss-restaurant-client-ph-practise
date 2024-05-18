import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <h1 className="text-3xl font-inter">This is Root</h1>
      <Outlet />
    </>
  );
};

export default Root;
