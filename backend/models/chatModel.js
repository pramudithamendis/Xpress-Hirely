import mongoose from "mongoose";
const chatSchema = mongoose.Schema({
    title:{type:String, required: true}, 
    vehicle:{type:String, required: true}, 
    issue:{type:String, required: true},
    user:{type:String, required: true},
    vehicletypee:{type:String, required: true}
},  {
    timestamps:true
})

export const chatModel = mongoose.model('Customer-Support', chatSchema);