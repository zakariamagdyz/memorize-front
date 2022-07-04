import React from "react";
import { CircularProgress, Stack } from "@mui/material";

<<<<<<< HEAD
const Loading: React.FC = () => {
=======
const Loading = () => {
>>>>>>> b43c914f9ca3269dd40aed3c59a5802df7936405
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems={"center"}
<<<<<<< HEAD
      height="20vh"
=======
      height="60vh"
>>>>>>> b43c914f9ca3269dd40aed3c59a5802df7936405
    >
      <CircularProgress />
    </Stack>
  );
};

export default Loading;
