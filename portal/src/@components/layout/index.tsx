import { RightOutlined } from "@ant-design/icons";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { CapitalizeWord } from "@src/utils/capitalize-word";

type LayoutContextProps = {
  headerVisible: boolean;
  setHeaderVisible: Dispatch<SetStateAction<boolean>>;
};

const initLayoutContext: LayoutContextProps = {
  headerVisible: true,
  setHeaderVisible: () => {},
};

const LayoutContext = createContext<LayoutContextProps>(initLayoutContext);

export default function Layout({ children }: PropsWithChildren) {
  const [headerVisible, setHeaderVisible] = useState<boolean>(true);

  const value = { headerVisible, setHeaderVisible };
  return (
    <LayoutContext.Provider value={value}>
      <div className="w-screen h-screen">{children}</div>
    </LayoutContext.Provider>
  );
}

function Header({ children }: PropsWithChildren) {
  const { headerVisible, setHeaderVisible } = useContext(LayoutContext);

  return (
    <>
      {headerVisible && (
        <div className="h-12 bg-[#525254] flex items-center justify-between w-full text-white leading-[48px] pl-3 pr-3 select-none">
          {children}
        </div>
      )}
      <div
        className={`fixed w-14 bg-[#0000004f] cursor-pointer rounded-b left-1/2 -translate-x-1/2 top-0
        ${headerVisible ? "h-5 " : "h-3"}
        `}
        onClick={() => setHeaderVisible((v) => !v)}
      />
    </>
  );
}

function Content({ children }: PropsWithChildren) {
  const { headerVisible } = useContext(LayoutContext);
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`bg-[#f2efe597] overflow-hidden flex flex-col
      ${headerVisible ? "h-[calc(100%-48px)]" : "h-full"}
      `}
      >
        <div className="flex items-center px-2 bg-white h-9">
          <span>Home</span>
          {pathname
            .split("/")
            .filter((v) => v)
            .map((value) => (
              <div key={value}>
                <RightOutlined className="p-1 text-sm" />
                <span>{CapitalizeWord(value)}</span>
              </div>
            ))}
        </div>
        <div className="flex-1 overflow-hidden ">{children}</div>
      </div>
    </>
  );
}

Layout.Header = Header;
Layout.Content = Content;
