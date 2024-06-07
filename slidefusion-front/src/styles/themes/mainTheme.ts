// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#640D6B',
      dark: '#32012F',
    },
    secondary: {
      main: '#B51B75',
    },
    success: {
        main: '#00a152',
    },
    error: {
      main: '#e83b31',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  transitions: {
    duration: {
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
});

export default mainTheme;
