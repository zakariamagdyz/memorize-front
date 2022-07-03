import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPost, TPostsResponse, TUpdatePostBody } from "../../types/store";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "../store";

type TinitialState = {
  currentMemo: null | TPost;
};
const initialState: TinitialState = {
  currentMemo: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setMemoForEdit: (state, action: PayloadAction<TPost>) => {
      state.currentMemo = action.payload;
    },
    clearCurrentMemo: (state) => {
      state.currentMemo = null;
    },
  },
});

export const { setMemoForEdit, clearCurrentMemo } = postSlice.actions;
export default postSlice.reducer;
export const selectCurrentMemo = (state: RootState) => state.post.currentMemo;

// api post slice

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<TPostsResponse, number | void>({
      query: (page = 1) => ({
        method: "get",
        url: `/api/v1/posts?limit=4&page=${page}`,
      }),
      providesTags: (result, error, arg) => {
        return result
          ? [
              ...result.results.map((post) => ({
                type: "Post" as const,
                id: post._id,
              })),
              { type: "Post", id: "LIST" },
            ]
          : ["Post"];
      },
    }),
    getPost: builder.query<TPost, string>({
      query: (id) => ({ method: "get", url: `/api/v1/posts/${id}` }),
      providesTags: (result, error, arg) => [{ type: "Post", id: arg }],
    }),
    addPost: builder.mutation<TPost, FormData>({
      query: (body) => ({ method: "post", url: "/api/v1/posts", data: body }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updataPost: builder.mutation<TPost, TUpdatePostBody>({
      query: (body) => ({
        method: "patch",
        url: `/api/v1/posts/${body.id}`,
        data: body.data,
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({ method: "delete", url: `/api/v1/posts/${id}` }),
      invalidatesTags: (result, err, arg) => [{ type: "Post", id: arg }],
    }),
    likePost: builder.mutation<TPost, string>({
      query: (id) => ({ method: "patch", url: `/api/v1/posts/${id}/like` }),
      invalidatesTags: (result, err, arg) => [{ type: "Post", id: arg }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdataPostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useLikePostMutation,
} = extendedApiSlice;
