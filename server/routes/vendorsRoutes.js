const express = require('express');
const router = express.Router()
const vendorController = require('../controllers/vendorsController')

router.get('/get-all-vendors', vendorController.getAllVendors)

router.post('/create-vendor', vendorController.createVendor)


module.exports = router;