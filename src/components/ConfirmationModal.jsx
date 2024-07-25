import { Dialog, DialogTitle } from '@mui/material'
import React from 'react'

export const ConfirmationModal = ({open,handleCLose, handleConfirm, title,message}) => {
  return (
    <Dialog open={open} style={{position:"absolute"}}>
        <DialogTitle 
        sx={{di}}
        >
            {title}
        </DialogTitle>
        </Dialog>
  )
}
