export interface ErrorType {
  type: 404 | 500 | "SERVICE";
}

export interface ErrorTemplateProps extends ErrorType {
  title: string;
  content: string;
  otherContent?: JSX.Element;
}

const ErrorTemplate = ({
  type,
  title,
  content,
  otherContent,
}: ErrorTemplateProps) => {
  return (
    <main className="flex flex-col items-center justify-center w-full h-full text-center">
      <div className="text-[150px] leading-[150px] font-bold text-[rgba(0,0,0,0.6)]">
        {type}
      </div>
      <h1 className="text-[rgba(0,0,0,0.87)] font-bold text-base">{title}</h1>
      <p className="text-[rgba(0,0,0,0.87)] text-base">{content}</p>
      {otherContent}
    </main>
  );
};

export default ErrorTemplate;
