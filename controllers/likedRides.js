const con = require('../config/connection');
const add = async (req, res) => {
    try {
        const { 
            userId,rideId
        } =req.body ;
        const addQuery = `INSERT INTO likedRides (ride_id, user_id) VALUES (?, ?)`;
        const result = await con.promise().query(addQuery, [rideId ,userId]);
        if (result[0].affectedRows !== 1) throw Error('Failed to add data to likedRides table');
        res.status(200).json({ message: 'adding a like successfully'});
    } catch (error) {
        res.status(500).json({ message: "Failed to add a like", error: error.message });
    }
}
const removeLike = async (req, res) => {
    try {
        const { userId,rideId
        } = req.body;
        const deleteQuery = `DELETE FROM likedRides WHERE user_id = ? AND ride_id = ?`;
        const result = await con.promise().query(deleteQuery, [userId,rideId]);
        if (result[0].affectedRows !== 1) throw Error('Failed to remove a like');
        res.status(200).json({ message: 'A like removed successfully'});
    } catch (error) {
        res.status(500).json({ message: "Failed to remove a like", error: error.message });
    }
}
const countLikes = async (req, res) => {
    try {
        const { Id
        } = req.params;
        const selectQuery = `SELECT COUNT(*) AS likes FROM likedRides WHERE user_id = ?`;
        const [result] = await con.promise().query(selectQuery, [Id]);
        res.status(200).json({ message: 'Likes counted  successfully',result});
    } catch (error) {
        res.status(500).json({ message: "Failed to count likes", error: error.message });
    }
}
const getAllRides = async (req, res) => {
    try {
        const { Id
        } = req.params;
        const selectQuery = `SELECT
        r.*,
        COUNT(lr.user_id) AS like_count,
        MAX(lr.user_id = ${Id}) AS liked
    FROM
        rides r
    LEFT JOIN
        likedRides lr ON r.id = lr.ride_id
    GROUP BY
        r.id
    ORDER BY
        r.id;
    `;
        const [result] = await con.promise().query(selectQuery);
        res.status(200).json({ message: 'Rides plus likes selected  successfully',result});
    } catch (error) {
        res.status(500).json({ message: "Failed to select all rides", error: error.message });
    }
}


module.exports = {add,removeLike,countLikes,getAllRides};