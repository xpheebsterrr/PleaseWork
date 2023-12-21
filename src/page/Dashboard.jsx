import React, { useState, useEffect } from "react"
import Topbar from "../component/topbar.jsx"
import Sidebarr from "../component/sidebar.jsx"
import { Container, Box, Typography } from "@mui/material"
import AppTable from "../component/AppTable.jsx"
import CreateApp from "../component/CreateApp.jsx"
import appService from "../services/appService.jsx"
import userServices from "../services/userServices.jsx"

const Dashboard = () => {
    const [apps, setApps] = useState([]) //store all apps
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
    }, [])

    //fetch all users on table
    const fetchApps = async () => {
        try {
            const data = await appService.getAllApps()
            setApps(data.data) //response is an array of users
        } catch (error) {
            console.error("Error fetching apps:", error)
        }
    } // fetch users from database

    useEffect(() => {
        console.log("test")
        fetchApps()
    }, [])

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
                        {isUserInPermittedGroup && <CreateApp fetchApps={fetchApps} />}
                    </Box>
                    <AppTable apps={apps} isUserInPermittedGroup={isUserInPermittedGroup} />
                </Box>
            </Box>
        </Container>
    )
}

export default Dashboard
