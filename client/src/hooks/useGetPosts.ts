import { useQuery } from "react-query";
import { API_URL } from "../../utils/api/api-client";

const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return fetch(API_URL).then((res) => res.json());
    },
  });
};

export default useGetPosts;
