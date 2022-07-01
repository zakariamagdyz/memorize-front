import { TPost, TPostsResponse } from "../../types/store";
import { apiSlice } from "../api/apiSlice";

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
    addPost: builder.mutation<TPost, FormData>({
      query: (body) => ({ method: "post", url: "/api/v1/posts", data: body }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = extendedApiSlice;
