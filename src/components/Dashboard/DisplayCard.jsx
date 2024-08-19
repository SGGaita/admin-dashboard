import { useTheme } from '@emotion/react';
import React from 'react'
import { tokens } from '../../theme';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const DisplayCard = ({ title, linkText, linkTo, icon }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box display="flex"
            flexDirection="row"
            mr="10px"
            mb="30px"
            borderRadius='5px'
            justifyContent="flex-start"
            style={{ backgroundColor: colors.primary[400] }}
            flex="1">
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                style={{ backgroundColor: colors.primary[400], padding: '45px', borderRadius: '5px' }}>
                <Link to={linkTo} style={{ color: "white" }}>
                    <Box>{icon}</Box>
                </Link>
                <Box sx={{ marginLeft: "30px" }}>
                    <Box sx={{ fontSize: "20px", color: colors.greenAccent[400] }}>
                        {title}
                    </Box>
                    <Box>
                        <Link to={linkTo} style={{ color: colors.primary[100] }}>
                            {linkText}
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
