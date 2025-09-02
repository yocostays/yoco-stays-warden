import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#674D9F",
    },
    secondary: {
      main: "#ECE0FF",
    },
    text: {
      primary: "#0E0031",
      secondary: "#333333",
      light: "#DEDEDE",
    },
  },
  typography: {
    // fontFamily: "'Plus Jakarta Sans', sans-serif", // Add the font family here
    fontFamily: '"Quicksand", serif', // Add the font family here
    fontSize: 14, // Adjust the font size here
    fontWeight: 500,
    color:'#0E0031'
  },
  formLabel: {
    fontSize: 14, // Adjust the font size here
    fontWeight: 500,
  }
});

export default theme;
