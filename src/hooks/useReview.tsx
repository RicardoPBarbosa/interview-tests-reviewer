import { useStore } from "store";

export default function useReview(id?: string) {
  const review = useStore(({ reviews }) =>
    reviews.find((review) => review.id === id)
  );

  return review;
}
