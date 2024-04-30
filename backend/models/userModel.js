import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    idN:{type:Number, required: true}, 
    password:{type:String, required: true}
},  {
    timestamps:true
})

export const userModel = mongoose.model('User-Pram', userSchema);