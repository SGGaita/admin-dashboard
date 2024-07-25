import React, { useState } from 'react'
import { Box, Button, TextField, Typography, useTheme, } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { tokens } from '../../theme';

export const SpecificationsForm = ({ formik, handlePhotoUpload,uploadedPhotos }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
   
 




    const hardwareParts = Object.keys(formik.initialValues.specification.hardwareParts); // Get hardware parts keys from initialValues


    
    return (
        <Box
            m="20px"
        >
            <Typography variant="h3" mb="30px" sx={{ fontWeight: '700' }} gutterBottom>
                Machine Specifications
            </Typography>
            {formik.values.specification && ( // Check if client object exists

                <>
                    <TextField
                        name="specification.machineMake"
                        label="Machine Make"
                        type="text"
                        variant="filled"
                        required
                        fullWidth
                        style={{ marginBottom: "35px" }}
                        {...formik.getFieldProps('specification.machineMake')}
                        error={formik.touched.specification?.machineMake && formik.errors.specification?.machineMake}
                        helperText={formik.touched.specification?.machineMake && formik.errors.specification?.machineMake}
                    />

                    <TextField
                        name="specification.machineModel"
                        label="Machine Model"
                        type="text"
                        variant="filled"
                        required
                        fullWidth
                        style={{ marginBottom: "35px" }}
                        {...formik.getFieldProps('specification.machineModel')}
                        error={formik.touched.specification?.machineModel && formik.errors.specification?.machineModel}
                        helperText={formik.touched.specification?.machineModel && formik.errors.specification?.machineModel}
                    />

                    <TextField
                        name="specification.machineSerial"
                        label="Machine Serial"
                        type="text"
                        variant="filled"
                        required
                        fullWidth
                        style={{ marginBottom: "35px" }}
                        {...formik.getFieldProps('specification.machineSerial')}
                        error={formik.touched.specification?.machineSerial && formik.errors.specification?.machineSerial}
                        helperText={formik.touched.specification?.machineSerial && formik.errors.specification?.machineSerial}
                    />

                    <Box
                        width="330px"
                    >
                        <Button
                            variant="contained"
                            color="success"
                            component="label"
                            sx={{ width: '100%', margin: "0 0", color: "white", fontSize: "16px" }}
                        >
                            Upload Machine Photo
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(event) => handlePhotoUpload(event)}
                            />

                        </Button>

                        {uploadedPhotos.machinePhoto && ( // Conditionally render preview if photo is selected
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: "30px" }}>
                                <img
                                    src={uploadedPhotos.machinePhoto} // Construct image URL from base64
                                    alt="Uploaded Machine Photo" style={{ width: 300, height: 200, objectFit: 'contain', padding: "10px", backgroundColor: colors.grey[100] }} />
                            </Box>
                        )}
                    </Box>

                    <Typography variant='h4' sx={{
                        fontWeight: '700',
                        margin: "50px 0 0"
                    }}>
                        Hardware Parts
                    </Typography>

                    {/* Accordions for hardware parts */}
                    {hardwareParts.map((part) => (


                        <Box mt="20px" key={part}>
                            <Accordion key={part} sx={{ backgroundColor: colors.primary[400] }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant='h5' fontWeight="700">
                                        {formik.initialValues.specification.hardwareParts[part].label} {/* Use label from formValues */}
                                    </Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <TextField
                                        name={`specification.hardwareParts.${part}.serial`} // Nested name for serial field
                                        fullWidth
                                        variant="filled"
                                        label={`${formik.initialValues.specification.hardwareParts[part].label} Serial`}
                                        {...formik.getFieldProps(`specification.hardwareParts.${part}.serial`)} // Get field props for nested path
                                        error={formik.touched.specification?.hardwareParts?.[part]?.serial && formik.errors.specification?.hardwareParts?.[part]?.serial}
                                        helperText={formik.touched.specification?.hardwareParts?.[part]?.serial && formik.errors.specification?.hardwareParts?.[part]?.serial}
                                    />

                                    <Button
                                        variant="contained"
                                        color="success"
                                        component="label"
                                        sx={{ width: '100%', margin: "10px 0", color: "white", fontSize: "16px" }}
                                    >
                                        Upload {formik.initialValues.specification.hardwareParts[part].label} Photo

                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"

                                            onChange={(event) => handlePhotoUpload(event, formik.values.specification.hardwareParts[part]._name)}
                                        />
                                    </Button>

                                    {uploadedPhotos[part] && (
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: '10px' }}>
                                            <img
                                                src={uploadedPhotos[part]} // Construct image URL from base64
                                                alt={`${part.label} Photo`}
                                                style={{ width: 300, height: 200, objectFit: 'contain', padding: '10px', backgroundColor: colors.grey[100] }}
                                            />
                                        </Box>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    ))}

                    <Typography variant='h4' sx={{
                        fontWeight: '700',
                        margin: "50px 0 0"
                    }}>
                        Condition/Fault</Typography>

                    <Box mt="20px">
                        <TextField
                            id="outlined-multiline-static"
                            label="Enter the Machine condition"
                            multiline
                            fullWidth
                            variant="filled"
                            rows={8}
                            name="specification.machineCondition"
                            {...formik.getFieldProps('specification.machineCondition')}
                            error={formik.touched.specification?.machineCondition && formik.errors.specification?.machineCondition}
                            helperText={formik.touched.specification?.machineCondition && formik.errors.specification?.machineCondition}


                        />
                    </Box>



                </>
            )}

        </Box>
    )
}
