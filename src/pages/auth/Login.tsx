import {
  Stack,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Alert,
  Container,
} from "@mui/material";
import React, { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectTheme } from "../../store/theme/themeSlice";
import { login } from "../../store/auth/asyncActions";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import InputField from "../../components/InputField/InputField";
import PasswordField from "../../components/InputField/PasswordField";
import { clearMsgs, getAuthErrMsg } from "../../store/auth/authSlice";
import { Link } from "react-router-dom";
import { StyledForm, StyledPaper } from "./auth.style";
import GoogleBtn from "../../components/GoogleBtn/GoogleBtn";

const Login = () => {
  // get translator
  const { translate } = useAppSelector(selectTheme);
  // get store consumers
  const dispatch = useAppDispatch();
  const errMsg = useAppSelector(getAuthErrMsg);

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    const { email, password, persistMe } = values;

    await dispatch(login({ email, password }));
    // save persistMe label in local storage if user ask
    if (!persistMe) return;
    localStorage.setItem("persistMe", "yes");
    // reset form
    resetForm();
  };

  const initialValues = {
    email: "",
    password: "",
    persistMe: false,
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(translate["yup_required_field"])
      .max(55, translate["yup_field_max_count"])
      .email(translate["yup_email_verify"]),
    password: Yup.string()
      .required(translate["yup_required_field"])
      .max(55, translate["yup_field_max_count"])
      .min(8, translate["yup_field_min_count"]),
  });

  // clear Auth msgs after component mounted
  useLayoutEffect(() => {
    dispatch(clearMsgs());
  }, [dispatch]);

  return (
    <Container maxWidth="xs" component="main">
      <StyledPaper elevation={6}>
        <Typography variant="h2" marginBottom={"2rem"} width="100%">
          {translate["login_header"]}
        </Typography>
        {errMsg && (
          <Alert variant="filled" severity="error">
            {errMsg}
          </Alert>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, handleChange, values }) => (
            <StyledForm>
              <InputField
                label={translate["email_input"]}
                variant="outlined"
                name="email"
              />
              <PasswordField
                name="password"
                label={translate["password_input"]}
              />

              <FormControlLabel
                sx={{ alignSelf: "start" }}
                control={
                  <Checkbox
                    name="persistMe"
                    checked={values.persistMe}
                    onChange={handleChange}
                  />
                }
                label={translate["remember_me"]}
              />
              <Stack spacing={1}>
                <Button
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {translate["login_btn"]}
                </Button>
                <GoogleBtn />
              </Stack>

              <Stack spacing={1}>
                <Link to="/signup">{translate["non_existed_user"]}</Link>
                <Link to="/forgot-password">
                  {translate["forgot_password"]}
                </Link>
              </Stack>
            </StyledForm>
          )}
        </Formik>
      </StyledPaper>
    </Container>
  );
};

export default Login;
