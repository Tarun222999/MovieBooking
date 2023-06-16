import Booking from '../models/Bookings'
export const addBooking = async (req, res) => {
    const { movie, date, seatNumber, user } = req.body;
    let newBooking;

    try {
        newBooking = new Booking({
            movie,
            date: new Date(`${date}`),
            seatNumber,
            user,
        })

        newBooking = await newBooking.save();

    } catch (error) {
        return console.log(error)
    }

    if (!newBooking) return res.status(500).json({ message: ' booking failed' })

    return res.status(201).json({ booking: newBooking })
}