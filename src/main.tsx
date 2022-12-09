import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      toastClassName="rounded-md"
      bodyStyle={{
        fontFamily: "Mona Sans",
      }}
      theme="colored"
      bodyClassName="text-white font-medium"
    />
  </React.StrictMode>
);
