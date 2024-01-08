const con = require('../config/connection');
const add = async (req, res) => {
    try {
        const {
            ride_id,
            user_id,
            approved
        } = req.body;
        if (
            !user_id ||
            !ride_id
        ) throw Error("All fields must be filled");
        const addQuery = `INSERT INTO ridesJoining (ride_id ,
            user_id ,
            approved
            ) VALUES (?, ?, ?)`;

        const result = await con.promise().query(addQuery, [ride_id,
            user_id,
            approved]);
        if (result[0].affectedRows !== 1) throw Error('Failed to add data to rides joining table');
        res.status(200).json({ message: 'adding data to rides joining table  successfully', result: result[0] });

    } catch (error) {
        res.status(500).json({ message: "Failed to add data to rides joining table", error: error.message });
    }
}
const update = async (req, res) => {
    try {
        const { user_id, ride_id } = req.body;
        const addQuery = `UPDATE ridesJoining SET approved = !approved WHERE user_id = ? AND ride_id = ?`;
        const result = await con.promise().query(addQuery, [user_id, ride_id]);
        if (result[0].affectedRows !== 1) throw Error('Failed to switch it to approved');
        res.status(200).json({ message: 'Switched to approved successfully', result: result[0] });
    } catch (error) {
        res.status(500).json({ message: "Failed to switch it to approved", error: error.message });
    }
}
const getAllRides = async (req, res) => {
    try {
        const getQuery = `SELECT
        r.id AS ride_id,
        r.title,
        r.description,
        r.distance,
        r.date,
        r.time,
        r.location,
        r.difficuly,
        r.cost,
        r.direction,
        r.duration,
        r.maxMember,
        r.mapImg,
        r.img,
        r.status,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        u.photo AS user_photo,
        u.phone AS user_phone,
        u.role AS user_role,
        u.address AS user_address,
        u.level AS user_level,
        u.joinedAt AS user_joinedAt,
        COUNT(j.user_id) AS participants_count
    FROM rides r
    JOIN ridesJoining j ON r.id = j.ride_id
    JOIN users u ON j.user_id = u.id
    GROUP BY r.id, u.id`;
        const [result] = await con.promise().query(getQuery);
        res.status(200).json({ message: "Select rides with participants successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch all data", error: error.message });
    }
}

module.exports = { add, update, getAllRides };