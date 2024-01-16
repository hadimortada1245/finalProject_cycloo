const express=require('express');
const router=express.Router();
const productsController=require('../controllers/products');
router.post('/add',productsController.add);
router.put('/update/:Id',productsController.update);
router.put('/reduceQn/:Id',productsController.reduceQn);
router.delete('/deleteProduct/:Id',productsController.deleteProduct);
router.get('/getProductById/:Id',productsController.getProductById);
router.get('/getAllProducts',productsController.getAllProducts);
router.get('/countProducts',productsController.countProducts);
router.get('/getThreeProducts',productsController.getThreeProducts);
router.get('/getAllOrderProducts',productsController.getAllOrderProducts);//Not tested yet
module.exports=router;
