import { privateCall, publicCall } from "./memorize";
import store from "../store/store";
import { AxiosError } from "axios";
import { getFreshCredentials } from "../store/auth/asyncActions";

publicCall.interceptors.request.use(
  (config) => {
    const { lang, translate } = store.getState().theme;
    // Check if browser is online before sending a request and render a fallback UI
    if (!navigator.onLine) return Promise.reject(translate["connection_lost"]);

    if (!config.headers) return config;
    // add Language to every publicCall
    config.headers["Accept-Language"] = lang === "ar" ? "ar-EG" : "en-US";

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// config obj contain the every request we intercept
// in err.config | response.config | config
privateCall.interceptors.request.use(
  (config) => {
    if (!navigator.onLine)
      return Promise.reject("Sorry, your internet connection is lost.");

    if (!config.headers) return config;
    const lang = store.getState().theme.lang;
    const accessToken = store.getState().auth.accessToken;
    // add Language And Authorization headers
    config.headers["Accept-Language"] = lang === "ar" ? "ar-EG" : "en-US";
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

privateCall.interceptors.response.use(
  (response) => {
    // response.data
    // response.headers
    //response.config (last request)
    return response;
  },
  async (err) => {
    if (!(err instanceof AxiosError)) return err;
    const prevRequest = err.config;

    if (err.response?.status === 426) {
      // send refresh Token to upgrade out access Token
      // if this promise throw error it will break the loop
      try {
        await store.dispatch(getFreshCredentials()).unwrap();
        const res = await privateCall(prevRequest);
        return res;
      } catch (error) {
        // if RT expired or not sent logout user from application
        const currentUser = store.getState().auth.user;
        if (currentUser) {
          store.dispatch({ type: "auth/logout/fulfilled" });
        }
        throw error;
      }
    }

    // async function must throw error , instead axios will resolve it as a response
    throw err;
  }
);
