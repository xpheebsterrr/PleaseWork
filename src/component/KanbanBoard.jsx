import React from "react"
import { Box, Paper, Grid, Typography, Button, Card, CardContent } from "@mui/material"

const pastelColors = {
    open: "#F3E5AB", // pastel yellow
    todo: "#ABE5D1", // pastel green
    doing: "#ABD1E5", // pastel blue
    done: "#E5ABF3", // pastel purple
    closed: "#F3ABE5" // pastel pink
}
const KanbanColumn = ({ title, tasks }) => {
    return (
        <Paper sx={{ margin: 2, width: 200, flexGrow: 1 }}>
            <Typography variant="h6" sx={{ textAlign: "center", padding: 1 }}>
                {title}
            </Typography>
            {tasks.map((task, index) => (
                <Card key={index} sx={{ marginBottom: 1, backgroundColor: pastelColors[task.state] }}>
                    <CardContent>
                        <Typography variant="body2">
                            <strong>ID:</strong> {task.task_id}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Name:</strong> {task.task_name}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Owner:</strong> {task.task_owner}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Paper>
    )
}

const KanbanBoard = ({ currentApp }) => {
    console.log("kanban app", currentApp)
    // Sample tasks for demonstration
    const tasks = {
        open: [
            { task_id: "1", task_name: "Task 1", task_owner: "Owner 1", state: "open" },
            { task_id: "1", task_name: "Task 1", task_owner: "Owner 1", state: "open" },
            { task_id: "1", task_name: "Task 1", task_owner: "Owner 1", state: "open" },
            { task_id: "1", task_name: "Task 1", task_owner: "Owner 1", state: "open" }
        ],
        todo: [{ task_id: "2", task_name: "Task 2", task_owner: "Owner 2", state: "todo" }],
        doing: [{ task_id: "3", task_name: "Task 3", task_owner: "Owner 3", state: "doing" }],
        done: [{ task_id: "4", task_name: "Task 4", task_owner: "Owner 4", state: "done" }],
        closed: [{ task_id: "5", task_name: "Task 5", task_owner: "Owner 5", state: "closed" }]
    }

    return (
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md>
                    <KanbanColumn title="open" tasks={tasks.open} />
                </Grid>
                <Grid item xs={12} sm={6} md>
                    <KanbanColumn title="to do list" tasks={tasks.todo} />
                </Grid>
                <Grid item xs={12} sm={6} md>
                    <KanbanColumn title="doing" tasks={tasks.doing} />
                </Grid>
                <Grid item xs={12} sm={6} md>
                    <KanbanColumn title="done" tasks={tasks.done} />
                </Grid>
                <Grid item xs={12} sm={6} md>
                    <KanbanColumn title="close" tasks={tasks.closed} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default KanbanBoard
