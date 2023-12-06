import React from "react"
import Topbar from "../component/topbar.jsx"
import Sidebarr from "../component/sidebar.jsx"
import { Container, Box, Typography } from "@mui/material"

const Dashboard = () => {
   return (
      <Container maxWidth="xl" disableGutters>
         <Box display="flex" height="100vh">
            {" "}
            {/* Full viewport height */}
            <Sidebarr />
            <Box flexGrow={1}>
               <Topbar />
               <Typography>The Task Management System goes here</Typography>
            </Box>
         </Box>
      </Container>
   )
}

export default Dashboard
