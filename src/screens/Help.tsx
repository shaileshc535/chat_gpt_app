import React, { useEffect, useState } from "react";
import { ReactStateDeclaration } from "@uirouter/react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { $crud } from "../factories/CrudFactory";
import { Typography } from "@material-ui/core";

const Help = () => {
  let [loading, setLoading] = useState<boolean>(false);
  let [result, setResult] = useState([]);

  const getFaqList = async () => {
    try {
      setLoading(true);
      const data = await $crud.get("user/patient/get-faq/");
      setResult(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFaqList().then();
  }, []);

  return (
    <Grid
      container
      className="p-2-all p-2"
      direction="column"
      wrap={"nowrap"}
      spacing={2}
    >
      <Grid xs={12}>
        <Grid container wrap="nowrap">
          <Grid
            component={Paper}
            item
            xs={12}
            md={12}
            className="p-2-all p-2 border"
            justify="center"
          >
            <Grid container className={"p-2-all"}>
              <Grid item md={4} xs={12} className={"p-2-all"}>
                <Typography
                  variant="h6"
                  component={Grid}
                  item
                  xs
                  className="font-weight-bold pl-3"
                >
                  HELP
                </Typography>
              </Grid>
              <Grid item xs={6} md={4} className={"p-2-all"}></Grid>
              <Grid item xs={6} md={4} className={"p-2-all"}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const states: ReactStateDeclaration[] = [
  {
    url: "/help-desk",
    name: "help-desk",
    data: {
      title: "Help",
      loggedIn: true,
    },
    component: Help,
  },
];
