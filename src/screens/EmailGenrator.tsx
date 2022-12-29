import React, { useState, useRef, useEffect } from "react";
import { ReactStateDeclaration } from "@uirouter/react";
import {
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
  Paper,
} from "@material-ui/core";
import { $crud } from "../factories/CrudFactory";

export function EmailGenrator() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [prompt, setPrompt] = useState("");
  const [myArray, setMyArray] = useState([]);
  const bottomRef = useRef(null);

  const promptCreateFunction = async () => {
    setLoading(true);
    try {
      setMyArray((oldArray) => [...oldArray, { prompt: prompt, key: 1 }]);

      const dataVal = await $crud.post("chat/email", {
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

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [myArray]);

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      style={{ position: "relative" }}
      className="mainContainer my-2"
    >
      <Grid item xs={12} className="ml-2 p-3 chat_area" component={Paper}>
        {loading ? (
          <CircularProgress />
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
        <div ref={bottomRef} />
      </Grid>

      <Grid item xs={12} className="ml-2 p-3 form_container">
        <Box
          component={"form"}
          onSubmit={(e) => {
            e.preventDefault();
            promptCreateFunction();
          }}
        >
          <Grid container item xs={12} className="p-2-all p-2 my-2 ">
            <TextField
              required
              className="textfield"
              label="Email keyword "
              type="text"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </Grid>

          <Grid container item xs={12} className="p-2-all p-2 my-2 ">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className="submit-button"
            >
              {loading ? "loading" : "Submit"}
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export const states: ReactStateDeclaration[] = [
  {
    url: "/email",
    name: "email",
    data: {
      title: "EmailGenrator",
      loggedIn: false,
    },
    component: EmailGenrator,
  },
];
