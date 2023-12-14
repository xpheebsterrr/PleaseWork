// export default Topbar
import React, { useEffect, useState } from "react"
import { Box, IconButton, InputBase, Typography } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import SearchIcon from "@mui/icons-material/Search"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import authService from "../services/authService.jsx"
import { toast } from "react-toastify"
import ProfileDrawer from "./Profile.jsx"
import userServices from "../services/userServices.jsx"

const Topbar = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
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
    //fetch current user
    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await userServices.getUser()
                setUser(data.data)
            } catch (error) {
                console.error(error)
            }
        }
        getUser()
    }, [])

    console.log("user", user)
    console.log("user.username", user.username)

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                alignItems="center" // Align items vertically in the center
                backgroundColor="primary.main" // Adjusted for default theme
                borderRadius="3px"
                p={2} // Add some padding around the box
            >
                <Typography variant="h6" color="text.primary">
                    Welcome back, {user.username}
                </Typography>
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
