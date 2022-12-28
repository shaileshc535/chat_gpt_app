import React, { useEffect, useState } from "react";
import { ReactStateDeclaration } from "@uirouter/react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography, Button, Box, TextField } from "@material-ui/core";
import { $crud } from "./factories/CrudFactory";
import { useCurrentUser } from "./factories/UserFactory";

export function Home() {
  const user = useCurrentUser();
  const [loading, setLoading] = useState<Boolean>(false);
  const [prompt, setPrompt] = useState("");
  const [myArray, setMyArray] = useState([]);

  const promptCreateFunction = async () => {
    setLoading(true);
    try {
      setMyArray((oldArray) => [...oldArray, { prompt: prompt, key: 1 }]);

      const dataVal = await $crud.post("chat/gpt", {
        prompt,
      });

      const newData = dataVal.data;

      setMyArray((oldArray) => [...oldArray, { prompt: newData, key: 2 }]);

      console.log(myArray);
    } catch (e) {
      console.log(e);
    }
    setPrompt("");
    setLoading(false);
  };

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      style={{ position: "relative" }}
      className="mainContainer"
    >
      <Grid item xs={12} className="ml-2 p-3 chat_area">
        {loading ? (
          <></>
        ) : (
          <Grid item className="chat_content">
            {myArray &&
              myArray.map((item, i) => (
                <>
                  {item.key === 1 ? (
                    <Typography
                      variant="h5"
                      component={Grid}
                      item
                      xs
                      key={i}
                      style={{
                        margin: "10px",
                        padding: "10px",
                        backgroundColor: "#F5EDCE",
                      }}
                    >
                      {item.prompt}
                    </Typography>
                  ) : item.key === 2 ? (
                    <Typography
                      variant="h5"
                      component={Grid}
                      item
                      xs
                      key={i}
                      style={{
                        margin: "10px",
                        padding: "10px",
                        backgroundColor: "#FCF9BE",
                      }}
                    >
                      {item.prompt}
                    </Typography>
                  ) : (
                    <></>
                  )}
                </>
              ))}
          </Grid>
        )}
      </Grid>

      <Grid item xs={12} className="ml-2 p-3 form_container">
        <Box
          component={"form"}
          onSubmit={(e) => {
            e.preventDefault();
            promptCreateFunction();
          }}
        >
          <TextField
            required
            className="textfield"
            label="Ask Questions in Playground"
            type="text"
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <Button type="submit" className="submit-button">
            <img src={require("../send.svg")} className="p-3 mx-auto" />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export const states: ReactStateDeclaration[] = [
  {
    url: "/home",
    name: "home",
    data: {
      title: "Home",
      loggedIn: true,
    },
    component: Home,
  },
];
