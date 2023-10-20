import mongoose from "mongoose";

const holdingsSchema = new mongoose.Schema({
    tokenID: {
        type: Number
    },
    amountInvested: {
        type: Number
    }
})

const listingSchema = new mongoose.Schema({
    tokenID: {
        type: Number
    }
})

const usernameSchema = new mongoose.Schema({  
    username: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String
    },
    holdings: {
        type: [holdingsSchema]
    },
    listings: {
        type: [listingSchema]
    }
})


export default mongoose.model('Username', usernameSchema)