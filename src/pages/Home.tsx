import { Grid } from "@mui/material";
import { Grow } from "@mui/material";
import Form from "../components/Form/Form";
import Posts from "../components/Posts/Posts";
import React from "react";

const Home = () => {
  return (
    <Grow in>
      <Grid container justifyContent="space-between" spacing={3}>
        <Grid item xs={12} sm={7}>
          <Posts />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form />
        </Grid>
      </Grid>
    </Grow>
  );
};

export default Home;
