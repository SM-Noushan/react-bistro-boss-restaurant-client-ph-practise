import useAuth from "./useAuth";
import useFetchData from "./useFetchData";

const useAdmin = () => {
  const { user } = useAuth();
  const { data: isAdmin, isLoading } = useFetchData(
    "isAdmin",
    `admin/verify/${user?.uid}`,
    () => {},
    true
  );
  return { isAdmin, isLoading };
};

export default useAdmin;