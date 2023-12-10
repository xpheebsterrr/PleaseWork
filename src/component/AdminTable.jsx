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
import axios from "axios"

const AdminTable = () => {
   const navigate = useNavigate()

   const [users, setUsers] = useState([])
   const [editingUser, setEditingUser] = useState(null) //to track editing user

   // store all available group options and currently selected group options
   const [groupOptions, setGroupOptions] = useState([])
   const [selectedGroups, setSelectedGroups] = useState([])

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

   const UserRow = ({ user }) => {
      const [groupOptions, setGroupOptions] = useState([])
      const [userEdits, setUserEdits] = useState({}) //New state to track edits
      const isEditing = editingUser === user.username
      const currentUserEdits = userEdits[user.username] || {
         ...user,
         groupnames: typeof user.groupnames === "string" ? user.groupnames : ""
      }
      console.log("currentUserEdit", currentUserEdits)
      console.log("userrow is rendered ", user.username)
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
      const handleEditChange = (username, key, value) => {
         setUserEdits({
            ...userEdits,
            [username]: {
               ...userEdits[username],
               [key]: value
            }
         })
      }
      //    const handleIsActiveChange = isActive => {
      //       handleEditChange(user.username, "isActive", isActive)
      //    }
      // const handleIsActiveChange = (username, isActive) => {
      //    handleEditChange(username, "isActive", isActive ? "active" : "disabled")
      // }

      // const toggleIsActive = (username, isActive) => {
      //    let result = await userServices.toggleIsActive( username, isActive)
      //   if (result) {
      //    toast.success(result.data.message)
      //   }
      // }

      // Handle toggling of activated/disabled status of user
      const toggleStatus = async (username, isActive) => {
         try {
            console.log("username", username)
            console.log("isActive", isActive)
            let result = await axios
               .put("http://localhost:3000/api/v1/users/:username/toggle-status", {
                  access_token: Cookies.get("token"),
                  username: username,
                  isActive: isActive
               })
               .catch(e => {
                  if (e.response.status === 401) {
                     Cookies.remove("token")
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
            if (result) {
               toast.success(result.data.message)
            }
         } catch (e) {
            if (e.response.status === 403) {
               setEditing(false)
               setRefreshUsers(true)
               handleEditChange({})
            }

            if (e.response.status === 401) {
               Cookies.remove("token")
               navigate("/")
            }

            let error = e.response.data
            if (error) {
               // Show error message
               toast.error(error.message, {
                  autoClose: false
               })
            }
         }
      }

      const saveChanges = async username => {
         //Logic to save changes
         const editedUser = userEdits[username]
         if (!editedUser) {
            console.warn("No edits made to the user:", username)
            setEditingUser(null)
            toggleEditMode(null)
            return
         }
         console.log("editedUser", editedUser)
         // Optionally: Update the backend with the edited user data
         try {
            const accessToken = Cookies.get("token")
            await userServices.updateUser(
               username,
               editedUser.email,
               editedUser.password,
               editedUser.groupnames,
               editedUser.isActive,
               accessToken
            ) // Adjust as per your API
            toast.success("User updated successfully!")
         } catch (error) {
            console.error("Error updating user:", error)
            toast.error("Failed to update user. Please try again.")
            return
         }
         // Set user that is currently being edited
         setUsers(
            users.map(user => {
               if (user.username === username) {
                  return { ...user, ...editedUser }
               }
               return user
            })
         )

         // Reset editing state and clear edits for this user
         setEditingUser(null)
         setUserEdits(edit => {
            const newEdits = { ...edit }
            delete newEdits[username]
            return newEdits
         })

         //Update users state and/or send update to backend
         toggleEditMode(null)
      }
      useEffect(() => {
         const getGroupOptions = async () => {
            try {
               const result = await userServices.getAllGroups(user.username).catch(e => {
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
            <TableCell>{user.username}</TableCell>

            <TableCell>
               {isEditing ? (
                  <TextField
                     type="email"
                     value={currentUserEdits.email}
                     onChange={e => handleEditChange(user.username, "email", e.target.value)}
                  />
               ) : (
                  user.email
               )}{" "}
            </TableCell>
            <TableCell>
               {isEditing ? (
                  <TextField
                     type="password"
                     defaultValue={currentUserEdits.password}
                     onChange={e => handleEditChange(user.username, "password", e.target.value)}
                     placeholder="********"
                  />
               ) : (
                  "********"
               )}
            </TableCell>
            <TableCell>
               {isEditing ? (
                  <FormControl fullWidth>
                     <InputLabel id="group-select-label-${user.username}">User Group</InputLabel>
                     <Select
                        labelId="group-select-label-"
                        multiple
                        value={typeof currentUserEdits.groupnames === "string" ? currentUserEdits.groupnames.split(",") : []}
                        onChange={e => handleEditChange(user.username, "groupnames", e.target.value.join(","))}
                        //renderValue={selected => selected.join(", ")}
                     >
                        {Array.isArray(groupOptions) && groupOptions.map(opt => <MenuItem value={opt}>{opt}</MenuItem>)}
                     </Select>
                  </FormControl>
               ) : (
                  user.groupnames
               )}
            </TableCell>
            <TableCell>
               <Button
                  variant={currentUserEdits.isActive === "active" ? "contained" : "outlined"}
                  color={currentUserEdits.isActive === "active" ? "primary" : "secondary"}
                  onClick={() => {
                     // Toggle the isActive state for the user
                     toggleStatus(user.username, currentUserEdits.isActive)
                  }}
               >
                  {currentUserEdits.isActive === "active" ? "Active" : "Disabled"}
               </Button>
            </TableCell>
            <TableCell>
               {isEditing ? (
                  <>
                     <Button onClick={() => saveChanges(user.username)} variant="contained" color="primary">
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
               {/* {" "} */}
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

//bryan changes
