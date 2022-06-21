import { useContext, useEffect } from "react";
import { LanguageContext } from "../contexts/localization";

const useArLanguage = () => {
  const { lang, setLang } = useContext(LanguageContext);
  useEffect(() => {
    if (lang === "ar") {
      document.documentElement.setAttribute("lang", "ar");
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("lang", "en");
      document.documentElement.setAttribute("dir", "ltr");
    }

    localStorage.setItem("lng", lang);
  }, [lang]);

  return [lang, setLang] as const;
};

export default useArLanguage;
