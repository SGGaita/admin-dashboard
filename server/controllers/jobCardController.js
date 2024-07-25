const pool = require('../config/database')
const nodemailer = require('nodemailer')

//check if table exists
const tableExists = async (tableName) => {
    try {
        // Replace with your database specific query to check for tables
        const sql = `
        SELECT EXISTS (
          SELECT * FROM information_schema.tables 
          WHERE table_name = ?
        ) AS table_exists
      `;
        const [result] = await pool.query(sql, [tableName]);
        return result.table_exists;
    } catch (err) {
        console.error('Error checking for table:', err);
        return false; // Assume table doesn't exist if error occurs
    }
}



//create client table
const createClientTable = async () => {
    try {
        const sql = `
        CREATE TABLE IF NOT EXISTS clients (
          client_id INT AUTO_INCREMENT PRIMARY KEY,
          client_first_name VARCHAR(255) NOT NULL,
          client_last_name VARCHAR(255) NOT NULL,
          client_email VARCHAR(255) NOT NULL,
          client_phone_number VARCHAR(20)
        )
      `;
        await pool.query(sql);
        console.log('Client table created successfully.');
    } catch (err) {
        console.error('Error creating client table:', err);
    }
} 

//create jobcard table
const createJobCardTable = async () => {
    try {
        const sql = `
        CREATE TABLE IF NOT EXISTS job_cards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        job_card_id VARCHAR(8) NOT NULL UNIQUE,
        client_id INT NOT NULL,
        machine_make VARCHAR(255),
        machine_model VARCHAR(255),
        machine_serial VARCHAR(255),
        machine_photo BLOB, -- Store base64 encoded machine photo
        machine_condition VARCHAR(255),
        -- Hardware parts and their photos
        hdd_serial VARCHAR(255),
        hdd_photo BLOB,
        ram_serial VARCHAR(255),
        ram_photo BLOB,
        rom_serial VARCHAR(255),
        rom_photo BLOB,
        pin_serial VARCHAR(255),
        pin_photo BLOB,
        adapter_serial VARCHAR(255),
        adapter_photo BLOB,
        battery_serial VARCHAR(255),
        battery_photo BLOB,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(client_id)
        )
        `;
        await pool.query(sql);
        console.log('Jobcard table successfully created.');
    } catch (err) {
        console.error('Error creating client table:', err);
    }
}




//create client information
const createClient = async (req, res, next) => {
    
    console.log("client", req)
    // try {
    //     const { firstName, lastName, email, phoneNumber } = req.body.client;

    //     // Check if table exists
    //     const tableExistsResult = await tableExists('clients');
    //     if (!tableExistsResult) {
    //         await createClientTable();
    //     }
    //     //Data validation (optional, discussed later)

    //     const sql = `
    //    INSERT INTO clients (client_first_name, client_last_name, client_email, client_phone_number)
    //    VALUES (?, ?, ?, ?)
    //    `;

    //     const [result] = await pool.query(sql, [firstName, lastName, email, phoneNumber])

    //     // Attach inserted client ID to request object (assuming 'clientId' property)
    //     req.clientId = result.insertId;
    //     next();

    // } catch (err) {
    //     console.error('Error creating client:', err);
    //     return { message: 'Error creating client' }
    // }

}





