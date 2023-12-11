import React from "react"
import Topbar from "../component/topbar.jsx"
import Sidebarr from "../component/sidebar.jsx"
import { Container, Box, Typography } from "@mui/material"
import AdminTable from "../component/AdminTable.jsx"
import CreateGroup from "../component/CreateGroup.jsx"

const Admin = () => {
    return (
        <Container maxWidth="xl" disableGutters>
            <Box display="flex" height="100vh">
                {" "}
                {/* Full viewport height */}
                <Sidebarr />
                <Box flexGrow={1}>
                    <Topbar />
                    <Typography component={"div"}>
                        <Typography variant="h4" style={{ margin: "20px 15px" }}>
                            Admin Management
                        </Typography>
                        <CreateGroup />
                        <AdminTable />
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default Admin
