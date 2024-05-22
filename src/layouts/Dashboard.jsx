import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/shared/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      {/* content */}
      <div className="flex-1 py-12 max-w-screen-lg mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
