import { useQuery } from "@tanstack/react-query";
import { getCollections, getCollection } from "@/services/api";
import type { Collection } from "@/services/api";

export const useCollections = () => {
  return useQuery<Collection[], Error>({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  });
};

export const useCollection = (collectionId: string) => {
  return useQuery<Collection[], Error>({
    queryKey: ["collections", collectionId],
    queryFn: () => getCollection(collectionId),
    enabled: !!collectionId,
  });
};
