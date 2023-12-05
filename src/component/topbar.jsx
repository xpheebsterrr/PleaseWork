// import { Box, IconButton, useTheme } from "@mui/material"
// import { useContext } from "react"
// import { tokens } from "../../theme"
// import InputBase from "@mui/material/InputBase"
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
// import SearchIcon from "@mui/icons-material/Search"
// import ExitToAppIcon from "@mui/icons-material/ExitToApp"
// // import { AuthContext } from "../../context/AuthContext"
// import { useLocation } from "react-router-dom"

// const Topbar = () => {
//    const theme = useTheme()
//    const colors = tokens(theme.palette.mode)
//    //  const { dispatch } = useContext(AuthContext)

//    //hide topbar from login
//    const location = useLocation()
//    if (location.pathname === "/login") {
//       return null // render nothing
//    }

//    //  const handleSignOut = () => {
//    //     signOut(auth)
//    //        .then(() => {
//    //           dispatch({ type: "LOGOUT" })
//    //        })
//    //        .catch(error => {
//    //           console.log(error)
//    //        })
//    //  }

//    return (
//       <Box display="flex" justifyContent="space-between" p={2}>
//          {/* SEARCH BAR */}
//          <Box
//             display="flex"
//             backgroundColor={colors.primary[400]}
//             borderRadius="3px"
//          >
//             <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
//             <IconButton type="button" sx={{ p: 1 }}>
//                <SearchIcon />
//             </IconButton>
//          </Box>

//          {/* ICONS */}
//          <Box display="flex">
//             <IconButton>
//                <NotificationsOutlinedIcon />
//             </IconButton>
//             <IconButton>
//                <SettingsOutlinedIcon />
//             </IconButton>
//             <IconButton>
//                <PersonOutlinedIcon />
//             </IconButton>
//             {/* <IconButton onClick={handleSignOut}> */}
//             <IconButton>
//                <ExitToAppIcon />
//             </IconButton>
//          </Box>
//       </Box>
//    )
// }

// export default Topbar
import React, { useState } from "react"
import { Box, IconButton, InputBase } from "@mui/material"
import { useLocation } from "react-router-dom"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import SearchIcon from "@mui/icons-material/Search"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"

const Topbar = () => {
   // Hide topbar from login page
   const location = useLocation()
   if (location.pathname === "/login") {
      return null // Render nothing
   }

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
