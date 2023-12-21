import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify"

const API_URL = "http://localhost:3000/api/v1" // Replace with your API URL

//App Management
//get all Apps from database
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

//create app
const createApp = async (
    App_Acronym,
    App_Rnumber,
    App_startDate,
    App_endDate,
    App_Description,
    App_permit_Create,
    App_permit_Open,
    App_permit_toDoList,
    App_permit_Doing,
    App_permit_Done
) => {
    const appData = {
        access_token: Cookies.get("token"),
        App_Acronym,
        App_Rnumber,
        App_startDate,
        App_endDate,
        App_Description,
        App_permit_Create,
        App_permit_Open,
        App_permit_toDoList,
        App_permit_Doing,
        App_permit_Done
    }
    try {
        console.log("appData", appData)
        const response = await axios.post(`${API_URL}/createApp`, appData)
        const message = response.data.message
        if (message === "Error: User is not authorised.") {
            toast.error("Error: User is not authorised.")
        }
        // Show error message
        if (error.message === "Request failed with status code 500") {
            toast.error("App exists")
        }
        // Show a toast with the dynamic message
        else toast.success(`${message}`)
        return response.data
    } catch (error) {
        console.error("Error creating App:", error)
        const errorMessage = error.response?.data?.message || "Failed to create App. Please try again."
        // Show an error toast with the dynamic error message
        toast.error(errorMessage)
        throw error
    }
}

//update app
const updateApp = async (
    App_Acronym,
    App_startDate,
    App_endDate,
    App_Description,
    App_permit_Create,
    App_permit_Open,
    App_permit_toDoList,
    App_permit_Doing,
    App_permit_Done
) => {
    const appData = {
        access_token: Cookies.get("token"),
        App_Acronym,
        App_startDate,
        App_endDate,
        App_Description,
        App_permit_Create,
        App_permit_Open,
        App_permit_toDoList,
        App_permit_Doing,
        App_permit_Done
    }
    try {
        const response = await axios.put(`${API_URL}/updateApp`, appData)
        const message = response.data.message
        if (message === "Error: User is not authorised.") {
            toast.error("Error: User is not authorised.")
        }
        // Show a toast with the dynamic message
        else toast.success(`${message}`)
        return response.data
    } catch (error) {
        console.error("Error updating App:", error)
        const errorMessage = error.response?.data?.message || "Failed to update App. Please try again."
        // Show an error toast with the dynamic error message
        toast.error(errorMessage)
        throw error
    }
}

//get app from database
const getApp = async App_Acronym => {
    try {
        const appData = {
            access_token: Cookies.get("token"),
            App_Acronym
        }
        const response = await axios.post(`${API_URL}/getApp`, appData)
        return response.data
    } catch (error) {
        console.error("Error fetching App:", error)
        throw error // Propagate error for handling in the calling component
    }
}

//get app permit from database
const getAppPermit = async (Task_app_Acronym, Task_state) => {
    try {
        const appData = {
            access_token: Cookies.get("token"),
            Task_app_Acronym,
            Task_state
        }
        const response = await axios.post(`${API_URL}/getAppPermit`, appData)
        return response.data
    } catch (error) {
        console.error("Error fetching App:", error)
        throw error // Propagate error for handling in the calling component
    }
}

//Plan Management
//createPlan
const createPlan = async (Plan_app_Acronym, Plan_MVP_name, Plan_startDate, Plan_endDate) => {
    const planData = {
        access_token: Cookies.get("token"),
        Plan_app_Acronym,
        Plan_MVP_name,
        Plan_startDate,
        Plan_endDate
    }
    try {
        const response = await axios.post(`${API_URL}/createPlan`, planData)
        toast.success("Plan created successfully")
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Plan already exists in this app"
        toast.error(errorMessage)
        // console.error("Error creating group:", error)
        // toast.error("Plan already exists in this app")
        throw error
    }
}

//get all Groups from database
const getAllPlans = async Plan_app_Acronym => {
    try {
        const planData = { access_token: Cookies.get("token"), Plan_app_Acronym }
        const response = await axios.post(`${API_URL}/getPlans`, planData)
        return response.data
    } catch (error) {
        console.error("Error fetching plans:", error)
        throw error // Propagate error for handling in the calling component
    }
}

