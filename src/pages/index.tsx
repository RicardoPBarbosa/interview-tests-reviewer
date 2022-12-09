import { CaretCircleLeft } from "phosphor-react";
import { Link, Outlet, useMatch } from "react-router-dom";

export default function Root() {
  const isHomePage = useMatch("/");

  return (
    <div className="bg-slate-100 min-h-screen px-2 sm:px-4">
      {!isHomePage && (
        <div className="print:hidden pt-3 flex max-w-4xl mx-auto w-full">
          <Link to="/" className="p-2">
            <CaretCircleLeft
              size={34}
              className="text-slate-600"
              weight="regular"
            />
          </Link>
        </div>
      )}
      <Outlet />
    </div>
  );
}
