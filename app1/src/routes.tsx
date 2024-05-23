import { ErrorPage, Page2, Page3, Root } from "@src/@pages";

const emptyPage = {
  index: true,
  element: <ErrorPage type={404} />,
};

export const routes = [
  {
    path: "",
    element: <Root />,
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
