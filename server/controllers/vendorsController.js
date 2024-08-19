const pool = require('../config/database')
const tableController = require('./tableController')

//get vendors
const getAllVendors = async (req, res) => {

    try {
        const sql = `
          SELECT * FROM vendor v
          INNER JOIN statuses s ON v.status_id = s.id
        `;
        const [vendors] = await pool.query(sql);
        res.status(200).json(vendors);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}


const createVendor = async (req, res) => {
    console.log("request body", req.body)

    const { vendor_name, vendor_email, vendor_phone, vendor_address } = req.body;
    const status_id = 2
    try {
        // Check if table exists
        const tableExistsResult = await tableController.tableExists('vendor');
        if (!tableExistsResult) {
            await tableController.CreateVendorTable();
        }

        const sqlInsert = `
        INSERT INTO vendor (vendor_name, vendor_email, vendor_phone, vendor_address, status_id)
            VALUES (?, ?, ?, ?, ?)
           `;
        const [result] = await pool.query(sqlInsert, [vendor_name, vendor_email, vendor_phone, vendor_address, status_id])

        return res.status(200).json({ message: 'Vendor successfully created' })

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }

}


module.exports = { getAllVendors, createVendor }