import mongoose from "mongoose";
const vehicleSchema = mongoose.Schema({
    vehiclenumber:{type:String, required: true}, 
    vehiclename:{type:String, required: true}
},  {
    timestamps:true
})

export const vehicleModel = mongoose.model('Vehicle', vehicleSchema);