import { createTheme } from "@mui/material";

export const Theme = createTheme({
    breakpoints:{
      values:{
        xs:0,
        sm:600,
        md:900,
        lg:1200,
        xl:1440
      }
    },
    typography:{
      fontFamily:"Poppins, sans-serif",
      button:{
        textTransform:'none'
      }
    },
    palette:{
      primary: {
        main: '#7126B5',
        light: '#8045b5',
        dark: '#490f7d',
        contrastText: '#fff'
      },
      background:{
        paper: '#fff',
        purple: '#7126B5'
      },
      action: {
        disabled: '#fff'
      }
    }
});