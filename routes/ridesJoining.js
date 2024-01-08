
const express=require('express');
const router=express.Router();
const ridesJoiningController=require('../controllers/ridesJoining');
router.post('/add',ridesJoiningController.add);
router.gut('/update',ridesJoiningController.update);

module.exports=router;