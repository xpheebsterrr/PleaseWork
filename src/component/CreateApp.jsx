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

const CreateApp = ({ fetchApps }) => {
    console.log("createapp", fetchApps)
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

    const handleChange = event => {
        const { name, value } = event.target
        setAppData({
            ...appData,
            [name]: value
        })
    }
    const handleDropdownChange = (key, value) => {
        setAppData({
            ...appData,
            [key]: value
        })
    }

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            await appService.createApp(
                appData.App_Acronym,
                appData.App_Rnumber,
                appData.App_startDate,
                appData.App_endDate,
                appData.App_Description,
                appData.App_permit_Create,
                appData.App_permit_Open,
                appData.App_permit_toDoList,
                appData.App_permit_Doing,
                appData.App_permit_Done
            )
        } catch (error) {
            console.error("Unexpected error in handleSubmit", error)
        }
        console.log("created app?")
        setOpen(false)
        fetchApps()
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create App
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
                                label="App_Acronym*"
                                type="text"
                                fullWidth
                                style={{ marginBottom: "16px" }}
                                value={appData.App_Acronym}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="App_Rnumber"
                                label="App_Rnumber*"
                                type="number"
                                fullWidth
                                value={appData.App_Rnumber}
                                onChange={handleChange}
                            />
                            <Box display="flex" gap={2} mt={2} mb={2}>
                                <TextField
                                    name="App_startDate"
                                    label="From"
                                    type="date"
                                    value={appData.App_startDate}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    name="App_endDate"
                                    label="To"
                                    type="date"
                                    value={appData.App_endDate}
                                    onChange={handleChange}
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
                                            value={appData.App_permit_Create}
                                            onChange={e => handleDropdownChange("App_permit_Create", e.target.value)}
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
                                        <InputLabel id="group-select-label-${appData.username}">Choose Group</InputLabel>
                                        <Select
                                            labelId="group-select-label-${appData.username}"
                                            name="App_permit_Open"
                                            value={appData.App_permit_Open}
                                            onChange={e => handleDropdownChange("App_permit_Open", e.target.value)}
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
                                            value={appData.App_permit_toDoList}
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
                                            value={appData.App_permit_Doing}
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
                                            value={appData.App_permit_Done}
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
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateApp
