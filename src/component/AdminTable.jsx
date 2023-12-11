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
   FormControl,
   TextField
} from "@mui/material"
import CreateUserForm from "./CreateUserForm.jsx"
import userServices from "../services/userServices.jsx"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const AdminTable = () => {
   const navigate = useNavigate()

   const [users, setUsers] = useState([])
   const [editingUser, setEditingUser] = useState(null) //to track editing user
   const [userEdits, setUserEdits] = useState({}) //New state to track edits

   //fetch all users on table
   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const data = await userServices.getAllUsers()
            setUsers(data.data) //response is an array of users
         } catch (error) {
            console.error("Error fetching users:", error)
         }
      }
      if (editingUser == null) fetchUsers()
   }, [editingUser])

   //Edit each UserRow
   const toggleEditMode = username => {
      const user = users.find(user => user.username == username)
      setEditingUser(editingUser === username ? null : username)
      username &&
         setUserEdits({
            ...userEdits,
            [username]: {
               email: user.email,
               isActive: user.isActive,
               groupnames: user.groupnames
            }
         })
   }

   const UserRow = ({ user }) => {
      const { password, ...userData } = user
      const [newUserData, setNewUserData] = useState({...userData})
      const [groupOptions, setGroupOptions] = useState([])
      const isEditing = editingUser === newUserData.username

      // should consider importing lodash library
      const isEqual =(a, b) => {
         return Object.entries(a).sort().toString() === Object.entries(b).sort().toString();
      }

      const saveChanges = async () => {
         //Logic to save changes
         if (isEqual(user, newUserData)) {
            console.warn("No edits made to the user:", username)
            setEditingUser(null)
            toggleEditMode(null)
            return
         }
         // Optionally: Update the backend with the edited user data
         try {
            await userServices.updateUser(
               newUserData.username ?? "",
               newUserData.email ?? "",
               newUserData.password,
               newUserData.groupnames ?? "",
               newUserData.isActive
            ) // Adjust as per your API
            toast.success("User updated successfully!")
         } catch (error) {
            console.error("Error updating user:", error)
            toast.error("Failed to update user. Please try again.")
            return
         }

         setNewUserData({
            ...user
         })
   
         //Update users state and/or send update to backend
         toggleEditMode(null)
      }
      
      const handleEditChange = (key, value) => {
         setNewUserData({
            ...newUserData,
            [key]: value
         })
      }

      useEffect(() => {
         const getGroupOptions = async () => {
            try {
               const result = await userServices.getAllGroups(newUserData.username).catch(e => {
                  if (e.response.status === 401) {
                     Cookies.remove("jwt-token")
                     navigate("/")
                  }
                  let error = e.response.data
                  if (error) {
                     // Show error message
                     toast.error(error.message, {
                        autoClose: false
                     })
                  }
               })
               setGroupOptions(result.data.map(group => group.groupname))
            } catch (e) {
               console.error("TODO")
            }
         }
         getGroupOptions()
      }, [])

      return (
         <TableRow>
            <TableCell>{newUserData.username}</TableCell>

            <TableCell>
               {isEditing ? (
                  <TextField
                     type="email"
                     defaultValue={newUserData.email}
                     onChange={e => handleEditChange("email", e.target.value)}
                  />
               ) : (
                  newUserData.email
               )}{" "}
            </TableCell>
            <TableCell>
               {isEditing ? (
                  <TextField
                     type="password"
                     defaultValue={newUserData.password}
                     onChange={e => handleEditChange("password", e.target.value)}
                     placeholder="********"
                  />
               ) : (
                  "********"
               )}
            </TableCell>
            <TableCell>
               {isEditing ? (
                  <FormControl fullWidth>
                     <InputLabel id="group-select-label-${newUserData.username}">User Group</InputLabel>
                     <Select
                        labelId="group-select-label-"
                        multiple
                        value={newUserData?.groupnames ? newUserData.groupnames.split(",") : []}
                        onChange={e => handleEditChange("groupnames", e.target.value.join(","))}
                     >
                        {Array.isArray(groupOptions) && groupOptions.map(opt => <MenuItem value={opt}>{opt}</MenuItem>)}
                     </Select>
                  </FormControl>
               ) : (
                  newUserData.groupnames
               )}
            </TableCell>
            <TableCell>
               {isEditing ? (
                  <>
                     <Button
                        variant={newUserData?.isActive === "active" ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => handleEditChange("isActive", "active")}
                     >
                        Active
                     </Button>
                     <Button
                        variant={newUserData?.isActive !== "active" ? "contained" : "outlined"}
                        color="secondary"
                        onClick={() => handleEditChange("isActive", "disabled")}
                     >
                        Inactive
                     </Button>
                  </>
               ) : newUserData?.isActive === "active" ? "Active" : "Inactive"
               }
            </TableCell>
            <TableCell>
               {isEditing ? (
                  <>
                     <Button onClick={saveChanges} variant="contained" color="primary">
                        Save
                     </Button>
                     <Button onClick={() => toggleEditMode(null)} variant="contained" color="secondary">
                        Cancel
                     </Button>
                  </>
               ) : (
                  <Button onClick={() => toggleEditMode(newUserData.username)} variant="contained" color="primary">
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
