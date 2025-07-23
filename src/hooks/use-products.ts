import { useQuery } from "@tanstack/react-query";
import { getProducts, getProduct } from "@/services/api";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });
};
