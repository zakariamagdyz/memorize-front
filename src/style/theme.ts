import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const getTheme = (mode: "light" | "dark", lang: "ar" | "en") => {
  let theme = createTheme({
    direction: lang === "ar" ? "rtl" : "ltr",
    palette: {
      mode,
    },
    typography: {
      fontFamily:
        lang === "ar"
          ? "'Readex Pro', sans-serif;"
          : '"Roboto","Helvetica",sans-serif;',
    },
  });
  // add responsive to headers elements
  theme = responsiveFontSizes(theme);
  return theme;
};

export default getTheme;
