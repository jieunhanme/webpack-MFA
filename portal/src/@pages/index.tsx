import React from "react";

export const Root = React.lazy(() => import("@src/Root"));
export const ErrorPage = React.lazy(() => import("@src/@pages/error"));

export const Test = React.lazy(() => import("@src/@pages/test"));
