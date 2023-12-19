import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField } from "@mui/material"
// import CreateplanForm from "./CreateplanForm.jsx"
import appService from "../services/appService.jsx"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import CreatePlanForm from "./CreatePlan.jsx"

const PlanTable = ({ currentApp }) => {
    const navigate = useNavigate() //for protected routes later on
    const [plans, setPlans] = useState([]) //store all plans
    const [editingPlan, setEditingPlan] = useState(null) //to track editing plan (isEditingPlan)
    //Change to fetch all plans
    //fetch all plans on table
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await appService.getAllPlans(currentApp)
                setPlans(data.data) //response is an array of plans
            } catch (error) {
                console.error("Error fetching plans:", error)
            }
        } // fetch plans from database
        if (editingPlan == null) fetchPlans()
    }, [editingPlan])

    //Each row of plans
    const PlanRow = ({ plan }) => {
        const { ...planData } = plan
        const [newPlanData, setNewPlanData] = useState({ ...planData }) //Edits done to plan
        const editMode = editingPlan === newPlanData.Plan_MVP_name //where plan is selected for editing
        //editMode returns true if user is currenly being edited
        //returns boolean value
        const isEqual = (a, b) => {
            return Object.entries(a).sort().toString() === Object.entries(b).sort().toString()
        }

        const saveChanges = async () => {
            console.log("planData", planData)
            console.log("newPlanData", newPlanData)
            //Logic to save changes
            if (isEqual(planData, newPlanData)) {
                console.warn("No edits made to the plan:", plan.Plan_MVP_name)
                toast.error("No edits made to the plan:", plan.Plan_MVP_name)
                setEditingPlan(null)
                return
            }
            // Optionally: Update the backend with the edited plan data
            try {
                await appService.updatePlan(
                    newPlanData.Plan_MVP_name ?? "",
                    newPlanData.Plan_startDate ?? "",
                    newPlanData.Plan_endDate ?? "",
                    newPlanData.Plan_app_Acronym
                )
            } catch (error) {
                console.error("Error updating plan:", error)
                toast.error("Failed to update plan. Please try again.")
                return
            }
            //update newPlanData state with plan data from plan object
            setNewPlanData({
                ...plan
            })
            setEditingPlan(null) //clears the editing state
        }

        const handleEditChange = (key, value) => {
            setNewPlanData({
                ...newPlanData,
                [key]: value
            })
        }

        //to kick out of page if not project manager
        // const enabledEditing = async prop => {
        //     let verify
        //     try {
        //         verify = await planservices.checkGroup("admin")
        //         console.log("verify plan", verify)
        //     } catch (e) {
        //         console.log("failed", e)
        //         navigate("/dashboard")
        //         return
        //     }
        //     if (verify.result === false) {
        //         navigate("/dashboard")
        //         return
        //     }
        //     setEditingPlan(prop)
        // }

        return (
            <TableRow>
                <TableCell>{newPlanData.Plan_MVP_name}</TableCell>
                <TableCell>
                    {editMode ? (
                        <TextField
                            type="date"
                            defaultValue={newPlanData.Plan_startDate}
                            onChange={e => handleEditChange("Plan_startDate", e.target.value)}
                        />
                    ) : (
                        newPlanData.Plan_startDate
                    )}{" "}
                </TableCell>
                <TableCell>
                    {editMode ? (
                        <TextField
                            type="date"
                            defaultValue={newPlanData.Plan_endDate}
                            onChange={e => handleEditChange("Plan_endDate", e.target.value)}
                        />
                    ) : (
                        newPlanData.Plan_endDate
                    )}{" "}
                </TableCell>
                <TableCell>
                    {editMode ? (
                        <>
                            <Button onClick={saveChanges} variant="contained" color="primary">
                                Save
                            </Button>
                            <Button
                                onClick={() => {
                                    setEditingPlan(null)
                                }}
                                variant="contained"
                                color="secondary"
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={e => {
                                e.preventDefault()
                                // enabledEditing(newPlanData.Plan_MVP_name)
                                setEditingPlan(newPlanData.Plan_MVP_name)
                            }}
                            variant="contained"
                            color="primary"
                        >
                            Edit
                        </Button>
                    )}
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
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell>Plan name</TableCell>
                        <TableCell>Startdate</TableCell>
                        <TableCell>Enddate</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <CreatePlanForm currentApp={currentApp} />
                    {Array.isArray(plans) &&
                        plans.map(plan => <PlanRow key={`${plan.Plan_MVP_name}-${plan.Plan_app_Acronym}`} plan={plan} />)}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default PlanTable
