import { createTheme, responsiveFontSizes } from "@material-ui/core";

const primary = {
  50: "#eaeffb",
  100: "#cbd8f6",
  200: "#a8bef0",
  300: "#85a3e9",
  400: "#6a90e5",
  500: "#507ce0",
  600: "#4974dc",
  700: "#4069d8",
  800: "#375fd3",
  900: "#274ccb",
  A100: "#ffffff",
  A200: "#d5deff",
  A400: "#a2b5ff",
  A700: "#89a1ff",
  contrastDefaultColor: "light",
};

const secondary = {
  50: "#fef7e8",
  100: "#fbebc5",
  200: "#f9de9f",
  300: "#f7d079",
  400: "#f5c65c",
  500: "#f3bc3f",
  600: "#f1b639",
  700: "#efad31",
  800: "#eda529",
  900: "#ea971b",
  A100: "#ffffff",
  A200: "#fff6eb",
  A400: "#ffe0b8",
  A700: "#ffd59e",
  contrastDefaultColor: "dark",
};

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary,
      secondary,
    },
    overrides: {
      MuiRadio: {
        root: {
          padding: 2,
        },
      },
    },
    typography: {
      fontSize: 13,
      fontFamily: "Muli",
    },
  })
);
