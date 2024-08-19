// Main application entry point
const express = require('express')
const cors = require('cors');
const pool = require('./config/database')


const app = express()
const port = process.env.PORT || 5000; //use environment variables or default


//app configurations
app.use(express.json());



 const corsOptions = {
    origin: ['http://localhost:3000']  // Allowed origins
  };

//Enable CORS with default options (allw all origins)
app.use(cors(corsOptions));

 
// routes goes here

const routes = require('./routes')
app.use('/api', routes)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})



