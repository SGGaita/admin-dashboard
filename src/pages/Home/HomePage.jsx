import React, {useContext} from 'react'
import { JobCardForm } from '../../components';
import './home.scss'
import { Box, IconButton, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from '../../theme'


export const HomePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)


  return (
    <Box  display="flex"
    backgroundColor={colors.primary[700]}>
        <JobCardForm/>
    </Box>
  )
}
