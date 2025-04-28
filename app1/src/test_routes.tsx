import { ErrorPage, Page2, Page3, Root } from "@src/@pages";
import MenuRoot from "portal/MenuRoot";

const emptyPage = {
  index: true,
  element: <ErrorPage type={404} />,
};

export const routes = [
  {
    path: "app1",
    element: <MenuRoot />,
    children: [
      emptyPage,
      {
        path: "page2",
        element: <Page2 />,
      },
      {
        path: "page3",
        element: <Page3 />,
      },
    ],
  },
];
