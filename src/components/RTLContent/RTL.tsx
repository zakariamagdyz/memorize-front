import React from "react";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import useArLanguage from "../../hooks/useArLanguage";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
type Props = { children: React.ReactNode; lang: "en" | "ar" };

const RTLContent: React.FC<Props> = ({ children, lang }) => {
  useArLanguage();

  if (lang === "ar") {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
  }

  return <>{children}</>;
};

export default RTLContent;
