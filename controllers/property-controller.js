import Property from '../models/Property'

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
