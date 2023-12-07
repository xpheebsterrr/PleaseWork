import React, { useState } from "react"
import { Button, TextField, FormControlLabel, Checkbox, TableCell, TableRow } from "@mui/material"
import userServices from "../services/userServices.jsx" // Adjust the path as necessary
import Cookies from "js-cookie"

function CreateUserForm({ onUserCreated }) {
   const [newUserData, setNewUserData] = useState({
      username: "",
      email: "",
      password: "",
      groupname: "",
      isActive: true
   })

   const handleInputChange = event => {
      const { name, value } = event.target
      setNewUserData({ ...newUserData, [name]: value })
   }

   const handleCheckboxChange = event => {
      setNewUserData({ ...newUserData, [event.target.name]: event.target.checked })
   }

   const handleSubmit = async event => {
      event.preventDefault()
      try {
         // Retrieve the access token from cookies
         const accessToken = Cookies.get("token")
         // Call createUser with all necessary data
         await userServices.createUser(
            newUserData.username,
            newUserData.email,
            newUserData.password,
            newUserData.groupname,
            newUserData.isActive,
            accessToken //Passing the access token
         )
         onUserCreated() // Callback to notify parent component the user created
      } catch (error) {
         console.error("Error creating user:", error)
         // Optionally handle error UI here
      }
   }

   return (
      <TableRow>
         <TableCell>
            <TextField fullWidth label="Username" name="username" value={newUserData.username} onChange={handleInputChange} />
         </TableCell>
         <TableCell>
            <TextField fullWidth label="Email Address" name="email" value={newUserData.email} onChange={handleInputChange} />
         </TableCell>
         <TableCell>
            <TextField
               fullWidth
               label="Password"
               name="password"
               type="password"
               value={newUserData.password}
               onChange={handleInputChange}
            />
         </TableCell>
         <TableCell>
            <TextField fullWidth label="Group Name" name="groupname" value={newUserData.groupname} onChange={handleInputChange} />
         </TableCell>
         <TableCell>
            <FormControlLabel
               control={<Checkbox checked={newUserData.isActive} onChange={handleCheckboxChange} name="isActive" />}
               label=""
            />
         </TableCell>
         <TableCell>
            <Button onClick={handleSubmit} variant="contained" color="primary">
               Create
            </Button>
         </TableCell>
      </TableRow>
   )
}

export default CreateUserForm
