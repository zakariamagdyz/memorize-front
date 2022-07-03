import {
  Alert,
  Badge,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import InputField from "../InputField/InputField";
import * as Yup from "yup";
import {
  clearCurrentMemo,
  selectCurrentMemo,
  useAddPostMutation,
  useUpdataPostMutation,
} from "../../store/posts/posts.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const StyledForm = styled(Form)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const MemorizeForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [addPost, { isError, error }] = useAddPostMutation();
  const [updatePost, { isError: updateIsError, error: updateError }] =
    useUpdataPostMutation();
  const currentMemo = useAppSelector(selectCurrentMemo);
  const dispatch = useAppDispatch();

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFile(event.target.files && event.target.files[0]);
  };

  const initialValues = {
    title: currentMemo?.title || "",
    message: currentMemo?.message || "",
    tags: currentMemo?.tags.toString() || "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    message: Yup.string().required(),
    tags: Yup.string().required(),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    const formData = new FormData();
    // loop through values and append each value to formData
    let key: keyof typeof values;
    for (key in values) {
      formData.append(key, values[key]);
    }
    // add file if exist
    if (file) {
      formData.append("image", file);
    }
    if (currentMemo) {
      await updatePost({ data: formData, id: currentMemo._id });
    } else {
      await addPost(formData);
    }
    // Reset Form, File, currentMemo
    resetForm();
    setFile(null);
    dispatch(clearCurrentMemo());
  };

  return (
    <Paper sx={{ padding: ".5em" }} elevation={2}>
      <Stack>
        {isError && (
          <Alert variant="filled" severity="error">
            {(error as any).data.message}
          </Alert>
        )}
        {updateIsError && (
          <Alert variant="filled" severity="error">
            {(updateError as any).data.message}
          </Alert>
        )}
        <Typography variant="h6" textAlign={"center"} padding=".8em 0">
          {!currentMemo ? "Creating" : "Updating"} a Memory
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, handleChange, resetForm }) => (
            <StyledForm autoComplete="off">
              <InputField name="title" label="Title" size="small" />
              <InputField
                name="message"
                label="Message"
                size="small"
                rows={4}
                multiline
              />
              <InputField
                name="tags"
                label="Tags (coma separated)"
                size="small"
              />
              <label htmlFor="contained-button-file">
                <input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  name="selectedFile"
                  onChange={handleFileInputChange}
                />
                <Box>
                  <Button variant="contained" component="span" size="small">
                    Upload
                  </Button>
                  <span style={{ marginLeft: ".5em", wordBreak: "break-all" }}>
                    {file?.name}
                  </span>
                </Box>
              </label>
              <Stack spacing=".5em">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                  color="secondary"
                  variant="contained"
                  size="small"
                >
                  {currentMemo ? "update" : "Create"}
                </Button>
                <Button
                  type="reset"
                  disabled={isSubmitting}
                  fullWidth
                  color="warning"
                  variant="contained"
                  size="small"
                  onClick={() => {
                    // Reset File, currentMemo, Form
                    setFile(null);
                    dispatch(clearCurrentMemo());
                    resetForm();
                  }}
                >
                  Clear
                </Button>
              </Stack>
            </StyledForm>
          )}
        </Formik>
      </Stack>
    </Paper>
  );
};

export default MemorizeForm;
