import ReactDom from "react-dom/client";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { routes } from "@src/routes";

import "./style/reset.css";
import "./style/index.css";

const router = createBrowserRouter(routes);

// React.lazy(() =>
//   import("portal/i18n").catch(() =>
//     console.log("i18n from portal is not ready.")
//   )
// );

ReactDom.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
