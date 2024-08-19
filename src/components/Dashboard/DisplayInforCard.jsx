import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const DisplayInforCard = ({ title, subtext, total, linkText, linkTo, icon }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box
            display="flex"
            flexDirection="row"
            mr="10px"
            mb="30px"
            borderRadius='5px'
            justifyContent="flex-start"
            style={{ backgroundColor: colors.primary[400] }}
            flex="1"
        >
            <Box display="flex" flexDirection="column"  padding="20px">
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Box>{icon}</Box>
                    <Typography variant="h5" sx={{ fontWeight: "700" }}>{title}</Typography>
                </Box>

                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    m="10px 0"
                >
                    <Typography variant='h1' sx={{ fontSize: "50px", color: colors.greenAccent[500], marginRight: "10px" }}>
                        {total}
                    </Typography>
                    <Typography variant="h4" alignSelf="">  laptops</Typography>
                </Box>

                <Box>
                    <Link to={linkTo} style={{ color: colors.grey[500], display: "flex", flexDirection: "row", color: colors.primary[100], textDecoration: "none" }}>
                        {linkText}
                        <Box> <KeyboardArrowRightIcon /></Box>

                    </Link>
                </Box>

            </Box>

        </Box>
    )
}
