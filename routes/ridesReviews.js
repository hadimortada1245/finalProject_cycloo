const express=require('express');
const router=express.Router();
const ridesReviewsController=require('../controllers/ridesReviews');
router.post('/add',ridesReviewsController.add);
router.delete('/delete',ridesReviewsController.deleteReview);
router.get('/count/:Id',ridesReviewsController.count);
router.get('/getReviews/:Id',ridesReviewsController.getReviews);

module.exports=router;