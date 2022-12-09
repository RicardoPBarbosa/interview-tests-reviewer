import { Link } from "react-router-dom";

import { useReviews } from "hooks";
import { getRatingColors, sortByUpdateDateDesc } from "utils";

export default function ReviewList() {
  const { reviews } = useReviews();

  return (
    <div className="max-w-5xl grid gap-3 grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
      {reviews.sort(sortByUpdateDateDesc).map((review) => (
        <Link
          key={review.id}
          to={`/review/${review.id}`}
          className="home-button flex-1"
        >
          <div
            className="w-8 h-8 rounded-full flex justify-center items-center text-xs font-extrabold"
            style={getRatingColors(review.finalScore)}
          >
            {review.finalScore}
          </div>
          <h3 className="font-semibold">{review.candidateName}</h3>
          <small
            className="tracking-wider font-semibold text-slate-500"
            style={{ fontStretch: "normal" }}
          >
            {new Date(review.updatedAt).toLocaleDateString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>
        </Link>
      ))}
    </div>
  );
}
