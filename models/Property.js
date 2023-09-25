import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    metamaskAddress: {
        type: String,
        required: true
    },
    propertyName: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    tokenID: {
        type: Number,
        required: true
    },
    imageSource: {
        type: [String],
    }
})




export default mongoose.model('Property', propertySchema)