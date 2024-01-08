
const express=require('express');
const router=express.Router();
const ridesRequestsController=require('../controllers/ridesRequest');
router.post('/add',ridesRequestsController.add);
router.delete('/delete/:Id',ridesRequestsController.deleteRideRequest);
router.put('/update/:Id',ridesRequestsController.update);
router.get('/getById/:Id',ridesRequestsController.getById);
router.get('/count',ridesRequestsController.count);
router.get('/getByUserId/:Id',ridesRequestsController.getByUserId);
router.get('/getRequestData',ridesRequestsController.getRequestData);
module.exports=router;