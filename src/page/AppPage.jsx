import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Topbar from "../component/topbar.jsx"
import Sidebarr from "../component/sidebar.jsx"
import { Container, Box, Typography, Button } from "@mui/material"
import KanbanBoard from "../component/KanbanBoard.jsx"
const AppPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    console.log("location in AppPage", location)
    const App_Acronym = location.state?.App_Acronym
    // const { app } = useParams()
    const [currentApp, setCurrentApp] = useState(App_Acronym)
    console.log("cuurentApp", currentApp)
    //enter plan
    const enterPlan = currentApp => {
        console.log("app is: ", currentApp)
        // navigate(`/appPage/${app.App_Acronym}`)
        navigate("/plans", { state: { currentApp: currentApp } })
    }

    // get all task

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
                            {currentApp}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button variant="outlined" sx={{ marginRight: 1 }}>
                                Create Tasks
                            </Button>
                            <Button variant="outlined" onClick={e => enterPlan(currentApp)}>
                                Plans{" "}
                            </Button>
                        </Box>
                    </Box>

                    <KanbanBoard currentApp={currentApp} />
                </Box>
            </Box>
        </Container>
    )
}

export default AppPage
