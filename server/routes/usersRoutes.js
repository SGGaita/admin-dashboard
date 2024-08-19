const express = require('express');
const router = express.Router()
const userController = require('../controllers/userControllers')


//login
router.post('/login', userController.login)

//get all users
router.get('/get-all-users', userController.getAllUsers)

//get roles
router.get('/get-all-roles', userController.getRoles)

//user routes
//Create new user
router.post('/create-user', userController.createUser)

module.exports = router;