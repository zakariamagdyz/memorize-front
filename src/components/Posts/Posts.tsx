import { Typography } from "@mui/material";
import React from "react";
import Post from "./Post/Post";

const Posts = () => {
  return (
    <div>
      <Typography variant="h2">Posts</Typography>
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
