const con = require('../config/connection');
const add = async (req, res) => {
    try {
        const { 
        ride_id ,
        user_id ,
        description ,
        rate
        } = req.body;
        if (!description ||
            !rate ||
            !user_id ||
            !ride_id 
            ) throw Error("All fields must be filled");
        const addQuery = `INSERT INTO ridesReviews (ride_id ,
            user_id ,
            ride_id ,
            description ,
            rate
            ) VALUES (?, ?, ?, ?)`;

        const result = await con.promise().query(addQuery, [ride_id ,
            user_id ,
            description ,
            rate]);
        if (result[0].affectedRows !== 1) throw Error('Failed to add data');
        res.status(200).json({ message: 'adding a review  successfully', result:result[0]});
    } catch (error) {
        res.status(500).json({ message: "Failed to add a review", error: error.message });
    }
}
const deleteReview = async (req, res) => {
    try {
        const { ride_id ,
            user_id
        } = req.body;
        const deleteQuery = `DELETE FROM ridesReviews WHERE ride_id = ? AND user_id = ?`;
        const result = await con.promise().query(deleteQuery, [ride_id ,
            user_id]);
        if (result[0].affectedRows !== 1) throw Error('Failed to delete a report');
        res.status(200).json({ message: 'A review deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete a review", error: error.message });
    }
}
const getReviews = async (req, res) => {
    try {
        const { ride_id 
        } = req.params;
        const getQuery = `SELECT * FROM reportedRides WHERE ride_id = ? `;
        const [result] = await con.promise().query(getQuery, [ride_id]);
        res.status(200).json({ message: 'Ride reviews selected successfully !', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select Ride reviews", error: error.message });
    }
}

const count = async (req, res) => {
    try {
        const {Id} =req.params;
        const getQuery = `SELECT COUNT(*) AS count FROM ridesReviews WHERE user_id = ?`;
        const [result] = await con.promise().query(getQuery,[Id]);
        res.status(200).json({ message: 'The count of reviews  selected successfully !', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select the count of reviews", error: error.message });
    }
}



module.exports = {add,count,getReviews,deleteReview};