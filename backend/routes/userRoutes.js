import express from 'express';
import { login, sample, signup, updateprofile } from '../controllers/userController.js';
import {uploadOptions} from '../middlewares/multer.js';
const userRoute = express.Router();


userRoute.get('/',sample);
userRoute.post('/signup',signup);
userRoute.post('/login',login);
userRoute.post('/updateprofile',uploadOptions.single('image'),updateprofile);


export default userRoute;