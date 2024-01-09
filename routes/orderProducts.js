const express=require('express');
const router=express.Router();
const orderProductsController=require('../controllers/orderProducts');
router.post('/add',orderProductsController.add);
module.exports=router;