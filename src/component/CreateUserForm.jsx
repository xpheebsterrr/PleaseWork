import React, { useState } from "react"
import { Button, TextField, FormControlLabel, Checkbox, TableCell, TableRow } from "@mui/material"
import userServices from "../services/userServices.jsx" // Adjust the path as necessary
import Cookies from "js-cookie"
import { toast } from "react-toastify"

function CreateUserForm() {
   const [newUserData, setNewUserData] = useState({
      username: "",
      email: "",
      password: "",
      groupnames: "",
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
            newUserData.groupnames,
            accessToken //Passing the access token
         )
      } catch (error) {
         console.error("Unexpected error in handleSubmit:", error)
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
            <TextField
               fullWidth
               label="Group Name"
               name="groupnames"
               value={newUserData.groupnames}
               onChange={handleInputChange}
            />
         </TableCell>
         <TableCell>
            <Button name="isActive" color="primary">
               Active
            </Button>
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
