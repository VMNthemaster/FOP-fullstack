import express from 'express'
import { addProperty, getProperties, getSingleProperty } from '../controllers/property-controller';
const propertyRouter = express.Router()

propertyRouter.post('/addproperty', addProperty)

propertyRouter.get('/getProperty/:tokenID', getSingleProperty)
propertyRouter.get('/getProperty/', getProperties)

export default propertyRouter;
