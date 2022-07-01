import { Button, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { TPostsResponse } from "../../types/store";
import Post from "./Post/Post";
import withChecks from "../withChecks/withChecks";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
type Props = {
  data: TPostsResponse["results"];
  info: TPostsResponse["info"];
  handlePagination: (type: "next" | "prev") => void;
  page: number;
};

const Posts: React.FC<Props> = ({
  data: results,
  info,
  handlePagination,
  page,
}) => {
  return (
    <Stack
      justifyContent="space-between"
      sx={{ margin: { xs: "1em", sm: ".2em" } }}
    >
      <Stack direction="row" justifyContent="space-between" mb="1em">
        <Button
          variant="contained"
          size="small"
          color="info"
          onClick={() => handlePagination("prev")}
          disabled={page === 1}
        >
          <ArrowBackIosIcon />
        </Button>
        <Button
          variant="contained"
          size="small"
          color="info"
          onClick={() => handlePagination("next")}
          disabled={page === info?.pages}
        >
          <ArrowForwardIosIcon />
        </Button>
      </Stack>
      <Grid container spacing={2}>
        {results.map((post) => (
          <Grid item key={post._id} xs={12} sm={6}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default withChecks(Posts);
