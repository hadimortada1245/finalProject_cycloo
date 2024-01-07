const express=require('express');
const router=express.Router();
const userController=require('../controllers/users');
router.post('/register',userController.registre);
router.post('/login',userController.login);
router.post('/updateUserById/:Id',userController.updateUserById);
router.delete('/delete/:Id',userController.deleteUser);
router.get('/getUser/:Id',userController.getUserById);
module.exports=router;