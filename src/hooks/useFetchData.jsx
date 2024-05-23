import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useFetchData = (qKey, url, dependencies = {}, secure = false) => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [qKey, dependencies],
    queryFn: async () => {
      try {
        let res;
        if (secure) {
          res = await axiosSecure.get(url);
        } else res = await axiosPublic.get(url);
        return await res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
  return { data, isLoading, refetch, error };
};

useFetchData.propTypes = {
  qKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default useFetchData;
