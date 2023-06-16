import express from 'express'
import { addBooking, deleteBooking, getBookingById } from '../controllers/booking-controller';

const bookingRouter = express.Router();


bookingRouter.post('/', addBooking);


bookingRouter.get('/:id', getBookingById);


bookingRouter.delete('/:id', deleteBooking);

export default bookingRouter;