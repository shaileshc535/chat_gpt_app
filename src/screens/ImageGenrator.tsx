import React, { useState } from "react";
import { ReactStateDeclaration } from "@uirouter/react";
import {
  Grid,
  Button,
  TextField,
  CircularProgress,
  Paper,
  Box,
  Divider,
  Typography,
} from "@material-ui/core";
import { $crud } from "../factories/CrudFactory";

const ImageGenrator = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [keyword, setKeyword] = useState("");
  const [myArray, setMyArray] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const ImageGenratorFunction = async () => {
    setLoading(true);
    try {
      setMyArray(keyword);

      const dataVal = await $crud.post("chat/image", {
        keyword,
      });

      const newData = dataVal.data;

      setImageUrl(newData);
    } catch (e) {
      console.log(e);
    }
    setKeyword("");
    setLoading(false);
  };

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
          <>
            {imageUrl ? (
              <>
                <Typography variant="h6" className="p-2-all p-2">
                  {myArray + " image"}
                </Typography>
                <img src={imageUrl} width="450" height="400" alt="image" />
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </Grid>

      <Grid item xs={12} className="ml-2 p-3 form_container">
        <Box
          component={"form"}
          onSubmit={(e) => {
            e.preventDefault();
            ImageGenratorFunction();
          }}
        >
          <Divider />

          <Grid container item xs={12} className="p-2-all p-2 my-2 ">
            <TextField
              required
              className="textfield"
              label="keyword for image"
              type="text"
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
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
};

export const states: ReactStateDeclaration[] = [
  {
    url: "/image-genratetor",
    name: "image-genratetor",
    data: {
      title: "ImageGenrator",
      loggedIn: false,
    },
    component: ImageGenrator,
  },
];
