import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";

const useMenu = (qKey, url) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [qKey],
    queryFn: async () => {
      try {
        const res = await axios.get(`http://localhost:5000/${url}`);
        return await res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
  return { data, isLoading, refetch, error };
};

useMenu.propTypes = {
  qKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default useMenu;
