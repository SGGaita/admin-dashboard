import React, {useContext} from 'react'
import { JobCard} from '../../components';
import { Box, IconButton, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from '../../theme'


export const CreateJob = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)


  return (
    <Box  display="flex"
    p="25px"
    >
        <JobCard/>
    </Box>
  )
}
