import { useQuery } from "@tanstack/react-query";
import {
  getSubCollections,
  getSubCollection,
  type Subcollection,
} from "@/services/api";

export const useSubCollections = (collectionIds: string) => {
  return useQuery<Subcollection[], Error>({
    queryKey: ["subcollections", collectionIds],
    queryFn: () => getSubCollections(collectionIds.split(",")),
    enabled: !!collectionIds,
    retry: 1,
    staleTime: 30000, // Cache for 30 seconds
  });
};
export const useSubCollection = (subcollectionId: string) => {
  return useQuery<Subcollection, Error>({
    queryKey: ["subcollections", subcollectionId],
    queryFn: () => getSubCollection(subcollectionId),
    enabled: !!subcollectionId,
  });
};
