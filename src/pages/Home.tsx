import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-2 py-10">
      <h1 className="text-2xl font-bold pb-4 text-slate-700">Home</h1>
      <Link
        to="/metrics"
        className="bg-slate-200 px-3 py-1 font-medium text-slate-800"
        style={{ fontStretch: "expanded" }}
      >
        metrics
      </Link>
      <Link
        to="/review"
        className="bg-slate-200 px-3 py-1 font-medium text-slate-800"
        style={{ fontStretch: "expanded" }}
      >
        new review
      </Link>
      <Link
        to="/review/1"
        className="bg-slate-200 px-3 py-1 font-medium text-slate-800"
        style={{ fontStretch: "expanded" }}
      >
        review 1
      </Link>
    </div>
  );
}
