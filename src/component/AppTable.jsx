import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import styled from "@emotion/styled"
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined"
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material"
import userServices from "../services/userServices.jsx"
import EditApp from "./EditApp.jsx"
import ViewApp from "./ViewApp.jsx"

const AppTable = ({ apps }) => {
    const [isUserInPermittedGroup, setIsUserInPermittedGroup] = useState(false)
    //Check if user is in permitted group
    useEffect(() => {
        const checkIfUserInGroup = async () => {
            try {
                const response = await userServices.checkGroup("Project Lead")
                console.log("response.isUserInGroup", response.result)
                setIsUserInPermittedGroup(response.result)
            } catch (error) {
                console.error("Error checking user group", error)
            }
        }
        checkIfUserInGroup()
    }, [apps])

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
        const navigate = useNavigate()
        const enterApp = app => {
            // navigate(`/appPage/${app.App_Acronym}`)
            navigate("/appPage", { state: { App_Acronym: app.App_Acronym } })
        }
        return (
            <TableRow>
                <TableCell>{app.App_Acronym}</TableCell>
                <TableCell>{app.App_startDate}</TableCell>
                <TableCell>{app.App_endDate}</TableCell>
                <TableCell align="right" style={{ display: "flex", alignItems: "center" }}>
                    <ArrowIcon onClick={e => enterApp(app)} />
                    <ViewApp app={app} />
                    {/* <Button variant="contained" color="primary" style={{ marginRight: "25px" }}>
                        Edit
                    </Button> */}
                    {isUserInPermittedGroup && <EditApp app={app} />}
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
