import express from "express"
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";
import cors from 'cors'
import bookingRouter from "./routes/booking-routes";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/movie', movieRouter)
app.use('/booking', bookingRouter)

mongoose
    .connect(`${process.env.MONOGO_URL}`)
    .then(() => { app.listen(5000, () => console.log('connced to databasee and server running')) })
    .catch((e) => { console.log(e) });



