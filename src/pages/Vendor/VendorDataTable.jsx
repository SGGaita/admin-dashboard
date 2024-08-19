import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { Box, Chip, IconButton, InputAdornment, Menu, MenuItem, TextField, useTheme } from '@mui/material'
import { tokens } from '../../theme';
import axios from 'axios';
import { DataTableComponent } from '../../components/DataTableComponent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export const VendorDataTable = ({ title, subtitle }) => {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vendors/get-all-vendors');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, [])


  const vendorColumns = [
    { field: "vendor_name", headerName: "Vendor Name", flex: 1 },
    {
      field: "vendor_email",
      headerName: "Vendor email",
      flex: 1,

    },
    {
      field: "vendor_phone",
      headerName: "Vendor Phone Number",
      flex: 1,

    },
    {
      field: "vendor_address",
      headerName: "Vendor Address",
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
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {


        const jobCardId = params.row.job_card_id; // Access job card ID

        return (
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true'
                : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <ExpandMoreIcon fontSize="large" />
            </IconButton>
            <Menu

              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}

              anchorOrigin={{
                vertical: 'top',
                horizontal:
                  'right',
              }}

              sx={{
                "& .MuiPaper-root": {
                  background: `${colors.primary[400]} !important`,
                },
              }}
            >
              <MenuItem
                sx={{ width: "200px", backgroundColor: colors.primary[400] }}
                onClick={() => { handleClose(); handleView(jobCardId) }}>View</MenuItem>
              <MenuItem
                sx={{ backgroundColor: colors.primary[400] }}
                onClick={() => { handleClose(); handleEdit(jobCardId) }}>Update Status</MenuItem>
              <MenuItem
                sx={{ backgroundColor: colors.primary[400] }}
                onClick={() => { handleClose(); }}>Delete</MenuItem>
            </Menu>
          </div>
        );
      },
    }



  ];


  const handleView = () => {

  }

  const handleEdit = () => {

  }

  const handleDelete = () => {

  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };


  return (
    <Box
      padding="20px"
      sx={{
        boxSizing: "border-box"
      }}
    >
      <Header title={title} subtitle={subtitle} />

      <Box display="flex"

        backgroundColor={colors.primary[400]}
        flexDirection="column"
        padding="20px 20px"

      >

        <TextField
          label="Search by Vendor by Name"
          variant="filled"
          value={searchText}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  {/* Search Icon */}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      <DataTableComponent sx={{
        "& ..MuiDataGrid-columnHeaderTitleContainer":{
          fontSize:"14px !important"
        }
      }} rows={data} column={vendorColumns} />
      </Box>
    </Box>
  )
}
