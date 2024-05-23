import { FallbackProps } from "react-error-boundary";
import { Button } from "antd";
import ErrorTemplate, {
  ErrorTemplateProps,
  ErrorType,
} from "@src/@pages/error/errorTemplate";

type OptionalFallbackProps = {
  [K in keyof FallbackProps]?: FallbackProps[K];
};
interface ErrorPageProps extends ErrorType, OptionalFallbackProps {}

const ErrorPage = ({ type, error, resetErrorBoundary }: ErrorPageProps) => {
  const errors: ErrorTemplateProps[] = [
    {
      type: 404,
      title: "Page not found",
      content:
        "Sorry, but the page you looking for is not found. Make sure you have the current URL.",
    },
    {
      type: 500,
      title: "This page isn't working.",
      content: "The page cannot to be displayed. Please try again later.",
      otherContent: (
        <>
          <pre className="text-red-500">{error?.message}</pre>
          <Button
            type="primary"
            className="w-[150px] !bg-[#1677ff]"
            onClick={resetErrorBoundary}
          >
            RELOAD
          </Button>
        </>
      ),
    },
    {
      type: "SERVICE",
      title: "Page not found",
      content:
        "The service is currently facing issues. Please try again shortly. If the problem persists, kindly inform our support team.",
    },
  ];

  const errorSelected = errors.find(
    (e) => e.type === type
  ) as ErrorTemplateProps;

  return <ErrorTemplate {...errorSelected} />;
};

export default ErrorPage;
