import mongoose from "mongoose";
const replySchema = mongoose.Schema({
    title:{type:String, required: true},
    issueid:{type:String, required: true}
},  {
    timestamps:true
})

export const replyModel = mongoose.model('Customer-Support-reply', replySchema);