import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TPostsResponse } from "../../types/store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (builder) => ({
    getTodos: builder.query<TPostsResponse, void>({
      query: () => "/api/v/posts",
    }),
  }),
});

export const { useGetTodosQuery } = apiSlice;
