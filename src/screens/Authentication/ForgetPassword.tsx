import React, { useState, useEffect } from "react";
import { ReactStateDeclaration, UISref } from "@uirouter/react";
import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Link,
  Box,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import { $state } from "../../router";
import { RefreshCcw } from "react-feather";
import { $crud } from "../../factories/CrudFactory";
let theralogo = require("../../images/theralogo.jpeg");

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://thera-web.vercel.app/#/">
        Theranet
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const forgetPassword = async () => {
    setLoading(true);
    try {
      const data = await $crud.post("user/forgotPass", {
        email,
      });

      $state.go("reset-password");
    } catch (e) {
      console.log(e);
    }
    clearValues();
    setLoading(false);
  };

  const clearValues = () => {
    setEmail("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        style={{ height: "100vh" }}
        justify="center"
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Grid
            container
            item
            xs={12}
            md={12}
            style={{
              justifyContent: "center",
            }}
          >
            <img
              src={theralogo}
              style={{
                width: "25%",
                marginTop: "-25px",
              }}
            />
          </Grid>
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "-40px",
            }}
          >
            <Avatar>
              <RefreshCcw onClick={clearValues} style={{ cursor: "pointer" }} />
            </Avatar>
            <Typography component="h1" variant="h5" className="mt-3">
              Forget Password
            </Typography>
            <Grid container justify="center" className="mt-5">
              <Grid item xs={8} md={8}>
                <Box
                  component={"form"}
                  onSubmit={(e) => {
                    e.preventDefault();
                    forgetPassword();
                  }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    label="Email Address"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Grid container justify="flex-end">
                    <Button
                      disabled={loading}
                      type="submit"
                      variant="contained"
                      color={"primary"}
                      fullWidth
                      className="mb-3 mt-4"
                    >
                      {loading ? "Loading..." : "Submit"}
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={12} className="mt-2">
                    <Grid
                      container
                      justify="flex-start"
                      style={{ margin: "Auto", cursor: "pointer" }}
                    >
                      <Grid item xs={6} md={6}>
                        <UISref to="register">
                          <Typography
                            variant="subtitle2"
                            color="primary"
                            className="pt-2"
                          >
                            Don't Have a Account?
                          </Typography>
                        </UISref>
                      </Grid>
                      <Grid item xs={6} md={6} container justify="flex-end">
                        <UISref to="login">
                          <Typography
                            variant="subtitle2"
                            className="pt-2"
                            color="primary"
                          >
                            Allready Have a Account?
                          </Typography>
                        </UISref>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Copyright
            style={{
              position: "static",
              bottom: 0,
              marginTop: "50px",
            }}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export const states: ReactStateDeclaration[] = [
  {
    url: "/forget-password",
    name: "forget-password",
    data: {
      title: "ForgetPassword",
      loggedOut: true,
    },
    component: ForgetPassword,
  },
];
