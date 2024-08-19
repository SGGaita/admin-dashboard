import { Alert, Box, Button, Snackbar, TextField, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Header from "../../components/Header"
import { tokens } from '../../theme';
import * as Yup from 'yup'; // Import Yup for validation
import { Formik, Form } from 'formik';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const CreateVendor = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('');

    const [isFormReset, setIsFormReset] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    const initialValues = {
        vendor_name: '',
        vendor_email: '',
        vendor_phone: '',
        vendor_address: '',
    };

    const validationSchema = Yup.object().shape({
        vendor_name: Yup.string().required('Vendor Name is required'),
        vendor_email: Yup.string().email('Invalid email format').required('Email is required'),
        vendor_phone: Yup.string().required('Vendor phone is required'),
        vendor_address: Yup.string().required('Vendor address is required')
    });


    const onSubmit = async (values, { setSubmitting, resetForm }) => {

        console.log("Values", values)


        setSubmitting(true); // Reset form submission state

        try {
            const response = await axios.post('http://localhost:5000/api/vendors/create-vendor', values);
            setOpen(true);
            setMessage(response.data.message)
            setSeverity('success')
            // ... handle successful response
            resetForm();
            setIsFormReset(!isFormReset);
            setSubmitting(false); // Hide loading indicator after successful submission
        } catch (error) {
            setOpen(true);
            setMessage(error.response.data.message)
            setSeverity('error')
            setSubmitting(false);
        }
    }

    return (
        <>
            <Box display="flex" flexDirection="column" p="25px" maxWidth="100%">
                <Header title={title} subtitle={subtitle} />

                <Box display="flex"
                    width="100%"
                    borderRadius="5px"
                    p="20px"
                    flexDirection="column"
                    backgroundColor={colors.primary[400]}
                >
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ isSubmitting, handleBlur, handleChange, touched, errors, values }) => (
                            <Form>
                                <Box mb="35px">
                                    <TextField
                                        autoComplete="off"
                                        label="Vendor Name"
                                        name="vendor_name"
                                        value={values.vendor_name}
                                        variant="filled"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.vendor_name && errors.vendor_name}
                                        helperText={touched.vendor_name && errors.vendor_name}
                                    />
                                </Box>
                                <Box mb="35px">
                                    <TextField
                                        autoComplete="off"
                                        label="Vendor email"
                                        name="vendor_email"
                                        value={values.vendor_email}
                                        variant="filled"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.vendor_email && errors.vendor_email}
                                        helperText={touched.vendor_email && errors.vendor_email}
                                    />
                                </Box>
                                <Box mb="35px">
                                    <TextField
                                        autoComplete="off"
                                        label="Vendor Phone"
                                        value={values.vendor_phone}
                                        name="vendor_phone"
                                        type="text"
                                        variant="filled"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.vendor_phone && errors.vendor_phone}
                                        helperText={touched.vendor_phone && errors.vendor_phone} // Corrected typo
                                    />
                                </Box>
                                <Box mb="35px">
                                    <TextField
                                        autoComplete="off"
                                        label="Vendor Physical Address"
                                        name="vendor_address"
                                        value={values.vendor_address}
                                        type="text"
                                        variant="filled"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.vendor_address && errors.vendor_address}
                                        helperText={touched.vendor_address && errors.vendor_address}
                                    />
                                </Box>

                                <Button sx={{ height: "60px", fontSize: "14px" }} variant="contained" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Create Vendor'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>

            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={message}
            >
                <Alert icon={severity === 'error' ? <ErrorOutlineIcon fontSize="inherit" /> : <CheckIcon fontSize="inherit" />} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}
