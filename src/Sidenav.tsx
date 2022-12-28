import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { UISref } from "@uirouter/react";

const useStyles = makeStyles({
  drawer: {
    width: 240,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 240,
      boxSizing: "border-box",
    },
  },
});

export function Sidenav({ user }) {
  const classes = useStyles();

  const Links = [
    {
      label: "Dashboard",
      link: "dashboard",
    },

    {
      label: "Appointments",
      link: "appointments",
    },
    {
      label: "Settings",
      link: "setting",
    },
  ];

  return (
    <Drawer
      classes={{ root: classes.drawer }}
      variant="permanent"
      anchor="left"
    >
      <img
        src={require("../logo.png")}
        className="p-3 mx-auto"
        style={{ width: 200 }}
      />
      <Divider />
      <List className="p-0">
        {Links.map((item, i) => (
          <UISref to={item.link} key={i}>
            <ListItem button>
              <Typography variant="subtitle2" className="p-2">
                {item.label}
              </Typography>
            </ListItem>
          </UISref>
        ))}
        {/* {user ? (
          <>
            {doctorLinks.map((item, i) => (
              <UISref to={item.link} key={i}>
                <ListItem button>
                  <Typography variant="subtitle2" className="p-2">
                    {item.label}
                  </Typography>
                </ListItem>
              </UISref>
            ))}
            {user.role_id == "patient" ? (
              <>
                {patientLinks.map((item, i) => (
                  <UISref to={item.link} key={i}>
                    <ListItem button>
                      <Typography variant="subtitle2" className="p-2">
                        {item.label}
                      </Typography>
                    </ListItem>
                  </UISref>
                ))}
              </>
            ) : user.role_id == "doctor" ? (
              <>
                {doctorLinks.map((item, i) => (
                  <UISref to={item.link} key={i}>
                    <ListItem button>
                      <Typography variant="subtitle2" className="p-2">
                        {item.label}
                      </Typography>
                    </ListItem>
                  </UISref>
                ))}
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )} */}
      </List>
    </Drawer>
  );
}
