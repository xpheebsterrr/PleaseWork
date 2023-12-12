import React, { useState, useEffect } from "react"
import { Button, TextField, FormControl, InputLabel, MenuItem, TableCell, TableRow, Select } from "@mui/material"
import userServices from "../services/userServices.jsx" // Adjust the path as necessary
import Cookies from "js-cookie"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function CreateUserForm() {
    const navigate = useNavigate
    const [newUserData, setNewUserData] = useState({
        username: "",
        email: "",
        password: "",
        groupnames: "",
        isActive: true
    })
    const [groupOptions, setGroupOptions] = useState([])

    //get group options for the edit form
    useEffect(() => {
        const getGroupOptions = async () => {
            try {
                const result = await userServices.getAllGroups().catch(e => {
                    if (e.response.status === 401) {
                        Cookies.remove("jwt-token")
                        navigate("/")
                    }
                    let error = e.response.data
                    if (error) {
                        // Show error message
                        toast.error(error.message, {
                            autoClose: false
                        })
                    }
                })
                setGroupOptions(result.data.map(group => group.groupname))
            } catch (e) {
                console.error("CreateUserForm groupOptionsError")
            }
        }
        getGroupOptions()
    }, [])

    const handleInputChange = event => {
        const { name, value } = event.target
        setNewUserData({ ...newUserData, [name]: value })
    }

    const handleDropdownChange = (key, value) => {
        setNewUserData({
            ...newUserData,
            [key]: value
        })
    }

    const handleCheckboxChange = event => {
        setNewUserData({ ...newUserData, [event.target.name]: event.target.checked })
    }

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            // Retrieve the access token from cookies
            const accessToken = Cookies.get("token")
            // Call createUser with all necessary data
            await userServices.createUser(
                newUserData.username,
                newUserData.email,
                newUserData.password,
                newUserData.groupnames,
                accessToken //Passing the access token
            )
        } catch (error) {
            console.error("Unexpected error in handleSubmit:", error)
        }
    }

    return (
        <TableRow>
            <TableCell>
                <TextField fullWidth label="Username" name="username" value={newUserData.username} onChange={handleInputChange} />
            </TableCell>
            <TableCell>
                <TextField fullWidth label="Email Address" name="email" value={newUserData.email} onChange={handleInputChange} />
            </TableCell>
            <TableCell>
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={newUserData.password}
                    onChange={handleInputChange}
                />
            </TableCell>
            <TableCell>
                <FormControl fullWidth>
                    <InputLabel id="group-select-label-${newUserData.username}">User Group</InputLabel>
                    <Select
                        labelId="group-select-label-"
                        multiple
                        value={newUserData?.groupnames ? newUserData.groupnames.split(",") : []}
                        onChange={e => handleDropdownChange("groupnames", e.target.value.join(","))}
                    >
                        {Array.isArray(groupOptions) && groupOptions.map(opt => <MenuItem value={opt}>{opt}</MenuItem>)}
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell>
                <Button name="isActive" color="primary">
                    Active
                </Button>
            </TableCell>
            <TableCell>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Create
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default CreateUserForm
