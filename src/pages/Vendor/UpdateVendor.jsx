import React from 'react'
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';

export const UpdateVendor = ({title, subtitle}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div>UpdateVendor</div>
  )
}
