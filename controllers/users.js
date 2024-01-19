const con = require('../config/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateToken = (Id, email ,role) => {
    const token = jwt.sign({ Id, email ,role }, process.env.SECRET_KEY, { expiresIn: '1d' });
    return token;
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("All fields must be filled");
        }

        const checkQuery = 'SELECT * FROM users WHERE email = ?';
        const [check] = await con.promise().query(checkQuery, [email]);

        if (check.length === 0)
            return res.status(500).json({ message: "Invalid email" });

        const user = check[0];

        const validPass = await bcrypt.compare(password, user.password);
        if (validPass) {
            const token = generateToken(user.id, email ,check[0].role);
            res.status(200).json({ message: 'Login successfully', user, token });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to login", error: error.message });
    }

}
const registre = async (req, res) => {
    try {
        const { name,
            email,
            password,
            phone,
            address
        } = req.body;
        const role='user'
        if (!name || !email || !password || !phone || !address ) throw Error("All fields must be filled");
        const checkQuery = 'SELECT * FROM users WHERE email = ? OR phone = ?';
        const [check] = await con.promise().query(checkQuery, [email, phone]);
        if (check.length > 0)
            return res.status(500).json({ message: "Already exist", check });
        const salt = await bcrypt.genSalt(11);
        const hashedPass = await bcrypt.hash(password, salt);
        const registreQuery = `INSERT INTO users (name, email, password, phone, address ) VALUES (?, ?, ?, ?, ?)`;

        const result = await con.promise().query(registreQuery, [name, email, hashedPass, phone, address]);
        if (result[0].affectedRows !== 1) throw Error('Failed to add data');
        const token = generateToken(result[0].insertId, email ,role);
        const getUser = 'SELECT * FROM users WHERE id = ? ';
        const [user] = await con.promise().query(getUser, [result[0].insertId]);
        res.status(200).json({ message: 'adding a user successfully', token, user });

    } catch (error) {
        res.status(500).json({ message: "Failed to add a user", error: error.message });
    }
}
const deleteUser = async (req, res) => {
    try {
        const { Id
        } = req.params;
        const deleteQuery = `DELETE FROM users WHERE id = ?`;
        const result = await con.promise().query(deleteQuery, [Id]);
        if (result[0].affectedRows !== 1) throw Error('Failed to delete a user');
        res.status(200).json({ message: 'A user deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete a user", error: error.message });
    }
}
const getUserById = async (req, res) => {
    try {
        const { Id
        } = req.params;
        const getUserQuery = `SELECT * FROM users WHERE id = ?`;
        const [result] = await con.promise().query(getUserQuery, [Id]);
        res.status(200).json({ message: 'A user selected successfully !', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select a user by id", error: error.message });
    }
}
const getCountUsers = async (req, res) => {
    try {
        const { Id
        } = req.params;
        const getUserQuery = `SELECT COUNT(*) AS countUsers FROM users `;
        const [result] = await con.promise().query(getUserQuery);
        res.status(200).json({ message: 'users count selected successfully !', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select count users ", error: error.message });
    }
}
const updateUserById = async (req, res) => {
    try {
        const { Id } = req.params;
        const { name, email, phone, address } = req.body;
        if (!name || !email || !phone || !address)
            throw new Error("All fields must be filled");

        const updateUserQuery = `UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?`;
        const [result] = await con.promise().query(updateUserQuery, [name, email, phone, address, Id]);

        res.status(200).json({ message: 'A user updated successfully!', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to update a user by id", error: error.message });
    }
}
const updatePassword = async (req, res) => {
    try {
        const { Id } = req.params;
        const { password } = req.body;
        if (!password)
            throw new Error("All fields must be filled");
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const updatePasswordQuery = `UPDATE users SET password = ? WHERE id = ?`;
        const [result] = await con.promise().query(updatePasswordQuery, [hashedPassword, Id]);
        res.status(200).json({ message: 'User passwodr updated successfully!', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to update the user password", error: error.message });
    }
}
const isValidPassword = async (req, res) => {
    try {
        const { Id } = req.params;
        const { confirmPassword } = req.body;
        if (!confirmPassword)
            throw new Error("All fields must be filled");
        const check='SELECT * FROM users WHERE id = ?';
        const [isValid]=await con.promise().query(check,[Id]);
        const boo=await bcrypt.compare(confirmPassword,isValid[0].password);
        if(boo)
        return res.status(200).json({message:'Valid password',isValid:boo})
        res.status(200).json({message:'Valid password',isValid:boo})
        } catch (error) {
        res.status(500).json({ message: "Failed to confirm the user password", error: error.message });
    }
}
const getAllUsers_d = async (req, res) => {
    try {
        const query=`SELECT
        u.id,
        u.name,
        u.email,
        u.phone,
        u.level,
        COUNT(DISTINCT o.id) AS order_count,
        COUNT(DISTINCT r.ride_id) AS ride_count
      FROM
        users u
      LEFT JOIN
        orders o ON u.id = o.user_id
      LEFT JOIN
        ridesJoining r ON u.id = r.user_id
      GROUP BY
        u.id, u.name, u.email, u.phone, u.level`;
        const [data]=await con.promise().query(query);
        res.status(200).json({message:'Select all users data for admin dashboard',data})
        } catch (error) {
        res.status(500).json({ message: "Failed to select all users data for admin dashboard", error: error.message });
    }
}

module.exports = {getAllUsers_d, getCountUsers,registre, deleteUser, getUserById, login, updateUserById ,updatePassword,isValidPassword};