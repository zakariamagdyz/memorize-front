// User Slice

// Post Slice
export type TPostState = {
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | undefined | null;
};

export type ResponseError = {
  status: string;
  message: string;
};

export interface TPostsResponse {
  info: Info;
  results: TPost[];
}

export interface Info {
  count: number;
  pages: number;
  limit: number;
  next: null;
  prev: null;
}

export interface TPost {
  _id: string;
  title: Title;
  message: Message;
  tags: Tag[];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

// THEME

export type ThemeInitState = {
  lang: "ar" | "en";
  mode: "light" | "dark";
  translate: Record<string, string>;
};

// AuthSlice

export type initialAuthState = {
  user: User | null;
  accessToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined | null;
  message: string | null;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  roles: number[];
};

export type credentialApiResponse = {
  accessToken: string;
  user: User;
};

export type loginBody = {
  email: string;
  password: string;
};

export type signupBody = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type resetPasswordBody = {
  password: string;
  passwordConfirm: string;
  resetToken: string;
};

export type updatePasswordBody = {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
};
