import { Root, ErrorPage, Test } from "@src/@pages";

const remoteUnconnected = [
  {
    path: "",
    element: <ErrorPage type="SERVICE" />,
  },
  {
    path: "*",
    element: <ErrorPage type="SERVICE" />,
  },
];

// const Root = React.lazy(() => import("@src/Root"));
const remoteApp1Routes = await import("app1/Routes").then(
  (module) => module,
  () => remoteUnconnected
);
console.log(remoteApp1Routes, remoteApp1Routes.routes);
export const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "*",
        errorElement: <ErrorPage type={404} />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "app1",
        children: remoteApp1Routes.routes ?? remoteUnconnected,
      },
    ],
  },
];
