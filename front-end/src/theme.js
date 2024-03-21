import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Set the mode to 'dark'
    primary: {
      main: '#1976D2', // Your desired primary color (optional)
    },
    secondary: {
      main: '#F50057', // Your desired secondary color (optional)
    },
    background: {
      default: '#212121', // Black background color
    },
    text: {
      primary: '#fff', // White text color
    },
  },
});

export default darkTheme;
