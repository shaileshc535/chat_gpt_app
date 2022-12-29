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
      label: "Text Genrator",
      link: "home",
    },
    {
      label: "Image Genrator",
      link: "image-genratetor",
    },
    {
      label: "Email Genrator",
      link: "email",
    },
    {
      label: "Blog Post Genrator",
      link: "blog",
    },
    {
      label: "SEO Tags Genrator",
      link: "seo",
    },
  ];

  return (
    <Drawer
      classes={{ root: classes.drawer }}
      variant="permanent"
      anchor="left"
    >
      <Typography variant="h5" color="primary" className="p-3 mx-auto">
        ChatGPT
      </Typography>
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
      </List>
    </Drawer>
  );
}
