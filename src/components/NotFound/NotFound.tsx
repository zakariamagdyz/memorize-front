import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectTheme } from "../../store/theme/themeSlice";

const NotFound = () => {
  const navigate = useNavigate();
  const { translate } = useAppSelector(selectTheme);
  return (
    <Stack spacing={3} alignItems="center" mt="10rem">
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">{translate["Oops"]}</Typography>
      <Typography>{translate["page_not_found"]}</Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/home", { replace: true })}
      >
        {translate["go_back_to_home"]}
      </Button>
    </Stack>
  );
};

export default NotFound;
