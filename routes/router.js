const express=require('express')
const userController=require('../controllers/userController')
const taskController=require('../controllers/taskController')
const jwtMiddleware=require('../middleware/jwtMiddleware')

const router=express.Router()

// register : http://localhost:3000/register
router.post('/register',userController.registerController)
// login : http://localhost:3000/login
router.post('/login',userController.loginController)
// add-task : http://localhost:3000/add-task
router.post('/add-task',jwtMiddleware,taskController.addTaskController)
// view-task : http://localhost:3000/view-task
router.get('/view-task',jwtMiddleware,taskController.viewTaskController)
// update-task : http://localhost:3000/update-task
router.put('/tasks/:id/update-task',jwtMiddleware,taskController.updateTaskController)
// delete-task : http://localhost:3000/delete-task
router.delete('/tasks/:id/delete-task',jwtMiddleware,taskController.deleteTaskController)

module.exports=router

