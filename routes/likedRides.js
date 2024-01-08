const express=require('express');
const router=express.Router();
const likedRidesController=require('../controllers/likedRides');
router.post('/add',likedRidesController.add);
router.delete('/delete',likedRidesController.removeLike);
router.get('/countLikes/:Id',likedRidesController.countLikes);
router.get('/getAllRides/:Id',likedRidesController.getAllRides);
module.exports=router;