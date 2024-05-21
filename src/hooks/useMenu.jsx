import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";

const useMenu = (qKey, type = null) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [qKey],
    queryFn: async () => {
      try {
        const res = await axios.get("data/menu.json");
        if (type)
          return await res.data.filter((item) =>
            item.category.toLowerCase().includes(type.toLowerCase())
          );
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
  type: PropTypes.string,
};

export default useMenu;
