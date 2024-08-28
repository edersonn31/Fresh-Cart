import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function useProducts() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let response = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: Infinity, // Prevent refetching by making data always fresh
    cacheTime: Infinity, // Prevent cache invalidation
  });
  return response;
}
