import axios from "axios"
import Cookies from "js-cookie"

const API_URL = "http://localhost:3000/api/v1" // Replace with your API URL

const login = async (username, password) => {
   try {
      const response = await axios.post(`${API_URL}/loginUser`, {
         username,
         password
      })
      console.log("response", response.data)
      if (response.data.token) {
         // localStorage.setItem("user", JSON.stringify(response.data))
         // Set token in cookie
         Cookies.set("token", response.data.token, {
            expires: 1, //expire in 1 dayk
            secure: true, //prevent js from accessing cookie
            sameSite: "Strict" //protect against CSRF attacks
         })
      }
      return response.data
   } catch (error) {
      // Handle different types of errors
      if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         console.log("incorrect email or password")
         console.error(
            "Server responded with an error:",
            error.response.status,
            error.response.data
         )
         throw new Error(
            error.response.data.message || "Error occurred during login"
         )
      } else if (error.request) {
         // The request was made but no response was received
         console.error(
            "No response received for the login request:",
            error.request
         )
         throw new Error("No response from server")
      } else {
         // Something happened in setting up the request that triggered an Error
         console.error("Error in setting up the login request:", error.message)
         throw new Error("Error in login request")
      }
   }
}

const logout = () => {
   localStorage.removeItem("user")
}

// Add other authentication-related methods as needed

export default {
   login,
   logout
}
