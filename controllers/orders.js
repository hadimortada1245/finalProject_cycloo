const con = require('../config/connection');
const add = async (req, res) => {
    try {
        const { 
        user_id ,
        total
        } = req.body;
        const addQuery = `INSERT INTO orders (user_id ,
            status ,
             total
            ) VALUES (?, ?, ?)`;

        const result = await con.promise().query(addQuery, [user_id ,
           0 , 
             total]);
        if (result[0].affectedRows !== 1) throw Error('Failed to add data');
        res.status(200).json({ message: 'adding an order  successfully', result:result[0]});

    } catch (error) {
        res.status(500).json({ message: "Failed to add an order", error: error.message });
    }
}
const updateStatus = async (req, res) => {
    try {
        const {Id}=req.params;
        const updateQuery = `UPDATE orders SET status = !status
             WHERE id = ?`;
        const result = await con.promise().query(updateQuery, [
            Id]);
        if (result[0].affectedRows !== 1) throw Error('Failed to update an order status');
        res.status(200).json({ message: 'Updating an order status request successfully', result:result[0]});
    } catch (error) {
        res.status(500).json({ message: "Failed to update an order status", error: error.message });
    }
}
const countOrders = async (req, res) => {
    try{
        const getQuery= `SELECT COUNT(*) AS count FROM orders`;
        const [result]= await con.promise().query(getQuery);
        res.status(200).json({message:'select count orders successfully !',result})
    }catch( error){
        res.status(500).json({ message: "Failed to select the count of the orders", error: error.message });
    }
}
const getOrders = async (req, res) => {
    try{
        const getQuery= ``;
        const [result]= await con.promise().query(getQuery);
        res.status(200).json({message:'select count orders successfully !',result})
    }catch( error){
        res.status(500).json({ message: "Failed to select the count of the orders", error: error.message });
    }
}
module.exports = {add,updateStatus,countOrders};