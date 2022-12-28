import React, { useState, useEffect } from "react";
import { ReactStateDeclaration, UISref } from "@uirouter/react";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Paper,
  Link,
  Box,
  ThemeProvider,
  createTheme,
  InputAdornment,
} from "@material-ui/core";
import { $state } from "../../router";
import { UserCheck, Eye, EyeOff } from "react-feather";
let theralogo = require("../../images/theralogo.jpeg");
import { $crud } from "../../factories/CrudFactory";

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

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [tmp_password, setTmp_password] = useState<string>("");
  const [new_password, setNew_password] = useState<string>("");
  const [confirm_password, setConfirm_password] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const forgetPassword = async () => {
    setLoading(true);
    try {
      if (new_password !== confirm_password) {
        console.log("Password did Not Match");
      } else {
        const data = await $crud.post("user/forgot-reset-password", {
          email,
          tmp_password,
          new_password,
          confirm_password,
        });

        $state.go("login");
      }
    } catch (e) {
      console.log(e);
    }
    clearValues();
    setLoading(false);
  };

  const clearValues = () => {
    setEmail("");
    setTmp_password("");
    setNew_password("");
    setConfirm_password("");
  };

  const [password1Shown, setPassword1Shown] = useState(false);
  const [password2Shown, setPassword2Shown] = useState(false);

  const handlePassword1 = async (e) => {
    await setPassword1Shown(!password1Shown);
  };

  const handlePassword2 = async (e) => {
    await setPassword2Shown(!password2Shown);
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
              }}
            />
          </Grid>
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar style={{ backgroundColor: "secondary" }}>
              <UserCheck onClick={clearValues} style={{ cursor: "pointer" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box
              component={"form"}
              onSubmit={(e) => {
                e.preventDefault();
                forgetPassword();
              }}
            >
              <TextField
                required
                fullWidth
                autoFocus
                margin="normal"
                name="email"
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                type="text"
                name="tmp_password"
                label="Temprary Password"
                value={tmp_password}
                onChange={(e) => setTmp_password(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                type={password1Shown !== false ? "text" : "password"}
                name="new_password"
                label="Password"
                value={new_password}
                onChange={(e) => setNew_password(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={handlePassword1}
                      style={{ cursor: "pointer" }}
                    >
                      {password1Shown !== false ? <EyeOff /> : <Eye />}
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                type={password2Shown !== false ? "text" : "password"}
                name="confirm_password"
                label="Confirm Password"
                value={confirm_password}
                onChange={(e) => setConfirm_password(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={handlePassword2}
                      style={{ cursor: "pointer" }}
                    >
                      {password2Shown !== false ? <EyeOff /> : <Eye />}
                    </InputAdornment>
                  ),
                }}
              />

              <Grid container justify="flex-end" className="mt-2">
                <Button
                  disabled={loading}
                  type="submit"
                  variant="contained"
                  color={"primary"}
                  fullWidth
                  className="mb-3 mt-4"
                >
                  {loading ? "Logging In" : "Submit"}
                </Button>
              </Grid>
              <Grid container justify="flex-start" className="p-3">
                <Grid container style={{ margin: "auto", cursor: "pointer" }}>
                  <Grid item xs={12} md={4}>
                    <UISref to="forget-password">
                      <Typography variant="subtitle2" color="primary">
                        Reset Email Address?
                      </Typography>
                    </UISref>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <UISref to="register">
                      <Typography variant="subtitle2" color="primary">
                        Don't Have A Account?
                      </Typography>
                    </UISref>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <UISref to="login">
                      <Typography variant="subtitle2" color="primary">
                        Allready Have A Account?
                      </Typography>
                    </UISref>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
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
    url: "/reset-password",
    name: "reset-password",
    data: {
      title: "ResetPassword",
      loggedOut: true,
    },
    component: ResetPassword,
  },
];
