import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity }: AddToCartPayload) => {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add to cart");
      return data;
    },
    onSuccess: () => {
      toast.success("Product added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add to cart");
    },
  });
}
