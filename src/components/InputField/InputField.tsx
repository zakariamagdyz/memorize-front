import React from "react";
import { useField } from "formik";
import { Box, TextField } from "@mui/material";

type Props = Record<string, unknown> & { label: string; name: string };

const InputField: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      {...props}
      {...field}
      label={label}
      error={meta.touched && meta.error ? true : false}
      helperText={meta.touched && meta.error && meta.error}
    />
  );
};

export default InputField;
