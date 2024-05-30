import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: false,
    lng: "ko", // if you're using a language detector, do not define the lng option
    fallbackLng: ["ko", "en"],
    backend: {
      loadPath: `https://664f319ffafad45dfae2c020.mockapi.io/locales/{{lng}}`,
      parse: function (data: string) {
        return Object.assign(...(JSON.parse(data) as []), {});
      },
    },
  });

export default i18n;
