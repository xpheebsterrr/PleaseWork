// External
import React from "react"
import { useState } from "react"
import Cookies from "js-cookie"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import userServices from "../services/userServices.jsx"
import { Box, TextField, Button } from "@mui/material"

const CreateGroup = () => {
    const navigate = useNavigate()

    // createGroup to add groupname
    const [groupname, setGroupname] = useState({})

    const handleChange = event => {
        const value = event.target.value
        setGroupname({ groupname: value })
    }

    const handleSubmit = async event => {
        event.preventDefault()
        console.log("creating new group")
        let result = await userServices.createGroup(groupname.groupname).catch(e => {
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

        if (result) {
            console.log("result.data.message", result.data.message)
            toast.success(result.data.message)
            setGroupname({})
        }
        try {
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
        } catch (e) {
            toast.error(e, {
                autoClose: false
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="add-group">
            <TextField
                name="groupname"
                required
                size="small"
                label="Group Name"
                value={groupname.groupname || ""}
                onChange={handleChange}
            />
            <Button type="submit" variant="contained" size="small" color="success">
                Create New Group
            </Button>
        </form>
    )
}

export default CreateGroup
