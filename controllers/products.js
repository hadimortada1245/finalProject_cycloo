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
        } = req.body;
        if (!name ||
            !type ||
            !description || 
            !company ||
            !img  ) throw Error("All fields must be filled");
        const addQuery = `INSERT INTO products ( name ,
            type ,
            description , 
            company ,
            price ,
            delivery ,
            img ,
            quantity 
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = await con.promise().query(addQuery, [name ,
            type ,
            description , 
            company ,
            price ,
            delivery ,
            img ,
            quantity 
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
        res.status(200).json({ message: 'A product deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete a product", error: error.message });
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
        res.status(200).json({ message: 'All products selected successfully!', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select all products.", error: error.message });
    }
}
const getThreeProducts = async (req, res) => {
    try {
        const getProductsQuery = `SELECT * FROM products WHERE quantity > 0 ORDER BY id DESC LIMIT 3        `;
        const [result] = await con.promise().query(getProductsQuery);
        res.status(200).json({ message: 'All rides selected successfully!', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select all products.", error: error.message });
    }
}
const countProducts = async (req, res) => {
    try {
        const getCountQuery = `SELECT COUNT(*) AS count FROM products`;
        const [result] = await con.promise().query(getCountQuery);
        res.status(200).json({ message: 'The count of products selected successfully!', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select count products.", error: error.message });
    }
}
const getAllOrderProducts = async (req, res) => {
    try {
        const {Id}=req.params;
        const getProductsQuery = `SELECT
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        u.photo AS user_photo,
        u.phone AS user_phone,
        u.role AS user_role,
        u.address AS user_address,
        u.level AS user_level,
        u.joinedAt AS user_joinedAt,
        o.id AS order_id,
        o.status AS order_status,
        o.deliver AS order_deliver,
        o.createdAt AS order_createdAt,
        p.id AS product_id,
        p.name AS product_name,
        p.type AS product_type,
        p.description AS product_description,
        p.company AS product_company,
        p.price AS product_price,
        p.delivery AS product_delivery,
        p.img AS product_img,
        p.quantity AS product_quantity,
        p.selled AS product_selled,
        COUNT(op.product_id) OVER (PARTITION BY o.id) AS total_products
    FROM users u
    JOIN orders o ON u.id = o.user_id
    LEFT JOIN orderProducts op ON o.id = op.order_id
    LEFT JOIN products p ON op.product_id = p.id
    WHERE u.id = ?
    `;
        const [result] = await con.promise().query(getProductsQuery,[Id]);
        res.status(200).json({ message: 'All user orders data selected successfully!', result });
    } catch (error) {
        res.status(500).json({ message: "Failed to select all user orders data.", error: error.message });
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
            quantity 
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
        delivery = ? ,
        img = ? ,
        quantity = ?  WHERE id = ?`;

        const result = await con.promise().query(updateQuery, [name ,
            type ,
            description , 
            company ,
            price ,
            delivery ,
            img ,
            quantity ,Id]);
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
module.exports = {getThreeProducts,countProducts,getAllProducts,add,getProductById,deleteProduct,update,reduceQn,getAllOrderProducts};