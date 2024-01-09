const express=require('express');
const router=express.Router();
const ridesJoiningController=require('../controllers/ridesJoining');
router.post('/add',ridesJoiningController.add);
router.put('/update',ridesJoiningController.update);
router.get('/getAllRides',ridesJoiningController.getAllRides);
module.exports=router;