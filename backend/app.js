import express from "express"
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from "./routes/user-routes";
dotenv.config();
const app = express();

mongoose
    .connect(`${process.env.MONOGO_URL}`)
    .then(() => { app.listen(5000, () => console.log('connced to databasee and server running')) })
    .catch((e) => { console.log(e) });



app.use('/user', userRouter)


