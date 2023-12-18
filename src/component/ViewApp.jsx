import React, { useState, useEffect } from "react"
// import { makeStyles } from "@mui/styles"
import { styled } from "@mui/system"
import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    Typography,
    Grid,
    Box,
    FormControl,
    InputLabel
} from "@mui/material"

// const useStyles = makeStyles(theme => ({
//     infoText: {
//         marginBottom: "16px",
//         fontSize: "1rem" // Adjust the font size as needed
//     }
// }))

const StyledTypography = styled(Typography)`
    padding: 18.5px 14px;
    margin-bottom: 16px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    font-size: 1rem;
    background-color: #fff;
    display: block;

    strong {
        margin-right: 8px;
    }
`
const StyledDateDisplay = styled(Typography)`
    padding: 18.5px 14px;
    margin-bottom: 16px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    font-size: 1rem;
    background-color: #fff;
    min-width: 0; // To ensure it flexes inside a flex container
    flex-grow: 1; // Allow it to grow
    box-sizing: border-box; // Adjust box model
    display: flex;
    align-items: center; // Center the text vertically
`

const ViewApp = ({ app }) => {
    const [open, setOpen] = useState(false)
    //Form overlay operations
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    console.log("Inside app", app)

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                View
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="md" // or a custom width like '800px'
                fullWidth // makes the dialog take the full width of 'maxWidth'
            >
                <DialogTitle id="form-dialog-title">App configurations</DialogTitle>
                <DialogContent>
                    <Grid container spacing={5}>
                        {/* Left column content */}
                        <Grid item xs={12} md={6} style={{ paddingRight: "32px" }}>
                            <StyledTypography>
                                <strong>App Acronym:</strong> {app.App_Acronym}
                            </StyledTypography>
                            <StyledTypography>
                                <strong>App Acronym:</strong> {app.App_Rnumber}
                            </StyledTypography>
                            <Box display="flex" gap={2} mt={2} mb={2}>
                                <StyledDateDisplay>
                                    <strong>From: &nbsp;</strong> {app.App_startDate}
                                </StyledDateDisplay>
                                <StyledDateDisplay>
                                    <strong>To: &nbsp;</strong> {app.App_endDate}
                                </StyledDateDisplay>
                            </Box>
                            <StyledTypography>
                                <strong>App Acronym:</strong> {app.App_Acronym}
                            </StyledTypography>
                            <TextField
                                margin="dense"
                                name="App_Description"
                                label="Description"
                                type="text"
                                // fullWidth
                                multiline
                                rows={4}
                                defaultValue={app.App_Description}
                                disabled
                            />
                        </Grid>
                        {/* Right column content */}
                        <Grid item xs={12} md={6} style={{ paddingLeft: "32px" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1">Permissions</Typography>
                                    <Box mt={3} mb={5}>
                                        {" "}
                                        {/* Adjust margin-bottom as needed */}
                                        <Typography variant="body1">Create Tasks:</Typography>
                                    </Box>
                                    <Box mt={3} mb={4}>
                                        {" "}
                                        <Typography variant="body1">Open State:</Typography>
                                    </Box>
                                    <Box mt={3.5} mb={5}>
                                        {" "}
                                        <Typography variant="body1">To do State:</Typography>
                                    </Box>
                                    <Box mt={3.5} mb={5}>
                                        {" "}
                                        <Typography variant="body1">Doing State:</Typography>
                                    </Box>
                                    <Box mt={3.5} mb={6}>
                                        {" "}
                                        <Typography variant="body1">Done State:</Typography>
                                    </Box>
                                </Grid>
                                {/* User Groups */}
                                <Grid item xs={6}>
                                    {/* User Groups Selects */}
                                    <Typography variant="subtitle1">User Groups</Typography>
                                    {/* Repeat the following for each user group */}
                                    <Box
                                        margin="dense"
                                        border={1}
                                        borderColor="lightgray"
                                        borderRadius={4}
                                        p={1}
                                        mb={2.5}
                                        mt={2}
                                        // fullWidth
                                    >
                                        <Typography variant="body1" color="textSecondary">
                                            {app.App_permit_Create}
                                            {""}
                                        </Typography>
                                    </Box>
                                    <Box
                                        margin="dense"
                                        border={1}
                                        borderColor="lightgray"
                                        borderRadius={4}
                                        p={1}
                                        mb={2.5}
                                        mt={2}
                                        // fullWidth
                                    >
                                        <Typography variant="body1" color="textSecondary">
                                            {app.App_permit_Open}
                                        </Typography>
                                    </Box>
                                    <Box
                                        margin="dense"
                                        border={1}
                                        borderColor="lightgray"
                                        borderRadius={4}
                                        p={1}
                                        mb={2.5}
                                        mt={2}
                                        // fullWidth
                                    >
                                        <Typography variant="body1" color="textSecondary">
                                            {app.App_permit_toDoList}
                                        </Typography>
                                    </Box>
                                    <Box
                                        margin="dense"
                                        border={1}
                                        borderColor="lightgray"
                                        borderRadius={4}
                                        p={1}
                                        mb={2.5}
                                        mt={2}
                                        // fullWidth
                                    >
                                        <Typography variant="body1" color="textSecondary">
                                            {app.App_permit_Doing}
                                        </Typography>
                                    </Box>
                                    <Box
                                        margin="dense"
                                        border={1}
                                        borderColor="lightgray"
                                        borderRadius={4}
                                        p={1}
                                        mb={2.5}
                                        mt={2}
                                        // fullWidth
                                    >
                                        <Typography variant="body1" color="textSecondary">
                                            {app.App_permit_Done}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ViewApp
