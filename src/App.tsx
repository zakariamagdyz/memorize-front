import React from "react";
import { Container, AppBar, Typography } from "@mui/material";
import memories from "./assets/images/memories.png";

interface IProps {}
const App: React.FunctionComponent<IProps> = () => {
  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">
          Memories
        </Typography>
        <img src={memories} alt="Memories" height="60" />
      </AppBar>
    </Container>
  );
};

export default App;
