import React from "react"
import Topbar from "../component/topbar.jsx"
import Sidebarr from "../component/sidebar.jsx"
import { Container, Box, Typography, Paper } from "@mui/material"
import EditUser from "../component/EditUser.jsx"

const ProfilePage = () => {
    return (
        <Container maxWidth="xl" disableGutters>
            <Box display="flex" height="100vh">
                {" "}
                {/* Full viewport height */}
                <Sidebarr />
                <Box flexGrow={1}>
                    {" "}
                    {/* Add padding */}
                    <Topbar />
                    <Typography variant="h4" sx={{ mb: 2, marginLeft: 2 }}>
                        {" "}
                        Edit Profile
                    </Typography>
                    <Paper sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
                        <EditUser />
                    </Paper>
                </Box>
            </Box>
        </Container>
    )
}

export default ProfilePage
