import { privateCall } from "./memorize";
import store from "../store/store";
import { AxiosError } from "axios";
import { getFreshCredentials } from "../store/auth/asyncActions";

// config obj contain the every request we intercept
// in err.config | response.config | config
privateCall.interceptors.request.use(
  (config) => {
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
      await store.dispatch(getFreshCredentials()).unwrap();
      const res = await privateCall(prevRequest);
      return res;
    }

    return Promise.reject(err);
  }
);
