import * as yup from 'yup';

export const validationSchema = yup.object({
  client: yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: yup.string().matches(/^\d+$/, 'Phone number must be numeric').required('Phone number is required.'), // Adjust phone number validation as needed
  }),
  specification: yup.object({
    machineMake: yup.string().required('Machine Make is required'),
    machineModel: yup.string().required('Machine Model is required'),
    machineSerial: yup.string().required('Machine Serial is required'),
    machinePhoto: yup.mixed().nullable(true), // Allow null for machinePhoto
    hardwareParts: yup.object().shape({  // Nested schema for hardware parts
      hdd: yup.object({
        serial: yup.string().required('HDD/SSD Serial is required'),
        photo:  yup.mixed().nullable(true), // Allow null for machinePhoto
      }),   // Use label for display
      ram: yup.object({
        serial: yup.string().required('RAM Serial is required'),
        photo:  yup.mixed().nullable(true),
      }).label('RAM'),
      rom: yup.object({
        serial: yup.string().required('ROM Serial is required'),
        photo:  yup.mixed().nullable(true),
      }).label('ROM'),
      pin: yup.object({
        serial: yup.string().required('3-Pin Serial is required'),
        photo:  yup.mixed().nullable(true),
      }).label('3-Pin'),
      adapter: yup.object({
        serial: yup.string().required('Adapter Serial is required'),
        photo:  yup.mixed().nullable(true),
      }).label('Adapter'),
      battery: yup.object({
        serial: yup.string().required('Battery Serial is required'),
        photo:  yup.mixed().nullable(true),
      }).label('Battery'),
      // You can add more hardware parts here with similar structure and labels
    }),
    machineCondition: yup.string().required('Machine Condition is required'),
  }),
});
