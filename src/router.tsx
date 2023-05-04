import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Root from "pages";
import Home from "pages/Home";
import Review from "pages/Review";
import Metrics from "pages/Metrics";
import NotFound from "components/NotFound";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Home />} />
      <Route path="/metrics" element={<Metrics />} />
      <Route path="/review">
        <Route path=":id" element={<Review />} />
        <Route path="" element={<Review />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  {
    basename: "/interview-tests-reviewer",
  }
);
