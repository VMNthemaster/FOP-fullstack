import express from 'express'
import { addPublicAddress, login, signup, updateUserFields } from '../controllers/user-controller';
const userRouter = express.Router()

userRouter.post('/signup', signup) 
userRouter.post('/login', login) 
userRouter.put('/updateuserfields', updateUserFields)
userRouter.patch('/addpublicaddress', addPublicAddress)

export default userRouter;