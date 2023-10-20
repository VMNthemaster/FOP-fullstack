import Property from '../models/Property'
import Username from '../models/Username'

export const addProperty = async (req, res) => {
  const {
    owner,
    metamaskAddress,
    propertyName,
    propertyType,
    price,
    area,
    description,
    address,
    tokenID,
  } = req.body

  if (
    !owner || 
    !metamaskAddress ||
    !propertyName ||
    !propertyType ||
    !price ||
    !area ||
    !description ||
    !address ||
    !tokenID
  ) {
    return res
      .status(500)
      .json({ success: false, message: 'Incomplete details' })
  }

  const newProperty = new Property({
    owner,
    metamaskAddress,
    propertyName,
    propertyType,
    price,
    area,
    description,
    address,
    tokenID,
    imageSource: '',
  })

  try {
    await newProperty.save()
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error', err })
  }

  return res.status(201).json({
    success: true,
    message: 'Property Added',
    credentials: newProperty,
  })
}

export const getSingleProperty = async (req, res) => {
  const { tokenID } = req.params

  if (!tokenID) {
    return res
      .status(500)
      .json({ success: false, message: 'Incomplete details' })
  }

  let propertyDetails;

  try {
    propertyDetails = await Property.findOne({tokenID});
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error', err })
  }

  return res.status(200).json({
    success: true,
    propertyDetails,
  })
}

export const getProperties = async (req,res) => {
  let propertyDetails;

  try {
    propertyDetails = await Property.find({});
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error', err })
  }

  return res.status(200).json({
    success: true,
    propertyDetails,
  })
}

export const updateProperty = async (req, res) => {
  const {id, images} = req.body

  try {
    await Property.findByIdAndUpdate(id, {imageSource: images})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }

  return res.status(200).json({
    success: true,
    message: 'Successfully added images'
  })
}

export const updateHoldings = async (req, res) => {
  const {username, holding} = req.body

  let userData;
  try {
    userData = await Username.findOne({username})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }

  if(!username){
    return res
      .status(401)
      .json({ success: false, message: 'Username not found' })
  }

  let originalHoldings = userData.holdings || []
  originalHoldings.push(holding)

  try {
    await Username.findOneAndUpdate({username}, {holdings: originalHoldings})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }

  return res
      .status(201)
      .json({ success: true, message: 'Holding Updated Successfully' })
}

export const getHoldings = async (req, res) => {
  const {username} = req.body

  let userData;
  try {
    userData = await Username.findOne({username})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }

  if(!username){
    return res
      .status(401)
      .json({ success: false, message: 'Username not found' })
  }

  return res
      .status(200)
      .json({ success: true, message: 'Holding Retrieved Successfully', userData })
}

export const updateListings = async (req, res) => {
  const {username, listing} = req.body

  let userData;
  try {
    userData = await Username.findOne({username})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }

  if(!username){
    return res
      .status(401)
      .json({ success: false, message: 'Username not found' })
  }

  let originalListings = userData.listings || []
  originalListings.push(listing)

  try {
    await Username.findOneAndUpdate({username}, {listings: originalListings})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }

  return res
      .status(201)
      .json({ success: true, message: 'Listing Updated Successfully' })
}

