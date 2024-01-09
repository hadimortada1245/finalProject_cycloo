const express=require('express');
const router=express.Router();
const ridesController=require('../controllers/rides');
router.post('/add',ridesController.add);
router.delete('/delete/:Id',ridesController.deleteRide);
router.put('/update/:Id',ridesController.update);
router.put('/updateStatus/:Id',ridesController.updateStatus);
router.get('/getRideById/:Id',ridesController.getRideById);
router.get('/getAll',ridesController.getAll);
router.get('/count',ridesController.count);
module.exports=router;