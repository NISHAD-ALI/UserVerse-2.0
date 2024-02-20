import express from 'express';
import { PORT } from './config.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js';
dotenv.config();
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use('/',userRoutes)
app.use('/admin',adminRoutes)

console.log(process.env.MONGOURL)
mongoose.connect(process.env.MONGOURL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));
app.listen(PORT, () => console.log(`Server Started At ${PORT}`))  
