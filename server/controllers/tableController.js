const pool = require('../config/database')

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
        const exists = result[0].table_exists;
        return exists === 1; // Convert to boolean
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
        machine_photo VARCHAR(255), 
        machine_condition VARCHAR(255),
        -- Hardware parts and their photos
        hdd_serial VARCHAR(255),
        hdd_photo VARCHAR(255),
        ram_serial VARCHAR(255),
        ram_photo VARCHAR(255),
        rom_serial VARCHAR(255),
        rom_photo VARCHAR(255),
        pin_serial VARCHAR(255),
        pin_photo VARCHAR(255),
        adapter_serial VARCHAR(255),
        adapter_photo VARCHAR(255),
        battery_serial VARCHAR(255),
        battery_photo VARCHAR(255),
        status_id INT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(client_id),
        FOREIGN KEY (status_id) REFERENCES statuses(id)
        )
        `;
        await pool.query(sql);
        console.log('Jobcard table successfully created.');
    } catch (err) {
        console.error('Error creating client table:', err);
    }
}


//create user account
const createUserTable = async () => {
    try {
        const sql = `
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
  );
      `;
        await pool.query(sql);
        console.log('User table created successfully.');
    } catch (err) {
        console.error('Error creating user table:', err);
    }
}


//create vendor account
const CreateVendorTable = async () => {
    try {
        const sql = `
         CREATE TABLE IF NOT EXISTS vendor (
id int(11) NOT NULL,
vendor_name varchar(255) NOT NULL,
vendor_address varchar(255) NOT NULL,
vendor_email varchar(255) NOT NULL,
vendor_phone varchar(255) NOT NULL
    );
`
        await pool.query(sql);
        console.log('Vendor table created successfully.');

    } catch (err) {
        console.error('Error creating vendor table:', err);
    }
}


module.exports = { tableExists, createClientTable, createJobCardTable, createUserTable, CreateVendorTable }
