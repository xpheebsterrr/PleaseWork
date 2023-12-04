import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material"
import Login from "./page/Login.jsx"

const theme = createTheme({
   palette: {
      primary: {
         main: "#556cd6"
      },
      secondary: {
         main: "#19857b"
      },
      error: {
         main: "#ff0000"
      },
      background: {
         default: "#fff"
      }
   },
   typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14
   }
   // You can add more customizations here
})

function App() {
   return (
      <ThemeProvider theme={theme}>
         <Router>
            <Routes>
               <Route path="/" element={<Login />} />
               {/* <Route path="/admin" component={AdminPage} /> */}
               {/* You can add more routes here */}
            </Routes>
         </Router>
      </ThemeProvider>
   )
}

export default App
