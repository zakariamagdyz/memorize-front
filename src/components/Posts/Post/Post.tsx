import { Stack, Typography } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { selectPostById } from "../../../store/posts/posts.slice";
import TimeAgo from "../../TimeAgo/TimeAgo";

type props = {
  postId: EntityId;
};

const Post: React.FC<props> = ({ postId }) => {
  const post = useAppSelector((state) => selectPostById(state, postId))!;

  return (
    <div>
      <Stack direction="row">
        <Typography>{post.title}</Typography>
        <Typography>{post.message}</Typography>
        <TimeAgo timestamp={post.updatedAt} />
      </Stack>
    </div>
  );
};

export default Post;
