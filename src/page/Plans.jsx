import React from "react"
import Topbar from "../component/topbar.jsx"
import Sidebarr from "../component/sidebar.jsx"
import { Container, Box, Typography } from "@mui/material"
import PlanTable from "../component/PlanTable.jsx"
import { useLocation } from "react-router-dom"

const Plans = () => {
    const location = useLocation()
    const currentApp = location.state.currentApp
    return (
        <Container maxWidth="xl" disableGutters>
            <Box display="flex" height="100vh">
                {" "}
                <Sidebarr />
                <Box flexGrow={1}>
                    <Topbar />
                    <Box display="flex" alignItems="center" style={{ margin: "20px 15px" }}>
                        <Typography variant="h4" component="div" style={{ flexGrow: 1 }}>
                            {currentApp} plans
                        </Typography>
                        {/* <Typography varient="h5" sx={{ fontWeight: "bold" }}>
                            {currentApp}
                        </Typography> */}
                    </Box>
                    <PlanTable currentApp={currentApp} />
                </Box>
            </Box>
        </Container>
    )
}

export default Plans
