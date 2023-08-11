import bcrypt from 'bcryptjs'
import User from '../models/User'
import Username from '../models/Username'

export const signup = async (req, res) => {
  const { name, email, password, username, contact } = req.body

  if (!name || !email || !password || !username || !contact) {
    return res
      .status(500)
      .json({ success: false, message: 'Incomplete details' })
  }
  let existingUser

  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: 'User already exists' })
  }

  // check for usernames in username table
  let uniqueUsername

  try {
    uniqueUsername = await Username.findOne({ username })
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: 'Internal server error' })
  }
  //console.log({uniqueUsername})

  if (uniqueUsername) {
    return res
      .status(400)
      .json({ success: false, message: 'Username already exists' })
  }

  const hashedPassword = bcrypt.hashSync(String(password))

  const newUsername = new Username({
    username,
  })

  const newUser = new User({
    name,
    email,
    contact,
    password: hashedPassword,
    username,
    publicAddress: '0x',
    isVerified: false,
  })

  try {
    await newUser.save()
    await newUsername.save()
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error', err })
  }

  return res.status(201).json({
    success: true,
    message: 'Sign up successful',
    credentials: newUser,
  })
}

export const login = async (req, res) => {
  const { password, username } = req.body

  if (!password || !username) {
    return res
      .status(500)
      .json({ success: false, message: 'Incomplete details' })
  }

  let existingUser

  try {
    existingUser = await User.findOne({ username })
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }

  if (!existingUser) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid credentials' })
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid credentials' })
  }

  return res.status(200).json({
    success: true,
    message: 'Successfully logged in',
    credentials: existingUser,
  })
}

// just in case
export const isUsernameUnique = async (req, res) => {
  const { username } = req.body

  if (!username) {
    return res
      .status(500)
      .json({ success: false, message: 'Username field is compulsory' })
  }

  let uniqueUsername

  try {
    uniqueUsername = await Username.findOne({ username })
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: 'Internal server error' })
  }

  if (uniqueUsername) {
    return res
      .status(400)
      .json({ success: false, message: 'Username already exists' })
  }

  return res.status(200).json({
    success: true,
    message: 'Valid username',
    credentials: uniqueUsername,
  })
}

export const updateUserFields = async (req, res) => {
  let allUsers
  try {
    allUsers = await User.find({})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }

  let updatedUserFields
  try {
    await User.updateMany(
      {},
      { $set: { publicAddress: '', isVerified: false } }
    )
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error', error })
  }

  return res.status(200).json({
    success: true,
    message: 'Successfully updated all documents',
    updatedUserFields,
  })
}

export const addPublicAddress = async (req, res) => {
  const { username, publicAddress } = req.body

  if (!username || !publicAddress) {
    return res
      .status(400)
      .json({ success: false, message: 'Incomplete fields' })
  }

  try {
    await User.updateOne({ username }, { publicAddress })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error', error })
  }

  return res.status(200).json({
    success: true,
    message: 'Successfully updated public address',
  })
}
