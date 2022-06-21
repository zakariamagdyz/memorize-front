import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import Header from "./components/Header/Header";
import useArLanguage from "./hooks/useArLanguage";
import useDarkMode from "./hooks/useDarkMode";
import getTheme from "./style/theme";
import RTLContent from "./components/RTLContent/RTL";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

type TProps = {};
const App: React.FunctionComponent<TProps> = () => {
  const [mode, colorMode] = useDarkMode();
  const [lang] = useArLanguage();

  // create memoize version from theme to prevent reevaluate getTheme fn if state changes
  const theme = useMemo(() => getTheme(mode, lang), [mode, lang]);

  return (
    <RTLContent lang={lang}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Header mode={mode} colorMode={colorMode} />}>
            <Route index element={<Home />}></Route>
            <Route path="/about" element={<div>sdf</div>}></Route>
            <Route path="*" element={<div>Not found</div>}></Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </RTLContent>
  );
};

export default App;
