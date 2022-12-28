import * as React from "react";
import { Grid, makeStyles, ThemeProvider } from "@material-ui/core";
import classNames from "classnames";
import { TopNav } from "./TopNav";
import { theme } from "./theme";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import { UIRouter, UIView } from "@uirouter/react";
import { $state, $transition, router } from "./router";
import { CrudProvider } from "@crud/react";
import {
  AlertDialog,
  ConfirmDialog,
  NotifySnackbar,
  ProgressIndicator,
} from "react-material-crud";
import { $crud } from "./factories/CrudFactory";
import { $user, useCurrentUser } from "./factories/UserFactory";
import { Sidenav } from "./Sidenav";

const useStyles = makeStyles({
  appContainer: {
    backgroundColor: "#eee",
    // backgroundColor: "#1c1c1e",

    overflowY: "auto",
    overflowX: "hidden",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "80%",
  },
  "@global": {
    body: {
      fontFamily: theme.typography.fontFamily,
    },
  },
});

$transition.onStart({}, async (trans) => {
  const to = trans.to();
  const loggedIn = to.data?.loggedIn;
  const loggedOut = to.data?.loggedOut;
  if (loggedIn || loggedOut) {
    const user = await $user.current();
    if (user && loggedOut) {
      return $state.target(
        "home",
        {},
        {
          location: "replace",
        }
      );
    } else if (!user && loggedIn) {
      return $state.target(
        "login",
        {},
        {
          location: "replace",
        }
      );
    }
  }
});

$transition.onBefore({}, () => {
  $crud.toggleLoading(true);
});

$transition.onSuccess({}, () => {
  $crud.toggleLoading(false);
});

$transition.onError({}, () => {
  $crud.toggleLoading(false);
});

export function AppComponent() {
  const classes = useStyles({});

  const user = useCurrentUser();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CrudProvider crud={$crud}>
        <UIRouter router={router}>
          <ThemeProvider theme={theme}>
            <Grid container wrap="nowrap">
              {/* {user && <Sidenav />} */}
              <Grid item xs container direction="column">
                {/* {user && <TopNav />} */}
                <Grid
                  item
                  xs
                  container
                  direction="column"
                  className={classNames(classes.appContainer)}
                >
                  <UIView />
                </Grid>
              </Grid>
              <ProgressIndicator />
              <NotifySnackbar autoHideDuration={5000} />
              <AlertDialog />
              <ConfirmDialog />
            </Grid>
          </ThemeProvider>
        </UIRouter>
      </CrudProvider>
    </MuiPickersUtilsProvider>
  );
}
