import React, { useState } from "react";
import { useField } from "formik";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";

const Error = styled(Typography)({
  fontWeight: 400,
  color: "#d32f2f",
  fontSize: ".75rem",
  lineHeight: 1.66,
  marginTop: "3px",
  marginLeft: "14px",
  marginRight: "14px",
});

type Props = Record<string, any> & { label: string; name: string };
const PasswordField: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((state) => !state);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor={`outlined-adornment-${props.name}`}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={`outlined-adornment-${props.name}`}
        type={showPassword ? "text" : "password"}
        {...props}
        {...field}
        error={meta.touched && meta.error ? true : false}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {meta.error && meta.touched && <Error>{meta.error}</Error>}
    </FormControl>
  );
};

export default PasswordField;
