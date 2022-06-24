import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { privateCall } from "../../apis/memorize";
import {
  ResponseError,
  TPost,
  TPostsResponse,
  TPostState,
} from "../../types/store";
import { RootState } from "../store";

const postAdapter = createEntityAdapter<TPost>({
  selectId: (post) => post._id,
  // sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
});

const initialState = postAdapter.getInitialState<TPostState>({
  status: "idle",
  error: null,
});

export const getPosts = createAsyncThunk<
  TPostsResponse,
  void,
  { rejectValue: ResponseError }
>("post/getPosts", async (_, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;

  try {
    const res = await privateCall.get<TPostsResponse>(`/api/v1/posts`);
    return res.data;
  } catch (err) {
    // will become error of rejected action
    if (!(err instanceof AxiosError)) throw err;
    // will become the payload of the rejected action
    return rejectWithValue(err.response?.data);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPosts(state) {
      postAdapter.removeAll(state);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        postAdapter.upsertMany(state, payload.results);
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";

        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const { clearPosts } = postSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsId,
} = postAdapter.getSelectors((state: RootState) => state.posts);

export default postSlice.reducer;
