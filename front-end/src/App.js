
import React from 'react';
import Chatbot from './components/Chatbot';
import { ThemeProvider } from '@emotion/react'; // Fixed import
import { createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
 

  // Define theme with dark mode settings
 

  return (
      <>
          <Chatbot />
          <ToastContainer/> 
       </>
  );
}


export default App;
