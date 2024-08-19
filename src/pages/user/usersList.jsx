import React, { useState } from 'react'
import { Box, IconButton, Menu, Tooltip, Typography, useTheme, MenuItem, ListItemIcon, Chip } from '@mui/material'
import { tokens } from '../../theme';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DataTableComponent } from '../../components/DataTableComponent';


export const UsersList = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userData, setUserData] = useState([])
    const [anchorEl, setAnchorEl] = useState(null); // State for dropdown visibility




    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleDelete = () => {
        console.log("Test delete")
    }



    const columns = [
        {
            field: "fname",
            headerName: "First Name",
            flex: 1,

        },
        { field: "lname", headerName: "Last Name", flex: 1 },
        {
            field: "email",
            headerName: "Email Address",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Account Role",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Status",
            flex: 1,
           
              renderCell: (params) => {
                const statusColorMap = {
                 Activated: colors.greenAccent[600],
                  Deactivated: colors.redAccent[600],
                 
                };
        
                
                const statusColor = statusColorMap[params.row.name]
                return (
                  <Box display="flex" justifyContent="flex-start" alignItems="center" marginTop="10px" >
                    <Chip label={params.value} sx={{ width: "150px", backgroundColor: statusColor }} />
                  </Box>
        
                  // <div style={{ backgroundColor: statusColor }}>{params.value}</div>
                );
              },
          
          },
        {
            field: "actions",
            headerName: "Action",
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={handleMenuOpen}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu

                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}

                    >
                        <MenuItem sx={{ bgcolor: colors.primary[300] }}>
                            <ListItemIcon>
                                <VisibilityIcon />
                            </ListItemIcon>
                            <Typography variant="body1">View</Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <EditNoteIcon />
                            </ListItemIcon>
                            <Typography variant="body1">Edit</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleDelete}>
                            <ListItemIcon>
                                <DeleteForeverIcon />
                            </ListItemIcon>
                            <Typography variant="body1">Delete</Typography>
                        </MenuItem>


                    </Menu>

                </>
            ),
        },
    ];


    useState(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/get-all-users')
            console.log('Responses', response.data)
            setUserData(response.data)
        } catch (error) {
            console.log("Error", error)
        }
    }, [])

    return (
        <>
            <Box display="flex" flexDirection="column" p="25px" maxWidth="100%">

                <Typography variant="h3" mb="10px" color={colors.greenAccent[400]}>
                    {title}
                </Typography>
                <Typography variant="h4" mb="30px" color={colors.primary[100]}>
                    {subtitle}
                </Typography>

                <Box
                    backgroundColor={colors.primary[400]}
                    p="20px"
                >
                    <DataTableComponent
                        rows={userData}
                        column={columns}
                    />
                </Box>
            </Box>
        </>
    )
}