//Create job card
const createJobCard = async (req, res) => {


//     try {
//         const clientId = req.clientId
//         // Destructure machine specifications from request body
//         const {
//             machineMake,
//             machineModel,
//             machineSerial,
//             machinePhoto, // Might be null initially
//             machineCondition,
//             hardwareParts: {
//                 hdd: { hddSerial, hddPhoto }, // Might be null initially
//                 ram: { ramSerial, ramPhoto }, // Might be null initially
//                 rom: { romSerial, romPhoto }, // Might be null initially
//                 pin: { pinSerial, pinPhoto }, // Might be null initially
//                 adapter: { adapterSerial, adapterPhoto }, // Might be null initially
//                 battery: { batterySerial, batteryPhoto }, // Might be null initially
//             },
//         } = req.body.specification;

//         const { firstName, lastName } = req.body.client;
//         //     const clientId = req.clientId; // Retrieve client ID from request object (assuming middleware attached it)


//         //check if jobcard table exists
//         const tableExistsResult = await tableExists('jobcards')
//         if (!tableExistsResult) {
//             await createJobCardTable();
//         }
//         //generate radom JC_ID
//         let jobCardId;
//         const firstInitial = firstName.charAt(0).toUpperCase();
//         const lastInitial = lastName.charAt(0).toUpperCase();

//         let continueLoop = true;
//         while (continueLoop) {
//             const randomDigits = Math.floor(Math.random() * 100000000); // Generate a number between 0 and 99999999
//             jobCardId = `${firstInitial}${lastInitial}-${randomDigits.toString().padStart(8, "0")}`;

//             // Check if the generated JobCardID already exists in the database
//             const sql = `
//           SELECT EXISTS (
//             SELECT * FROM job_cards 
//             WHERE job_card_id = ?
//           ) AS jobcard_exists
//         `;
//             const [result] = await pool.query(sql, [jobCardId]);
//             continueLoop = result.jobcard_exists; // Keep looping if ID exists
//         }


//         const sql = `
//            INSERT INTO job_cards (
//            job_card_id, 
//            client_id, 
//            machine_make, 
//            machine_model,
//            machine_serial,
//            machine_photo,
//            machine_condition,
//            hdd_serial,
//            hdd_photo,
//            ram_serial,
//            ram_photo,
//            rom_serial,
//            rom_photo,
//            pin_serial,
//            pin_photo,
//            adapter_serial,
//            adapter_photo,
//            battery_serial,
//            battery_photo
//             )
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//             `;

//         const [insertResult] = await pool.query(sql, [jobCardId,
//             clientId,
//             machineMake,
//             machineModel,
//             machineSerial,
//             machinePhoto,
//             machineCondition,
//             req.body.specification.hardwareParts.hdd.serial,
//             req.body.specification.hardwareParts.hdd.photo,
//             req.body.specification.hardwareParts.ram.serial,
//             req.body.specification.hardwareParts.ram.photo,
//             req.body.specification.hardwareParts.rom.serial,
//             req.body.specification.hardwareParts.rom.photo,
//             req.body.specification.hardwareParts.pin.serial,
//             req.body.specification.hardwareParts.pin.photo,
//             req.body.specification.hardwareParts.adapter.serial,
//             req.body.specification.hardwareParts.adapter.photo,
//             req.body.specification.hardwareParts.battery.serial,
//             req.body.specification.hardwareParts.battery.photo,
//         ])


//         const today = new Date();
//         let dd = today.getDate();
//         let mm = today.getMonth() + 1; // January is 0!

//         const yyyy = today.getFullYear();

//         if (dd < 10) {
//             dd = '0' + dd;
//         }

//         if (mm < 10) {
//             mm = '0' + mm;
//         }

//         const formattedToday = dd + '/' + mm + '/' + yyyy;

//         const emailContent = `
//         <html>
//           <head>
//             <title></title>
//             <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
//             <meta name="viewport" content="width=device-width, initial-scale=1">
//             <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//             </head>
//             <body>
//         <h2>Job Card Confirmation - ${jobCardId}       Booked on: ${formattedToday}</h2>
//         <p style="font-size:16px">Dear ${firstName} ${lastName},</p>
// <p style="font-size:16px">This email confirms that your machine has been booked in for service\.</p\>
// <table style\="border\-collapse\: collapse; "\>
// <thead\>
// <tr\>
// <th style\="font\-weight\: bold; padding\: 5px; font\-size\: 18px;"\>Job Card Details</th\>
// <th style\="font\-weight\: bold; padding\: 5px;"\></th\>
// </tr\>
// </thead\>
// <tbody\>
// <tr\>
// <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>Machine Make\:</td\>
// <td style\="padding\: 5px; font-size:16px"\></span>${machineMake}</td>
//             </tr>
//             <tr>
//               <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>Machine Model:</td>
//               <td style="padding: 5px;"><span class="math-inline">${machineModel}</td\>
// </tr\>
// <tr\>
// <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>Machine Serial\:</td\>
// <td style\="padding\: 5px; font-size:16px"\></span>${machineSerial}</td>
//             </tr>
//             <tr>
//               <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>HDD/SSD Serial:</td>
//               <td style="padding: 5px; font-size:16px"><span class="math-inline">${req.body.specification.hardwareParts.hdd.serial}</td\>
// </tr\>
// <tr\>
// <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>RAM Serial\:</td\>
// <td style\="padding\: 5px; font-size:16px"\></span>${req.body.specification.hardwareParts.ram.serial}</td>
//             </tr>
//             <tr>
//               <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>ROM Serial:</td>
//               <td style="padding: 5px; font-size:16px"><span class="math-inline">${req.body.specification.hardwareParts.rom.serial}</td\>
// </tr\>
//  <tr>
//               <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>3-Pin Serial:</td>
//               <td style="padding: 5px; font-size:16px"><span class="math-inline">${req.body.specification.hardwareParts.pin.serial}</td\>
// </tr\>
// <tr>
//               <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>Adapter Serial:</td>
//               <td style="padding: 5px; font-size:16px"><span class="math-inline">${req.body.specification.hardwareParts.adapter.serial}</td\>
// </tr\>

// <td style\="padding\: 5px; font\-weight\: bold; padding\: 5px; font\-size\: 16px"\>Battery Serial:</td>
// <td style="padding: 5px; font-size:16px"><span class="math-inline">${req.body.specification.hardwareParts.battery.serial}</td\>
// </tr\>
// </table>
// <p style="font-size:16px">Please don't hesitate to contact us if you have any questions.\.</p\>
// <p style="font-size:16px">Sincerely,</p>
// <p style="font-size:16px">The Brainy Team</p>

//         </body>
//         </html>
            
          
//             `
//         //console.log("Booked date", emailContent)

//         const transporter = nodemailer.createTransport({
//             // Configure your email transporter details here (e.g., SMTP server, credentials)
//             host: 'mail.uabiri-digital-solutions.co.ke', // Replace with your SMTP server
//             port: 587, // Replace with your port number
//             secure: false, // Adjust based on your server configuration

//             auth: {
//                 user: 'sgaita@uabiri-digital-solutions.co.ke', // Replace with your email address
//                 pass: '@Waxmangme86', // Replace with your email password
//             },
//         });

//         const mailOptions = {
//             from: '"Brainy" <your_email@example.com>', // Replace with your email address
//             to: req.body.client.email,
//             subject: `Job Card Confirmation - ${jobCardId}`,
//             html: emailContent,
//         };
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//                 return res.status(500).json({ message: 'Job card created, but error sending email.' });
//             } else {
//                 console.log('Email sent: ', info.response);
//                 return res.json({ message: 'Job card created successfully!', jobCardId });
//             }
//         });

//         return res.json({ message: 'Job card created successfully!', jobCardId });



//     } catch (err) {
//         return { message: 'Error creating Job Card' }
//     }



}

//get job card information
const getJobcard = async(req,res)=>{}


module.exports = { createClient, createJobCard }