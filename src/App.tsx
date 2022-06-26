import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";

import getTheme from "./style/theme";
import RTLContent from "./components/RTLContent/RTL";
import AppRouter from "./components/utils/Router";
import { useAppSelector } from "./store/hooks";
import { selectTheme } from "./store/theme/themeSlice";

type TProps = {};

const App: React.FunctionComponent<TProps> = () => {
  // Add HTML properties after component render
  const { mode, lang } = useAppSelector(selectTheme);
  // create memoize version from theme to prevent reevaluate getTheme fn if state changes
  const theme = useMemo(() => getTheme(mode, lang), [mode, lang]);

  return (
    <RTLContent lang={lang}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </RTLContent>
  );
};

export default App;
