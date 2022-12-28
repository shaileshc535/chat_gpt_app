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
import { $user, RegisterParams } from "../../factories/UserFactory";
import { $state } from "../../router";
import { UserPlus, Eye, EyeOff } from "react-feather";
let theralogo = require("../../images/theralogo.jpeg");
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import PasswordChecklist from "react-password-checklist";

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

const Register = () => {
  const rememberedCredentials = $user.getRememberedCredentials();

  const [params, setParams] = useState<RegisterParams>(
    rememberedCredentials || {
      firstname: "",
      lastname: "",
      confirmPassword: "",
      phone: "",
      email: "",
      password: "",
      role_id: "",
      dob: "",
      gender: "",
    }
  );

  const [remember, setRemember] = useState(!!rememberedCredentials);

  const [loading, setLoading] = useState(false);

  const [password1Shown, setPassword1Shown] = useState(false);
  const [password2Shown, setPassword2Shown] = useState(false);

  const handlePassword1 = async (e) => {
    await setPassword1Shown(!password1Shown);
  };

  const handlePassword2 = async (e) => {
    await setPassword2Shown(!password2Shown);
  };

  const login = async () => {
    setLoading(true);
    try {
      await $user.register(params);
      const user = await $user.current();

      if (remember) {
        $user.rememberCredentials(params);
      } else {
        $user.forgetCredentials();
      }

      $state.go("home");
    } catch (e) {
      console.log("error", e);
    }
    setLoading(false);
    clearValues();
  };

  const clearValues = () => {
    setParams({
      firstname: "",
      lastname: "",
      confirmPassword: "",
      phone: "",
      email: "",
      password: "",
      role_id: "",
      dob: "",
      gender: "",
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    clearValues();
  }, []);

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
              <UserPlus onClick={clearValues} style={{ cursor: "pointer" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component={"form"}
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
            >
              <TextField
                required
                fullWidth
                autoFocus
                label="First Name"
                margin="normal"
                type="text"
                name="firstname"
                value={params.firstname}
                onChange={(e) => setParam("firstname", e.target.value)}
              />
              <TextField
                required
                fullWidth
                autoFocus
                margin="normal"
                type="text"
                label="Last Name"
                name="lastname"
                value={params.lastname}
                onChange={(e) => setParam("lastname", e.target.value)}
              />
              <TextField
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                autoFocus
                margin="normal"
                type="date"
                label="Date Of Birth"
                name="dob"
                value={params.dob || ""}
                onChange={(e) => setParam("dob", e.target.value)}
              />

              <TextField
                select
                required
                fullWidth
                autoFocus
                margin="normal"
                name="gender"
                label="Gender"
                value={params.gender}
                onChange={(e) => setParam("gender", e.target.value)}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Select Gender</em>
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>

              <TextField
                required
                fullWidth
                autoFocus
                type="text"
                margin="normal"
                label="Contact Number"
                name="phone"
                value={params.phone}
                onChange={(e) => setParam("phone", e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                label="Email Address"
                type="email"
                name="username"
                value={params.email}
                onChange={(e) => setParam("email", e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                label="Password"
                type={password1Shown !== false ? "text" : "password"}
                name="password"
                value={params.password}
                onChange={(e) => setParam("password", e.target.value)}
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

              <PasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={6}
                value={params.password}
                valueAgain={params.confirmPassword}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                label="Confirm Password"
                type={password2Shown !== false ? "text" : "password"}
                name="confirmPassword"
                value={params.confirmPassword}
                onChange={(e) => setParam("confirmPassword", e.target.value)}
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

              <TextField
                select
                margin="normal"
                required
                fullWidth
                label="Role"
                autoFocus
                name="role"
                value={params.role_id}
                onChange={(e) => setParam("role_id", e.target.value)}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Select a role</em>
                </MenuItem>
                <MenuItem value="patient">Patient</MenuItem>
                <MenuItem value="doctor">Therapist</MenuItem>
              </TextField>

              <Grid item xs={12} md={12} className="mt-2">
                <Grid
                  container
                  justify="flex-start"
                  style={{ margin: "Auto", cursor: "pointer" }}
                >
                  <Grid item xs={6} md={6}>
                    <UISref to="login">
                      <Typography
                        variant="subtitle2"
                        className="p-2"
                        color="primary"
                      >
                        Allready have a account?
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
                  {loading ? "Loading..." : "Submit"}
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
    url: "/register",
    name: "register",
    data: {
      title: "Register",
      loggedOut: true,
    },
    component: Register,
  },
];
