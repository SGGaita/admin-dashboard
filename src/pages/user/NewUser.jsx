import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, useTheme, MenuItem, Field, Select, InputLabel, FormControl, RadioGroup, FormControlLabel, Radio, Snackbar, Alert } from '@mui/material';
import { tokens } from '../../theme';
import * as Yup from 'yup'; // Import Yup for validation
import { Formik, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { getRoles } from '../../data/apiData';
import { ColorLensRounded } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';



export const NewUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [roles, setRoles] = useState([])
    const [open, setOpen] = React.useState(true);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('');

    const [isFormReset, setIsFormReset] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        role: Yup.string().required('Role is required'),
    });



    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        // Handle form submission logic here, e.g., send data to server
        console.log('Submitted values:', values);
        setSubmitting(true); // Reset form submission state

        try {
            const response = await axios.post('http://localhost:5000/api/create-user', values);

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
            console.log("Error", error)
        }
    };


    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/get-all-roles');
                if (response.data) {
                    setRoles(response.data);
                    console.log("How are",response.data)
                } else {
                    console.error('Failed to fetch roles data');
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);





    return (
        <>
            <Box display="flex" flexDirection="column" p="25px" maxWidth="100%">

                <Typography variant="h3" mb="10px" color={colors.greenAccent[400]}>
                    New User
                </Typography>
                <Typography variant="h4" mb="30px" color={colors.primary[100]}>
                    Create a new user account
                </Typography>

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
                                        label="First Name"
                                        name="firstName"
                                        value={values.firstName}
                                        variant="filled"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.firstName && errors.firstName}
                                        helperText={touched.firstName && errors.firstName}
                                    />
                                </Box>
                                <Box mb="35px">
                                    <TextField
                                        autoComplete="off"
                                        label="Last Name"
                                        name="lastName"
                                        value={values.lastName}
                                        variant="filled"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.lastName && errors.lastName}
                                        helperText={touched.lastName && errors.lastName}
                                    />
                                </Box>
                                <Box mb="35px">
                                    <TextField
                                        autoComplete="off"
                                        label="Email"
                                        value={values.email}
                                        name="email"
                                        type="email"
                                        variant="filled"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.email && errors.email}
                                        helperText={touched.email && errors.error} // Corrected typo
                                    />
                                </Box>
                                <Box mb="35px">
                                    <TextField
                                        autoComplete="off"
                                        label="Password"
                                        name="password"
                                        value={values.password}
                                        type="password"
                                        variant="filled"
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.password && errors.password}
                                        helperText={touched.password && errors.password}
                                    />
                                </Box>


                                <Box mb="35px">
                                    <FormControl>
                                        <Typography variant="body1" mb="10px">
                                            User Role
                                        </Typography>
                                        <RadioGroup
                                            row
                                            name="role" // Set name for form submission
                                            value={values.role}
                                          
                                            onChange={(event) => {
                                                handleChange(event); // Update form state using Formik's handleChange
                                            }}
                                        >
                                            {roles.map((option) => (
                                                <FormControlLabel

                                                    key={option.id}
                                                    control={<Radio />}
                                                    label={option.role}
                                                    value={option.id}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </Box>

                                <Button sx={{ height: "60px", fontSize: "14px" }} variant="contained" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Create Account'}
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

    );
};
