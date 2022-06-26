import { Stack, Typography, Button, Alert } from "@mui/material";
import React, { useLayoutEffect } from "react";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectTheme } from "../../store/theme/themeSlice";
import { forgotPassword } from "../../store/auth/asyncActions";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import InputField from "../../components/InputField/InputField";
import {
  clearMsgs,
  getAuthErrMsg,
  getAuthMsg,
} from "../../store/auth/authSlice";
import { Link } from "react-router-dom";

const StyledForm = styled(Form)({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

const ForgotPassword = () => {
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
    const { email } = values;
    await dispatch(forgotPassword(email));

    resetForm();
  };

  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(translate["yup_required_field"])
      .max(55, translate["yup_field_max_count"])
      .email(translate["yup_email_verify"]),
  });

  // clear Auth msgs after component mounted
  useLayoutEffect(() => {
    dispatch(clearMsgs());
  }, [dispatch]);

  return (
    <Stack marginTop="5rem" direction="row" justifyContent="center">
      <Stack sx={{ width: { xs: "90%", sm: "60%" } }} spacing={"1rem"}>
        <Typography variant="h2" marginBottom={"2rem"} width="100%">
          {translate["forgot_password_title"]}
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
          {({ isSubmitting, handleChange, values }) => (
            <StyledForm>
              <InputField
                label={translate["email_input"]}
                variant="outlined"
                name="email"
              />
              <Button
                variant="contained"
                size="large"
                disabled={isSubmitting}
                type="submit"
              >
                {translate["send_mail"]}
              </Button>
              <Stack spacing={1}>
                <Link to="/login">{translate["remember_pass"]}</Link>
              </Stack>
            </StyledForm>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
};

export default ForgotPassword;
