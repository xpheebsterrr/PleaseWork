import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { createTheme, ThemeProvider } from "@mui/material"

import Admin from "./page/Admin.jsx"
import AppPage from "./page/AppPage.jsx"
import Dashboard from "./page/Dashboard.jsx"
import Login from "./page/Login.jsx"
import Plans from "./page/Plans.jsx"
import ProfilePage from "./page/ProfilePage.jsx"


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
                <div>
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profilePage" element={<ProfilePage />} />
                    <Route path="/admin" element={<Admin />} />
                    {/* <Route path="/appPage/:app" element={<AppPage />} /> */}
                    <Route path="/appPage" element={<AppPage />} />
                    <Route path="/plans" element={<Plans />} />
                  </Routes>
                </div>
            </BrowserRouter>
            <ToastContainer closeOnClick theme="colored" autoClose={1000} />
        </ThemeProvider>
    )
}

export default App
