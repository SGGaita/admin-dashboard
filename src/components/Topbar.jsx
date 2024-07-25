import React, { useContext, useState } from 'react'
import { Box, IconButton, useTheme, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material'
import { ColorModeContext, tokens } from '../theme'
import InputBase from '@mui/material/InputBase'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationModeOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined'
import SearchIcon from "@mui/icons-material/Search"

export const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)
    const [anchorEl, setAnchorEl] = useState(null); // State for dropdown visibility

    // User information (replace with your data fetching mechanism)
    const userInfo = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        // Add other relevant user information
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (<Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
        >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
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

            <IconButton onClick={handleMenuOpen}>
                <PersonOutlineIcon />
            </IconButton>
            <Menu
                id="menu-basic"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                 
            >
                <MenuItem sx={{ bgcolor: colors.primary[300] }}>
                    <ListItemIcon>
                        <PersonOutlineIcon />
                    </ListItemIcon>
                    <Typography variant="body2">{userInfo.name}</Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        {/* Add appropriate icon for email */}
                    </ListItemIcon>
                    <Typography variant="body2">{userInfo.email}</Typography>
                </MenuItem>
                {/* Add menu items for other user information */}
            </Menu>



        </Box>
    </Box>
    )
}
