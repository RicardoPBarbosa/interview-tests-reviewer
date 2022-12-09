import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function NotFound() {
  const anchorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (anchorRef.current) {
      anchorRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1
        className="font-black text-8xl text-slate-800"
        style={{ fontStretch: "expanded" }}
      >
        404
      </h1>
      <h2
        className="font-extrabold text-3xl mb-4 text-slate-700"
        style={{ fontStretch: "condensed" }}
      >
        Not Found
      </h2>
      <Link to="/" className="main-button py-3 px-6" ref={anchorRef}>
        Go home
      </Link>
    </div>
  );
}
