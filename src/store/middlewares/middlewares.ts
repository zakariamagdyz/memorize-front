import { Middleware, Action } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const setTheme: Middleware<{}, RootState> =
  (store) => (dispatch) => (action: Action) => {
    if (action.type === "theme/toggleLang") {
      const lang = store.getState().theme.lang === "ar" ? "en" : "ar";
      if (lang === "ar") {
        document.documentElement.setAttribute("lang", "ar");
        document.documentElement.setAttribute("dir", "rtl");
      } else {
        document.documentElement.setAttribute("lang", "en");
        document.documentElement.setAttribute("dir", "ltr");
      }
      localStorage.setItem("lang", lang);
    }
    if (action.type === "theme/toggleMode") {
      const mode = store.getState().theme.mode === "light" ? "dark" : "light";
      localStorage.setItem("mode", mode);
      // return the function to prevent dispatch action twice
    }
    return dispatch(action);
  };

export const logout: Middleware<{}, RootState> =
  (store) => (dispatch) => (action: Action) => {
    if (action.type === "auth/logout/fulfilled") {
      localStorage.removeItem("persistMe");
    }
    return dispatch(action);
  };
