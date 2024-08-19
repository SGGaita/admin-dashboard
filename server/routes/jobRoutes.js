const express = require('express');
const router = express.Router()
const fs = require('fs');

//const upload = require('../controllers/multerCionfig')

const jobcard = require('../controllers/jobCardController')


const multer = require('multer');
const path = require('path')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const jobCardId = req.body?.jobCardId;
      const uploadPath = path.join(__dirname, '..', 'uploads', jobCardId);
        // Create the folder if it doesn't exist
        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath)
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newFilename = file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage }); // Create Multer instance with storage configuration


router.post('/upload', upload.fields([
    { name: 'machinePhoto' },
    { name: 'hddPhoto' },
    { name: 'ramPhoto' },
    { name: 'romPhoto' },
    { name: 'pinPhoto' },
    { name: 'adapterPhoto' },
    { name: 'batteryPhoto' }
]), jobcard.createClient, jobcard.createJobCard )
//Route to create a new job card
//router.post('/api/create-client', jobcard.createClient, jobcard.createJobCard)
//Add additional routes for functionalities like update, fetch etc

//fetch all 
router.get('/get-all-jobs', jobcard.getAllJobcards)


//fetch outsourced
//router.get('/get-outsourced-job', jobcard.getOutSourcedJobcards)

module.exports = router;