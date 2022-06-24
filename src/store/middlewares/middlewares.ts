import { Middleware, Action } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const setTheme: Middleware<{}, RootState> =
  (store) => (dispatch) => (action: Action) => {
    if (action.type === "theme/toggleMode") {
      const mode = store.getState().theme.mode;
      localStorage.setItem("mode", mode === "light" ? "dark" : "light");
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
