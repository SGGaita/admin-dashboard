const express = require('express');
const router = express.Router()
//const upload = require('../controllers/multerCionfig')

const jobcard = require('../controllers/jobCardController')
const userController = require('../controllers/userControllers')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads/', // Specify a directory for storing uploaded files
    filename: (req, file, cb) => {
        cb(null, `<span class="math-inline">\{file\.fieldname\}\-</span>{Date.now()}.${file.originalname.split('.').pop()}`); // Generate unique filenames
    }
});

const upload = multer({ storage: storage }); // Create Multer instance with storage configuration


//login
router.post('/api/login', userController.login)

//get roles
router.get('/api/get-all-roles', userController.getRoles)

//user routes
//Create new user
router.post('/api/create-user', userController.createUser)


router.post('/api/upload', (req,res,next)=>{
    console.log("Request infor", req)
})
//Route to create a new job card
router.post('/api/create-client', jobcard.createClient,jobcard.createJobCard )
//Add additional routes for functionalities like update, fetch etc
module.exports = router;