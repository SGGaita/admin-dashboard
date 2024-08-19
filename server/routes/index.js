const express = require('express')
const router = express.Router()

//import route files
const jobRouter = require('./jobRoutes')
const vendorRouter = require('./vendorsRoutes')
const userRouter = require('./usersRoutes')


//Mount the routes files
router.use('/jobs',jobRouter)
router.use('/vendors', vendorRouter)
router.use('/users', userRouter)


module.exports = router