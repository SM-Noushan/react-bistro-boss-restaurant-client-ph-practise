import { useLocation, useNavigate } from "react-router-dom";
import ProtoTypes from "prop-types";
import Spinner from "../components/shared/Spinner";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAdmin, isAdminLoading } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  if (loading || isAdminLoading) return <Spinner />;
  if (user && isAdmin.role) return children;
  if (user) return navigate(-1);
  return navigate("/login", {
    state: { from: location },
  });
};

AdminRoutes.propTypes = {
  children: ProtoTypes.node.isRequired,
};

export default AdminRoutes;
