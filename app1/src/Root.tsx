import ErrorPage from "@src/@pages/error";
import { Spin } from "antd";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <ErrorBoundary
      FallbackComponent={(props) => <ErrorPage type={500} {...props} />}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={<Spin fullscreen />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}
