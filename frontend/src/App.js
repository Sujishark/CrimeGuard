import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './containers/Home.js';
import { AuthProvider } from './context/AuthContext.js';
import { ProtectedRoute } from './containers/ProtectedRoute.js';
import LoginPage from './containers/Login.js';
import { lime, purple, grey, yellow, teal } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material';
import { store } from './store.js'
import { Provider } from 'react-redux'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Incident } from './containers/Incident.js';
import { useJsApiLoader } from '@react-google-maps/api';
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute ><Home /></ProtectedRoute>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <ProtectedRoute ><Home /></ProtectedRoute>,
  },
  {
    path: "/incident/:id",
    element: <ProtectedRoute ><Incident /></ProtectedRoute>,
  },
]);


const theme = createTheme({

  typography: {
    // HERE
    fontFamily: 'Inter'
  },

});


function App() {
  const setup = {
    googleMapsApiKey: "AIzaSyAIzmJyl1MUmBVX8BI4ay_w0Wi6nhUJa-A",
    libraries: ["places","visualization"]
  }
  const { isLoaded } = useJsApiLoader(setup)

  return (

    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>

  );
}

export default App;
