import { useEffect } from "react";

import { useAppSelector } from "../store/hooks";
import { selectTheme } from "../store/theme/themeSlice";

const useArLanguage = () => {
  const { lang } = useAppSelector(selectTheme);
  useEffect(() => {
    localStorage.setItem("lang", lang);
    if (lang === "ar") {
      document.documentElement.setAttribute("lang", "ar");
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("lang", "en");
      document.documentElement.setAttribute("dir", "ltr");
    }
  }, [lang]);
};

export default useArLanguage;
