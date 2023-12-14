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
import userServices from "../services/userServices.jsx"
import appService from "../services/appService.jsx"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AppTable = () => {
    const navigate = useNavigate()

    const [apps, setApps] = useState([]) //store all apps
    const [users, setUsers] = useState([]) //store all users
    const [editingUser, setEditingUser] = useState(null) //to track editing user (isEditingUser)

    //fetch all users on table
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await appService.getAllApps()
                setApps(data.data) //response is an array of users
            } catch (error) {
                console.error("Error fetching apps:", error)
            }
        } // fetch users from database
        fetchUsers()
    }, [])

    //Each row of users
    const AppRow = ({ app }) => {
        return (
            <TableRow>
                <TableCell>{app.App_Acronym}</TableCell>
                <TableCell>{app.App_startDate}</TableCell>
                <TableCell>{app.App_endDate}</TableCell>
                <TableCell>
                    <Button variant="contained" color="primary">
                        Edit
                    </Button>
                </TableCell>
                <TableCell>
                    <Button variant="contained" color="primary">
                        View
                    </Button>
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
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell>App acro</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{Array.isArray(apps) && apps.map(app => <AppRow key={app.App_Acronym} app={app} />)}</TableBody>
            </Table>
        </Paper>
    )
}

export default AppTable
