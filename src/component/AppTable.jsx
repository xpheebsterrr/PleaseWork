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
import ViewApp from "./ViewApp.jsx"
import EditApp from "./EditApp.jsx"
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined"
import styled from "@emotion/styled"

const AppTable = () => {
    const navigate = useNavigate()

    const [apps, setApps] = useState([]) //store all apps
    const [users, setUsers] = useState([]) //store all users
    const [editingUser, setEditingUser] = useState(null) //to track editing user (isEditingUser)

    //fetch all users on table
    useEffect(() => {
        const fetchApps = async () => {
            try {
                const data = await appService.getAllApps()
                setApps(data.data) //response is an array of users
            } catch (error) {
                console.error("Error fetching apps:", error)
            }
        } // fetch users from database
        fetchApps()
    }, [])

    const enterApp = () => {
        navigate("/appPage")
    }
    // Styled icon with animation
    const ArrowIcon = styled(ArrowForwardOutlinedIcon)`
        margin-left: 25px;
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.2); // Scale up on hover
            cursor: pointer;
        }
    `

    //Each row of users
    const AppRow = ({ app }) => {
        return (
            <TableRow>
                <TableCell>{app.App_Acronym}</TableCell>
                <TableCell>{app.App_startDate}</TableCell>
                <TableCell>{app.App_endDate}</TableCell>
                <TableCell align="right" style={{ display: "flex", alignItems: "center" }}>
                    <ArrowIcon onClick={enterApp} />
                    <ViewApp app={app} />
                    {/* <Button variant="contained" color="primary" style={{ marginRight: "25px" }}>
                        Edit
                    </Button> */}
                    <EditApp app={app} />
                </TableCell>
            </TableRow>
        )
    }

    return (
        <Paper
            style={{
                border: "1px solid #ccc",
                marginLeft: "15px"
                // width: "80%"
                // marginRight: "auto", // Optional: Center the Paper
                // marginLeft: "auto"
            }}
        >
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
                    </TableRow>
                </TableHead>
                <TableBody>{Array.isArray(apps) && apps.map(app => <AppRow key={app.App_Acronym} app={app} />)}</TableBody>
            </Table>
        </Paper>
    )
}

export default AppTable
