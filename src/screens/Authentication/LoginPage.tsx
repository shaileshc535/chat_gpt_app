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
  InputAdornment,
} from "@material-ui/core";
import { $user, LoginParams } from "../../factories/UserFactory";
import { $state } from "../../router";
import { Lock, Eye, EyeOff } from "react-feather";
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

const LoginPage = () => {
  const rememberedCredentials = $user.getRememberedCredentials();

  const [params, setParams] = useState<LoginParams>(
    rememberedCredentials || {
      email: "",
      password: "",
      role: "",
    }
  );

  const [remember, setRemember] = useState(!!rememberedCredentials);

  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      console.log(params);
      await $user.login(params);
      const user = await $user.current();

      if (remember) {
        $user.rememberCredentials(params);
      } else {
        $user.forgetCredentials();
      }
      $state.go("home");
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const clearValues = () => {
    setParams({
      email: "",
      password: "",
      role: "",
    });
  };

  const setParam = (name: string, value: any) => {
    setParams((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const handlePassword = async (e) => {
    await setPasswordShown(!passwordShown);
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
              <Lock onClick={clearValues} style={{ cursor: "pointer" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component={"form"}
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoFocus
                type="email"
                name="username"
                value={params.email}
                onChange={(e) => setParam("email", e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                autoFocus
                type={passwordShown !== false ? "text" : "password"}
                name="password"
                value={params.password}
                onChange={(e) => setParam("password", e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={handlePassword}
                      style={{ cursor: "pointer" }}
                    >
                      {passwordShown !== false ? <EyeOff /> : <Eye />}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                select
                margin="normal"
                required
                fullWidth
                label="Role"
                autoFocus
                name="role"
                value={params.role}
                onChange={(e) => setParam("role", e.target.value)}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Select a role</em>
                </MenuItem>
                <MenuItem value="patient">Patient</MenuItem>
                <MenuItem value="doctor">Therapist</MenuItem>
              </TextField>
              <FormControlLabel
                className="mt-2"
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    name="remember_me"
                    color="primary"
                  />
                }
                label="Remember Me"
              />
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
                    <UISref to="forget-password">
                      <Typography
                        variant="subtitle2"
                        className="pt-2"
                        color="primary"
                      >
                        Forget Password
                      </Typography>
                    </UISref>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container justify="flex-end">
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
    url: "/",
    name: "login",
    data: {
      title: "Login",
      loggedOut: true,
    },
    component: LoginPage,
  },
];
