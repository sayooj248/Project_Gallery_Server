const express=require('express')
const userController=require('../Controllers/UserController')
const projectController=require('../Controllers/ProjectControllers')
const router=express.Router()
const jwtMiddle=require('../Middleware/jwtMiddleware')
const multerconfig=require('../Middleware/Multermiddleware')

router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)
router.post('/addproject',jwtMiddle,multerconfig.single('image') , projectController.addprojects)

router.get('/homeprojects',projectController.homeprojects)
router.get('/allprojects',jwtMiddle,projectController.allprojects)
router.get('/userprojects',jwtMiddle,projectController.userprojects)

router.put('/editprojects/:pid',jwtMiddle,multerconfig.single('image'),projectController.editprojects)

router.delete('/deleteproject/:pid',jwtMiddle,projectController.deleteproject)

router.put('/profileupdate',jwtMiddle,multerconfig.single('profile'),userController.userUpdateProfile)



module.exports=router

