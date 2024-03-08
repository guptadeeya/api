import mongoose from "mongoose";

const userSchema = new mongoose.schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    
}, {timeStamps: true})

const User = mongoose.model('User', userSchema)

export default User