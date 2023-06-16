import express from 'express'
import { addBooking } from '../controllers/booking-controller';

const bookingRouter = express.Router();


bookingRouter.post('/', addBooking)







export default bookingRouter;