import React from "react";
import {
  Stack,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { TPost } from "../../../types/store";
import TimeAgo from "../../TimeAgo/TimeAgo";
import { url } from "../../../apis/memorize";
import { styled } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../../store/hooks";
import {
  setMemoForEdit,
  useDeletePostMutation,
} from "../../../store/posts/posts.slice";

type props = {
  post: TPost;
};

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: "0",
  paddingTop: "60.25%",
  backgroundColor: "rgba(0,0,0,.5)",
  backgroundBlendMode: "darken",
}));

const StyledCard = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "15px",
  height: "100%",
  padding: 0,
  position: "relative",
}));

const OverlayLeft = styled(Box)(() => ({
  position: "absolute",
  color: "white",
  padding: "1em",
}));

const OverlayRight = styled(Box)(() => ({
  position: "absolute",
  top: "20px",
  right: "20px",
  color: "white",
}));

///////////////////////////////////////
const Post: React.FC<props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const [deletePost, { isLoading }] = useDeletePostMutation();

  return (
    <StyledCard>
      <StyledCardMedia
        image={`${url}/public/posts/${post.image}`}
        title={post.title}
      />
      <OverlayLeft>
        <Typography variant="h6">{post.creator.name}</Typography>
        <TimeAgo timestamp={post.updatedAt} />
      </OverlayLeft>
      {
        <OverlayRight>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              dispatch(setMemoForEdit(post));
            }}
          >
            <MoreHorizIcon />
          </Button>
        </OverlayRight>
      }
      <Stack p="0 .4em" spacing={1}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>

        <Typography gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
      </Stack>
      <CardContent sx={{ padding: ".6em" }}>
        <Typography color="textSecondary">{post.message}</Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button size="small" color="primary">
          <ThumbUpAltIcon fontSize="small" /> &nbsp;Like &nbsp; {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => deletePost(post._id)}
        >
          <DeleteIcon fontSize="small" /> &nbsp; Delete
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default Post;
