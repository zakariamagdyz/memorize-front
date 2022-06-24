import { getFreshCredentials } from "../auth/asyncActions";
import store from "../store";

export const getUserData = () => {
  const persist = localStorage.getItem("persistMe");
  if (!persist) return;
  store.dispatch(getFreshCredentials());
};
