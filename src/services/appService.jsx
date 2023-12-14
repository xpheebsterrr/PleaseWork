import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify"

const API_URL = "http://localhost:3000/api/v1" // Replace with your API URL

//get all Users from database
const getAllApps = async () => {
    try {
        const appData = {
            access_token: Cookies.get("token"),
            groupnames: "admin"
        }
        const response = await axios.post(`${API_URL}/getApps`, appData)
        // if (response.data.message === "Error: User is not authorised.") {
        //     toast.error("Error: User is not authorised.")
        //     Cookies.remove("token")
        //     navigate("/")
        // }
        return response.data
    } catch (error) {
        if (error.response.status === 401) {
            Cookies.remove("token")
            navigate("/")
        }
        console.error("Error fetching apps:", error)
        throw error // Propagate error for handling in the calling component
    }
}

//get User from database
const getUser = async () => {
    try {
        const appData = {
            access_token: Cookies.get("token")
        }
        const response = await axios.post(`${API_URL}/getUser`, appData)
        return response.data
    } catch (error) {
        console.error("Error fetching user:", error)
        throw error // Propagate error for handling in the calling component
    }
}

//create user
const createUser = async (username, email, password, groupnames) => {
    const appData = { access_token: Cookies.get("token"), username, email, password, groupnames }
    try {
        console.log("asds", appData)
        const response = await axios.post(`${API_URL}/createUser`, appData)
        const message = response.data.message
        if (message === "Error: User is not authorised.") {
            toast.error("Error: User is not authorised.")
        }
        // Show a toast with the dynamic message
        else toast.success(`${message}`)
        return response.data
    } catch (error) {
        console.error("Error creating user:", error)
        const errorMessage = error.response?.data?.message || "Failed to create user. Please try again."
        // Show an error toast with the dynamic error message
        toast.error(errorMessage)
        throw error
    }
}

//toggle isActive
const toggleIsActive = async (username, isActive) => {
    const appData = { access_token: Cookies.get("token"), isActive }
    try {
        const response = await axios.put(`${API_URL}/toggle-status`, appData)
        return response.data
    } catch (error) {
        console.error("Error toggling isActive:", error)
        throw error
    }
}

//update Users (unable to update username)
const updateUser = async (username, email, password, groupnames, isActive, oldGroupnames) => {
    const appData = { access_token: Cookies.get("token"), username, email, password, groupnames, isActive, oldGroupnames }
    try {
        const response = await axios.put(`${API_URL}/users/:username`, appData)
        return response.data
    } catch (error) {
        console.error("Error updating user:", error)
        throw error
    }
}

//createGroup
const createGroup = async groupname => {
    const groupData = { access_token: Cookies.get("token"), groupname }
    try {
        const response = await axios.post(`${API_URL}/createGroup`, groupData)
        toast.success("Group created successfully")
        return response.data
    } catch (error) {
        console.error("Error creating group:", error)
        // Show error message
        if (error.message === "Request failed with status code 500") {
            toast.error("group exists")
        }
        throw error
    }
}

//get all Groups from database
const getAllGroups = async () => {
    try {
        const appData = { access_token: Cookies.get("token") }
        const response = await axios.post(`${API_URL}/getGroup`, appData)
        return response.data
    } catch (error) {
        console.error("Error fetching users:", error)
        throw error // Propagate error for handling in the calling component
    }
}

//CheckGroup
const checkGroup = async groupnames => {
    const groupData = { access_token: Cookies.get("token"), groupnames }
    try {
        const response = await axios.post(`${API_URL}/checkGroup`, groupData)
        return response.data
    } catch (error) {
        console.error("User not in specified group", error)
        throw error
    }
}

export default {
    getAllApps,
    createUser,
    toggleIsActive,
    updateUser,
    createGroup,
    checkGroup,
    getAllGroups,
    getUser
}
