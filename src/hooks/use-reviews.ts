import { useQuery } from "@tanstack/react-query";
import { getReview, getReviews } from "@/services/api";

export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
};

export const useReview = (reviewId: string) => {
  return useQuery({
    queryKey: ["reviews", reviewId],
    queryFn: () => getReview(reviewId),
    enabled: !!reviewId,
  });
};
