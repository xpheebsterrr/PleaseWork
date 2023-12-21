import React, { useState, useEffect } from "react"
import { Button, TextField, TableCell, TableRow } from "@mui/material"
import { useNavigate } from "react-router-dom"
import appService from "../services/appService.jsx"

function CreatePlanForm({ currentApp }) {
    const navigate = useNavigate
    const [newPlanData, setNewPlanData] = useState({
        Plan_MVP_name: "",
        Plan_startDate: "",
        Plan_endDate: "",
        Plan_app_Acronym: currentApp
    })

    const handleInputChange = event => {
        const { name, value } = event.target
        setNewPlanData({ ...newPlanData, [name]: value })
    }

    // const handleDropdownChange = (key, value) => {
    //     setNewPlanData({
    //         ...newPlanData,
    //         [key]: value
    //     })
    // }

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            // Call createUser with all necessary data
            await appService.createPlan(
                newPlanData.Plan_app_Acronym,
                newPlanData.Plan_MVP_name,
                newPlanData.Plan_startDate,
                newPlanData.Plan_endDate
            )
        } catch (error) {
            console.error("Unexpected error in handleSubmit:", error)
        }
    }

    return (
        <TableRow>
            <TableCell>
                <TextField
                    fullWidth
                    label="Plan name"
                    name="Plan_MVP_name"
                    value={newPlanData.Plan_MVP_name}
                    onChange={handleInputChange}
                />
            </TableCell>
            <TableCell>
                <TextField
                    fullWidth
                    name="Plan_startDate"
                    type="date"
                    value={newPlanData.Plan_startDate}
                    onChange={handleInputChange}
                />
            </TableCell>
            <TableCell>
                <TextField
                    fullWidth
                    name="Plan_endDate"
                    type="date"
                    value={newPlanData.Plan_endDate}
                    onChange={handleInputChange}
                />
            </TableCell>
            <TableCell>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Create
                </Button>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
        </TableRow>
    )
}

export default CreatePlanForm
