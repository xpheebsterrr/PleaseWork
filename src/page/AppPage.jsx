import React from "react"
import Topbar from "../component/topbar.jsx"
import Sidebarr from "../component/sidebar.jsx"
import { Container, Box, Typography, Button } from "@mui/material"
import KanbanBoard from "../component/KanbanBoard.jsx"
const AppPage = () => {
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
                            KanBan Board
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button variant="outlined" sx={{ marginRight: 1 }}>
                                Create Tasks
                            </Button>
                            <Button variant="outlined">Edit Plans</Button>
                        </Box>
                    </Box>

                    <KanbanBoard />
                </Box>
            </Box>
        </Container>
    )
}

export default AppPage
