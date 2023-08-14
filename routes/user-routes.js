import express from 'express'
import { addPublicAddress, login, signup, updateUserFields, verifyPublicAddress } from '../controllers/user-controller';
const userRouter = express.Router()

userRouter.post('/signup', signup) 
userRouter.post('/login', login) 
userRouter.put('/updateuserfields', updateUserFields)
userRouter.patch('/addpublicaddress', addPublicAddress)
userRouter.patch('/verifypublicaddress', verifyPublicAddress)

export default userRouter;