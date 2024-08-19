import { Alert, Box, Button, IconButton, InputAdornment, Menu, MenuItem, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../components/Header'
import { DataTableComponent } from '../../components/DataTableComponent'
import axios from 'axios'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tokens } from '../../theme'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';





export const JCOutsourcedDataTable = ({ title, subtitle }) => {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchText, setSearchText] = useState('');




  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Define a function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const day = date.getDate();

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day.toString().padStart(2, '0')} ${month}, ${year}`;
  }

  const jobcardColumns = [
    { field: "job_card_id", headerName: "Job Card Number", flex: 1 },
    {
      field: "vendor_name",
      headerName: "Vendor Name",
      flex: 1,
    },
    {
      field: "client_name",
      headerName: "Client Name",
      flex: 1,
      valueGetter: (params, values) => {
        return `${values?.client_first_name || ''} ${values?.client_last_name}`
      }

    },
    {
      field: "machine_make",
      headerName: "Machine Make",
      flex: 1,
      valueGetter: (params, values) => {
        return `${values?.machine_make || ''} ${values?.machine_model}`
      }
    },
    
    {
      field: "machine_serial",
      headerName: "Machine Serial",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Outsourced on",
      flex: 1,
      valueGetter: (params) => {
        const formattedDate = formatDate(params);
        return formattedDate;
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
                onClick={() => { handleClose(); handleUpdate(jobCardId) }}>Update Status</MenuItem>
              <MenuItem
                sx={{ backgroundColor: colors.primary[400] }}
                onClick={() => { handleClose(); handleClickOpenDialog(jobCardId) }}>Delete</MenuItem>
            </Menu>
          </div>
        );
      },
    }



  ];


  const handleView = () => {

  }

  const handleUpdate = () => {

  }

  const handleDelete = () => {

  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs//get-outsourced-job');
        setData(response .data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, [])




  const filterData = useMemo(() => {
    return data.filter((item) => {
      const searchTermLower = searchText.toLowerCase();
      return (
        item.job_card_id.toLowerCase().includes(searchTermLower) ||
        `${item.client_first_name || ''} ${item.client_last_name}`.toLowerCase().includes(searchTermLower)
      );
    });
  }, [data, searchText]);

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
          label="Search by Job Card ID or Client Name"
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
        <DataTableComponent rows={filterData} column={jobcardColumns} />

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: colors.grey[100],
              padding: "0  0 20px 0",
              borderRadius: "10px"
            }

          }}
        >

          <DialogTitle id="alert-dialog-title"
            sx={{
              backgroundColor: colors.blueAccent[800]
            }}
          >
            <Typography variant='h4' sx={{ fontWeight: 600 }}>
              {"Delete the item?"}
            </Typography>

          </DialogTitle>
          <DialogContent

          >
            <DialogContentText id="alert-dialog-description"
              sx={{
                padding: "30px 0",
                color: colors.primary[700],
                fontSize: "18px"
              }}
            >
              Are you sure you want to delete this item? This action is permanent and cannot be reversed.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button sx={{ fontSize: "16px", marginRight: "10px" }} onClick={handleCloseDialog}>Dismiss</Button>
            <Button color="error" sx={{ fontSize: "16px", fontWeight: 600 }} onClick={handleCloseDialog} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}
