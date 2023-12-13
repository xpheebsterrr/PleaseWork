import React, { useState, useEffect } from "react"
import { Drawer, IconButton, Box, TextField, Button } from "@mui/material"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import userServices from "../services/userServices.jsx"

const ProfileDrawer = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const [user, setUser] = useState([]) //store all users
    const [editingUser, setEditingUser] = useState(null) //to track editing user (isEditingUser)

    // const [profileData, setProfileData] = useState({
    //     name: "",
    //     email: ""
    //     // Add other profile fields as needed
    // })

    //fetch current user on table
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await userServices.getUser()
                setUser(data.data) //response is an array of user data stored in user
            } catch (error) {
                console.error("Error fetching user", error)
            }
        }
        if (editingUser == null) fetchUser()
    }, [editingUser])

    const toggleDrawer = open => event => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return
        }
        setDrawerOpen(open)
        if (!open) setEditingUser(false) // Reset edit mode when drawer closes
    }

    const { password, ...userData } = user //split user into password and email
    // removes password as const and create new object userdata w remaining properties
    //bc user object should not have password field in the first place

    const [newUserData, setNewUserData] = useState({ ...userData }) //Edits done to user
    const editMode = editingUser == newUserData.username //where user is selected for editing

    // console.log("editMode", editMode)
    // console.log("userData", userData)
    // console.log("newuserData", newUserData)

    const isEqual = (a, b) => {
        return Object.entries(a).sort().toString() === Object.entries(b).sort().toString()
    }

    const saveChanges = async () => {
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
                newUserData.email ?? "", //if null default to empty string
                newUserData.password //keep original value
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
        // Close the drawer
        setDrawerOpen(false)
    }

    const handleEditChange = (key, value) => {
        setNewUserData({
            ...newUserData,
            [key]: value
        })
    }
    return (
        <React.Fragment>
            <IconButton onClick={toggleDrawer(true)}>
                <PersonOutlineIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    <Box p={2}>
                        <TextField fullWidth disabled label="Username" value={user.username} />
                        {editMode ? (
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                value={newUserData.email}
                                onChange={e => handleEditChange("email", e.target.value)}
                            />
                        ) : (
                            <TextField fullWidth disabled label="Email Address" value={newUserData.email} />
                        )}{" "}
                        {editMode ? (
                            <TextField
                                fullWidth
                                type="password"
                                value={newUserData.password}
                                onChange={e => handleEditChange("password", e.target.value)}
                                placeholder="********"
                            />
                        ) : (
                            "********"
                        )}
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
                                    // enabledEditing(newUserData.username)
                                    setEditingUser(newUserData.username)
                                }}
                                variant="contained"
                                color="primary"
                            >
                                Edit
                            </Button>
                        )}
                    </Box>
                </Box>
            </Drawer>
        </React.Fragment>
    )
}

export default ProfileDrawer

//chatgpt

// import React, { useState, useEffect } from "react"
// import { Drawer, IconButton, Box, TextField, Button } from "@mui/material"
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
// import userServices from "../services/userServices.jsx"
// import { toast } from "react-toastify"

// const ProfileDrawer = () => {
//     const [drawerOpen, setDrawerOpen] = useState(false)
//     const [user, setUser] = useState([]) // Initialize with empty values
//     const [editMode, setEditMode] = useState(false) // Boolean to track if in edit mode

//     useEffect(() => {
//         if (drawerOpen) {
//             const fetchUser = async () => {
//                 try {
//                     const data = await userServices.getUser() // Adjust this to match your API
//                     setUser(data.data) // Assuming the response is an object with user data
//                 } catch (error) {
//                     console.error("Error fetching user:", error)
//                 }
//             }
//             fetchUser()
//         }
//     }, [drawerOpen])

//     console.log("user", user)
//     console.log("user.username", user.username)

//     const toggleDrawer = open => event => {
//         if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
//             return
//         }
//         setDrawerOpen(open)
//         if (!open) setEditMode(false) // Reset edit mode when drawer closes
//     }

//     const handleEditChange = (key, value) => {
//         setUser({ ...user, [key]: value })
//     }

//     const saveChanges = async () => {
//         // Logic to save changes
//         try {
//             await userServices.updateUser(user) // Adjust as per your API
//             toast.success("User updated successfully!")
//             setEditMode(false)
//         } catch (error) {
//             console.error("Error updating user:", error)
//             toast.error("Failed to update user. Please try again.")
//         }
//     }

//     return (
//         <React.Fragment>
//             <IconButton onClick={toggleDrawer(true)}>
//                 <PersonOutlineIcon />
//             </IconButton>
//             <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
//                 <Box sx={{ width: 250 }} role="presentation">
//                     <Box p={2}>
//                         <TextField fullWidth disabled label="{user.username}" value={user.username} />
//                         {editMode ? (
//                             <TextField
//                                 fullWidth
//                                 label="Email Address"
//                                 type="email"
//                                 value={user.email}
//                                 onChange={e => handleEditChange("email", e.target.value)}
//                             />
//                         ) : (
//                             <TextField fullWidth disabled label="Email Address" value={user.email} />
//                         )}
//                         {editMode && (
//                             <TextField
//                                 fullWidth
//                                 label="Password"
//                                 type="password"
//                                 value={user.password}
//                                 onChange={e => handleEditChange("password", e.target.value)}
//                                 placeholder="********"
//                             />
//                         )}
//                         {editMode ? (
//                             <>
//                                 <Button onClick={saveChanges} variant="contained" color="primary">
//                                     Save
//                                 </Button>
//                                 <Button onClick={() => setEditMode(false)} variant="contained" color="secondary">
//                                     Cancel
//                                 </Button>
//                             </>
//                         ) : (
//                             <Button onClick={() => setEditMode(true)} variant="contained" color="primary">
//                                 Edit
//                             </Button>
//                         )}
//                     </Box>
//                 </Box>
//             </Drawer>
//         </React.Fragment>
//     )
// }

// export default ProfileDrawer

//from chatgpt
