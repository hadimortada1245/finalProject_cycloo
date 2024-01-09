const con = require('../config/connection');
const add = async (req, res) => {
    try {
        const { 
            title ,
            description ,
            distance,
            date ,
            time ,
            location,
            difficuly,
            cost,
            direction,
            duration,
            maxMember,
            mapImg,
            img
        } = req.body;
        if (!title ||
            !description ||
            !distance||
            !date ||
            !time ||
            !location||
            !difficuly||
            !direction||
            !duration||
            !maxMember||
            !mapImg||
            !img) throw Error("All fields must be filled");
        const addQuery = `INSERT INTO rides (title ,
            description ,
            distance,
            date ,
            time ,
            location ,
            difficuly ,
            cost ,
            direction ,
            duration ,
            maxMember,
            mapImg ,
            img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = await con.promise().query(addQuery, [title ,
            description ,
            distance,
            date ,
            time ,
            location ,
            difficuly ,
            cost ,
            direction ,
            duration ,
            maxMember,
            mapImg ,
            img]);
        if (result[0].affectedRows !== 1) throw Error('Failed to add data');
        res.status(200).json({ message: 'adding a ride successfully', result:result[0]});

    } catch (error) {
        res.status(500).json({ message: "Failed to add a ride", error: error.message });
    }
}
const deleteRide = async (req, res) => {
    try {
        const { Id
        } = req.params;
        const deleteQuery = `DELETE FROM rides WHERE id = ?`;
        const result = await con.promise().query(deleteQuery, [Id]);
        if (result[0].affectedRows !== 1) throw Error('Failed to delete a ride');
        res.status(200).json({ message: 'A ride deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete a ride", error: error.message });
    }
}
const getRideById = async (req, res) => {
    try {
        const { Id
        } = req.params;
        const getRideQuery = `SELECT * FROM rides WHERE id = ?`;
        const [result] = await con.promise().query(getRideQuery, [Id]);
        res.status(200).json({ message: 'A ride selected successfully !', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select a ride by id", error: error.message });
    }
}
const getAll = async (req, res) => {
    try {
        const getRidesQuery = `SELECT * FROM rides`;
        const [result] = await con.promise().query(getRidesQuery);
        res.status(200).json({ message: 'All rides selected successfully!', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select all rides.", error: error.message });
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
            cost,
            direction,
            duration,
            maxMember,
            mapImg,
            img
        } = req.body;
        const {Id}=req.params;
        if (!title ||
            !description ||
            !distance||
            !date ||
            !time ||
            !location||
            !difficuly||
            !direction||
            !duration||
            !maxMember||
            !mapImg||
            !img) throw Error("All fields must be filled");
        const updateQuery = `UPDATE rides SET title = ? ,
            description = ? ,
            distance = ? ,
            date = ? ,
            time = ? ,
            location = ? ,
            difficuly = ? ,
            cost = ? ,
            direction = ?,
            duration = ? ,
            maxMember= ? ,
            mapImg = ? ,
            img= ? WHERE id = ?`;

        const result = await con.promise().query(updateQuery, [title ,
            description ,
            distance,
            date ,
            time ,
            location ,
            difficuly ,
            cost ,
            direction ,
            duration ,
            maxMember,
            mapImg ,
            img,Id]);
        if (result[0].affectedRows !== 1) throw Error('Failed to update the ride');
        res.status(200).json({ message: 'Updating a ride successfully', result:result[0]});
    } catch (error) {
        res.status(500).json({ message: "Failed to update a ride", error: error.message });
    }
}
const updateStatus = async (req, res) => {
    try {
        const {Id}=req.params;
        const updateQuery = `UPDATE rides SET status = !status  WHERE id = ?`;
        const result = await con.promise().query(updateQuery, [Id]);
        if (result[0].affectedRows !== 1) throw Error('Failed to update the ride status');
        res.status(200).json({ message: 'Updating a ride status successfully', result:result[0]});
    } catch (error) {
        res.status(500).json({ message: "Failed to update a ride status", error: error.message });
    }
}
const count = async (req, res) => {
    try{
        const getQuery= `SELECT COUNT(*) AS count FROM rides`;
        const [result]= await con.promise().query(getQuery);
        res.status(200).json({message:'select count rides successfully !',result})
    }catch( error){
        res.status(500).json({ message: "Failed to select the count of the rides", error: error.message });
    }
}
module.exports = {count,getAll,add,getRideById,deleteRide,update,updateStatus};