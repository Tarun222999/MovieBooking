import { User } from '../models/User'


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