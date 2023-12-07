// export default Topbar
import React, { useEffect, useState } from "react"
import { Box, IconButton, InputBase } from "@mui/material"
import { useLocation } from "react-router-dom"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import SearchIcon from "@mui/icons-material/Search"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import { useNavigate } from "react-router-dom"

const Topbar = () => {
   const navigatae = useNavigate()
   const [isAdmin, setIsAdmin] = useState(false)

   // useEffect(() => {
   //    async function checkAdmin() {
   //       try {
   //          await userServices.checkGroup("admin").then(function (result) {
   //             if (result.response && result.response.status == 401) {
   //                Cookies.remove("jwt-token")
   //                Navigate("/")
   //             }
   //             if (result === true) {
   //                setIsAdmin(true)
   //             }
   //          })
   //       } catch (e) {
   //          setIsAdmin(false)
   //       }
   //    }
   //    checkAdmin()
   // }, [token])

   return (
      <Box display="flex" justifyContent="space-between" p={2}>
         {/* SEARCH BAR */}
         <Box
            display="flex"
            backgroundColor="primary.main" // Adjusted for default theme
            borderRadius="3px"
         >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
               <SearchIcon />
            </IconButton>
         </Box>

         {/* ICONS */}
         <Box display="flex">
            <IconButton>
               <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
               <SettingsOutlinedIcon />
            </IconButton>
            <IconButton>
               <PersonOutlinedIcon />
            </IconButton>
            <IconButton>
               <ExitToAppIcon />
            </IconButton>
         </Box>
      </Box>
   )
}

export default Topbar
