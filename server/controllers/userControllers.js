const pool = require('../config/database')
const bcrypt = require('bcryptjs'); // Add bcrypt for password hashing (explained later)
const jwt = require('jsonwebtoken');
const tableController = require('./tableController')






//Create user
const createUser = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    const hashedPassword = await hashPassword(password)

    try {


        // Check if table exists
        const tableExistsResult = await tableController.tableExists('users');
        if (!tableExistsResult) {
            await tableController.createUserTable();
        }
        //     //Data validation (optional, discussed later)


        // Check for existing user (using a prepared statement)
        const sql = `
    SELECT * FROM users WHERE email = ?
  `;

        const [existingUser] = await pool.query(sql, [email]);

        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Email already in use' }); // Conflict (409) for existing email
        }


        const sqlInsert = `
     INSERT INTO users (fname, lname, email, password_hash, role_id)
         VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(sqlInsert, [firstName, lastName, email, hashedPassword, role])

        // Attach inserted client ID to request object (assuming 'clientId' property)
        req.Id = result.insertId;
       
        return res.status(200).json({ message: 'User account successfully created' })
        //     next();

    } catch (err) {
        console.error('Error creating client:', err);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}



//hashpassowrd
const hashPassword = async (password) => {
    const saltRounds = 10; // Adjust salt rounds based on your security requirements
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error; // Re-throw the error for proper handling in createUser
    }
}


//login using email
const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Check if user exists with the provided email
        const sql = `
    SELECT users.*, roles.role as role_name
    FROM users
    INNER JOIN roles ON users.role_id = roles.id
    WHERE users.email = ?
  `;
        const [user] = await pool.query(sql, [email]);

        if (!user.length) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare hashed password from database with provided password
        const passwordMatch = await bcrypt.compare(password, user[0].password_hash);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user[0].id }, 'your_secret_key', { expiresIn: '1h' }); // Replace with your secret key

        // Return user data, role, and JWT
        const userData = {
            id: user[0].id,
            firstName: user[0].fname,
            lastName: user[0].lname,
            email: user[0].email,
            role: user[0].role_name,
            token
        };

        res.status(200).json({ ...userData, "message": "Successful login" });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//get all user accounts
const getAllUsers = async (req, res) => {
    try {
        const sql = `
        SELECT *
        FROM users u
        INNER JOIN roles r ON u.role_id = r.id
        INNER JOIN statuses s ON u.status_id = s.id
      `;
        const [users] = await pool.query(sql);
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};





//Roles
//Fetch roles
const getRoles = async (req, res) => {
    try {

        const sql = `
    SELECT * FROM roles
    `;
        const response = await pool.query(sql)
        if (response.length > 0) {
            const roles = response;
            console.log(roles[0])
            res.json(roles[0]);
        } else {
            res.status(204).send('No roles found'); // Informative message
        }

    } catch (err) {
        console.error('Error creating user table:', err);
    }
}


module.exports = { createUser, getRoles, login, getAllUsers }