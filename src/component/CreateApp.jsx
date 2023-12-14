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

const CreateApp = () => {
    const [open, setOpen] = useState(false)
    const [appData, setAppData] = useState({
        App_Acronym: "",
        App_Rnumber: "",
        App_startDate: "",
        App_endDate: "",
        App_Description: "",
        App_permit_Create: "",
        App_permit_Open: "",
        App_permit_toDoList: "",
        App_permit_Doing: "",
        App_permit_Done: ""
    })
    const [groupOptions, setGroupOptions] = useState([])
    //Get Group options, in an array of objects
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
    console.log("groupOptions", groupOptions)

    //Form submit operations
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirm = () => {
        // Handle the confirm action (e.g., form submission)
        console.log(app)
        setOpen(false)
    }

    const handleChange = event => {
        const { name, value } = event.target
        setAppData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDropdownChange = (key, value) => {
        setAppData({
            ...appData,
            [key]: value
        })
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create App
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">App configurations</DialogTitle>
                <DialogContent>
                    <Grid container spacing={4}>
                        {/* Left column content */}
                        <Grid item xs={12} md={6} style={{ paddingRight: "32px" }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="App_Acronym"
                                label="App_Acronym"
                                type="text"
                                fullWidth
                                value={appData.App_Acronym}
                                onChange={handleChange}
                                style={{ marginBottom: "16px" }}
                            />
                            <TextField
                                margin="dense"
                                name="App_Rnumber"
                                label="App_Rnumber"
                                type="text"
                                fullWidth
                                value={appData.App_Rnumber}
                                onChange={handleChange}
                            />
                            <Box display="flex" gap={2} mt={2} mb={2}>
                                <TextField
                                    name="from"
                                    label="From"
                                    type="date"
                                    value={appData.App_startDate}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    name="to"
                                    label="To"
                                    type="date"
                                    value={appData.App_endDate}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Box>
                            <TextField
                                margin="dense"
                                name="description"
                                label="Description"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                value={appData.App_Description}
                                onChange={handleChange}
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
                                        {/* Adjust margin-bottom as needed */}
                                        <Typography variant="body1">Open State:</Typography>
                                    </Box>
                                    <Box mt={5.5} mb={5}>
                                        {" "}
                                        {/* Adjust margin-bottom as needed */}
                                        <Typography variant="body1">To do State:</Typography>
                                    </Box>
                                    <Box mt={5.5} mb={6}>
                                        {" "}
                                        {/* Adjust margin-bottom as needed */}
                                        <Typography variant="body1">Doing State:</Typography>
                                    </Box>
                                    <Box mt={4} mb={6}>
                                        {" "}
                                        {/* Adjust margin-bottom as needed */}
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
                                            name="createTask"
                                            value={appData.App_permit_Create}
                                            onChange={handleDropdownChange}
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
                                        <InputLabel>Choose Group</InputLabel>
                                        <Select name="openState" value={appData.App_permit_Open} onChange={handleDropdownChange}>
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
                                            name="toDoState"
                                            value={appData.App_permit_toDoList}
                                            onChange={handleDropdownChange}
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
                                            name="doingState"
                                            value={appData.App_permit_Doing}
                                            onChange={handleDropdownChange}
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
                                        <Select name="doneState" value={appData.App_permit_Done} onChange={handleDropdownChange}>
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
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateApp
