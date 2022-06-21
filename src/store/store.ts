import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user.slice";

const store = configureStore({
  reducer: { user: userSlice },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
