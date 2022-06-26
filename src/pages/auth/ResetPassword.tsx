import { Stack, Typography, Button, Alert } from "@mui/material";
import React, { useLayoutEffect } from "react";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectTheme } from "../../store/theme/themeSlice";
import { resetPassword } from "../../store/auth/asyncActions";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import PasswordField from "../../components/InputField/PasswordField";
import { useParams } from "react-router-dom";
import { clearMsgs, getAuthErrMsg } from "../../store/auth/authSlice";

///////////////////////////////////////////////
const StyledForm = styled(Form)({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

const ResetPassword = () => {
  // get resetToken
  const params = useParams();
  // get translator
  const { translate } = useAppSelector(selectTheme);
  // get store consumers
  const dispatch = useAppDispatch();
  const errMsg = useAppSelector(getAuthErrMsg);

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    const { password, passwordConfirm } = values;
    const resetToken = params.resetToken as string;
    await dispatch(resetPassword({ resetToken, password, passwordConfirm }));
    resetForm();
  };

  const initialValues = {
    password: "",
    passwordConfirm: "",
  };
  const validationSchema = Yup.object({
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
    <Stack marginTop="5rem" direction="row" justifyContent="center">
      <Stack sx={{ width: { xs: "90%", sm: "60%" } }} spacing={"1rem"}>
        <Typography variant="h2" marginBottom={"2rem"} width="100%">
          {translate["reset_pass_header"]}
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
          {({ isSubmitting }) => (
            <StyledForm>
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
                {isSubmitting
                  ? translate["loading"]
                  : translate["reset_pass_btn"]}
              </Button>
            </StyledForm>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
};

export default ResetPassword;
