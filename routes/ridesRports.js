
const express=require('express');
const router=express.Router();
const reportsController=require('../controllers/ridesReports');
router.post('/add',reportsController.add);
router.delete('/deleteReport',reportsController.deleteReport);
router.get('/getReport',reportsController.getReport);
router.get('/count',reportsController.count);
router.get('/getReportsData',reportsController.getReportsData);
module.exports=router;