import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Form } from "formik";
export const StyledForm = styled(Form)({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  width: "100%",
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(8, 0),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
}));
