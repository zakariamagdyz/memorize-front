import { AppBar, Button, Container, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import memories from "../../assets/images/memories.png";
import { LanguageContext } from "../../contexts/localization";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Outlet } from "react-router-dom";

type Props = {
  mode: "dark" | "light";
  colorMode: { toggleColorMode: () => void };
};

const Header: React.FC<Props> = ({ mode, colorMode }) => {
  const { translate, lang, setLang } = useContext(LanguageContext);

  return (
    <Container maxWidth="xl" sx={{ padding: { xs: 0, sm: " 0 1rem" } }}>
      <AppBar position="static" color="inherit" sx={{ borderRadius: 2 }}>
        <Stack direction="row" sx={{ padding: ".5em 0" }} alignItems="center">
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            flex={1}
          >
            <Typography variant="h2" align="center" color="primary">
              {translate.memorize}
            </Typography>
            <img src={memories} alt="Memories" height="60" />
          </Stack>
          <Stack>
            <Button
              onClick={() => {
                setLang(lang === "ar" ? "en" : "ar");
              }}
            >
              {translate["lang"]}
            </Button>
            <Button onClick={colorMode.toggleColorMode}>
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
