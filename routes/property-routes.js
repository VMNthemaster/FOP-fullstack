import express from 'express'
import { addProperty, getSingleProperty } from '../controllers/property-controller';
const propertyRouter = express.Router()

propertyRouter.post('/addproperty', addProperty)
propertyRouter.get('/getProperty/:tokenID', getSingleProperty)

export default propertyRouter;
