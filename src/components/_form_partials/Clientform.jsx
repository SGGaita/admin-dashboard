import React from 'react'
import { Box, TextField, Typography } from "@mui/material"




export const Clientform = ({ formik }) => {
    

    return (
        <Box
            m="20px"
        >

            <Typography variant="h3" mb="30px" sx={{ fontWeight: '700' }} gutterBottom>
                Client Details
            </Typography>
            
            {formik.values?.client && ( // Check if client object exists

                <>
                    <TextField
                        name="client.firstName"
                        label="First Name"
                        type="text"
                        variant="filled"
                        required
                        fullWidth
                        style={{ marginBottom: "35px" }}
                        {...formik.getFieldProps('client.firstName')}
                        error={formik.touched.client?.firstName && formik.errors.client?.firstName}
                        helperText={formik.touched.client?.firstName && formik.errors.client?.firstName}
                    />

                    <TextField
                        name="client.lastName"
                        label="Last Name"
                        type="text"
                        variant="filled"
                        required
                        fullWidth
                        style={{ marginBottom: "35px" }}
                        {...formik.getFieldProps('client.lastName')}
                        error={formik.touched.client?.lastName && formik.errors.client?.lastName}
                        helperText={formik.touched.client?.lastName && formik.errors.client?.lastName}
                    />

                    <TextField
                        name="client.email"
                        label="Email"
                        type="text"
                        variant="filled"
                        required
                        fullWidth
                        style={{ marginBottom: "35px" }}
                        {...formik.getFieldProps('client.email')}
                        error={formik.touched.client?.email && formik.errors.client?.email}
                        helperText={formik.touched.client?.email && formik.errors.client?.email}
                    />

                    <TextField
                        name="client.phoneNumber"
                        label="Phone Number"
                        type="tel"
                        variant="filled"
                        required
                        fullWidth
                        style={{ marginBottom: "35px" }}
                        {...formik.getFieldProps('client.phoneNumber')}
                        error={formik.touched.client?.phoneNumber && formik.errors.client?.phoneNumber}
                        helperText={formik.touched.client?.phoneNumber && formik.errors.client?.phoneNumber}
                    />
                </>
            )}





        </Box>
    )
}
