import { useAtomValue } from "jotai";
import { localeAtom } from "portal/shareStates";

const Page2 = () => {
  const locale = useAtomValue<"ko" | "en">(localeAtom);
  return (
    <main>
      <h1>APC - Page2</h1>
      <p>Here is Page2</p>
      <p>{locale}</p>
    </main>
  );
};

export default Page2;
