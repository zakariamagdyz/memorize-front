import { getFreshCredentials } from "../auth/asyncActions";
import store from "../store";
import { toggleLang } from "../theme/themeSlice";

export const getUserData = () => {
  const persist = localStorage.getItem("persistMe");
  if (!persist) return;
  store.dispatch(getFreshCredentials());
};

export const initiatArLanguage = () => {
  // initiat Arabic language if hostname start with ar => http://ar.memorize.tk
  if (window.location.hostname.startsWith("ar.")) {
    store.dispatch(toggleLang());
  }
  const lang = store.getState().theme.lang;
  if (lang === "ar") {
    document.documentElement.setAttribute("lang", "ar");
    document.documentElement.setAttribute("dir", "rtl");
  } else {
    document.documentElement.setAttribute("lang", "en");
    document.documentElement.setAttribute("dir", "ltr");
  }
};
