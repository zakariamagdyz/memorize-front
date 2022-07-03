import React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { Button } from "@mui/material";
import GoogleIcon from "./GooleIcon";

const GoogleBtn = () => {
  const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    // type narrowing
    if ("tokenId" in res) {
      const { tokenId } = res;
      console.log(tokenId);
    }

    console.log(res);
  };
  const onFailure = (err: any) => {
    console.log(err);
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID as string}
      render={(renderProps) => (
        <Button
          color="error"
          variant="contained"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          startIcon={<GoogleIcon />}
        >
          Google Sign In
        </Button>
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleBtn;
