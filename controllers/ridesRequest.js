const con = require('../config/connection');
const add = async (req, res) => {
    try {
        const { 
            title ,
            description ,
            distance ,
            date ,
            time ,
            location,
            difficuly,
            Id
        } = req.body;
        if (!title ||
            !description ||
            !date ||
            !time ||
            !location||
            !difficuly
            ) throw Error("All fields must be filled");
        const addQuery = `INSERT INTO ridesRequests (user_id ,title ,
            description ,
            distance,
            date ,
            time ,
            location ,
            difficuly 
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = await con.promise().query(addQuery, [Id ,title ,
            description ,
            distance ,
            date ,
            time ,
            location ,
            difficuly ]);
        if (result[0].affectedRows !== 1) throw Error('Failed to add data');
        res.status(200).json({ message: 'adding a ride request successfully', result:result[0]});

    } catch (error) {
        res.status(500).json({ message: "Failed to add a ride request", error: error.message });
    }
}
const deleteRideRequest = async (req, res) => {
    try {
        const { Id
        } = req.params;
        const deleteQuery = `DELETE FROM ridesRequests WHERE id = ?`;
        const result = await con.promise().query(deleteQuery, [Id]);
        if (result[0].affectedRows !== 1) throw Error('Failed to delete a ride');
        res.status(200).json({ message: 'A ride request deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete a ride request", error: error.message });
    }
}
const getById = async (req, res) => {
    try {
        const { Id
        } = req.params;
        const getQuery = `SELECT * FROM ridesRequests WHERE id = ?`;
        const [result] = await con.promise().query(getQuery, [Id]);
        res.status(200).json({ message: 'A ride request selected successfully !', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select a ride request by id", error: error.message });
    }
}
const getByUserId = async (req, res) => {
    try {
        const { Id
        } = req.params;
        const getQuery = `SELECT * FROM ridesRequests WHERE user_id = ?`;
        const [result] = await con.promise().query(getQuery, [Id]);
        res.status(200).json({ message: 'A ride request selected successfully !', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select a ride request by id", error: error.message });
    }
}
const count = async (req, res) => {
    try {
        const { Id
        } = req.params;
        const getQuery = `SELECT COUNT(*) AS count FROM ridesRequests`;
        const [result] = await con.promise().query(getQuery);
        res.status(200).json({ message: 'The count of rides requests  selected successfully !', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select the count of rides requests", error: error.message });
    }
}
const getRequestData = async (req, res) => {
    try {
        const getQuery = `SELECT ridesRequests.*, users.email AS user_email
        FROM ridesRequests
        JOIN users ON ridesRequests.user_id = users.id`;
        const [result] = await con.promise().query(getQuery);
        res.status(200).json({ message: 'The count of rides requests  selected successfully !', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select the count of rides requests", error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { 
            title ,
            description ,
            distance,
            date ,
            time ,
            location,
            difficuly,
        } = req.body;
        const {Id}=req.params;
        if (!title ||
            !description ||
            !distance||
            !date ||
            !time ||
            !location||
            !difficuly
            ) throw Error("All fields must be filled");
        const updateQuery = `UPDATE ridesRequests SET title = ? ,
            description = ? ,
            distance = ? ,
            date = ? ,
            time = ? ,
            location = ? ,
            difficuly = ? 
             WHERE id = ?`;

        const result = await con.promise().query(updateQuery, [title ,
            description ,
            distance,
            date ,
            time ,
            location ,
            difficuly ,
            Id]);
        if (result[0].affectedRows !== 1) throw Error('Failed to update the ride request');
        res.status(200).json({ message: 'Updating a ride request successfully', result:result[0]});
    } catch (error) {
        res.status(500).json({ message: "Failed to update a ride request", error: error.message });
    }
}

module.exports = {add,getById,deleteRideRequest,update,count,getByUserId,getRequestData};