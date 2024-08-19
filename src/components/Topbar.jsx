import React, { useContext, useEffect, useState } from 'react'
import { Box, IconButton, useTheme, Menu, MenuItem, ListItemIcon, Typography, Drawer, Button } from '@mui/material'
import { ColorModeContext, tokens } from '../theme'
import InputBase from '@mui/material/InputBase'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationModeOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined'
import SearchIcon from "@mui/icons-material/Search"
import { useSelector } from 'react-redux';

import { selectLogin } from '../redux/authSlice'

export const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)
    const [anchorEl, setAnchorEl] = useState(null); // State for dropdown visibility
    const selectUserData = useSelector(selectLogin)

    useEffect(() => {
        console.log(selectUserData)
    }, [])


    const [open, setOpen] = useState(false)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (

        <>
            <Box display="flex" position="relative"  width="300px" height="100vh" backgroundColor={colors.grey[100]}>


                <Box display="flex" position="absolute" justifyContent="center" bottom="20px" width="100%">
                    <Button variant='contained' sx={{ color:colors.redAccent[400], backgroundColor:colors.redAccent[200],padding:"10px 0", width: "200px", color: colors.redAccent[500], borderColor: colors.redAccent[500] }}>
                        <Typography variant="h5" sx={{fontWeight:700, textTransform:"capitalize"}}>
                            Logout
                        </Typography>

                    </Button>
                </Box>
            </Box>
        </>
    )


    return (
        <>
            <Box display="flex" justifyContent="space-between" p={2}>
                {/* SEARCH BAR */}
                <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="3px"
                >
                    <InputBase sx={{ ml: 2, flex: 2, width: "300px" }} placeholder="Search using a Job Card ID" />
                    <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                    </IconButton>
                </Box>

                {/* ICONS */}
                <Box display="flex">

                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkModeOutlinedIcon />
                        ) : (
                            <LightModeOutlinedIcon />
                        )}

                    </IconButton>

                    <IconButton>
                        <NotificationModeOutlinedIcon />
                    </IconButton>

                    <IconButton onClick={toggleDrawer(true)}>
                        <PersonOutlineIcon />
                    </IconButton>




                </Box>
            </Box>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>

    )
}
