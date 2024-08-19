import React from 'react';
import { Box, Typography, List, ListItem, Divider, useTheme } from '@mui/material';
import { tokens } from '../../theme';




export const SummaryForm = ({ formik,uploadedPhotos }) => {
  const { values } = formik;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 

  const renderHardwarePart = (hardwarePart) => (
       <ListItem key={hardwarePart._name} sx={{ flex: "0 0 33.3333%", marginBottom: '30px' }}>
      <Box>
        <Box>
          <Typography variant="h5"><strong>{hardwarePart.label} Serial Number: </strong>  {hardwarePart.serial}</Typography>
           <Box>
             {uploadedPhotos[hardwarePart._name] && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: "20px" }}>
                 <img
                  src={uploadedPhotos[hardwarePart._name]}
                  alt="Uploaded Hardware Photo"
                   style={{ width: 300, height: 200, objectFit: 'contain', padding: "10px", backgroundColor: colors.grey[100] }}
              />
              </Box>
             )}
           </Box>
         </Box>
       </Box>
     </ListItem>
  );





  return (
    <Box m="20px">
      <Typography variant="h3" sx={{ fontWeight: '700' }}>
        Summary and Confirmation
      </Typography>

      <Box
        style={{
          backgroundColor: colors.primary[400],
          margin: "30px 0",
          padding: "20px 20px"
        }}
      >
        <Typography variant="h4"
          sx={{
            color: colors.greenAccent[600],
            fontWeight: '700',
            marginBottom: "20px"
          }}
        >
          1. Client Information
        </Typography>

        <Box>
          <List>
            <ListItem>
              <strong>Full Name:</strong><span style={{ marginLeft: "10px" }}> {values.client.firstName} {values.client.lastName}</span>
            </ListItem>

            <ListItem>
              <strong>Email:</strong><span style={{ marginLeft: "10px" }}> {values.client.email} </span>
            </ListItem>

            <ListItem>
              <strong>Phone Number:</strong><span style={{ marginLeft: "10px" }}> {values.client.phoneNumber} </span>
            </ListItem>
          </List>
        </Box>
      </Box>

      <Box
        style={{
          backgroundColor: colors.primary[400],
          margin: "30px 0",
          padding: "20px 20px"
        }}
      >
        <Typography variant="h4"
          sx={{
            color: colors.greenAccent[600],
            fontWeight: '700',
            marginBottom: "20px"
          }}
        >
          2. Machine Specifications
        </Typography>

        <Box>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "top" }}>


            <List>
              <ListItem>
                <strong>Make:</strong><span style={{ marginLeft: "10px" }}> {values.specification.machineMake} </span>
              </ListItem>

              <ListItem>
                <strong>Model:</strong><span style={{ marginLeft: "10px" }}> {values.specification.machineModel} </span>
              </ListItem>

              <ListItem>
                <strong>Serial:</strong><span style={{ marginLeft: "10px" }}> {values.specification.machineSerial} </span>
              </ListItem>


            </List>

            <Box>

              {uploadedPhotos.machinePhoto && ( // Conditionally render preview if photo is selected
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginLeft: "20px", marginTop: "20px" }}>
                  <img
                    src={uploadedPhotos.machinePhoto} // Construct image URL from base64
                    alt="Uploaded Machine Photo" style={{ width: 300, height: 200, objectFit: 'contain', padding: "10px", backgroundColor: colors.grey[100] }} />
                </Box>
              )}

            </Box>



          </Box>
        </Box>
        <Divider variant="middle" sx={{ margin: "30px 0 20px 0" }} />

        <Box>
          <Typography variant='h4'
            sx={{
              color: colors.greenAccent[600],
              fontWeight: '700',
              marginBottom: "20px"
            }}
          >
            Hardware Details
          </Typography>
        </Box>

        <Box>
          {/* Hardware parts*/}

          <List sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {Object.values(values.specification.hardwareParts || {}).map(renderHardwarePart)}
          </List>
        </Box>
      </Box>


    </Box>
  );
};
