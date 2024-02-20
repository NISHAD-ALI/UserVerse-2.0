import express from 'express'
import {login ,users,deleteUser,loadEditUser,updateUser,addUser} from '../controllers/adminController.js'

const adminRoute = express.Router()

adminRoute.post('/login',login)
adminRoute.get('/list',users)
adminRoute.post('/delete',deleteUser)
adminRoute.post('/edituser',loadEditUser)
adminRoute.post('/updateUser',updateUser)
adminRoute.post('/adduser',addUser)


export default adminRoute