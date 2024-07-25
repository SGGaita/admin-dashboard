import React from 'react'
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" flexDirection="column" p="25px">
      <Box display="flex" flexDirection="row" mb="30px">
        <Box display="flex" flexDirection="row" width="300px" alignItems="center" style={{ backgroundColor: colors.primary[400], padding: '45px', borderRadius: '5px' }}>
          <Link to="/create-new" style={{ color: "white" }}>
            <Box>
              <AddCircleOutlineIcon transform="scale(2)" style={{ color: colors.primary[100] }} />
            </Box>
          </Link>

          <Box sx={{ marginLeft: "30px" }}>
            <Box sx={{ fontSize: "20px", color: colors.greenAccent[400] }}>
              Create New
            </Box>
            <Box>
              <Link to="/new-job" style={{ color: colors.primary[100] }}>
                Add new Job Card
              </Link>
            </Box>
          </Box>

        </Box>

      </Box>

       {/*Data table*/}
       <Box sx={{backgroundColor:colors.primary[400], p:"20px", borderRadius: '5px'}}>
test
       </Box>
    </Box>
  )
}
