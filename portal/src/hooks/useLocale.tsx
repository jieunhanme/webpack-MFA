import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";
import { localeAtom } from "@src/states/shareStates";

export function useLocale() {
  const locale = useAtomValue(localeAtom);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);
}
