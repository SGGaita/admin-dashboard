export const formValues = {
  client: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  },
  specification: {
    machineMake: '',
    machineModel: '',
    machineSerial: '',
    machinePhoto: null, // Store photo as a File object
    hardwareParts: {
      hdd: {
        _name:"hdd",
        label: 'HDD/SSD',
        serial: '',
        photo: null,
      },
      ram: {
        _name:"ram",
        label: 'RAM',
        serial: '',
        photo: null,
      },
      rom: {
        _name:"rom",
        label: 'ROM',
        serial: '',
        photo: null,
      },
      pin: {
        _name:"pin",
        label: '3-Pin',
        serial: '',
        photo: null,
      },
      adapter: {
        _name:"adapter",
        label: 'Adapter',
        serial: '',
        photo: null,
      },
      battery: {
        _name:"battery",
        label: 'Battery',
        serial: '',
        photo: null,
      },
      // You can add more hardware parts here following the same structure
    },
    machineCondition: ''
  },

}