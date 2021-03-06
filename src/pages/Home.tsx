import { Grid } from "@mui/material";
import { Grow } from "@mui/material";
import Form from "../components/Form/Form";
import Posts from "../containers/PostsContainer";
import React from "react";

const Home = () => {
  return (
    <Grow in>
      <Grid
        container
        justifyContent="space-between"
        mt="1rem"
        mb="1rem"
        spacing={4}
      >
        <Grid item xs={12} sm={8} sx={{ order: { xs: 2, sm: 1 } }}>
          <Posts />
        </Grid>
        <Grid item xs={12} sm={4} order={1}>
          <Form />
        </Grid>
      </Grid>
    </Grow>
  );
};

export default Home;
