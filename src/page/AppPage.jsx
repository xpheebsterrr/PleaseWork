import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Container, Box, Typography, Button } from "@mui/material"
import CreateTask from "../component/CreateTask.jsx"
import KanbanBoard from "../component/KanbanBoard.jsx"
import appService from "../services/appService.jsx"
import Sidebarr from "../component/sidebar.jsx"
import Topbar from "../component/topbar.jsx"
import userServices from "../services/userServices.jsx"

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
    const [isUserInPermittedGroup, setIsUserInPermittedGroup] = useState(false)
    //Check if user is in permitted group
    useEffect(() => {
        const checkIfUserInGroup = async () => {
            try {
                const response = await userServices.checkGroup("Project Lead")
                console.log("response.isUserInGroup", response.result)
                setIsUserInPermittedGroup(response.result)
            } catch (error) {
                console.error("Error checking user group", error)
            }
        }
        checkIfUserInGroup()
    }, [currentApp])
    const [allTasks, setAllTasks] = useState([])

    // get all task
    const fetchTasks = async () => {
        try {
            const allTasks = await appService.getTasks("all", currentApp)
            setAllTasks(allTasks?.data ?? [])
        } catch (error) {
            console.error("Error fetching Tasks:", error)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [currentApp])

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
                            {/* <Button variant="outlined" sx={{ marginRight: 1 }}>
                                Create Tasks
                            </Button> */}
                            {isUserInPermittedGroup && <CreateTask currentApp={currentApp} fetchTasks={fetchTasks} />}
                            <Button variant="outlined" onClick={e => enterPlan(currentApp)}>
                                Plans{" "}
                            </Button>
                        </Box>
                    </Box>

                    <KanbanBoard currentApp={currentApp} allTasks={allTasks} fetchTasks={fetchTasks} />
                </Box>
            </Box>
        </Container>
    )
}

export default AppPage
