import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const TaskModal = ({ task, open, handleClose }) => {
    if (!task) return null // If no task is selected, don't display anything

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {task.Task_name}
                <IconButton style={{ position: "absolute", right: "10px", top: "10px" }} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {/* Display task details here, formatted as per the wireframe */}
                <Typography variant="body1">{task.Task_description}</Typography>
                {/* Add more fields as per your wireframe */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                {/* Add more actions as per your wireframe */}
            </DialogActions>
        </Dialog>
    )
}

export default TaskModal
