import { PropsWithChildren, createContext } from "react";

const DefaultLayoutContext = createContext(null);

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <DefaultLayoutContext.Provider value={null}>
      <div className="flex flex-row w-full h-full">{children}</div>
    </DefaultLayoutContext.Provider>
  );
}

function Side({ children }: PropsWithChildren) {
  return (
    <>
      <div className="min-w-[256px] bg-white flex flex-col">
        <div className="p-4 font-bold border-0 border-b border-solid border-[#d8d6cd97]">
          Search
        </div>
        <div className="flex flex-1 overflow-hidden">{children}</div>
      </div>
    </>
  );
}

function Content({ children }: PropsWithChildren) {
  return (
    <>
      <div className="w-full flex-1 p-4 overflow-hidden bg-[#f2efe597] flex">
        <div className="flex-1 p-2 overflow-auto bg-white">{children}</div>
      </div>
    </>
  );
}

DefaultLayout.Side = Side;
DefaultLayout.Content = Content;
