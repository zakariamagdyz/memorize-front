import {
  Stack,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectTheme } from "../store/theme/themeSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "../store/auth/asyncActions";

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

const Login = () => {
  const { translate } = useAppSelector(selectTheme);
  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [persistMe, setPersistMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((state) => ({ ...state, [name]: value }));
  };

  const handleShowPassword = () => {
    setShowPassword((state) => !state);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const dispatch = useAppDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(values));
    if (!persistMe) return;
    localStorage.setItem("persistMe", "yes");
  };

  return (
    <Stack marginTop="5rem" direction="row" justifyContent="center">
      <Stack sx={{ width: { xs: "90%", sm: "60%" } }} spacing={"1rem"}>
        <Typography variant="h2" marginBottom={"2rem"} width="100%">
          {translate["login_header"]}
        </Typography>
        <Form onSubmit={handleSubmit}>
          <TextField
            label={translate["email_input"]}
            variant="outlined"
            name="email"
            onChange={handleChange}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              {translate["password_input"]}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              name="password"
              sx={{ letterSpacing: "1px" }}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={persistMe}
                onChange={() => setPersistMe((state) => !state)}
              />
            }
            label={translate["remember_me"]}
          />
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={!values.password || !values.email}
          >
            {translate["login_btn"]}
          </Button>
        </Form>
      </Stack>
    </Stack>
  );
};

export default Login;
