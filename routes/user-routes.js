import express from 'express'
import { login, signup, updateUserFields } from '../controllers/User-controller';
const userRouter = express.Router()

userRouter.post('/signup', signup) 
userRouter.post('/login', login) 
userRouter.put('/updateuserfields', updateUserFields)

export default userRouter;