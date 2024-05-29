import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`admin/verify/${user?.uid}`);
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    enabled: !!user,
  });
  return { isAdmin, isAdminLoading };
};

export default useAdmin;
