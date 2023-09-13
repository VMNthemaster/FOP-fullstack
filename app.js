import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/user-routes'
import propertyRouter from './routes/property-routes'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// routes
app.use('/api/users', userRouter)
app.use('/api/properties', propertyRouter)


app.get('/', (req, res) => {
  return res.json('Hello world')
})

const port = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(port))
  .then(() =>
    console.log(`Connected to database and listening to localhost ${port}`)
  )
  .catch((err) => console.log(err))
