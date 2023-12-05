import React from "react"
import {
   BrowserRouter as Router,
   Route,
   Routes,
   BrowserRouter
} from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material"
import Login from "./page/Login.jsx"
import Dashboard from "./page/Dashboard.jsx"

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
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/dashboard" element={<Dashboard />} />
               {/* <Route path="/admin" component={AdminPage} /> */}
            </Routes>
         </BrowserRouter>
      </ThemeProvider>
   )
}

export default App
