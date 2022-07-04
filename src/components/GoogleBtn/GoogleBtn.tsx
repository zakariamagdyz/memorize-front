import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../store/auth/asyncActions";
import { useAppDispatch } from "../../store/hooks";

const GoogleBtn = () => {
  const dispatch = useAppDispatch();
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID!}>
      <GoogleLogin
        useOneTap
        onSuccess={(credentialResponse) => {
          const { credential } = credentialResponse;
          // assert credential is not empty
          dispatch(googleLogin(credential!));
          // set persistMe to true
          localStorage.setItem("persistMe", "yes");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleBtn;
