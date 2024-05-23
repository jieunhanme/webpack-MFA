import { GlobalOutlined } from "@ant-design/icons";
import { localeAtom } from "@src/states/shareStates";
import { useAtom } from "jotai";

export default function MultiLang() {
  const [locale, setLocale] = useAtom(localeAtom);

  const onChange = () => {
    const lang = locale === "ko" ? "en" : "ko";
    setLocale(lang);
  };
  return (
    <div className="flex items-center gap-1 cursor-pointer" onClick={onChange}>
      <GlobalOutlined />
      <span className="w-10">{locale}</span>
    </div>
  );
}
