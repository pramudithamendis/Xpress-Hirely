import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    role:{
        type: String,
        default: 'user',
    },
    password:{
        type: String,
        required: true,
    },
});

export const User = mongoose.model('user', userSchema);
