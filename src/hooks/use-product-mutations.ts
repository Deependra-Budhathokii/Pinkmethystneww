import { useMutation } from "@tanstack/react-query";
import { createProduct, type Product } from "@/services/api";
import { toast } from "react-hot-toast";

export function useCreateProduct() {
  return useMutation({
    mutationFn: (
      product: Omit<Product, "_id"> & { isInStockClearance?: boolean }
    ) =>
      createProduct({
        ...product,
        isInStockClearance: product.isInStockClearance ?? false,
      }),
    onSuccess: () => {
      toast.success("Product created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
