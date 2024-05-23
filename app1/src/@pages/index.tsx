import React from "react";

export const Root = React.lazy(() => import("@src/Root"));
export const ErrorPage = React.lazy(() => import("@src/@pages/error"));

export const Page2 = React.lazy(() => import("@src/@pages/page2"));
export const Page3 = React.lazy(() => import("@src/@pages/page3"));
