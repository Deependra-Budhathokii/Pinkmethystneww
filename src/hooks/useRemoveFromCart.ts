import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const res = await axios.delete("/api/cart/edit", {
        data: { productId },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
