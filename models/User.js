import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value)  {return value.length >=6},
            message: () => 'Minimum password length should be 6 characters'
        }
    },
    username: {
        type: String,
        required: true
    },
    publicAddress: {
        type: String,
        required: true,
        //default: "0x"
        role: {
            default: "0x"
        }
    },
    isVerified: {
        type: Boolean,
        required: true,
        //default: false,
        role: {
            default: false,
        }
    }

    // category
})




export default mongoose.model('User', userSchema)