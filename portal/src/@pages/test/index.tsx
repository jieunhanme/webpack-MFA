import image01 from "@img/image-01.jpg";
// import { useTranslation } from "react-i18next";

export default function Test() {
  // const { t } = useTranslation();

  return (
    <section className="h-full">
      <h1 className="text-green-500">Test PAGE</h1>
      <p>React + Webpack</p>
      <h3>ENV</h3>
      <span>APP_INFO: {JSON.stringify(process.env.APP_INFO)}</span>
      <img src={image01} alt="" width={500} />
      {/* {t("label")}
      {t("message")} */}
    </section>
  );
}
