import { useQuery } from "@tanstack/react-query";
import { getProducts, getProduct } from "@/services/api";
import axios from "axios";

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

// Products by collection hooks
export const useProductsByCollection = (slug: string) => {
  return useQuery({
    queryKey: ["products", "collection", slug],
    queryFn: async () => {
      const { data } = await axios.get(`/api/products/by-collection/${slug}`);
      return data;
    },
    enabled: !!slug, // only fetch if slug exists
  });
};
