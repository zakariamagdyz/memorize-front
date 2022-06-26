import { Alert, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { activateAccount } from "../../store/auth/asyncActions";
import { getAuthErrMsg, getAuthStatus } from "../../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Activation: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const errMsg = useAppSelector(getAuthErrMsg);
  const status = useAppSelector(getAuthStatus);

  useEffect(() => {
    dispatch(activateAccount(params.activeToken as string));
  }, [dispatch, params.activeToken]);

  if (status === "loading" || status === "idle") {
    return <Loading />;
  }

  return (
    <Stack mt="4rem" alignItems={"center"}>
      <Alert
        variant="filled"
        severity="error"
        sx={{ width: { xs: "80%", sm: "60%" } }}
      >
        {errMsg}
      </Alert>
    </Stack>
  );
};

export default Activation;
