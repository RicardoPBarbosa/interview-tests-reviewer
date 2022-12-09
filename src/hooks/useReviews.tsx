import uuid from "react-uuid";

import { useStore } from "store";
import { ItemTypes, Review, ReviewMetric } from "@types";

export default function useReviews() {
  const { reviews, addItem, editItem, removeItem } = useStore(
    ({ reviews, addItem, editItem, removeItem }) => ({
      reviews,
      addItem,
      editItem,
      removeItem,
    })
  );

  function insertReview(
    candidateName: string,
    metrics: ReviewMetric[],
    finalScore: number,
    notes?: string
  ) {
    const payload: Review = {
      id: uuid(),
      candidateName,
      metrics,
      finalScore,
      notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addItem(ItemTypes.REVIEW, payload);

    return payload.id;
  }

  function editReview(review: Review) {
    editItem(ItemTypes.REVIEW, { ...review, updatedAt: new Date() });
  }

  function removeReview(reviewId: string) {
    removeItem(ItemTypes.REVIEW, reviewId);
  }

  return { reviews, insertReview, editReview, removeReview };
}
