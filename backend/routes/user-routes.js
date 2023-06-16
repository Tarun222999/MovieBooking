import express from 'express'
import { addUser, deleteUser, getAllUsers, login, updateUser } from '../controllers/user-controllers';


const userRouter = express.Router();




userRouter.get('/', getAllUsers);
userRouter.post('/signup', addUser)
userRouter.post('/login', login)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)



export default userRouter