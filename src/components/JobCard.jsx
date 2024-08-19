import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    useTheme,
    Typography,
} from "@mui/material";
import React, { useState } from 'react'
import { tokens } from '../theme';
import { Clientform, SpecificationsForm, SuccessComponent, SummaryForm } from "./_form_partials";
import { useFormik } from 'formik'
import { Formik, Form } from 'formik'
import { formValues, validationSchema } from "../utils";
import axios from 'axios';

//Step titles
const steps = [
    'Client Information',
    'Specification Details',
    'Summary & Confirmation',
    
];




export const JobCard = () => {
    const [activeStep, setActiveStep] = useState(0)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isClientEmpty, setIsEmpty] = useState(true)
    const [errorState, setErrorState] = useState(null);
    const [uploadedPhotos, setUploadedPhotos] = useState({});
    const [message, setMessage] = useState('')
    const [jobID, setJobID] = useState('')
    const [completed, setCompleted] = useState(false)



    const formik = useFormik({
        initialValues: formValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true); // Show loading indicator
            const formData = new FormData(); // Create a FormData object for multipart data
           
            //Create unique jobcard id
            //generate radom JC_ID

            const firstInitial = values.client.firstName.charAt(0).toUpperCase();
            const lastInitial = values.client.lastName.charAt(0).toUpperCase();
            const randomDigits = Math.floor(Math.random() * 100000000); // Generate a number between 0 and 99999999
            const jobCardId = `${firstInitial}${lastInitial}-${randomDigits.toString().padStart(8, "0")}`;

            formData.append('jobCardId', jobCardId)

            // Ensure formValues is available before using it
            // Add client and machine specification data (excluding photo)
            Object.entries(values.client).forEach(([key, value]) => formData.append(key, value));
            Object.entries(values.specification).forEach(([key, value]) => {
                if (key !== 'machinePhoto' && key !== 'hardwareParts') { // Don't include machinePhoto in FormData
                    formData.append(key, value);
                }
            });

            Object.entries(values.specification.hardwareParts).forEach(([part, details]) => {
                if (details.photo) {
                    formData.append(`${part}Serial`, details.serial);
                }
            });



            // Handle machine photo upload (if applicable)
            if (values.specification.machinePhoto) {
                formData.append('machinePhoto', values.specification.machinePhoto);
            }

            //    // Handle individual hardware part photo uploads (if applicable)
            Object.entries(values.specification.hardwareParts).forEach(([part, details]) => {
                if (details.photo) {
                    formData.append(`${part}Photo`, details.photo);
                }
            });

          


            console.log('Form data after appending client data:', [...formData.entries()]);

            try {
                const response = await fetch('http://localhost:5000/api/jobs/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                
                setMessage(data.message)
                setJobID(data.jobcardID)
                console.log('Response:', data); // Handle successful response (e.g., reset form, show success message)
                //setActiveStep(activeStep + 1);
                if (data.message == "Job Card information saved successfully"){
                    setSubmitting(false); // Hide loading indicator after successful submission
                    setCompleted(true)
                }

               
            } catch (error) {
                console.error('Error:', error); // Handle errors (e.g., display error message)
                setSubmitting(false); // Hide loading indicator after failed submission
            }

        },
    })


    const handleNext = () => {
        formik.errors = {}
        const currentStep = formik.values.step || 0; // Get current step from formik or default to 0
        const clientValues = formik.values.client;


        if (currentStep === 0) {
            // Step 1: Validate only client fields
            if (validateClientData(clientValues)) {
                return; // Prevent next if client data is empty
            }
        } else if (currentStep === 1) {
            // Step 2: Validate specification fields (assuming your form structure)
            if (!formik.isValid) { // Validate entire form for step 2
                return;
            }
        } else {
            // Handle potential future steps and their validation logic
        }

        setActiveStep(activeStep + 1);
    };



    const validateClientData = (clientData) => {
        setIsEmpty(true); // Reset emptiness flag on every validation

        for (const key in clientData) {
            if (clientData[key] !== "") {
                return; // Non-empty value found, validation successful (can move to step 2)
            }
            setIsEmpty(false); // Mark empty if any field is empty
        }

        // If loop completes, entire clientData is empty
        console.log("Client data is empty. Validation failed.");
        return true;
    };





    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }

    //handle photo uploads
    const handlePhotoUpload = (event, part) => {
        const file = event.target.files[0];
        console.log('File', file)
        console.log("Part", part)
        if (file) {
            console.log("Part inside", part)
            const previewUrl = URL.createObjectURL(file);
            if (part) {
                setUploadedPhotos({ ...uploadedPhotos, [part]: previewUrl }); // Update uploadedPhotos state
                formik.setValues(prevValues => ({ // Use `setValues` provided by Formik
                    ...prevValues,
                    specification: {
                        ...prevValues.specification,
                        hardwareParts: {
                            ...prevValues.specification.hardwareParts,
                            [part]: {
                                ...prevValues.specification.hardwareParts[part],
                                photo: file,
                            },
                        },
                    },
                }));
            } else {
                // Handle the case where part is undefined (e.g., upload for machine photo)
                setUploadedPhotos({ ...uploadedPhotos, machinePhoto: previewUrl });
                formik.setValues(prevValues => ({
                    ...prevValues,
                    specification: {
                        ...prevValues.specification,
                        machinePhoto: file, // Assign photo based on part
                    },
                }));
            }

        }
    }

    //console.log("uploaded", uploadedPhotos)
    // console.log("values", formik.values)












    return (
        <Box display="flex"
            width="100%"
            backgroundColor={colors.primary[400]}
            flexDirection="column"
            padding="20px"
        >


            <Stepper activeStep={activeStep}>
                {
                    steps.map((label) => (
                        <Step
                            sx={{
                                "& .MuiSvgIcon-root": {
                                    width: "1.1em",
                                    height: "1.1em"
                                },
                                "& .MuiSvgIcon-active": {
                                    backgroundColor: colors.blueAccent[200]
                                },
                                "& .MuiStepIcon-text": {
                                    fontSize: 16
                                }
                            }}
                            key={label}>
                            <StepLabel
                                sx={{

                                    "& .MuiStepLabel-label": {
                                        fontSize: 18
                                    },
                                    
                                     "& .Mui-completed" :{
                                        color: "#66bb6a !important"
                                     }  
                                    ,
                                }}
                            >{label}</StepLabel>
                        </Step>
                    ))
                }

            </Stepper>

            {completed ? (
                <>
                <SuccessComponent message={message} jobcardid={jobID}/>
                </>
            ) : (
                <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit}>
                    <Form>  {/* Wrap form content inside Form */}
                        <>
                            < >
                                {activeStep === 0 && <Clientform formik={formik} />}
                                {activeStep === 1 && <SpecificationsForm formik={formik} handlePhotoUpload={handlePhotoUpload} uploadedPhotos={uploadedPhotos} />}
                                {activeStep === 2 && <SummaryForm formik={formik} uploadedPhotos={uploadedPhotos} />} 
                                


                            </>

                            <Box display="flex"
                                width="100%"
                                //backgroundColor={colors.primary[500]}
                                flexDirection="row"
                                justifyContent="space-between"
                                padding="20px">
                                {activeStep > 0 && activeStep !== 3 &&
                                    <button
                                        style={{
                                            cursor: "pointer",
                                            float: "right",
                                            fontSize: "16px",
                                            color: "white",
                                            backgroundColor: colors.grey[400],
                                            height: "50px",
                                            width: "150px"
                                        }}
                                        onClick={handleBack}
                                    >Back</button>}
                                {activeStep < steps.length - 1 && activeStep !== 3 && (
                                    <Button
                                        style={{
                                            cursor: "pointer",
                                            float: "right",
                                            fontSize: "16px",
                                            color: "white",
                                            backgroundColor: colors.greenAccent[400],
                                            height: "50px",
                                            width: "150px"
                                        }}
                                        onClick={handleNext}
                                    >Next</Button>
                                )}

                                {activeStep === steps.length - 1 && ( // Only show submit button in the last step
                                    <Button
                                        type="submit"
                                        style={{
                                            cursor: "pointer",
                                            float: "right",
                                            fontSize: "16px",
                                            color: "white",
                                            backgroundColor: colors.greenAccent[500],
                                            height: "50px",
                                            width: "150px"
                                        }}
                                        disabled={formik.isSubmitting} // Disable button click on submit

                                    >
                                        Submit
                                    </Button>
                                )}
                            </Box>
                        </>
                    </Form>
                </Formik>
            )}



        </Box>
    )
}
