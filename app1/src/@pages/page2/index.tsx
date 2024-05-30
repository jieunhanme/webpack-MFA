import { atom, useAtomValue } from "jotai";
// import { localeAtom } from "portal/shareStates";
// console.log(localeAtom);
// const app1LocaleAtom = localeAtom ?? atom("ko");
// const remoteApp1Routes = await import("portal/shareStates").then(
//   (module) => module,
//   () => null
// );
const Page2 = () => {
  // const locale = useAtomValue<"ko" | "en">(app1LocaleAtom);
  return (
    <main>
      <h1>APC - Page2</h1>
      <p>Here is Page2</p>
      {/* <p>{locale}</p> */}
    </main>
  );
};

export default Page2;
