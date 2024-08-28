import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetWishList() {
  return useQuery({
    queryKey: ["wishList"],
    staleTime: Infinity, // Prevent refetching by making data always fresh
    cacheTime: Infinity, // Prevent cache invalidation
    queryFn: async () => {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}
