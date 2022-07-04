import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import memories from "../../assets/images/memories.png";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectTheme,
  toggleLang,
  toggleMode,
} from "../../store/theme/themeSlice";
import { selectUser } from "../../store/auth/authSlice";
import { logout } from "../../store/auth/asyncActions";

const Header = () => {
  const { translate, mode } = useAppSelector(selectTheme);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <Container maxWidth="xl" sx={{ padding: { xs: 0, sm: " 0 1rem" } }}>
      <AppBar position="static" color="inherit" sx={{ borderRadius: 2 }}>
        <Stack direction="row" sx={{ padding: ".5em 0" }} alignItems="center">
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            flex={1}
            p="0 1em"
          >
            <Typography variant="h2" align="center" color="primary">
              {translate.memorize}
            </Typography>
            <img src={memories} alt="Memories" height="60" />
          </Stack>
          <Stack m="0 2em">
            {user ? (
              <Stack spacing={2} justifyContent="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar alt={user.name} src={user.picture}>
                    {user.name.charAt(0)}
                  </Avatar>
                  <Typography variant="h6">
                    {user.name.split(" ")[0]}
                  </Typography>
                </Stack>
                <Button
                  onClick={() => dispatch(logout())}
                  variant="contained"
                  color="error"
                  size="small"
                >
                  Logout
                </Button>
              </Stack>
            ) : (
              <Button variant="contained" component={Link} to="/login">
                Signin
              </Button>
            )}
          </Stack>
          <Stack>
            <Button
              onClick={() => {
                dispatch(toggleLang());
              }}
            >
              {translate["lang"]}
            </Button>
            <Button onClick={() => dispatch(toggleMode())}>
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </Button>
          </Stack>
        </Stack>
      </AppBar>
      <Outlet />
    </Container>
  );
};

export default Header;
