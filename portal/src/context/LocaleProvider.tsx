import { useLocale } from "@src/hooks/useLocale";
import { PropsWithChildren } from "react";

export default function LocaleProvider({ children }: PropsWithChildren) {
  useLocale();
  return <>{children}</>;
}
