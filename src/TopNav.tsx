import {
  AppBar,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import * as React from "react";
import { useEffect } from "react";
import classNames from "classnames";
import {
  Menu as MenuIcon,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
} from "react-feather";
import { $user } from "./factories/UserFactory";
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [hideNav, setHideNav] = useState(false);

  $transition.onSuccess({}, () => {
    if ($state.current.name === "resetPassword") {
      setHideNav(true);
    } else {
      setHideNav(false);
    }
  });

  const handleBackButton = () => {
    history.back();
  };

  const handleNextButton = () => {
    history.forward();
  };

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

  let currentScreenWidth = windowDimensions.width;

  return (
    <AppBar
      elevation={1}
      className={classNames(classes.root)}
      position="static"
    >
      <Toolbar>
        <Grid container direction="row" style={{ alignItems: "center" }}>
          {currentScreenWidth >= 565 ? (
            <Grid
              item
              xs={4}
              style={{
                justifyContent: "flex-start",
              }}
            >
              <Button
                type="submit"
                size="small"
                style={{
                  background: "#507ce0",
                  color: "#fff",
                  borderRadius: "25px",
                }}
                onClick={handleBackButton}
              >
                <ArrowLeft />
              </Button>
              <Button
                type="submit"
                size="small"
                style={{
                  background: "#507ce0",
                  marginLeft: "5px",
                  color: "#fff",
                  borderRadius: "25px",
                }}
                onClick={handleNextButton}
              >
                <ArrowRight />
              </Button>
            </Grid>
          ) : (
            <Grid
              item
              xs={4}
              style={{
                justifyContent: "flex-start",
              }}
            >
              <IconButton
                type="submit"
                size="small"
                className="mr-1"
                style={{
                  background: "#507ce0",
                  color: "#fff",
                  borderRadius: "25px",
                }}
              >
                <ArrowLeft onClick={handleBackButton} />
              </IconButton>
              <IconButton
                type="submit"
                size="small"
                style={{
                  background: "#507ce0",
                  color: "#fff",
                  borderRadius: "25px",
                  marginLeft: "2px",
                }}
              >
                <ArrowRight onClick={handleNextButton} />
              </IconButton>
            </Grid>
          )}

          <Grid item xs={4} container justify="center">
            {/* <UISref to={"home"}>
              <img
                src={theralogo}
                className="pointer"
                style={{
                  width: "125px",
                  height: "75px",
                }}
              />
            </UISref> */}
          </Grid>

          {currentScreenWidth >= 565 ? (
            <>
              {!hideNav ? (
                <Grid
                  item
                  md={4}
                  xs={4}
                  justify="flex-end"
                  container
                  style={{ right: 0 }}
                >
                  {/* <UISref to="chat" className="mr-1">
                    <Button
                      type="submit"
                      style={{
                        background: "#507ce0",
                        color: "#fff",
                        borderRadius: "25px",
                      }}
                    >
                      Chat
                      <MessageCircle />
                    </Button>
                  </UISref> */}
                  <IconButton
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    color="inherit"
                    className="ml-1"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <UISref to="setting" params={{ id: 2 }}>
                      <MenuItem onClick={handleClose}>Change Password</MenuItem>
                    </UISref>

                    <UISref to="help-desk">
                      <MenuItem onClick={handleClose}>Help</MenuItem>
                    </UISref>
                    <UISref to="faq">
                      <MenuItem onClick={handleClose}>FAQ</MenuItem>
                    </UISref>
                    <UISref to="login">
                      <MenuItem
                        onClick={async () => {
                          await $user.logout();
                        }}
                      >
                        Logout
                      </MenuItem>
                    </UISref>
                  </Menu>
                </Grid>
              ) : (
                <Button
                  color="inherit"
                  size="medium"
                  onClick={() => {
                    $user.logout();
                  }}
                >
                  Cancel
                </Button>
              )}
            </>
          ) : (
            <>
              {!hideNav ? (
                <Grid
                  item
                  md={4}
                  xs={4}
                  justify="flex-end"
                  container
                  style={{ right: 0 }}
                >
                  <UISref to="chat">
                    <IconButton color="inherit" type="submit" size="small">
                      <MessageCircle />
                    </IconButton>
                  </UISref>
                  <IconButton
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    color="inherit"
                    size="small"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <UISref to="setting" params={{ id: 2 }}>
                      <MenuItem onClick={handleClose}>Change Password</MenuItem>
                    </UISref>
                    <UISref to="help">
                      <MenuItem onClick={handleClose}>Help</MenuItem>
                    </UISref>
                    <UISref to="faq">
                      <MenuItem onClick={handleClose}>FAQ</MenuItem>
                    </UISref>
                    <UISref to="login">
                      <MenuItem
                        onClick={async () => {
                          await $user.logout();
                        }}
                      >
                        Logout
                      </MenuItem>
                    </UISref>
                  </Menu>
                </Grid>
              ) : (
                <Button
                  color="inherit"
                  size="medium"
                  onClick={() => {
                    $user.logout();
                  }}
                >
                  Cancel
                </Button>
              )}
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
