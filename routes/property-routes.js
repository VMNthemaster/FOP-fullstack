import express from 'express'
import { addProperty, getHoldings, getProperties, getSingleProperty, updateHoldings, updateListings, updateProperty } from '../controllers/property-controller';
const propertyRouter = express.Router()

propertyRouter.post('/addproperty', addProperty)

propertyRouter.get('/getProperty/:tokenID', getSingleProperty)
propertyRouter.get('/getProperty/', getProperties)
propertyRouter.patch('/updateProperty', updateProperty)
propertyRouter.patch('/updateHoldings', updateHoldings)
propertyRouter.post('/getHoldings', getHoldings)
propertyRouter.patch('/updateListings', updateListings)

export default propertyRouter;
