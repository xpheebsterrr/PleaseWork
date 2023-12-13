// export default Topbar
import React, { useEffect, useState } from "react"
import { Box, IconButton, InputBase } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import SearchIcon from "@mui/icons-material/Search"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import authService from "../services/authService.jsx"
import { toast } from "react-toastify"
import ProfileDrawer from "./Profile.jsx"

const Topbar = () => {
    const navigate = useNavigate()
    //handler that calls logout function
    const handleLogout = async () => {
        try {
            await authService.logout(navigate)
        } catch (error) {
            toast.error("failed to log out")
        }
    }

    const handleProfilePage = () => {
        navigate("/profilePage")
    }

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor="primary.main" // Adjusted for default theme
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex" justifyContent="space-between" p={2}>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleProfilePage}>
                    <PersonOutlinedIcon />
                </IconButton>
                <ProfileDrawer />
                <IconButton onClick={handleLogout}>
                    <ExitToAppIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Topbar
