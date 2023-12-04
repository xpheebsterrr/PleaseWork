import React, { useState } from "react"
import { TextField, Button, Grid, Paper, Typography } from "@mui/material"
// import authService from "../services/authService.jsx"

function LoginForm({ onLoginSuccess }) {
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState("")

   //    const handleSubmit = async event => {
   //       event.preventDefault()
   //       try {
   //          await authService.login(username, password)
   //          onLoginSuccess()
   //       } catch (err) {
   //          setError("Invalid credentials")
   //       }
   //    }

   const handleSubmit = async event => {
      event.preventDefault()
      try {
         await mockLogin(username, password)
         onLoginSuccess()
      } catch (err) {
         setError("Invalid credentials")
      }
   }

   const mockLogin = (username, password) => {
      return new Promise((resolve, reject) => {
         // Simulate a successful login after a delay
         setTimeout(() => {
            if (username === "admin1" && password === "password") {
               resolve()
            } else {
               reject(new Error("Invalid credentials"))
            }
         }, 1000) // Simulate a network delay
      })
   }

   return (
      <Paper style={{ padding: 20 }}>
         <Typography variant="h6" textAlign="centre">
            Login
         </Typography>
         <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
               <Grid item>
                  <TextField
                     label="username"
                     type="text"
                     fullWidth
                     value={username}
                     onChange={e => setUsername(e.target.value)}
                  />
               </Grid>
               <Grid item>
                  <TextField
                     label="Password"
                     type="password"
                     fullWidth
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                  />
               </Grid>
               {error && (
                  <Grid item>
                     <Typography color="error">{error}</Typography>
                  </Grid>
               )}
               <Grid item>
                  <Button
                     type="submit"
                     variant="contained"
                     color="primary"
                     fullWidth
                  >
                     Login
                  </Button>
               </Grid>
            </Grid>
         </form>
      </Paper>
   )
}

export default LoginForm
