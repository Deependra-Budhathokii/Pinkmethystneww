import { useQuery } from "@tanstack/react-query";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      return data.cart;
    },
  });
};
