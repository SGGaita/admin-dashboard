const pool = require('../config/database')
const nodemailer = require('nodemailer');
const { createClientTable, createJobCardTable, tableExists } = require('./tableController');






//create client information
const createClient = async (req, res, next) => {


    try {
        const { firstName, lastName, email, phoneNumber } = req.body;
        const tableName = 'clients'
        // Check if table exists
        const tableExistsResult = await tableExists(tableName);

        if (!tableExistsResult) {
            await createClientTable();
        }
        //Data validation (optional, discussed later)

        const sql = `
        INSERT INTO clients (client_first_name, client_last_name, client_email, client_phone_number)
        VALUES (?, ?, ?, ?)
        `;

        const [result] = await pool.query(sql, [firstName, lastName, email, phoneNumber])

        // Attach inserted client ID to request object (assuming 'clientId' property)
        req.clientId = result.insertId;
        next();

    } catch (err) {
        console.error('Error creating client:', err);
        return { message: 'Error creating client' }
    }

}





//Create job card
const createJobCard = async (req, res) => {
    // Access uploaded filenames from req.files
    const uploadedFiles = req.files;
    console.log("path", uploadedFiles.hddPhoto.map((x) => x.path))
    const machinePhoto = uploadedFiles.machinePhoto.map((x) => x.path)
    const hddPhoto = uploadedFiles.hddPhoto.map((x) => x.path)
    const ramPhoto = uploadedFiles.ramPhoto.map((x) => x.path)
    const romPhoto = uploadedFiles.romPhoto.map((x) => x.path)
    const pinPhoto = uploadedFiles.pinPhoto.map((x) => x.path)
    const adapterPhoto = uploadedFiles.adapterPhoto.map((x) => x.path)
    const batteryPhoto = uploadedFiles.batteryPhoto.map((x) => x.path)
    //set status id
    const status_id = 1

    try {
        const clientId = req.clientId
        //Destructure machine specifications from request body
        const {
            firstName,
            lastName,
            email,
            jobCardId,
            machineMake,
            machineModel,
            machineSerial,
            machineCondition,
            hddSerial,
            ramSerial,
            romSerial,
            pinSerial,
            adapterSerial,
            batterySerial

        } = req.body;



        const tableName = 'job_cards';
        //check if jobcard table exists
        const tableExistsResult = await tableExists(tableName)

        if (!tableExistsResult) {
            await createJobCardTable();
        }


        const sql = `
                 INSERT INTO job_cards (
                 job_card_id, 
                 client_id, 
                 machine_make, 
                 machine_model,
                 machine_serial,
                 machine_photo,
                 machine_condition,
                 hdd_photo,
                 hdd_serial,
                 ram_serial,
                 ram_photo,
                 rom_serial,
                 rom_photo,
                 pin_serial,
                 pin_photo,
                 adapter_serial,
                 adapter_photo,
                 battery_serial,
                 battery_photo,
                 status_id
                 )
                  VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `;

        const [insertResult] = await pool.query(sql, [
            jobCardId,
            clientId,
            machineMake,
            machineModel,
            machineSerial,
            machinePhoto,
            machineCondition,
            hddSerial,
            hddPhoto,
            ramSerial,
            ramPhoto,
            romSerial,
            romPhoto,
            pinSerial,
            pinPhoto,
            adapterSerial,
            adapterPhoto,
            batterySerial,
            batteryPhoto,
            status_id
        ])

      
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; // January is 0!

        const yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        const formattedToday = dd + '/' + mm + '/' + yyyy;

        
         const emailContent = `
                     <html>
                       <head>
                         <title></title>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                         <meta name="viewport" content="width=device-width, initial-scale=1">
                         <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                         </head>
                          <body>
                     <h2>Job Card Confirmation - ${jobCardId}       Booked on: ${formattedToday}</h2>
                      <p style="font-size:16px">Dear ${firstName} ${lastName},</p>
              <p style="font-size:16px">This email confirms that your machine has been booked in for service\.</p\>
              <table style\="border\-collapse\: collapse; "\>
              <thead\>
              <tr\>
              <th style\="font\-weight\: bold; padding\: 5px; font\-size\: 18px;"\>Job Card Details</th\>
              <th style\="font\-weight\: bold; padding\: 5px;"\></th\>
              </tr\>
              </thead\>
              <tbody\>
              <tr\>
              <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>Machine Make\:</td\>
              <td style\="padding\: 5px; font-size:16px"\></span>${machineMake}</td>
                      </tr>
                          <tr>
                           <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>Machine Model:</td>
                           <td style="padding: 5px; font-size:16px"><span class="math-inline">${machineModel}</td\>
              </tr\>
              <tr\>
              <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>Machine Serial\:</td\>
             <td style\="padding\: 5px; font-size:16px"\></span> ${machineSerial}</td>
              </tr >
                 <tr>
                   <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>HDD/SSD Serial:</td>
                   <td style="padding: 5px; font-size:16px"><span class="math-inline">${hddSerial}</td\>
      </tr\>
     <tr\>

     <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>RAM Serial\:</td\>
             <td style\="padding\: 5px; font-size:16px"\></span > ${ramSerial}</td >
                 </tr >
                  <tr>
                    <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>ROM Serial:</td>
                    <td style="padding: 5px; font-size:16px"><span class="math-inline">${romSerial}</td\>
     </tr\>
       <tr>
                    <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>3-Pin Serial:</td>
                   <td style="padding: 5px; font-size:16px"><span class="math-inline">${pinSerial}</td\>
     </tr\>
      <tr>
                    <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>Adapter Serial:</td>
                    <td style="padding: 5px; font-size:16px"><span class="math-inline">${adapterSerial}</td\>
      </tr\>

     <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\> Battery Serial:</td >
         <td style="padding: 5px; font-size:16px"><span class="math-inline">${batterySerial}</td\>
      </tr\>
      </table >
     <p style="font-size:16px">Please don't hesitate to contact us if you have any questions.\.</p\>
      <p style="font-size:16px">Sincerely,</p>
      <p style="font-size:16px">The Brainy Team</p>

             </body >
             </html >


     `

     const transporter = nodemailer.createTransport({
    // Configure your email transporter details here (e.g., SMTP server, credentials)
         host: 'mail.uabiri-digital-solutions.co.ke', // Replace with your SMTP server
         port: 587, // Replace with your port number
         secure: false, // Adjust based on your server configuration

        auth: {
             user: 'sgaita@uabiri-digital-solutions.co.ke', // Replace with your email address
             pass: '@Waxmangme86', // Replace with your email password
         },
     });


     const mailOptions = {
        from: '"Brainy" <your_email@example.com>', // Replace with your email address
         to: email,
         subject: `Job Card Confirmation - ${jobCardId} `,
         html: emailContent,
     };

     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
             console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Job card created, but error sending email.' });
        }
 });

    res.status(200).send({ jobcardID: jobCardId, message: `Job Card information saved successfully` })

    } catch (err) {
        console.error("error", err)
        res.status(400).send({message:``})
    }

   


   

   

    // return res.json({ message: 'Job card created successfully!', jobCardId });







}

//get job card information
const getAllJobcards = async (req, res) => {
    try {

        const sql = `
        SELECT * FROM job_cards jc
        INNER JOIN clients c ON jc.client_id = c.client_id
        INNER JOIN job_status js ON jc.status_id = js.status_id

    `;

        const [rows] = await pool.query(sql)

        res.status(200).json(rows)
    } catch (error) {
        console.error(error)
    }
}


const getOutSourcedJobcards = async (req, res) => {
    try {
        const sql = `
SELECT
jv.id,
    jc.id AS j_id,
        jc.job_card_id,
        jc.client_id,
        c.client_first_name,
        c.client_last_name,
        jc.machine_make,
        jc.machine_model,
        jc.machine_serial,
        v.vendor_name,
        v.vendor_email,
        v.vendor_phone,
        v.vendor_address,
        jv.created_at,
        jv.returned_at
FROM 
            jobcard_vendor jv
            INNER JOIN job_cards jc ON jv.jobcard_id = jc.id
            INNER JOIN vendor v ON jv.vendor_id = v.id
            INNER JOIN clients c ON jc.client_id = c.client_id
    `;

        const [rows] = await pool.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
    }
};




module.exports = { createClient, createJobCard, getAllJobcards, getOutSourcedJobcards }