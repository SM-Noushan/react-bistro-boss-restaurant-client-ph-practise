import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAxiosSecure from "./useAxiosSecure";

const useFetchData = (qKey, url, dependencies = {}) => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [qKey, dependencies],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(url);
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
