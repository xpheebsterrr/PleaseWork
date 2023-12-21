import React, { useState, useEffect } from "react"
import Topbar from "../component/topbar.jsx"
import Sidebarr from "../component/sidebar.jsx"
import { Container, Box, Typography } from "@mui/material"
import AdminTable from "../component/AdminTable.jsx"
import AppTable from "../component/AppTable.jsx"
import CreateApp from "../component/CreateApp.jsx"
import appService from "../services/appService.jsx"

const Dashboard = () => {
    const [apps, setApps] = useState([]) //store all apps

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
        console.log('test')
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
                        <CreateApp fetchApps={fetchApps} />
                    </Box>
                    <AppTable apps={apps} />
                </Box>
            </Box>
        </Container>
    )
}

export default Dashboard
