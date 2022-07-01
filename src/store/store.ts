import { configureStore, combineReducers } from "@reduxjs/toolkit";
// Reducers
import userSlice from "./user/user.slice";
import authSlice from "./auth/authSlice";
import themeSlice from "./theme/themeSlice";
// Middlewares
import { apiSlice } from "./api/apiSlice";
import { logout, setTheme } from "./middlewares/middlewares";

const rootReducer = combineReducers({
  user: userSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
  theme: themeSlice,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(setTheme, logout, apiSlice.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
