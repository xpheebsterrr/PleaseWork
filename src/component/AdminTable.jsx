import React, { useState, useEffect } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button,
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

    const [users, setUsers] = useState([]) //store all users
    const [editingUser, setEditingUser] = useState(null) //to track editing user (isEditingUser)

    //fetch all users on table
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userServices.getAllUsers(navigate)
                setUsers(data.data) //response is an array of users
            } catch (error) {
                console.error("Error fetching users:", error)
            }
        } // fetch users from database
        if (editingUser == null) fetchUsers()
    }, [editingUser])

    //Each row of users
    const UserRow = ({ user }) => {
        const { password, ...userData } = user
        // removes password as const and create new object userdata w remaining properties
        //bc user object should not have password field in the first place

        const [newUserData, setNewUserData] = useState({ ...userData, oldGroupnames: userData.groupnames }) //Edits done to user
        const [groupOptions, setGroupOptions] = useState([])
        const editMode = editingUser == newUserData.username //where user is selected for editing

        // should consider importing lodash library
        //function sorts the key-value pairs of input objects a and b, convert them to strings and compare them
        //returns boolean value
        const isEqual = (a, b) => {
            return Object.entries(a).sort().toString() === Object.entries(b).sort().toString()
        }

        // filter out obsolete group names that are still assigned to the user
        const getFilteredGroupnames = (groupnames, groupOptions) => {
            return groupnames
                ? groupnames
                      .split(",")
                      .filter(name => groupOptions.includes(name))
                      .join(",")
                : ""
        }

        const saveChanges = async () => {
            console.log("userData", userData)
            console.log("newUserData", newUserData)
            //Logic to save changes
            if (isEqual(userData, newUserData)) {
                console.warn("No edits made to the user:", user.username)
                toast.error("No edits made to the user:", user.username)
                setEditingUser(null)
                return
            }
            // Optionally: Update the backend with the edited user data
            try {
                await userServices.updateUser(
                    newUserData.username ?? "",
                    newUserData.email ?? "", //if null default to empty string
                    newUserData.password, //keep original value
                    newUserData.groupnames ?? "",
                    newUserData.isActive,
                    newUserData.oldGroupnames
                ) // Adjust as per your API
                toast.success("User updated successfully!")
            } catch (error) {
                console.error("Error updating user:", error)
                toast.error("Failed to update user. Please try again.")
                return
            }
            //update newUserData state with user data from user object
            setNewUserData({
                ...user
            })
            setEditingUser(null) //clears the editing state
        }

        const handleEditChange = (key, value) => {
            setNewUserData({
                ...newUserData,
                [key]: value
            })
        }

        // Handle toggling of activated/disabled status of user
        const toggleStatus = async () => {
            try {
                console.log("username", newUserData.username)
                console.log("isActive", newUserData.isActive)
                let result = await axios
                    .put("http://localhost:3000/api/v1/users/:username/toggle-status", {
                        access_token: Cookies.get("token"),
                        username: newUserData.username,
                        isActive: newUserData.isActive
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
                    handleEditChange("isActive", newUserData.isActive === "active" ? "disabled" : "active")
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

        //get Group Options for the edit form
        useEffect(() => {
            const getGroupOptions = async () => {
                try {
                    const result = await userServices.getAllGroups().catch(e => {
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
                    const newGroupOptions = result.data.map(group => group.groupname)
                    setGroupOptions(newGroupOptions)
                    handleEditChange("groupnames", getFilteredGroupnames(userData.groupnames, newGroupOptions))
                } catch (e) {
                    console.error("TODO")
                }
            }
            getGroupOptions()
        }, [])

        //to kick out of page if not admin
        const enabledEditing = async prop => {
            let verify
            try {
                verify = await userServices.checkGroup("admin")
                console.log("verify user", verify)
            } catch (e) {
                console.log("failed", e)
                navigate("/dashboard")
                return
            }
            if (verify.result === false) {
                navigate("/dashboard")
                return
            }
            setEditingUser(prop)
        }

        return (
            <TableRow>
                <TableCell>{newUserData.username}</TableCell>

                <TableCell>
                    {editMode ? (
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
                    {editMode ? (
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
                    {editMode ? (
                        <FormControl fullWidth>
                            <InputLabel id="group-select-label-${newUserData.username}">User Group</InputLabel>
                            <Select
                                labelId="group-select-label-"
                                multiple
                                value={newUserData?.groupnames ? newUserData.groupnames.split(",") : []}
                                onChange={e => handleEditChange("groupnames", e.target.value.join(","))}
                            >
                                {Array.isArray(groupOptions) &&
                                    groupOptions.map(opt => (
                                        <MenuItem key={opt} value={opt}>
                                            {opt}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    ) : (
                        newUserData.groupnames
                    )}
                </TableCell>
                <TableCell>
                    <Button
                        variant={newUserData.isActive === "active" ? "contained" : "outlined"}
                        color={newUserData.isActive === "active" ? "primary" : "secondary"}
                        onClick={toggleStatus} //toggle the isActive state for the user
                        disabled={!editMode}
                    >
                        {newUserData.isActive === "active" ? "Active" : "Disabled"}
                    </Button>
                </TableCell>
                <TableCell>
                    {editMode ? (
                        <>
                            <Button onClick={saveChanges} variant="contained" color="primary">
                                Save
                            </Button>
                            <Button
                                onClick={() => {
                                    setEditingUser(null)
                                }}
                                variant="contained"
                                color="secondary"
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={e => {
                                e.preventDefault()
                                enabledEditing(newUserData.username)
                                //   setEditingUser(newUserData.username)
                            }}
                            variant="contained"
                            color="primary"
                        >
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
