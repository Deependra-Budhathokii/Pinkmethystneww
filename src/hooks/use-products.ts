import { useQuery } from "@tanstack/react-query";
import { getProducts, getProduct } from "@/services/api";
import axios from "axios";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

// export const useProduct = (productId: string) => {
//   return useQuery({
//     queryKey: ["products", productId],
//     queryFn: () => getProduct(productId),
//     enabled: !!productId,
//   });
// };

//Product pages
export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data } = await axios.get(`/api/products/product/${slug}`);
      return data;
    },
    enabled: !!slug,
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

// Products by sub collection hooks
interface UseProductsBySubCollectionProps {
  collectionSlug: string;
  subcollectionSlug: string;
}

export const useProductsBySubCollection = ({
  collectionSlug,
  subcollectionSlug,
}: UseProductsBySubCollectionProps) => {
  return useQuery({
    queryKey: ["products-by-subcollection", collectionSlug, subcollectionSlug],
    queryFn: async () => {
      const params = new URLSearchParams({
        collection: collectionSlug,
        subcollection: subcollectionSlug,
      });

      const response = await axios.get(
        `/api/products/by-subcollection?${params.toString()}`
      );
      return response.data;
    },
    enabled: !!collectionSlug && !!subcollectionSlug,
  });
};
