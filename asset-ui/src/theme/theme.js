import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    palette:{
        mode:"dark",
        primary:{
            main:"#1976d2"
        },

        secondary:{
            main : "#2e7d32"
        },
         background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    },
});
export default theme;