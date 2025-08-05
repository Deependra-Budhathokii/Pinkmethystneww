import { useQuery } from "@tanstack/react-query";

export type SubCollectionType = {
  _id: string;
  name: string;
  slug: string;
};

export type CollectionNavItem = {
  _id: string;
  name: string;
  slug: string;
  subcollections: SubCollectionType[];
};

const fetchNavMenu = async (): Promise<CollectionNavItem[]> => {
  const res = await fetch("/api/navmenu");
  if (!res.ok) {
    throw new Error("Failed to fetch nav menu");
  }
  return res.json();
};

export const useNavMenu = () => {
  return useQuery<CollectionNavItem[]>({
    queryKey: ["nav-menu"],
    queryFn: fetchNavMenu,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};
