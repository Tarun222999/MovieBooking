
import Booking from '../models/Bookings'
import Movie from '../models/Movies'
import User from '../models/User'
import mongoose from 'mongoose'
export const addBooking = async (req, res) => {
    const { movie, date, seatNumber, user } = req.body;

    let existingMovie;
    let existingUser;

    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);

    } catch (error) {
        return console.log(error)
    }

    if (!existingMovie || !existingUser) return res.status(404).json({ message: 'user or movie not found' });



    let newBooking;
    try {
        newBooking = new Booking({
            movie,
            date: new Date(`${date}`),
            seatNumber,
            user,
        })


        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(newBooking);
        existingMovie.bookings.push(newBooking)
        await existingUser.save({ session })
        await existingMovie.save({ session })
        newBooking = await newBooking.save({ session })
        session.commitTransaction();


    } catch (error) {
        return console.log(error)
    }

    if (!newBooking) return res.status(500).json({ message: ' booking failed' })

    return res.status(201).json({ booking: newBooking })
}


export const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if (!booking) {
        return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(200).json({ booking });
};



export const deleteBooking = async (req, res, next) => {

    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findByIdAndRemove(id).populate("user movie")
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({ session })
        await booking.user.save({ session });
        session.commitTransaction();


    } catch (err) {
        return console.log(err);
    }
    if (!booking) {
        return res.status(500).json({ message: "Unable to Delete" });
    }
    return res.status(200).json({ message: "Successfully Deleted" });
}