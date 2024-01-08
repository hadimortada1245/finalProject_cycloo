
const express=require('express');
const router=express.Router();
const productsController=require('../controllers/products');
router.post('/add',productsController.add);
router.post('/update/:Id',productsController.update);
router.post('/reduceQn/:Id',productsController.reduceQn);
router.delete('/deleteProduct/:Id',productsController.deleteProduct);
router.get('/getProductById/:Id',productsController.getProductById);
router.get('/getAllProducts',productsController.getAllProducts);
module.exports=router;