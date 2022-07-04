import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { privateCall, publicCall } from "../../apis/memorize";
import {
  credentialApiResponse,
  loginBody,
  resetPasswordBody,
  ResponseError,
  signupBody,
  updatePasswordBody,
} from "../../types/store";

///////////////////////////////////////////////////
/// Login
///////////////////////////////////////////////////
export const login = createAsyncThunk<
  credentialApiResponse,
  loginBody,
  { rejectValue: ResponseError }
>("auth/login", async (body, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;

  try {
    const res = await publicCall.post<credentialApiResponse>(
      "/api/v1/auth/login",
      body
    );
    return res.data;
  } catch (error) {
    if (!(error instanceof AxiosError)) throw error;
    return rejectWithValue(error.response?.data);
  }
});
///////////////////////////////////////////////////
/// Google login
///////////////////////////////////////////////////
export const googleLogin = createAsyncThunk<
  credentialApiResponse,
  string,
  { rejectValue: ResponseError }
>("auth/googleLogin", async (credential, { rejectWithValue }) => {
  try {
    const res = await publicCall.post<credentialApiResponse>(
      "/api/v1/auth/google-login",
      { credential }
    );
    return res.data;
  } catch (error) {
    if (!(error instanceof AxiosError)) throw error;
    return rejectWithValue(error.response?.data);
  }
});

///////////////////////////////////////////////////
/// Signup
///////////////////////////////////////////////////
export const signup = createAsyncThunk<
  string,
  signupBody,
  { rejectValue: ResponseError }
>("auth/signup", async (body, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;

  try {
    const res = await publicCall.post<string>("/api/v1/auth/signup", body);
    return res.data;
  } catch (error) {
    if (!(error instanceof AxiosError)) throw error;
    return rejectWithValue(error.response?.data);
  }
});

///////////////////////////////////////////////////
/// Get FRESH Credentials & upgrade Access token
///////////////////////////////////////////////////

export const getFreshCredentials = createAsyncThunk<
  credentialApiResponse,
  void,
  { rejectValue: ResponseError }
>("auth/getFreshCredentials", async (_, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;
  try {
    const res = await privateCall.get<credentialApiResponse>(
      "/api/v1/auth/refresh-token"
    );
    return res.data;
  } catch (error) {
    if (!(error instanceof AxiosError)) throw error;
    return rejectWithValue(error.response?.data);
  }
});
///////////////////////////////////////////////////
/// Logout
///////////////////////////////////////////////////
export const logout = createAsyncThunk<
  number,
  void,
  { rejectValue: ResponseError }
>("auth/logout", async (_, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;
  try {
    const res = await privateCall.get("/api/v1/auth/logout");
    return res.status;
  } catch (error) {
    if (!(error instanceof AxiosError)) throw error;
    return rejectWithValue(error.response?.data);
  }
});

///////////////////////////////////////////////////
/// Activate Account
///////////////////////////////////////////////////

export const activateAccount = createAsyncThunk<
  credentialApiResponse,
  string,
  { rejectValue: ResponseError }
>("auth/activateAccount", async (activateToken, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;
  try {
    const res = await publicCall.post<credentialApiResponse>(
      "/api/v1/auth/activate-account",
      {
        activateToken,
      }
    );
    return res.data;
  } catch (error) {
    if (!(error instanceof AxiosError)) throw error;
    return rejectWithValue(error.response?.data);
  }
});

///////////////////////////////////////////////////
/// Forgot Password
///////////////////////////////////////////////////

export const forgotPassword = createAsyncThunk<
  string,
  string,
  { rejectValue: ResponseError }
>("auth/forgotPassword", async (email, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;
  try {
    const res = await publicCall.patch("/api/v1/auth/forgot-password", {
      email,
    });
    return res.data;
  } catch (error) {
    if (!(error instanceof AxiosError)) throw error;
    return rejectWithValue(error.response?.data);
  }
});

///////////////////////////////////////////////////
/// Reset Password
///////////////////////////////////////////////////

export const resetPassword = createAsyncThunk<
  credentialApiResponse,
  resetPasswordBody,
  { rejectValue: ResponseError }
>(
  "auth/resetPassword",
  async ({ resetToken, password, passwordConfirm }, ThunkApi) => {
    const { rejectWithValue } = ThunkApi;
    try {
      const res = await publicCall.patch<credentialApiResponse>(
        `/api/v1/auth/reset-password/${resetToken}`,
        { password, passwordConfirm }
      );
      return res.data;
    } catch (error) {
      if (!(error instanceof AxiosError)) throw error;
      return rejectWithValue(error.response?.data);
    }
  }
);

///////////////////////////////////////////////////
/// update Password
///////////////////////////////////////////////////

export const updatePassword = createAsyncThunk<
  credentialApiResponse,
  updatePasswordBody,
  { rejectValue: ResponseError }
>("auth/updatePassword", async (body, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;
  try {
    const res = await privateCall.patch<credentialApiResponse>(
      `/api/v1/auth/update-my-password`,
      body
    );
    return res.data;
  } catch (error) {
    if (!(error instanceof AxiosError)) throw error;
    return rejectWithValue(error.response?.data);
  }
});
