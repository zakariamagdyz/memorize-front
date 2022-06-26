import ReactDom from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./apis/interseptors";
import {
  getUserData,
  initiatArLanguage,
} from "./store/middlewares/initActions";
import ErrorBoundry from "./components/ErrorBoundry/ErrorBoundry";

// initial Actions
getUserData();
initiatArLanguage();

const Root = ReactDom.createRoot(
  document.getElementById("root") as HTMLElement
);

Root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundry>
        <App />
      </ErrorBoundry>
    </Provider>
  </BrowserRouter>
);
