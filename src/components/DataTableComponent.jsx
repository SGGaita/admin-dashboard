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


export const DataTableComponent = ({jobsData}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    const columns = [
      { field: "Job_Card_no", headerName: "Job Card Number", flex: 1 },
      {
        field: "Client_full_name",
        headerName: "Client Name",
        flex: 1,
        cellClassName: "client-name--cell",
        
      },
      { field: "email", headerName: "Email", flex: 1 },
      {
        field: "phone_number",
        headerName: "Phone Number",
        flex: 1,
      },
      {
        field: "Machine_Make",
        headerName: "Machine Make",
        flex: 1,
      },
      {
        field: "Machine_Model",
        headerName: "Machine Model",
        flex: 1,
      },
      {
        field: "Machine_Serial",
        headerName: "Machine Serial",
        flex: 1,
      },
      {
        field: "Status",
        headerName: "Status",
        flex: 1,
      },
      {
        field: "actions",
        headerName: "Action",
        width: 150,
        renderCell: (params) => (
          <>
          <Tooltip style={{ fontSIze:"16px"}} title="View Job Card">
          <RemoveRedEyeIcon
           sx={{ cursor: 'pointer', color:colors.blueAccent[300], }}
           onClick={() => handleView(params.row)}
          />
          </Tooltip>
          <Tooltip style={{ fontSIze:"16px"}} title="Edit Job Card">
            <EditIcon 
              sx={{ cursor: 'pointer',color:colors.greenAccent[600], marginLeft: 2 }}
              onClick={() => handleEdit(params.row)}
            />
            </Tooltip>
            <Tooltip style={{ fontSIze:"16px"}} title="Delete Job Card">
            <DeleteIcon 
              sx={{ cursor: 'pointer',color:colors.redAccent[700], marginLeft: 2 }}
              onClick={() => handleDelete(params.row)}
            />
            </Tooltip>
          </>
        ),
      },
    ];


    const handleView=()=>{

    }

    const handleEdit =()=>{

    }

    const handleDelete =()=>{

    }
    

  return (
    <Box
    m="40px 0 0 0"
    height="75vh"
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
        rows={jobsData}
        columns={columns}
        />
    </Box>
  )
}
