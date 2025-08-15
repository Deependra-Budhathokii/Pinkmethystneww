import { useQuery } from "@tanstack/react-query";
import {
  getProductTypes,
  getProductType,
  type ProductType,
} from "@/services/api";

export const useProductTypes = () => {
  return useQuery<ProductType[], Error>({
    queryKey: ["producttypes"],
    queryFn: () => getProductTypes(),
    retry: 1,
    staleTime: 30000,
  });
};

export const useProductType = (productTypeId: string) => {
  return useQuery<ProductType, Error>({
    queryKey: ["productTypes", productTypeId],
    queryFn: () => getProductType(productTypeId),
    enabled: !!productTypeId,
  });
};
