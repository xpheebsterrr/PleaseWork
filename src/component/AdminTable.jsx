import React, { useState, useEffect } from "react"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Paper,
   Button,
   Checkbox,
   Select,
   MenuItem,
   InputLabel,
   FormControl
} from "@mui/material"
import CreateUserForm from "./CreateUserForm.jsx"
import userServices from "../services/userServices.jsx"

function AdminTable() {
   const [users, setUsers] = useState([])
   const [editingUser, setEditingUser] = useState(null) //to track editing user
   const [userEdits, setUserEdits] = useState({}) //New state to track edits

   //fetch all users on table
   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const data = await userServices.getAllUsers()
            console.log("data", data)
            setUsers(data.data) //response is an array of users
         } catch (error) {
            console.error("Error fetching users:", error)
         }
      }
      fetchUsers()
   }, [])

   //Edit each UserRow
   const toggleEditMode = username => {
      setEditingUser(editingUser === username ? null : username)
   }
   const handleEditChange = (username, key, value) => {
      setUserEdits({
         ...userEdits,
         [username]: {
            ...userEdits[username],
            [key]: value
         }
      })
   }
   const handleIsActiveChange = isActive => {
      handleEditChange(user.username, "isActive", isActive)
   }
   const saveChanges = username => {
      //Logic to save changes
      //Update users state and/or send update to backend
      toggleEditMode(null)
      setEditingUser(null)
   }

   const UserRow = ({ user }) => {
      const isEditing = editingUser === user.username
      const currentUserEdits = userEdits[user.username] || {
         ...user,
         groupnames: user.groupnames.split(",")
      }
      return (
         <TableRow>
            <TableCell>{isEditing ? <input defaultValue={currentUserEdits.username} /> : user.username}</TableCell>
            <TableCell>{isEditing ? <input type="email" defaultValue={currentUserEdits.email} /> : user.email} </TableCell>
            <TableCell>{isEditing ? <input type="password" defaultValue={"********"} /> : "********"} </TableCell>
            <TableCell>
               {isEditing ? (
                  <FormControl fullWidth>
                     <InputLabel id="group-select-label-${user.username}">User Group</InputLabel>
                     <Select
                        labelId="group-select-label-"
                        multiple
                        value={currentUserEdits.groupnames}
                        onChange={e => handleEditChange(user.username, "groupnames", e.target.value)}
                        renderValue={selected => selected.join(", ")}
                     >
                        {/* Populate MenuItems with group names */}
                     </Select>
                  </FormControl>
               ) : (
                  user.groupnames
               )}
            </TableCell>
            <TableCell>
               {isEditing ? (
                  <>
                     <Button
                        variant={currentUserEdits.isActive ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => handleIsActiveChange(true)}
                     >
                        Active
                     </Button>
                     <Button
                        variant={!currentUserEdits.isActive ? "contained" : "outlined"}
                        color="secondary"
                        onClick={() => handleIsActiveChange(false)}
                     >
                        Inactive
                     </Button>
                  </>
               ) : user.isActive ? (
                  "Active"
               ) : (
                  "Inactive"
               )}
            </TableCell>
            <TableCell>
               {isEditing ? (
                  <>
                     <Button onClick={() => saveChanges(user)} variant="contained" color="primary">
                        Save
                     </Button>
                     <Button onClick={() => toggleEditMode(null)} variant="contained" color="secondary">
                        Cancel
                     </Button>
                  </>
               ) : (
                  <Button onClick={() => toggleEditMode(user.username)} variant="contained" color="primary">
                     Edit
                  </Button>
               )}
            </TableCell>
         </TableRow>
      )
   }

   return (
      <Paper style={{ border: "1px solid #ccc", marginLeft: "15px" }}>
         <Table>
            <colgroup>
               {" "}
               {/* Ensures columns have the same width in head and body */}
               <col style={{ width: "20%" }} />
               <col style={{ width: "20%" }} />
               <col style={{ width: "20%" }} />
               <col style={{ width: "20%" }} />
               <col style={{ width: "20%" }} />
            </colgroup>
            <TableHead>
               <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>User Group</TableCell>
                  <TableCell>IsActive</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               <CreateUserForm />
               {Array.isArray(users) && users.map(user => <UserRow key={user.username} user={user} />)}
            </TableBody>
         </Table>
      </Paper>
   )
}

export default AdminTable
