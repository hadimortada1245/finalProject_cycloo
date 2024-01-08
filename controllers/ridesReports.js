const con = require('../config/connection');
const add = async (req, res) => {
    try {
        const { 
        ride_id ,
        user_id ,
        title ,
        reason 
        } = req.body;
        if (!title ||
            !reason ||
            !user_id ||
            !ride_id 
            ) throw Error("All fields must be filled");
        const addQuery = `INSERT INTO reportedRides (ride_id ,
            user_id ,
            title ,
            reason
            ) VALUES (?, ?, ?, ?)`;

        const result = await con.promise().query(addQuery, [ride_id ,
            user_id ,
            title ,
            reason]);
        if (result[0].affectedRows !== 1) throw Error('Failed to add data');
        res.status(200).json({ message: 'adding a report  successfully', result:result[0]});

    } catch (error) {
        res.status(500).json({ message: "Failed to add a report", error: error.message });
    }
}
const deleteReport = async (req, res) => {
    try {
        const { ride_id ,
            user_id
        } = req.body;
        const deleteQuery = `DELETE FROM reportedRides WHERE ride_id = ? AND user_id = ?`;
        const result = await con.promise().query(deleteQuery, [ride_id ,
            user_id]);
        if (result[0].affectedRows !== 1) throw Error('Failed to delete a report');
        res.status(200).json({ message: 'A report deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete a report", error: error.message });
    }
}
const getReport = async (req, res) => {
    try {
        const { ride_id ,
            user_id
        } = req.body;
        const getQuery = `SELECT * FROM reportedRides WHERE ride_id = ? AND user_id = ?`;
        const [result] = await con.promise().query(getQuery, [ride_id ,
            user_id]);
        res.status(200).json({ message: 'A report selected successfully !', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select a report", error: error.message });
    }
}

const count = async (req, res) => {
    try {
        const getQuery = `SELECT COUNT(*) AS count FROM reportedRides`;
        const [result] = await con.promise().query(getQuery);
        res.status(200).json({ message: 'The count of rides reports  selected successfully !', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select the count of rides reports", error: error.message });
    }
}

const getReportsData = async (req, res) => {
    try{
        const getQuery = `SELECT
        users.name AS user_name,
        rides.location,
        rides.id AS ride_id,
        reportedRides.reason,
        reportedRides.title AS report_title
    FROM reportedRides
    JOIN users ON reportedRides.user_id = users.id
    JOIN rides ON reportedRides.ride_id = rides.id`;
        const [result] = await con.promise().query(getQuery);
        res.status(200).json({ message: 'The reports data  selected successfully !', result });
    }catch(error){
        res.status(500).json({ message: "Failed to select the reports data", error: error.message });
    }
}

module.exports = {add,getReport,deleteReport,count,getReportsData};