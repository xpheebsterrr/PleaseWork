import React, { useState } from "react"

import CloseIcon from "@mui/icons-material/Close"
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton } from "@mui/material"

import appService from "../services/appService.jsx"


const CreateTask = ({ currentApp, fetchTasks }) => {
    console.log("currentApp", currentApp)
    const [modalOpen, setModalOpen] = useState(false)
    const [taskData, setTaskData] = useState({
        Task_name: "",
        Task_description: ""
    })
    const [taskID, setTaskID] = useState("") // Manage Task_id as part of the state

    const handleInputChange = e => {
        const { name, value } = e.target
        setTaskData({ ...taskData, [name]: value })
    }

    const handleOpenModal = async () => {
        // Fetch the latest R number and update task ID before opening the modal
        try {
            const appData = await appService.getApp(currentApp)
            let nextRNumber
            // Check if the taskID has already been set, if so, increment it
            if (taskID) {
                const currentRNumber = parseInt(taskID.split("_")[1], 10) //the number converted to integer
                nextRNumber = currentRNumber + 1
            } else {
                // If not, use the original App_Rnumber from the app data
                nextRNumber = appData.data.App_Rnumber
            }
            const newTaskID = `${currentApp}_${nextRNumber}`
            // const newTaskID = currentApp + "_" + nextRNumber
            setTaskID(newTaskID)
            setModalOpen(true)
        } catch (error) {
            console.error("Error fetching app data for new task ID", error)
        }
    }

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            await appService.createTask(taskData.Task_name, taskData.Task_description, taskID, currentApp)
        } catch (error) {
            console.error("error in handleSubmit", error)
        }
        setModalOpen(false) // Close the modal
        fetchTasks();
    }

    return (
        <>
            <Button variant="outlined" sx={{ marginRight: 1 }} onClick={handleOpenModal}>
                Create Tasks
            </Button>
            <Dialog open={modalOpen} onClose={() => setModalOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Task Information
                    <IconButton
                        aria-label="close"
                        onClick={() => setModalOpen(false)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: theme => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        name="Task_name"
                        value={taskData.Task_name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="ID"
                        type="text"
                        fullWidth
                        name="id"
                        value={taskID} // Use the taskID from the state
                        InputProps={{
                            readOnly: true // Make the ID field read-only if it shouldn't be edited
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="App Acronym"
                        type="text"
                        fullWidth
                        name="appAcronym"
                        value={currentApp}
                        InputProps={{
                            readOnly: true // Make the ID field read-only if it shouldn't be edited
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        name="Task_description"
                        value={taskData.Task_description}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CreateTask
