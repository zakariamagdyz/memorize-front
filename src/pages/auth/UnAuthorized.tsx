import { Alert, Button, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectTheme } from "../../store/theme/themeSlice";

const UnAuthorized = () => {
  const navigate = useNavigate();
  const { translate } = useAppSelector(selectTheme);
  return (
    <Stack alignItems="center">
      <Stack mt="5rem" spacing={3} sx={{ width: { xs: "80%", sm: "60%" } }}>
        <Alert variant="filled" severity="error">
          {translate["unAuthorizedUser"]}
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate("/home", { replace: true })}
        >
          {translate["go_back_to_home"]}
        </Button>
      </Stack>
    </Stack>
  );
};

export default UnAuthorized;
