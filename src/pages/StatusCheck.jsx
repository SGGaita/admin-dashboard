import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { tokens } from '../theme'
import images from '../constants/images'

export const StatusCheck = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    const [jobId, setJobId] = useState(''); // State to store entered ID
    const [isTouched, setIsTouched] = useState(false); // State to track if field is touched

    const handleJobIdChange = (event) => {
        // Convert input to uppercase and store in state
        setJobId(event.target.value.toUpperCase());
        setIsTouched(true); // Set touched when input changes
    }

    const validateJobId = (id) => {
        const regex = /^[A-Z]{2}-[0-9]{6}$/; // Regex for AA-000000 format
        return regex.test(id);
    }

    const handleSubmit = () => {
        if (validateJobId(jobId)) {
          // Handle valid ID submission (e.g., display success message)
          console.log('Valid Job Card ID:', jobId);
        } else {
          // Handle invalid ID submission (e.g., display error message)
          console.error('Invalid Job Card ID format. Please use AA-000000 format.');
        }
      }

    return (
        <Box display="flex" position="relative" height="100vh" backgroundColor={colors.primary[400]}>
            <Box display="flex" flexDirection="row" justifyContent="center" width="100%" alignItems="center">
                <Box
                    display="flex"

                    alignItems="center"
                    flexDirection="column"
                    width="30%"
                >
                    <img src={images.logo} style={{ width: "40%", marginBottom: "20px" }} />
                    <Typography variant='h3'>Get a Quick Repair Update</Typography>
                    <Typography variant='h5' mt="10px" mb="25px">Use your Job Card ID to check the status of your machine.</Typography>
                    <TextField
                        name="name"
                        label="Enter the job card ID"
                        type="text"
                        variant="outlined"
                        required
                        fullWidth
                        value={jobId} // Bind state to input value
                        onChange={handleJobIdChange} // Handle input change
                        style={{ marginBottom: "35px", backgroundColor: colors.primary[500] }}
                        helperText={isTouched && !validateJobId(jobId) && 'Invalid format. Please use the format AA-000000.'} // Display error message only if touched and invalid
                        error={isTouched && !validateJobId(jobId)} // Set error prop for styling only if touched and invalid (optional)
                    />

                    <Button variant="contained" color='success' style={{ width: "100%", height: "50px", fontSize: "16px" }} onClick={handleSubmit}>Search</Button>
                </Box>
            </Box>
            <Box position="absolute" width="100%" display="flex" justifyContent="center" alignItems="center" bottom="0" backgroundColor={colors.primary[500]}>
                <p >Powered By <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Brainy Internet group</Link></p>
            </Box>
        </Box>
    )
}
