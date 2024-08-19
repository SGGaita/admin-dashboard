import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../theme';

export const NotFoundPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <Box width='100%' height="100%" display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
         <Typography fontSize="200px" fontWeight='800' color={colors.blueAccent[800]}>
        404
        </Typography>
        <Typography variant="h3">
        Resource not Found
        </Typography>
        </Box>
  )
}
