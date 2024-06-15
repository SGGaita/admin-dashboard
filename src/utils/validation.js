
import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().required('Please enter your full name'),
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  phoneNumber: Yup.string().required('Please enter your phone number'),

  // Add validation rules for other fields here
  make: Yup.string().required('Please enter the equipment make.'),
  model: Yup.string().required('Please enter the equipment model.'),
  serial: Yup.string().required('Please enter the equipment serial number.'),

  hddSerial: Yup.string().required('Please enter the HDD/SSD serial number.'),
  ramSerial: Yup.string().required('Please enter the RAM serial number.'),
  romSerial: Yup.string().required('Please enter the ROM serial number.'),
  pinSerial: Yup.string().required('Please enter the 3-Pin serial number.'),
  batterySerial: Yup.string().required('Please enter the Battery serial number.'),
  condition: Yup.string().required('Please enter the condition of the machine.'),
})