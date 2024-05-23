import ReactDom from "react-dom/client";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import LocaleProvider from "@src/context/LocaleProvider";

import { routes } from "@src/routes";
// import "@src/i18n/config";

import "./style/reset.css";
import "./style/index.css";

const router = createBrowserRouter(routes);

ReactDom.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <LocaleProvider> */}
    <RouterProvider router={router} />
    {/* </LocaleProvider> */}
  </React.StrictMode>
);
