import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Container, Typography, Box } from "@mui/material"
import LoginForm from "../component/LoginForm.jsx"

const Login = () => {
   return (
      <Container maxWidth="sm">
         <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="75vh"
         >
            <Typography
               variant="h4"
               style={{ margin: "40px 0", textAlign: "center" }}
            >
               Task Management System
            </Typography>
            <LoginForm />
         </Box>
      </Container>
   )
}

export default Login
