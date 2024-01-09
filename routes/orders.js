const express=require('express');
const router=express.Router();
const ordersController=require('../controllers/orders');
router.post('/add',ordersController.add);
router.post('/updateStatus/:Id',ordersController.updateStatus);
router.get('/countOrders',ordersController.countOrders);
module.exports=router;