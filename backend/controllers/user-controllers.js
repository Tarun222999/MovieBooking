import User from '../models/User'
import bcrypt from 'bcryptjs'

import Booking from '../models/Bookings';
export const getAllUsers = async (req, res, next) => {
    let users;
    try {

        users = await User.find();

    } catch (error) {
        return next(err);
    }
    if (!users) {

        return res.status(500).json({
            message: "unexpected error occured"
        })

    }
    return res.status(200).json({ users })
}


export const addUser = async (req, res, next) => {

    const { name, email, password } = req.body;
    if (!name && !email && !password) {
        return res.status(422).json({ message: 'Invalid Inputs' }
        )
    }


    const hashedPassword = bcrypt.hashSync(password);
    let user;
    try {
        user = new User({ name, email, password: hashedPassword });
        user = await user.save();
    } catch (error) {
        console.log(error)
    }

    if (!user) {
        return res.status(500).json({
            message: "unexpected error occured"
        })
    }
    return res.status(201).json({ user })
}


export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
        return res.status(422).json({ message: 'Invalid Inputs' }
        )
    }

    let user;

    const hashedPassword = bcrypt.hashSync(password);

    try {
        user = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword })

    } catch (error) {
        console.log(error)
    }


    if (!user) {
        return res.status(500).json({
            message: "unexpected error occured"
        })
    }
    return res.status(201).json({ message: 'user update succesfully' })

}



export const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    let user;
    try {
        user = await User.findByIdAndDelete(id);


    } catch (error) {
        return console.log(err);
    }


    if (user) {
        return res.status(500).json({
            message: "unexpected error occured"
        })
    }


    return res.status(201).json({ message: 'user delete succesfully' })

}


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ message: 'Invalid Inputs' }
        )
    }
    let existuser;
    try {
        existuser = await User.findOne({ email });


    } catch (error) {
        return console.log(error)
    }

    if (!existuser) {
        return res.status(400).json({ message: 'unable to find the email ' });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existuser.password)

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Incorect password' });
    }

    return res.status(200).json({ message: "login succesful" })


}

export const getBookingsUser = async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try {
        bookings = await Booking.find({ user: id });

    } catch (error) {
        console.log(error)
    }

    if (!bookings) return res.status(400).json({ message: "unable to get booking" })


    return res.status(200).json({ bookings })
}