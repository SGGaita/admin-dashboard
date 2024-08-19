import React from 'react'
import { Box, Tooltip, Typography, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../theme'
import AdminPanelSettingsOutlinedIcon  from '@mui/icons-material/AdminPanelSettingsOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockClockOutlined'
import Header from './Header'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


export const DataTableComponent = ({rows, column}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)



  return (
    <Box
    m="30px 0 0 0"
   
    
    sx={{
      "& .MuiDataGrid-root": {
        border: "none",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "none",
      },
      "& .name-column--cell": {
        color: colors.greenAccent[300],
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: colors.blueAccent[700],
        borderBottom: "none",
      },
      "& .MuiDataGrid-virtualScroller": {
        backgroundColor: colors.primary[400],
      },
      "& .MuiDataGrid-footerContainer": {
        borderTop: "none",
        backgroundColor: colors.blueAccent[700],
      },
      "& .MuiCheckbox-root": {
        color: `${colors.greenAccent[200]} !important`,
      },
    }}
    >
        <DataGrid
        rows={rows}
        columns={column}
        />
    </Box>
  )
}
