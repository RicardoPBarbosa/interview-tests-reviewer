import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { CircleWavyQuestion, IdentificationBadge } from "phosphor-react";

import Loading from "components/Loading";
const HandleData = lazy(() => import("./components/HandleData"));
const ReviewList = lazy(() => import("./components/ReviewList"));

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center gap-2 py-10">
      <h1
        className="text-2xl font-bold pb-4 text-slate-700"
        style={{ fontStretch: "expanded" }}
      >
        Interview Tests Reviews
      </h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/review" className="home-button dark">
          <IdentificationBadge
            size={28}
            weight="regular"
            className="text-slate-200"
          />
          <span>new review</span>
        </Link>
        <Link to="/metrics" className="home-button">
          <CircleWavyQuestion size={28} weight="regular" />
          <span>metrics</span>
        </Link>
      </div>
      <Suspense fallback={<Loading />}>
        <HandleData />
      </Suspense>
      <div className="max-w-5xl h-1 w-full bg-slate-200 my-3" />
      <Suspense fallback={<Loading />}>
        <ReviewList />
      </Suspense>
    </div>
  );
}
