const express=require('express');
const router=express.Router();
const ordersController=require('../controllers/orders');
router.post('/add',ordersController.add);
router.post('/updateStatus/:Id',ordersController.updateStatus);
router.get('/countOrders',ordersController.countOrders);
router.get('/getCountOrdersByUserId/:Id',ordersController.getCountOrdersByUserId);
module.exports=router;