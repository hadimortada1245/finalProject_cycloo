const con = require('../config/connection');
const add = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const [existingItem] = await con.promise().query('SELECT * FROM cart WHERE user_id = ? AND product_Id = ?', [userId, productId]);
        if (existingItem.length>0) {
            res.status(400).json({ error: 'Item already exists in the cart' });
        } else {
            const { quantity, maxQuantity, delivery, price, img, name } = req.body;
            const result = await con.promise().query(
                'INSERT INTO cart (user_id, quantity, maxQuantity, delivery, product_Id, price, img, name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [userId, quantity, maxQuantity, delivery, productId, price, img, name]
            );

            res.status(200).json({ message: 'Item added to cart successfully' });
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const increase=async(req,res)=>{
    try {
      const { userId, productId } = req.body;
    const [existingItem] = await con.promise().query('SELECT * FROM cart WHERE user_id = ? AND product_Id = ?', [userId, productId]);

    if (existingItem) {
        await con.promise().query('UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_Id = ?', [userId, productId]);
        res.status(200).json({ message: 'Quantity increased successfully' });
    } else {
      res.status(404).json({ error: 'Item not found in cart' });
    }
  } catch (error) {
    console.error('Error increasing quantity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const remove=async(req,res)=>{
    try {
        const { userId, productId } = req.body;
        const result = await con.promise().query('DELETE FROM cart WHERE user_id = ? AND product_Id = ?', [userId, productId]);
    
        if (result[0].affectedRows > 0) {
          res.status(200).json({ message: 'Item deleted from cart successfully' });
        } else {
          res.status(404).json({ error: 'Item not found in cart' });
        }
      } catch (error) {
        console.error('Error deleting item from cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
const exist=async(req,res)=>{
    try {
        const { userId, productId } = req.body;
        const [existingItem] = await con.promise().query('SELECT * FROM cart WHERE user_id = ? AND product_Id = ?', [userId, productId]);
    
        if (existingItem) {
          res.status(200).json({ exists: true });
        } else {
          res.status(200).json({ exists: false });
        }
      } catch (error) {
        console.error('Error checking if product exists in cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
const decrease = async (req, res) => {
    try {
        const { userId, productId } = req.body; 
        const [existingItem] = await con.promise().query('SELECT * FROM cart WHERE user_id = ? AND product_Id = ?', [userId, productId]);
        if (existingItem) {
            if (existingItem[0].quantity > 1) {
                await con.promise().query('UPDATE cart SET quantity = quantity - 1 WHERE user_id = ? AND product_Id = ?', [userId, productId]);
                const updatedItem = await con.promise().query('SELECT * FROM cart WHERE user_id = ? AND product_Id = ?', [userId, productId]);
                res.status(200).json({ message: 'Quantity decreased successfully', updatedItem });
            } else {
                await con.promise().query('DELETE FROM cart WHERE user_id = ? AND product_Id = ?', [userId, productId]);
                res.status(200).json({ message: 'Item removed from cart successfully'});
            }
        } else {
            res.status(404).json({ error: 'Item not found in cart' });
        }
    } catch (error) {
        console.error('Error decreasing quantity:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getCartDataByUserId=async(req,res)=>{
    try {
        const {Id} = req.params;
        const getCartQuery = 'SELECT * FROM cart WHERE user_id = ?';
        
        const [cartItems] = await con.promise().query( getCartQuery, [Id]);
        
        if (cartItems) {
            res.status(200).json({ message: 'Cart items fetched successfully', cartItems });
        }
    } catch (error) {
        console.error('Error fetching cart items by user ID:', error);
        res.status(500).json({ message: 'Failed to fetch cart items', error: error.message });
    }
}
module.exports={add,increase,decrease,remove,exist,getCartDataByUserId}
