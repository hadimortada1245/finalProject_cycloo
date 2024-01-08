const con = require('../config/connection');
const add = async (req, res) => {
    try {
        const { 
            name ,
            type ,
            description , 
            company ,
            price ,
            delivery ,
            img ,
            quantity , 
            selled 
        } = req.body;
        if (!name ||
            !type ||
            !description || 
            !company ||
            !price ||
            !delivery ||
            !img ||
            !quantity ) throw Error("All fields must be filled");
        const addQuery = `INSERT INTO products ( name ,
            type ,
            description , 
            company ,
            price ,
            delivery ,
            img ,
            quantity , 
            selled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = await con.promise().query(addQuery, [name ,
            type ,
            description , 
            company ,
            price ,
            delivery ,
            img ,
            quantity , 
            selled
        ]);
        if (result[0].affectedRows !== 1) throw Error('Failed to add data');
        res.status(200).json({ message: 'adding a product successfully', result:result[0]});

    } catch (error) {
        res.status(500).json({ message: "Failed to add a product", error: error.message });
    }
}
const deleteProduct = async (req, res) => {
    try {
        const { Id
        } = req.params;
        const deleteQuery = `DELETE FROM products WHERE id = ?`;
        const result = await con.promise().query(deleteQuery, [Id]);
        if (result[0].affectedRows !== 1) throw Error('Failed to delete a product');
        res.status(200).json({ message: 'A ride deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete a ride", error: error.message });
    }
}
const getProductById = async (req, res) => {
    try {
        const { Id
        } = req.params;
        const getRideQuery = `SELECT * FROM products WHERE id = ?`;
        const [result] = await con.promise().query(getRideQuery, [Id]);
        res.status(200).json({ message: 'A product selected successfully !', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select a product by id", error: error.message });
    }
}
const getAllProducts = async (req, res) => {
    try {
        const getProductsQuery = `SELECT * FROM products WHERE quantity > 0`;
        const [result] = await con.promise().query(getProductsQuery);
        res.status(200).json({ message: 'All rides selected successfully!', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select all rides.", error: error.message });
    }
}
const update = async (req, res) => {
    try {
        const { 
            name ,
            type ,
            description , 
            company ,
            price ,
            delivery ,
            img ,
            quantity , 
            selled
        } = req.body;
        const {Id}=req.params;
        if (!name ||
            !type ||
            !description || 
            !company ||
            !price ||
            !delivery ||
            !img ||
            !quantity
            ) throw Error("All fields must be filled");
        const updateQuery = `UPDATE products SET name = ? ,
        type = ? ,
        description = ? ,
        company = ? ,
        price = ? ,
        img = ? ,
        quantity = ?  WHERE id = ?`;

        const result = await con.promise().query(updateQuery, [name ,
            type ,
            description , 
            company ,
            price ,
            delivery ,
            img ,
            quantity , 
            selled,Id]);
        if (result[0].affectedRows !== 1) throw Error('Failed to update the product');
        res.status(200).json({ message: 'Updating a product successfully', result:result[0]});
    } catch (error) {
        res.status(500).json({ message: "Failed to update a product", error: error.message });
    }
}
const reduceQn = async (req, res) => {
    try {
        const {Id}=req.params;
        const updateQuery = `UPDATE products SET quantity = quantity-1  WHERE id = ?`;
        const result = await con.promise().query(updateQuery, [Id]);
        if (result[0].affectedRows !== 1) throw Error('Failed to reduce the product quantity');
        res.status(200).json({ message: 'Reduce the quantity successfully', result:result[0]});
    } catch (error) {
        res.status(500).json({ message: "Failed to reduce the product quantity", error: error.message });
    }
}
module.exports = {getAllProducts,add,getProductById,deleteProduct,update,reduceQn};