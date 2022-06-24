import { createSlice } from "@reduxjs/toolkit";
import { ThemeInitState } from "../../types/store";
import en from "../../assets/localization/en.json";
import ar from "../../assets/localization/ar.json";
import { RootState } from "../store";

// Get Stored theme from local storege
let storedLang: "ar" | "en" =
  localStorage.getItem("lang") === "ar" ? "ar" : "en";
let storedMode: "light" | "dark" =
  localStorage.getItem("mode") === "dark" ? "dark" : "light";

const initialState: ThemeInitState = {
  lang: storedLang,
  mode: storedMode,
  translate: storedLang === "ar" ? ar : en,
};

const themeSlcie = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleLang(state) {
      state.lang = state.lang === "en" ? "ar" : "en";
      state.translate = state.lang === "en" ? en : ar;
    },
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleLang, toggleMode } = themeSlcie.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlcie.reducer;
