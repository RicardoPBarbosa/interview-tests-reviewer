import { toast } from "react-toastify";
import { IdentificationBadge } from "phosphor-react";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, lazy, Suspense, useState } from "react";

import { useReviews } from "hooks";
import { ReviewMetric } from "@types";
import useReview from "hooks/useReview";
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import { confirm } from "components/Confirm";
import TextInput from "components/TextInput";
const Notes = lazy(() => import("./components/Notes"));
const MetricsByGroup = lazy(() => import("./components/MetricsByGroup"));

export default function Review() {
  const { id } = useParams();
  const review = useReview(id);
  const navigate = useNavigate();
  const { insertReview, editReview, removeReview } = useReviews();
  const [candidateName, setCandidateName] = useState(
    review?.candidateName || ""
  );
  const [candidateMetrics, setCandidateMetrics] = useState<ReviewMetric[]>(
    review?.metrics || []
  );
  const [notes, setNotes] = useState(review?.notes || "");
  const [finalScore, setFinalScore] = useState(review?.finalScore || 0);
  const submitDisabled = !candidateName.trim().length || !finalScore;
  const isReviewDetails = !!review;

  if (!!id && !review) {
    return <NotFound />;
  }

  function done(reviewId: string) {
    toast.info(`Review ${isReviewDetails ? "edited" : "created"} successfully`);
    window.scrollTo(0, 0);
    return navigate(`/review/${reviewId}`);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!submitDisabled) {
      if (isReviewDetails) {
        // Submit edits to existing review
        editReview({
          ...review,
          candidateName,
          metrics: candidateMetrics,
          finalScore,
          notes,
        });

        return done(review.id);
      }

      // Create new review
      const reviewId = insertReview(
        candidateName,
        candidateMetrics,
        finalScore,
        notes
      );

      return done(reviewId);
    }
  }

  async function handleRemoveReview() {
    if (
      isReviewDetails &&
      (await confirm("Are you sure you want to delete this review?"))
    ) {
      removeReview(review.id);
      toast.success("Review removed successfully");
      return navigate("/");
    }
  }

  return (
    <div className="flex flex-col gap-2 max-w-4xl mx-auto w-full print:p-5 print:pt-10 relative">
      {isReviewDetails && (
        <button
          className="print:hidden main-button self-end absolute -top-11 right-0"
          onClick={() => window.print()}
        >
          Save PDF
        </button>
      )}
      <form
        onSubmit={onSubmit}
        className="max-w-4xl mx-auto w-full flex flex-col gap-5 pb-4 pt-2"
      >
        <TextInput
          name="reviewCandidateName"
          value={candidateName}
          placeholder="Candidate name"
          setValue={setCandidateName}
          startIcon={
            <IdentificationBadge
              size={28}
              weight="regular"
              className="text-slate-300 group-focus-within:text-slate-800"
            />
          }
        />
        <Suspense fallback={<Loading />}>
          <MetricsByGroup
            candidateMetrics={candidateMetrics}
            setCandidateMetrics={setCandidateMetrics}
            finalScore={finalScore}
            setFinalScore={setFinalScore}
          />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Notes
            notes={notes}
            setNotes={setNotes}
            isReviewDetails={isReviewDetails}
          />
        </Suspense>
        <div className="flex gap-4 print:hidden">
          {isReviewDetails && (
            <button
              type="button"
              className="main-button bg-red-100 text-red-700 hover:bg-red-200 !ring-red-400"
              onClick={handleRemoveReview}
            >
              Delete review
            </button>
          )}
          <button
            type="submit"
            className="main-button py-3 flex-1"
            disabled={submitDisabled}
          >
            {isReviewDetails ? "Save changes" : "Submit review"}
          </button>
        </div>
        {isReviewDetails && (
          <p className="hidden print:block w-full text-right text-slate-500">
            {new Date(review.updatedAt).toLocaleDateString(undefined, {
              dateStyle: "medium",
            })}
          </p>
        )}
      </form>
    </div>
  );
}
