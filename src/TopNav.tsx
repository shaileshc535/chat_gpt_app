import {
  AppBar,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { useEffect } from "react";
import classNames from "classnames";
import { UISref } from "@uirouter/react";
import { $state, $transition } from "./router";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.contrastText,
  },
}));

export function TopNav(props = {}) {
  const classes = useStyles({});

  const [hideNav, setHideNav] = useState(false);

  $transition.onSuccess({}, () => {
    if ($state.current.name === "resetPassword") {
      setHideNav(true);
    } else {
      setHideNav(false);
    }
  });

  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return (
    <AppBar
      elevation={1}
      className={classNames(classes.root)}
      position="static"
    >
      <Toolbar>
        <Grid container direction="row" style={{ alignItems: "center" }}>
          <Grid item xs={12} container>
            <UISref to={"home"}>
              <Typography variant="h5" color="primary" className="p-3 mx-auto">
                Chat GPT Example App
              </Typography>
            </UISref>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
