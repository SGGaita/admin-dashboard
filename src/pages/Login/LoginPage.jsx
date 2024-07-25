import React, {useState} from 'react'
import { useFormik, Formik, Form } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { images } from '../../constants'
import { Alert, Box, Button, IconButton, Snackbar, TextField, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';




export const LoginPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = React.useState(true);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('');

   

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });



    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        // Handle form submission logic here, e.g., send data to server
        console.log('Submitted values:', values);

        try {
            const response = await axios.post('http://localhost:5000/api/login', values)
            setOpen(true);
            console.log("Response", response)
            setMessage(response.data.message)
            setSeverity('success')
            // ... handle successful response
            resetForm();
        } catch (error) {
            setOpen(true);
            setMessage(error.response.data.message)
            setSeverity('error')
        }
    }


    return (
        <Box display="flex" position="relative" height="100vh" backgroundColor={colors.primary[400]}>
           <Snackbar
                open={open}
                autoHideDuration={7000}
                onClose={handleClose}
                message={message}
            >
                <Alert icon={severity === 'error' ? <ErrorOutlineIcon fontSize="20px" /> : <CheckIcon fontSize="inherit" />} severity={severity}>
                <Typography variant='h5'>{message}</Typography>
                </Alert>
            </Snackbar>
            <Box display="flex" flexDirection="row" justifyContent="center" width="100%" alignItems="center">
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    width="30%"
                >
                    <img src={images.logo} style={{ width: "40%", marginBottom: "20px" }} />
                    <Typography variant='h3'>Login</Typography>
                    <Typography variant='h5' mt="10px" mb="25px">Enter your credentials to login!</Typography>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ isSubmitting, handleBlur, handleChange, touched, errors, values }) => (

                            <Form>
                               <TextField
                                    autoComplete="off"
                                    label="Enter your email"
                                    value={values.email}
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.email && errors.email}
                                    helperText={touched.email && errors.email} // Corrected typo
                                    style={{ marginBottom: "35px", backgroundColor: colors.primary[500] }}

                                />

                                <TextField
                                    name="password"
                                    value={values.password}
                                    label="Enter your password"
                                    type="password"
                                    variant="outlined"

                                    required
                                    fullWidth
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.password && errors.password}
                                    helperText={touched.password && errors.password} // Corrected typo
                                    style={{ marginBottom: "35px", backgroundColor: colors.primary[500] }}

                                />

                                <Button sx={{ width: "100%", height: "60px", fontSize: "14px" }} color='success' variant="contained" type="submit" disabled={isSubmitting}>Login</Button>

                            </Form>
                        )}
                    </Formik>


                </Box>
            </Box>
        </Box>
    )
}
