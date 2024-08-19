import React, { useState, useEffect } from 'react'
import { Box, Button, Chip, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search"
import { DisplayCard, DisplayInforCard } from '../../components';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { DataTableComponent } from '../../components/DataTableComponent';
import axios from 'axios';
import Header from '../../components/Header';

export const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [newData, setData] = useState([])
  const [outsourcedData, setOutsourcedData] = useState([])
  const [openCount, setOpenCount] = useState()
  const [outsourcedCount, setOutsourcedCount] = useState(0)



  //new data columns
  const newDataColumns = [
    { field: "job_card_id", headerName: "Job Card Number", flex: 1 },
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
    },


    {
      field: "created_at",
      headerName: "Booked on",
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
        return (
          <Button style={{ backgroundColor: colors.greenAccent[400] }}>Accept</Button>
        )

      },
    }
  ];


  //new data columns
  const outsourcedDataColumns = [
    { field: "job_card_id", headerName: "Job Card Number", flex: 1 },
    {
      field: "machine_make",
      headerName: "Machine Make",
      flex: 1,
      valueGetter: (params, values) => {
        return `${values?.machine_make || ''} ${values?.machine_model}`
      }

    },
    {
      field: "vendor_name",
      headerName: "Vendor name",
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


      },
    }

  ];




  //fetch open booked jobs that have not been worked on
  useEffect(() => {
    const fetchNewData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs/get-all-jobs');

        const desiredIds = [1]; // Specify the desired IDs
        const desiredIds_count = [1,2,3]
        const filteredData = response.data.filter((item) => desiredIds.includes(item.status_id))
        const countData = response.data.filter((item) => desiredIds_count.includes(item.status_id));;
        setOpenCount(countData.length)
        setData(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNewData();

  }, [])


  //fetch outsourced jobs
  useEffect(() => {
    const fetchOutsourcedData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs//get-outsourced-job');
        setOutsourcedData(response.data);
       setOutsourcedCount(response.data.length)
      } catch (error) {
        console.log(error)
      }
    };
    fetchOutsourcedData();
  }, [])



  //format date
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







  return (
    <Box display="flex" flexDirection="column" p="25px" boxSizing="border-box">
      <Box display="flex" flexDirection="row" justifyContent="center">

        <DisplayInforCard
          title="Open Repairs"
          total={openCount}
          icon={<EventRepeatIcon transform="scale(1)" style={{ marginRight: "10px", color: colors.greenAccent[500] }} />}
          linkTo="/open-jobs"
          linkText="View all open job cards"
        />

        <DisplayInforCard
          title="Outsourced Repairs"
          total={outsourcedCount}
          icon={<EventRepeatIcon transform="scale(1)" style={{ marginRight: "10px", color: colors.greenAccent[500] }} />}
          linkTo="/open-jobs"
          linkText="View all outsourced job cards"
        />

        <DisplayCard
          title="Create New"
          linkText=" Add new Job Card"
          linkTo="/new-job"
          icon={<AddCircleOutlineIcon transform="scale(2)" style={{ color: colors.primary[100] }} />}
        />

        <DisplayCard
          title="Quick Search"
          linkText="Search by Job card ID"
          linkTo="/new-job"
          icon={<SearchIcon transform="scale(2)" style={{ color: colors.primary[100] }} />}
        />

      </Box>


      <Box display="flex" boxSizing="border-box">
        {/* Data tables */}
        {newData.length > 0 && (
          <Box
            sx={{ width: "50%", p: "20px", mr: "10px", flex: 1, backgroundColor: colors.primary[400] }}
          >
            <Header subtitle="Recently booked" />
            <DataTableComponent rows={newData} column={newDataColumns} />
          </Box>
        )}
        {outsourcedData.length > 0 && (
          <Box
            sx={{ width: outsourcedData.length > 0 && newData.length === 0 ? "100%" : "50%", p: "20px", mr: "10px", flex: 1, backgroundColor: colors.primary[400] }}
          >
            <Header subtitle="Outsourced Job Cards " />
            <DataTableComponent rows={outsourcedData} column={outsourcedDataColumns} />
          </Box>
        )}
      </Box>


    </Box>
  )
}
