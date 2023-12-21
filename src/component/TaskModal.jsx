import React, { useEffect, useState } from "react"

import CloseIcon from "@mui/icons-material/Close"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    IconButton,
    TextField,
    Grid,
    Box,
    FormControl,
    Select,
    InputLabel,
    MenuItem
} from "@mui/material"

import appService from "../services/appService.jsx"
import userServices from "../services/userServices.jsx"
import { toast } from "react-toastify"


const TaskModal = ({ task, open, handleClose, fetchTasks }) => {
    if (!task) return null
    const [taskData, setTaskData] = useState({ ...task, Task_notes: "" }) // Initialize taskData with task
    const [planOptions, setPlanOptions] = useState([])
    const [statePermit, setStatePermit] = useState("")
    const [isUserInPermittedGroup, setIsUserInPermittedGroup] = useState(false)

    //Get Plan options, in an array of objects
    useEffect(() => {
        const getPlanOptions = async () => {
            try {
                const result = await appService.getAllPlans(task.Task_app_Acronym)
                setPlanOptions(result.data.map(a => a.Plan_MVP_name))
                // Set taskData.Task_plan only if it matches an option
                if (result.data.some(a => a.Plan_MVP_name === task.Task_plan)) {
                    setTaskData(prev => ({ ...prev, Task_plan: task.Task_plan }))
                }
                console.log("plan options", result)
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
        getPlanOptions()
    }, [task.Task_plan])

    //Fetch app permits per state
    useEffect(() => {
        const getStatePermit = async () => {
            try {
                const result = await appService.getAppPermit(task.Task_app_Acronym, task.Task_state)
                setStatePermit(result.data)
            } catch (e) {
                //Error handling: e is the error object
                console.error("error getting state permit", e)
                if (e.response && e.response.data) {
                    //if there is response w error data
                    toast.error(e.response.data.message)
                } else {
                    //error w no response eg. network error
                    toast.error("An unexpected error occured")
                }
            }
        }
        getStatePermit()
    }, [task.Task_state])
    console.log("State permit", statePermit)

    //Check if user is in permitted group
    useEffect(() => {
        const checkIfUserInGroup = async () => {
            try {
                const response = await userServices.checkGroup(statePermit)
                console.log("response.isUserInGroup", response.result)
                setIsUserInPermittedGroup(response.result)
            } catch (error) {
                console.error("Error checking user group", error)
            }
        }

        if (statePermit) {
            checkIfUserInGroup()
        }
    }, [statePermit])

    const handleChange = event => {
        const { name, value } = event.target
        setTaskData({
            ...taskData,
            [name]: value
        })
    }
    const handleDropdownChange = (key, value) => {
        setTaskData({
            ...taskData,
            [key]: value
        })
    }

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            const updatedTask = await appService.editTask(
                taskData.Task_plan,
                taskData.Task_notes,
                task.Task_id,
                task.Task_state,
                task.Task_name
            )
            // If successful, update the task in the parent component
            fetchTasks()
        } catch (error) {
            console.error("Unexpected error in handleSubmit", error)
        }
        handleClose()
    }
    const handlePromote = async event => {
        event.preventDefault()
        try {
            const updatedTask = await appService.promoteTask(
                taskData.Task_plan,
                taskData.Task_notes,
                task.Task_id,
                task.Task_state,
                task.Task_name,
                task.Task_app_Acronym
            )
            // If successful, update the task in the parent component
            fetchTasks(updatedTask.data)
        } catch (error) {
            console.error("Unexpected error in handleSubmit", error)
        }
        handleClose()
    }
    const handleDemote = async event => {
        event.preventDefault()
        try {
            const updatedTask = await appService.demoteTask(
                taskData.Task_plan,
                taskData.Task_notes,
                task.Task_id,
                task.Task_state,
                task.Task_name,
                task.Task_app_Acronym
            )
            // If successful, update the task in the parent component
            handleTaskUpdate(updatedTask.data)
        } catch (error) {
            console.error("Unexpected error in handleSubmit", error)
        }
        handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    {task.Task_name}
                </Typography>
                <IconButton style={{ position: "absolute", right: "10px", top: "10px" }} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    {/* left side */}
                    <Grid item xs={12} md={8}>
                        <Typography variant="body1" paragraph>
                            {task.Task_description}
                        </Typography>
                        <TextField
                            label="Task Notes"
                            multiline
                            rows={8}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                readOnly: true
                            }}
                            value={task.Task_notes}
                        />
                        <Box mt={2}>
                            <TextField
                                label="New Note"
                                multiline
                                rows={3}
                                variant="outlined"
                                fullWidth
                                name="Task_notes"
                                value={taskData.Task_notes}
                                placeholder="Input note"
                                // This can be made editable based on requirements
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid>
                    {/* right side */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <TextField
                                label="ID"
                                variant="outlined"
                                fullWidth
                                size="small"
                                margin="dense"
                                InputProps={{
                                    readOnly: true
                                }}
                                value={task.Task_id}
                            />
                            <TextField
                                label="App Acronym"
                                variant="outlined"
                                fullWidth
                                size="small"
                                margin="dense"
                                InputProps={{
                                    readOnly: true
                                }}
                                value={task.Task_app_Acronym}
                            />
                            <TextField
                                label="State"
                                variant="outlined"
                                fullWidth
                                size="small"
                                margin="dense"
                                InputProps={{
                                    readOnly: true
                                }}
                                value={task.Task_state}
                            />
                            <TextField
                                label="Create Date"
                                variant="outlined"
                                fullWidth
                                size="small"
                                margin="dense"
                                InputProps={{
                                    readOnly: true
                                }}
                                value={task.Task_createDate}
                            />
                            <TextField
                                label="Creator"
                                variant="outlined"
                                fullWidth
                                size="small"
                                margin="dense"
                                InputProps={{
                                    readOnly: true
                                }}
                                value={task.Task_creator}
                            />
                            <TextField
                                label="Owner"
                                variant="outlined"
                                fullWidth
                                size="small"
                                margin="dense"
                                InputProps={{
                                    readOnly: true
                                }}
                                value={task.Task_owner}
                            />
                            {planOptions && (
                                <FormControl fullWidth size="small" margin="dense">
                                    <InputLabel id="plan-select-label">Choose Plan</InputLabel>
                                    <Select
                                        labelId="plan-select-label"
                                        label="Plan"
                                        name="Task_plan"
                                        value={taskData.Task_plan || ""}
                                        onChange={e => handleDropdownChange(e.target.name, e.target.value)}
                                        disabled={
                                            !(task.Task_state === "open" && isUserInPermittedGroup) &&
                                            !(task.Task_state === "done" && isUserInPermittedGroup)
                                        }
                                    >
                                        {planOptions.map(option => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            <TextField //do this last
                                label="Plan Schedule"
                                variant="outlined"
                                fullWidth
                                size="small"
                                margin="dense"
                                InputProps={{
                                    readOnly: true
                                }}
                                value={task.Task_planSchedule || "N/A"} // Assuming there's a Task_planSchedule property
                            />
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={handleClose} color="primary">
                    Cancel
                </Button> */}
                <Button onClick={handleDemote} color="primary" disabled={!(task.Task_state === "done" && isUserInPermittedGroup)}>
                    Demote and Save
                </Button>
                <Button onClick={handlePromote} color="primary" disabled={task.Task_state === "close" || !isUserInPermittedGroup}>
                    Promote and Save
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TaskModal
