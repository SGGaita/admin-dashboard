import { Tooltip } from "@mui/material";


export const jobcardColumns = [
    { field: "job_card_id", headerName: "Job Card Number", flex: 1 },
    {
      field: "fullname",
      headerName: "Client Name",
      flex: 1,
      valueGetter:(params)=>{
        return `${params.row.client_first_name || ''} ${params.row.client_last_name}`
      }
      
    },
    { field: "client_email", headerName: "Email", flex: 1 },
    {
      field: "client_phone_number",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "machine_make",
      headerName: "Machine Make",
      flex: 1,
    },
    {
      field: "machine_model",
      headerName: "Machine Model",
      flex: 1,
    },
    {
      field: "machine_serial",
      headerName: "Machine Serial",
      flex: 1,
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
    },
    
  ];

  