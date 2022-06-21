import React, { createContext, useEffect, useState } from "react";
import en from "../assets/localization/en.json";
import ar from "../assets/localization/ar.json";

type TStoredLang = "en" | "ar";
type LngContext = {
  lang: "en" | "ar";
  translate: Record<string, string>;
  setLang: React.Dispatch<React.SetStateAction<TStoredLang>>;
};

type Props = {
  children: React.ReactNode;
};

export const LanguageContext = createContext({} as LngContext);

const LanguageProvider: React.FC<Props> = ({ children }) => {
  const [lang, setLang] = useState<"en" | "ar">(() => {
    // get lang from local storage
    // set local storage in useState funtion to prevent fetch for every rerender
    const storedLang = localStorage.getItem("lng") as TStoredLang;
    return storedLang || "en";
  });
  const [translate, setTranslate] = useState(en);

  // get translator json object

  useEffect(() => {
    setTranslate(lang === "en" ? en : ar);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