//update plan
const updatePlan = async (Plan_MVP_name, Plan_startDate, Plan_endDate, Plan_app_Acronym) => {
    const planData = {
        access_token: Cookies.get("token"),
        Plan_MVP_name,
        Plan_startDate,
        Plan_endDate,
        Plan_app_Acronym
    }
    try {
        const response = await axios.put(`${API_URL}/updatePlan`, planData)
        const message = response.data.message
        if (message === "Error: User is not authorised.") {
            toast.error("Error: User is not authorised.")
        }
        // Show a toast with the dynamic message
        else toast.success(`${message}`)
        return response.data
    } catch (error) {
        console.error("Error updating Plan:", error)
        const errorMessage = error.response?.data?.message || "Failed to update Plan. Please try again."
        // Show an error toast with the dynamic error message
        toast.error(errorMessage)
        throw error
    }
}

//Task Management
//createTask
const createTask = async (Task_name, Task_description, Task_id, Task_app_Acronym) => {
    const taskData = {
        access_token: Cookies.get("token"),
        Task_name,
        Task_description,
        Task_id,
        Task_app_Acronym
    }
    try {
        const response = await axios.post(`${API_URL}/createTask`, taskData)
        toast.success("Task created successfully")
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Task already exist in app"
        toast.error(errorMessage)
        // console.error("Error creating group:", error)
        // toast.error("Plan already exists in this app")
        throw error
    }
}
//Get Tasks in each state
const getTasks = async (Task_state, Task_app_Acronym) => {
    try {
        const taskData = {
            access_token: Cookies.get("token"),
            Task_state,
            Task_app_Acronym
        }
        const response = await axios.post(`${API_URL}/getTasks`, taskData)
        return response.data
    } catch (error) {
        console.error("Error fetching Tasks:", error)
        throw error // Propagate error for handling in the calling component
    }
}

//Edit Task
const editTask = async (Task_plan, Task_notes, Task_id, Task_state, Task_name) => {
    const taskData = {
        access_token: Cookies.get("token"),
        Task_plan,
        Task_notes,
        Task_id,
        Task_state,
        Task_name
    }
    try {
        const response = await axios.post(`${API_URL}/editTask`, taskData)
        const message = response.data.message
        if (message === "Error: User is not authorised.") {
            toast.error("Error: User is not authorised.")
        }
        // Show a toast with the dynamic message
        else toast.success(`${message}`)
        return response.data
    } catch (error) {
        console.error("Error editing task:", error)
        const errorMessage = error.response?.data?.message || "Failed to edit task. Please try again."
        // Show an error toast with the dynamic error message
        toast.error(errorMessage)
        throw error
    }
}

//Promote Task
const promoteTask = async (Task_plan, Task_notes, Task_id, Task_state, Task_name, Task_app_Acronym) => {
    const taskData = {
        access_token: Cookies.get("token"),
        Task_plan,
        Task_notes,
        Task_id,
        Task_state,
        Task_name,
        Task_app_Acronym
    }
    try {
        const response = await axios.post(`${API_URL}/promoteTask`, taskData)
        const message = response.data.message
        if (message === "Error: User is not authorised.") {
            toast.error("Error: User is not authorised.")
        }
        // Show a toast with the dynamic message
        else toast.success(`${message}`)
        return response.data
    } catch (error) {
        console.error("Error promoting task:", error)
        const errorMessage = error.response?.data?.message || "Failed to promote task. Please try again."
        // Show an error toast with the dynamic error message
        toast.error(errorMessage)
        throw error
    }
}

//Promote Task
const demoteTask = async (Task_plan, Task_notes, Task_id, Task_state, Task_name, Task_app_Acronym) => {
    const taskData = {
        access_token: Cookies.get("token"),
        Task_plan,
        Task_notes,
        Task_id,
        Task_state,
        Task_name,
        Task_app_Acronym
    }
    try {
        const response = await axios.post(`${API_URL}/demoteTask`, taskData)
        const message = response.data.message
        if (message === "Error: User is not authorised.") {
            toast.error("Error: User is not authorised.")
        }
        // Show a toast with the dynamic message
        else toast.success(`${message}`)
        return response.data
    } catch (error) {
        console.error("Error promoting task:", error)
        const errorMessage = error.response?.data?.message || "Failed to demote task. Please try again."
        // Show an error toast with the dynamic error message
        toast.error(errorMessage)
        throw error
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
    createApp,
    updateApp,
    getApp,
    getAppPermit,
    createPlan,
    getAllPlans,
    updatePlan,
    createTask,
    getTasks,
    editTask,
    promoteTask,
    demoteTask,
    checkGroup
}
