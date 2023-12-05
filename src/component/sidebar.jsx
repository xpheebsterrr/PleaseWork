import React, { useState } from "react"
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { Box, IconButton, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import PersonAddIcon from "@mui/icons-material/PersonAdd"

const Item = ({ title, to, icon, selected, setSelected }) => {
  // Define some basic colors
  const primaryColor = "#556cd6" // Example primary color
  const greyColor = "#999" // Example grey color

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: greyColor
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}

const Sidebarr = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState("Dashboard")

  return (
    <Box sx={{ width: isCollapsed ? "80px" : "250px", backgroundColor: "#556cd6" }}>
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem onClick={() => setIsCollapsed(!isCollapsed)} icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}>
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h3">SHWO</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography variant="h5" fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
                  Admin1
                </Typography>
                <Typography variant="h5">Task Management System</Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
              Team Management
            </Typography>
            <Item title="Employee Database" to="/" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Manage Team" to="/" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
              Others
            </Typography>
            <Item title="Add User" to="/" icon={<PersonAddIcon />} selected={selected} setSelected={setSelected} />
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
