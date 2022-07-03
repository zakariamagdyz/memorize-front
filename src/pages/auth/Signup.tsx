import { Stack, Typography, Button, Alert, Container } from "@mui/material";
import React, { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectTheme } from "../../store/theme/themeSlice";
import { signup } from "../../store/auth/asyncActions";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import InputField from "../../components/InputField/InputField";
import PasswordField from "../../components/InputField/PasswordField";
import { Link } from "react-router-dom";
import {
  clearMsgs,
  getAuthErrMsg,
  getAuthMsg,
} from "../../store/auth/authSlice";
import { StyledForm, StyledPaper } from "./auth.style";

///////////////////////////////////////////////

const Signup = () => {
  // get translator
  const { translate } = useAppSelector(selectTheme);
  // get store consumers
  const dispatch = useAppDispatch();
  const errMsg = useAppSelector(getAuthErrMsg);
  const msg = useAppSelector(getAuthMsg);

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    const { firstName, lastName, email, password, passwordConfirm } = values;
    const name = firstName + " " + lastName;

    await dispatch(signup({ email, password, name, passwordConfirm }));
    resetForm();
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required(translate["yup_required_field"])
      .max(30, translate["yup_field_max_count"]),
    lastName: Yup.string()
      .required(translate["yup_required_field"])
      .max(30, translate["yup_field_max_count"]),
    email: Yup.string()
      .required(translate["yup_required_field"])
      .max(30, translate["yup_field_max_count"])
      .email(translate["yup_email_verify"]),

    password: Yup.string()
      .required(translate["yup_required_field"])
      .max(30, translate["yup_field_max_count"])
      .min(8, translate["yup_field_min_count"]),
    passwordConfirm: Yup.string()
      .required(translate["yup_required_field"])
      .max(30, translate["yup_field_max_count"])
      .min(8, translate["yup_field_min_count"])
      .test(
        "passwordConfirm",
        translate["yup_password_confirm"],
        function (val) {
          return this.parent.password === val;
        }
      ),
  });

  // clear Auth msgs after component mounted
  useLayoutEffect(() => {
    dispatch(clearMsgs());
  }, [dispatch]);

  return (
    <Container maxWidth="xs" component="main">
      <StyledPaper>
        <Typography variant="h2" marginBottom={"2rem"} width="100%">
          {translate["signup_header"]}
        </Typography>
        {errMsg && (
          <Alert variant="filled" severity="error">
            {errMsg}
          </Alert>
        )}
        {msg && (
          <Alert variant="filled" severity="success">
            {msg}
          </Alert>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, handleChange, values, handleBlur }) => (
            <StyledForm>
              <Stack direction="row" spacing={"1rem"}>
                <InputField
                  label={translate["first_name"]}
                  variant="outlined"
                  name="firstName"
                  sx={{ flex: "1" }}
                />
                <InputField
                  label={translate["last_name"]}
                  variant="outlined"
                  name="lastName"
                  sx={{ flex: "1" }}
                />
              </Stack>
              <InputField
                label={translate["email_input"]}
                variant="outlined"
                name="email"
              />
              <PasswordField
                name="password"
                label={translate["password_input"]}
              />
              <PasswordField
                name="passwordConfirm"
                label={translate["password_confirm"]}
              />

              <Button
                variant="contained"
                size="large"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? translate["loading"] : translate["signup_btn"]}
              </Button>
              <Link to="/login">{translate["existed_user"]}</Link>
            </StyledForm>
          )}
        </Formik>
      </StyledPaper>
    </Container>
  );
};

export default Signup;
