import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ErrImg from "../../assets/images/error.png";
import { useAppSelector } from "../../store/hooks";
import { selectTheme } from "../../store/theme/themeSlice";

export const ErrorImageOverlay = styled("div")({
  height: "60vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const ErrorImageContainer = styled("div")({
  display: "inline-block",
  backgroundImage: `url(${ErrImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "40vh",
  height: "40vh",
});

// types
interface Props {}

const Error: React.FC<Props> = () => {
  const { translate } = useAppSelector(selectTheme);
  return (
    <ErrorImageOverlay>
      <ErrorImageContainer />
      <Typography mt="3rem" variant="h6" mb="2rem">
        {translate["somthing_wrong"]}
      </Typography>
      <Button variant="contained" onClick={() => window.location.assign("/")}>
        {translate["go_back_to_home"]}
      </Button>
    </ErrorImageOverlay>
  );
};

export default Error;
