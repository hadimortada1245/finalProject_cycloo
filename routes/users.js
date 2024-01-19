const express=require('express');
const router=express.Router();
const userController=require('../controllers/users');
// const {authenticated}=require('../midleware/authentication')
// authenticated(['admin'])
router.post('/register',userController.registre);
router.post('/login',userController.login);
router.put('/updateUserById/:Id',userController.updateUserById);
router.put('/updatePassword/:Id',userController.updatePassword);
router.post('/isValidPassword/:Id',userController.isValidPassword);
router.delete('/delete/:Id',userController.deleteUser);
router.get('/getUser/:Id',userController.getUserById);
router.get('/getAllUsers',userController.getAllUsers_d);
router.get('/getCountUsers',userController.getCountUsers);
module.exports=router;