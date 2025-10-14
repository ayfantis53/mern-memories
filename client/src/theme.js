// npm installs
import { createTheme } from "@mui/material";


/**
 * 
 * @return is used to define a theme object in frameworks like Material UI (MUI).
 */
export const theme = createTheme({
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
    },
    palette: {
        primary: {
            main:  "#1760a5",
            light: "skyblue",
        },
        green: {
            main: "#15c630",
        },
        deepPurple500: {
            main: "#673AB7",
        }
    }
});