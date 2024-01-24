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
    
        const checkQuery = `SELECT COUNT(*) AS nRidesJoined FROM ridesJoining WHERE approved = 1 and user_id = ?`;
        const [nRidesJoined] = await con.promise().query(checkQuery, [user_id]);
    
        let runUpdateQuery; 
    
        if (nRidesJoined[0].nRidesJoined >= 5) {
            const updateQuery = `UPDATE users SET level = 'Professional' WHERE id = ?`; 
            runUpdateQuery = await con.promise().query(updateQuery, [user_id]);
        }else if(nRidesJoined[0].nRidesJoined >= 4){
            const updateQuery = `UPDATE users SET level = 'Intermediate' WHERE id = ?`; 
            runUpdateQuery = await con.promise().query(updateQuery, [user_id]);
        }
        res.status(200).json({ message: 'Switched to approved successfully'});
    } catch (error) {
        res.status(500).json({ message: "Failed to switch it to approved", error: error.message });
    }
    
};

const deleteJoinRequest = async (req, res) => {
    try {
        const { user_id, ride_id } = req.body;
        const deleteQuery = 'DELETE FROM ridesJoining WHERE user_id = ? AND ride_id = ?';
        const result = await con.promise().query(deleteQuery, [user_id, ride_id]);
        res.status(200).json({ message: 'A join request deleted successfully', result: result[0] });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete a join request', error: error.message });
    }
};
const getAllRides = async (req, res) => {
    try {
        const getQuery = `SELECT 
        rides.*,
        COUNT(ridesJoining.user_id) AS participants_count
    FROM 
        rides
    LEFT JOIN 
        ridesJoining ON rides.id = ridesJoining.ride_id
    GROUP BY 
        rides.id`;
        const [result] = await con.promise().query(getQuery);
        res.status(200).json({ message: "Select rides with participants successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch all data", error: error.message });
    }
}
const getAllRidesForRideSection = async (req, res) => {
    try {
        const getQuery = `SELECT 
        rides.*,
        COUNT(ridesJoining.user_id) AS participants_count
    FROM 
        rides
    LEFT JOIN 
        ridesJoining ON rides.id = ridesJoining.ride_id
    WHERE
        rides.date > CURDATE()  -- Add this condition to filter rides with a date less than the current date
    GROUP BY 
        rides.id`;
        const [result] = await con.promise().query(getQuery);
        res.status(200).json({ message: "Select rides with participants successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch all data", error: error.message });
    }
}
const getAllRidesForRideSectionWithUser = async (req, res) => {
    try {
        const { Id } = req.params;
        const getQuery = `
            SELECT 
                rides.*,
                COUNT(ridesJoining.user_id) AS participants_count,
                IF(COUNT(CASE WHEN ridesJoining.user_id = ${Id} THEN 1 END) > 0, 1, 0) AS user_joined
            FROM 
                rides
            LEFT JOIN 
                ridesJoining ON rides.id = ridesJoining.ride_id
            WHERE
                rides.date > CURDATE()
            GROUP BY 
                rides.id`;
    
        const [result] = await con.promise().query(getQuery);
        res.status(200).json({ message: "Select rides with participants successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch all data", error: error.message });
    }    
}
const getCountJoiningRequest = async (req, res) => {
    try {
        const getQuery = `SELECT COUNT(*) AS count FROM ridesJoining WHERE approved = 0`;
        const [result] = await con.promise().query(getQuery);
        res.status(200).json({ message: "Select counts rides joining requests successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch  data", error: error.message });
    }
}
const getJoiningRequestsData = async (req, res) => {
    try {
        const getQuery = `SELECT
        user_id,
        ride_id,
        rj.id AS id,
        u.name AS user_name,
        u.level AS user_level,
        r.title AS ride_title,
        r.distance AS ride_distance,
        r.difficuly AS ride_difficulty
    FROM
        ridesJoining rj
    JOIN
        users u ON rj.user_id = u.id
    JOIN
        rides r ON rj.ride_id = r.id
    WHERE
        rj.approved = 0`;
        const [result] = await con.promise().query(getQuery);
        res.status(200).json({ message: "Select  rides joining requests successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch  data", error: error.message });
    }
}

module.exports = {getAllRidesForRideSectionWithUser,getAllRidesForRideSection,deleteJoinRequest,getJoiningRequestsData,getCountJoiningRequest, add, update, getAllRides };