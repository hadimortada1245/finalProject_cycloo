const con = require('../config/connection');
const add = async (req, res) => {
    try {
        const { 
        order_id,
        products,
        } = req.body;
        products.forEach(async element => {
            const addQuery = `INSERT INTO orderProducts (order_id ,
                product_id,quantity) VALUES (?, ?, ?)`;
            const result = await con.promise().query(addQuery, [order_id ,
                 element.productId,element.quantity]);
                 if (result[0].affectedRows !== 1) throw Error('Failed to add data');
        });
        res.status(200).json({ message: 'adding an orderProduct  successfully'});
    } catch (error) {
        res.status(500).json({ message: "Failed to add  orderProducts", error: error.message });
    }
}
module.exports = {add};