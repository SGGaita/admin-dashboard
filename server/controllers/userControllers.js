const pool = require('../config/database')
const bcrypt = require('bcryptjs'); // Add bcrypt for password hashing (explained later)
const jwt = require('jsonwebtoken');

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



//Create user
const createUser = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    const hashedPassword = await hashPassword(password)

    try {


        // Check if table exists
        const tableExistsResult = await tableExists('users');
        if (!tableExistsResult) {
            await createUserTable();
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
        console.log("Users account", req.clientId)
        console.log("result", result)
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

        res.status(200).json({...userData, "message": "Successful login"});

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}




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


module.exports = { createUser, getRoles, login }