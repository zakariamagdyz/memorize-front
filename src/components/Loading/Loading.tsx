import React from "react";
import { CircularProgress, Stack } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems={"center"}
      height="20vh"
    >
      <CircularProgress />
    </Stack>
  );
};

export default Loading;
