const pool = require('../config/database');

//check if table exists
async function checkTableExists(tableName) {
    try {
        const [result] = await pool.query(`SHOW TABLES LIKE '${tableName}'`);
        return result.length > 0;
    } catch (err) {
        console.error(err);
        throw err
    }
}

//Create table
async function createTable(tableName) {
    try {
        await pool.query(sql)
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const createClientTable = async () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id VARCHAR(8) PRIMARY KEY,
        client_first_name VARCHAR(255) NOT NULL,
        client_last_name VARCHAR(255) NOT NULL,
        client_email VARCHAR(255) NOT NULL,
        client_phone_number VARCHAR(255) NOT NULL
      )
    `;
    await createTable('clients', sql)
}


const createJobCardTable = async () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS job_cards (
    id VARCHAR(8) PRIMARY KEY,
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
    FOREIGN KEY (client_id) REFERENCES clients(id)
    )
    `;
    await createTable('job_cards', sql)
}

module.exports = { checkTableExists, createClientTable, createJobCardTable }