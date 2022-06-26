import ReactDom from "react-dom/client";
import App from "./App";
import LanguageProvider from "./contexts/localization";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./apis/interseptors";
import {
  getUserData,
  initiatArLanguage,
} from "./store/middlewares/initActions";

// initial Actions
getUserData();
initiatArLanguage();

const Root = ReactDom.createRoot(
  document.getElementById("root") as HTMLElement
);

Root.render(
  <LanguageProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </LanguageProvider>
);
