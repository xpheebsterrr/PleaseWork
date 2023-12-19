import React, { useState, useEffect } from "react"
import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    Typography,
    Grid,
    Box,
    FormControl,
    InputLabel
} from "@mui/material"
import userServices from "../services/userServices.jsx"
import { toast } from "react-toastify"
import appService from "../services/appService.jsx"

const EditApp = ({ app }) => {
    const [open, setOpen] = useState(false)
    const { ...appData } = app //app saved into appData
    const [newAppData, setNewAppData] = useState({ ...appData }) //initialise newAppData with currentAppData
    const [groupOptions, setGroupOptions] = useState([])
    //Get Group options in array
    useEffect(() => {
        const getGroupOptions = async () => {
            try {
                const result = await userServices.getAllGroups()
                setGroupOptions(result.data.map(a => a.groupname))
                // const newGroupOptions = result.data.map(group => group.groupname)
                // setGroupOptions(newGroupOptions)
                // handleEditChange("groupnames", getFilteredGroupnames(userData.groupnames, newGroupOptions))
            } catch (e) {
                //Error handling: e is the error object
                console.error("error getting group", e)
                if (e.response && e.response.data) {
                    //if there is response w error data
                    toast.error(e.response.data.message)
                } else {
                    //error w no response eg. network error
                    toast.error("An unexpected error occured")
                }
            }
        }
        getGroupOptions()
    }, [])

    //Form overlay operations
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    //Form operations

    // const handleChange = event => {
    //     const { name, value } = event.target
    //     setAppData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }))
    // }

    //returns boolean value
    const isEqual = (a, b) => {
        return Object.entries(a).sort().toString() === Object.entries(b).sort().toString()
    }

    const handleSubmit = async event => {
        event.preventDefault()
        if (isEqual(appData, newAppData)) {
            console.warn("No edits made to the app:", app.App_Acronym)
            toast.error("No edits made to the user:", app.App_Acronym)
            return
        }
        try {
            await appService.updateApp(
                newAppData.App_Acronym,
                newAppData.App_startDate,
                newAppData.App_endDate,
                newAppData.App_Description,
                newAppData.App_permit_Create,
                newAppData.App_permit_Open,
                newAppData.App_permit_toDoList,
                newAppData.App_permit_Doing,
                newAppData.App_permit_Done
            )
        } catch (error) {
            console.error("Error updating user:", error)
            toast.error("Failed to update user. Please try again.")
        }
        setNewAppData({
            ...app
        })
        setOpen(false)
    }
    console.log("appData", appData)
    console.log("newAppData", newAppData)

    // const handleChange = e => {
    //     const { name, value } = e.target
    //     setNewAppData({
    //         ...newAppData,
    //         [name]: value
    //     })
    // }

    const handleChange = (name, value) => {
        setNewAppData({
            ...newAppData,
            [name]: value
        })
    }

    const handleDropdownChange = (key, value) => {
        setNewAppData({
            ...newAppData,
            [key]: value
        })
    }

    return (
        <div>
            <Button variant="contained" color="primary" style={{ marginRight: "25px" }} onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="md" // or a custom width like '800px'
                fullWidth // makes the dialog take the full width of 'maxWidth'
            >
                <DialogTitle id="form-dialog-title">App configurations</DialogTitle>
                <DialogContent>
                    <Grid container spacing={5}>
                        {/* Left column content */}
                        <Grid item xs={12} md={6} style={{ paddingRight: "32px" }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="App_Acronym"
                                label="App_Acronym"
                                type="text"
                                fullWidth
                                style={{ marginBottom: "16px" }}
                                value={newAppData.App_Acronym}
                                disabled
                            />
                            <TextField
                                margin="dense"
                                name="App_Rnumber"
                                label="App_Rnumber"
                                type="number"
                                fullWidth
                                value={newAppData.App_Rnumber}
                                disabled
                            />
                            <Box display="flex" gap={2} mt={2} mb={2}>
                                <TextField
                                    name="App_startDate"
                                    label="From"
                                    type="date"
                                    value={newAppData.App_startDate || ""}
                                    onChange={e => handleChange("App_startDate", e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    name="App_endDate"
                                    label="To"
                                    type="date"
                                    value={newAppData.App_endDate || ""}
                                    onChange={e => handleChange("App_endDate", e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Box>
                            <TextField
                                margin="dense"
                                name="App_Description"
                                label="Description"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                value={newAppData.App_Description || ""}
                                onChange={e => handleChange("App_Description", e.target.value)}
                            />
                        </Grid>
                        {/* Right column content */}
                        <Grid item xs={12} md={6} style={{ paddingLeft: "32px" }}>
                            <Grid container spacing={2}>
                                {/* Permissions */}
                                <Grid item xs={6}>
                                    {/* Permissions Selects */}
                                    <Typography variant="subtitle1">Permissions</Typography>
                                    {/* Repeat the following for each permission */}
                                    {/* Create Tasks Display */}
                                    <Box mt={3} mb={5.5}>
                                        {" "}
                                        {/* Adjust margin-bottom as needed */}
                                        <Typography variant="body1">Create Tasks:</Typography>
                                    </Box>
                                    <Box mt={4} mb={4}>
                                        {" "}
                                        <Typography variant="body1">Open State:</Typography>
                                    </Box>
                                    <Box mt={5.5} mb={5}>
                                        {" "}
                                        <Typography variant="body1">To do State:</Typography>
                                    </Box>
                                    <Box mt={5.5} mb={6}>
                                        {" "}
                                        <Typography variant="body1">Doing State:</Typography>
                                    </Box>
                                    <Box mt={4} mb={6}>
                                        {" "}
                                        <Typography variant="body1">Done State:</Typography>
                                    </Box>
                                </Grid>
                                {/* User Groups */}
                                <Grid item xs={6}>
                                    {/* User Groups Selects */}
                                    <Typography variant="subtitle1">User Groups</Typography>
                                    {/* Repeat the following for each user group */}
                                    <FormControl fullWidth margin="dense">
                                        <InputLabel>Choose Group</InputLabel>
                                        <Select
                                            name="App_permit_Create"
                                            value={newAppData.App_permit_Create || ""}
                                            onChange={e => handleDropdownChange(e.target.name, e.target.value)}
                                        >
                                            {Array.isArray(groupOptions) &&
                                                groupOptions.map(opt => (
                                                    <MenuItem key={opt} value={opt}>
                                                        {opt}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                    {/* ...other user groups */}
                                    <FormControl fullWidth margin="dense">
                                        <InputLabel id="group-select-label-${appData.username}">Choose Group</InputLabel>
                                        <Select
                                            labelId="group-select-label-${appData.username}"
                                            name="App_permit_Open"
                                            value={newAppData?.App_permit_Open || ""}
                                            onChange={e => handleDropdownChange(e.target.name, e.target.value)}
                                        >
                                            {Array.isArray(groupOptions) &&
                                                groupOptions.map(opt => (
                                                    <MenuItem key={opt} value={opt}>
                                                        {opt}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth margin="dense">
                                        <InputLabel>Choose Group</InputLabel>
                                        <Select
                                            name="App_permit_toDoList"
                                            value={newAppData.App_permit_toDoList || ""}
                                            onChange={e => handleDropdownChange(e.target.name, e.target.value)}
                                        >
                                            {Array.isArray(groupOptions) &&
                                                groupOptions.map(opt => (
                                                    <MenuItem key={opt} value={opt}>
                                                        {opt}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth margin="dense">
                                        <InputLabel>Choose Group</InputLabel>
                                        <Select
                                            name="App_permit_Doing"
                                            value={newAppData.App_permit_Doing || ""}
                                            onChange={e => handleDropdownChange(e.target.name, e.target.value)}
                                        >
                                            {Array.isArray(groupOptions) &&
                                                groupOptions.map(opt => (
                                                    <MenuItem key={opt} value={opt}>
                                                        {opt}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth margin="dense">
                                        <InputLabel>Choose Group</InputLabel>
                                        <Select
                                            name="App_permit_Done"
                                            value={newAppData.App_permit_Done || ""}
                                            onChange={e => handleDropdownChange(e.target.name, e.target.value)}
                                        >
                                            {Array.isArray(groupOptions) &&
                                                groupOptions.map(opt => (
                                                    <MenuItem key={opt} value={opt}>
                                                        {opt}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditApp
