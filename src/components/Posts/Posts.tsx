import { Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPosts, selectPostsId } from "../../store/posts/posts.slice";
import { clearPosts } from "../../store/posts/posts.slice";
import Post from "./Post/Post";

const Posts = () => {
  const posts = useAppSelector(selectPostsId);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Typography variant="h2">Posts</Typography>
      {posts.map((postId) => (
        <Post key={postId} postId={postId} />
      ))}
      <Button onClick={() => dispatch(getPosts())}>Get posts</Button>
      <Button onClick={() => dispatch(clearPosts())}>Clear posts</Button>
    </div>
  );
};

export default Posts;
