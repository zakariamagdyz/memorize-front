import React from "react";
import { CircularProgress, Stack } from "@mui/material";

const Loading = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems={"center"}
      height="60vh"
    >
      <CircularProgress />
    </Stack>
  );
};

export default Loading;
