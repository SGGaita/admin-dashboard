import { Box } from '@mui/material'
import React from 'react'
import { DataTableComponent } from '../../components/DataTableComponent'
import Header from '../../components/Header'

export const Datatable = ({title, subtitle, data}) => {
  return (
    <Box
    pt="30px" pl="30px"
    boxSizing="border-box"
    >
        <Header title={title} subtitle={subtitle} />
        <DataTableComponent data={data}  />
    </Box>
  )
}
