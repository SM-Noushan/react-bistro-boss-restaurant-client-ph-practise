import { Navigate, useLocation } from "react-router-dom";
import ProtoTypes from "prop-types";
import Spinner from "../components/shared/Spinner";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoutes = ({ children }) => {
  const { user, loading, logOut } = useAuth();
  const { isAdmin, isAdminLoading } = useAdmin();
  const location = useLocation();
  if (loading || isAdminLoading) return <Spinner />;
  if (user && isAdmin.role) return children;
  if (user)
    logOut().then(() => (
      <Navigate state={{ from: location }} to="/login"></Navigate>
    ));
  return <Navigate state={{ from: location }} to="/login"></Navigate>;
};

AdminRoutes.propTypes = {
  children: ProtoTypes.node.isRequired,
};

export default AdminRoutes;
