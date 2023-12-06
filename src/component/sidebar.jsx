import React, { useState } from "react"
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { Box, IconButton, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"

const Item = ({ title, to, icon, selected, setSelected }) => {
   // Define some basic colors
   const primaryColor = "#556cd6" // Example primary color
   const greyColor = "#999" // Example grey color

   return (
      <Link to={to} style={{ textDecoration: "none" }}>
         <MenuItem
            active={selected === title}
            style={{
               color: greyColor
            }}
            onClick={() => setSelected(title)}
            icon={icon}
         >
            <Typography>{title}</Typography>
         </MenuItem>
      </Link>
   )
}

const Sidebarr = () => {
   const [isCollapsed, setIsCollapsed] = useState(false)
   const [selected, setSelected] = useState("Dashboard")

   return (
      <Box
         sx={{
            ".css-ewdv3l": {
               height: "100vh"
            },
            width: isCollapsed ? "80px" : "250px",
            backgroundColor: "#556cd6"
         }}
      >
         <Sidebar collapsed={isCollapsed}>
            <Menu iconShape="square">
               {/* LOGO AND MENU ICON */}
               <MenuItem
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
               >
                  {!isCollapsed && (
                     <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                     >
                        <Typography variant="h3">TMS</Typography>
                        <IconButton
                           onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                           <MenuOutlinedIcon />
                        </IconButton>
                     </Box>
                  )}
               </MenuItem>
               <Box
                  paddingLeft={isCollapsed ? undefined : "10%"}
                  sx={{ marginTop: "35px" }}
               >
                  <Item
                     title="Dashboard"
                     to="/dashboard"
                     icon={<HomeOutlinedIcon />}
                     selected={selected}
                     setSelected={setSelected}
                  />

                  <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
                     Admin Functions
                  </Typography>
                  <Item
                     title="Admin"
                     to="/admin"
                     icon={<ContactsOutlinedIcon />}
                     selected={selected}
                     setSelected={setSelected}
                  />
               </Box>
            </Menu>
         </Sidebar>
      </Box>
   )
}

export default Sidebarr

// const Item = ({ title, to, icon, selected, setSelected }) => {
//   // Define some basic colors
//   const primaryColor = "#556cd6"; // Example primary color
//   const greyColor = "#999"; // Example grey color

//   return (
//     <Link to={to} style={{ textDecoration: 'none' }}>
//       <MenuItem
//         active={selected === title}
//         style={{
//           color: greyColor
//         }}
//         onClick={() => setSelected(title)}
//         icon={icon}
//       >
//         <Typography>{title}</Typography>
//       </MenuItem>
//     </Link>
//   );
// };

{
   /* <MenuItem
  // ...other props...
  onClick={() => setSelected(title)}
  icon={icon}
>
  <Link to={to}>
    <Typography>{title}</Typography>
  </Link>
</MenuItem>

Link Usage Inside MenuItem:
The usage of the Link component from react-router-dom might not be correct. Typically, the Link component is used to wrap around the content that should act as a link. In your Item component, the Link component is placed without wrapping any visible content. You should wrap the Typography component with the Link: */
}
