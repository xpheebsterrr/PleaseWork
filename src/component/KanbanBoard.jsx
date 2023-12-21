import React, { useState } from "react"
import { motion } from "framer-motion"

import { Box, Paper, Grid, Typography, Card, CardContent } from "@mui/material"

import TaskModal from "./TaskModal.jsx"


const pastelColors = {
    open: "#F3E5AB", // pastel yellow
    todo: "#ABE5D1", // pastel green
    doing: "#ABD1E5", // pastel blue
    done: "#E5ABF3", // pastel purple
    closed: "#F3ABE5", // pastel pink
    default: "#FFFFFF"
}

const KanbanColumn = ({ title, tasks, onTaskClick }) => {
    return (
        <Paper sx={{ margin: 2, width: 200, flexGrow: 1 }}>
            <Typography variant="h6" sx={{ textAlign: "center", padding: 1 }}>
                {title}
            </Typography>
            {tasks.map((task, index) => (
                <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.03 }} // Scale up on hover
                    whileTap={{ scale: 0.97 }} // Scale down slightly on click
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ cursor: "pointer" }} // Change cursor to pointer on hover
                >
                    <Card
                        sx={{ marginBottom: 1, backgroundColor: pastelColors[task.Task_state?.toLowerCase() || "default"] }}
                        onClick={() => onTaskClick(task)}
                    >
                        <CardContent>
                            <Typography variant="body2">
                                <strong>ID:</strong> {task.Task_id}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Name:</strong> {task.Task_name}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Owner:</strong> {task.Task_owner}
                            </Typography>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </Paper>
    )
}

const KanbanBoard = ({ currentApp, allTasks, fetchTasks }) => {
    const STATE_OPEN = "open"
    const STATE_TODO = "todo"
    const STATE_DOING = "doing"
    const STATE_DONE = "done"
    const STATE_CLOSED = "closed"

    const openTasks = allTasks.filter(task => task.Task_state === STATE_OPEN)
    const todoTasks = allTasks.filter(task => task.Task_state === STATE_TODO)
    const doingTasks = allTasks.filter(task => task.Task_state === STATE_DOING)
    const doneTasks = allTasks.filter(task => task.Task_state === STATE_DONE)
    const closedTasks = allTasks.filter(task => task.Task_state === STATE_CLOSED)

    const [selectedTask, setSelectedTask] = useState(null)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

    const handleTaskClick = task => {
        setSelectedTask(task)
        setIsTaskModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsTaskModalOpen(false)
        setSelectedTask(null) // Clear the selected task on modal close
    }

    return (
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md>
                    <KanbanColumn title="open" tasks={openTasks} onTaskClick={handleTaskClick} />
                </Grid>
                <Grid item xs={12} sm={6} md>
                    <KanbanColumn title="to do list" tasks={todoTasks} onTaskClick={handleTaskClick} />
                </Grid>
                <Grid item xs={12} sm={6} md>
                    <KanbanColumn title="doing" tasks={doingTasks} onTaskClick={handleTaskClick} />
                </Grid>
                <Grid item xs={12} sm={6} md>
                    <KanbanColumn title="done" tasks={doneTasks} onTaskClick={handleTaskClick} />
                </Grid>
                <Grid item xs={12} sm={6} md>
                    <KanbanColumn title="close" tasks={closedTasks} onTaskClick={handleTaskClick} />
                </Grid>
            </Grid>
            <TaskModal
                task={selectedTask}
                open={isTaskModalOpen}
                handleClose={handleCloseModal}
                fetchTasks={fetchTasks}
            />
        </Box>
    )
}

export default KanbanBoard
