import React from "react"
import Topbar from "../component/topbar.jsx"
import Sidebarr from "../component/sidebar.jsx"
import { Container, Box, Typography } from "@mui/material"
import AdminTable from "../component/AdminTable.jsx"
import AppTable from "../component/AppTable.jsx"
import CreateApp from "../component/CreateApp.jsx"

const Dashboard = () => {
    return (
        <Container maxWidth="xl" disableGutters>
            <Box display="flex" height="100vh">
                {" "}
                {/* Full viewport height */}
                <Sidebarr />
                <Box flexGrow={1}>
                    <Topbar />
                    <Box display="flex" alignItems="center" style={{ margin: "20px 15px" }}>
                        <Typography variant="h4" component="div" style={{ flexGrow: 1 }}>
                            Application List
                        </Typography>
                        <CreateApp />
                    </Box>
                    <AppTable />
                </Box>
            </Box>
        </Container>
    )
}

export default Dashboard
