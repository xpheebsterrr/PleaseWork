import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField } from "@mui/material"
import CreateplanForm from "./CreateplanForm.jsx"
import planservices from "../services/planservices.jsx"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const PlanTable = () => {
    const navigate = useNavigate()

    const [plans, setplans] = useState([]) //store all plans
    const [editingplan, setEditingplan] = useState(null) //to track editing plan (isEditingplan)

    //Change to fetch all plans
    //fetch all plans on table
    useEffect(() => {
        const fetchplans = async () => {
            try {
                const data = await planservices.getAllplans(navigate)
                setplans(data.data) //response is an array of plans
            } catch (error) {
                console.error("Error fetching plans:", error)
            }
        } // fetch plans from database
        if (editingplan == null) fetchplans()
    }, [editingplan])

    //Each row of plans
    const planRow = ({ plan }) => {
        const { ...planData } = plan
        const [newPlanData, setNewPlanData] = useState({ ...planData }) //Edits done to plan
        const editMode = editingplan == newPlanData.Plan_MVP_name //where plan is selected for editing

        // should consider importing lodash library
        //function sorts the key-value pairs of input objects a and b, convert them to strings and compare them
        //returns boolean value
        const isEqual = (a, b) => {
            return Object.entries(a).sort().toString() === Object.entries(b).sort().toString()
        }

        const saveChanges = async () => {
            console.log("planData", planData)
            console.log("newPlanData", newPlanData)
            //Logic to save changes
            if (isEqual(planData, newPlanData)) {
                console.warn("No edits made to the plan:", plan.planname)
                toast.error("No edits made to the plan:", plan.planname)
                setEditingplan(null)
                return
            }
            // Optionally: Update the backend with the edited plan data
            try {
                await planservices.updateplan(
                    newPlanData.planname ?? "",
                    newPlanData.email ?? "", //if null default to empty string
                    newPlanData.password, //keep original value
                    newPlanData.groupnames ?? "",
                    newPlanData.isActive,
                    newPlanData.oldGroupnames
                ) // Adjust as per your API
                toast.success("plan updated successfully!")
            } catch (error) {
                console.error("Error updating plan:", error)
                toast.error("Failed to update plan. Please try again.")
                return
            }
            //update newPlanData state with plan data from plan object
            setNewPlanData({
                ...plan
            })
            setEditingplan(null) //clears the editing state
        }

        const handleEditChange = (key, value) => {
            setNewPlanData({
                ...newPlanData,
                [key]: value
            })
        }

        //to kick out of page if not admin
        const enabledEditing = async prop => {
            let verify
            try {
                verify = await planservices.checkGroup("admin")
                console.log("verify plan", verify)
            } catch (e) {
                console.log("failed", e)
                navigate("/dashboard")
                return
            }
            if (verify.result === false) {
                navigate("/dashboard")
                return
            }
            setEditingplan(prop)
        }

        return (
            <TableRow>
                <TableCell>{newPlanData.planname}</TableCell>

                <TableCell>
                    {editMode ? (
                        <TextField
                            type="email"
                            defaultValue={newPlanData.email}
                            onChange={e => handleEditChange("email", e.target.value)}
                        />
                    ) : (
                        newPlanData.email
                    )}{" "}
                </TableCell>
                <TableCell>
                    {editMode ? (
                        <TextField
                            type="password"
                            defaultValue={newPlanData.password}
                            onChange={e => handleEditChange("password", e.target.value)}
                            placeholder="********"
                        />
                    ) : (
                        "********"
                    )}
                </TableCell>
                <TableCell>
                    <Button
                        variant={newPlanData.isActive === "active" ? "contained" : "outlined"}
                        color={newPlanData.isActive === "active" ? "primary" : "secondary"}
                        onClick={toggleStatus} //toggle the isActive state for the plan
                        disabled={!editMode}
                    >
                        {newPlanData.isActive === "active" ? "Active" : "Disabled"}
                    </Button>
                </TableCell>
                <TableCell>
                    {editMode ? (
                        <>
                            <Button onClick={saveChanges} variant="contained" color="primary">
                                Save
                            </Button>
                            <Button
                                onClick={() => {
                                    setEditingplan(null)
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
                                enabledEditing(newPlanData.planname)
                                //   setEditingplan(newPlanData.planname)
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
                    <CreatePlanForm />
                    {Array.isArray(plans) && plans.map(plan => <planRow key={plan.planname} plan={plan} />)}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default PlanTable
