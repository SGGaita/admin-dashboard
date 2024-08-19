import { Box, Button, Typography, useTheme } from '@mui/material'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { tokens } from '../../theme';
import images from '../../constants/images';
import { Link } from 'react-router-dom';

export const SuccessComponent = ({jobcardid, message}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleNavigate =()=>{

  }

  return (
    <Box display="flex" m="20px">
      <Box display="flex" width="100%" justifyContent="space-between"  flexDirection="column" alignItems="center" >


       <img src={images.tick} width={150} />

        <Typography variant="h3" mb="20px" sx={{ fontWeight: '700', }}>
         {message}
        </Typography>
        <Box>

        </Box>
        <Typography variant="h4" mb="50px" sx={{ fontWeight: '500', }}>
        <Link to="/" style={{color:colors.greenAccent[400]}}>{jobcardid}</Link>
        </Typography>

        <Button onClick={handleNavigate} style={{color:"white", backgroundColor:colors.greenAccent[500], padding:"5px 30px",fontSize:"15px"}}>Home</Button>
      </Box>


    </Box>
  )
}
