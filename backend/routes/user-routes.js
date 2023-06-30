import express from 'express'
import { addUser, deleteUser, getAllUsers, getBookingsUser, login, updateUser, getUserById } from '../controllers/user-controllers';


const userRouter = express.Router();




userRouter.get('/', getAllUsers);
userRouter.post('/signup', addUser)
userRouter.post('/login', login)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)
userRouter.get("/:id", getUserById);
userRouter.get('/bookings/:id', getBookingsUser)

export default userRouter