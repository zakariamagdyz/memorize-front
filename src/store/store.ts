import { configureStore, combineReducers } from "@reduxjs/toolkit";
// Reducers
import authSlice from "./auth/authSlice";
import themeSlice from "./theme/themeSlice";
import postSlice from "./posts/posts.slice";
// Middlewares
import { apiSlice } from "./api/apiSlice";
import { logout, setTheme } from "./middlewares/middlewares";

const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
  post: postSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
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
