import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSendData = (onSuccess = () => {}) => {
  const axiosSecure = useAxiosSecure();

  return useMutation({
    mutationFn: (object) => {
      const { url, data } = object;
      return axiosSecure.post(url, data);
    },
    onSuccess,
  });
};

export default useSendData;
