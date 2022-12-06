import { Link, Outlet, useMatch } from "react-router-dom";
import { CaretCircleLeft } from "phosphor-react";

export default function Root() {
  const isHomePage = useMatch("/");

  return (
    <div className="bg-slate-100 min-h-screen px-2 sm:px-4">
      {!isHomePage && (
        <div className="py-2">
          <Link to={-1 as any} className="bg-slate-200">
            <CaretCircleLeft
              size={30}
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
