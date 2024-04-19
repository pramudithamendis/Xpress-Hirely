import express from "express";
import { vehicleModel } from "../models/vehicleModel.js";

const router = express.Router();


router.post('/create', async (request,response)=>{
    
    try {
        console.log("in create route")
        if(
            !request.body.vehiclenumber ||
            !request.body.vehiclename
        ){
            return response.status(400).send('Send all the required fields');
        }

        const newVehicle = {
            vehiclenumber: request.body.vehiclenumber,
            vehiclename: request.body.vehiclename
        }

        const vehicle = await vehicleModel.create(newVehicle);
        return response.status(201).send(vehicle);
    } catch (error) {
        
    }
})


router.post('/validateVehicle', async (request,response)=>{
    const {vehiclenumber} = request.body;

    vehicleModel.findOne({vehiclenumber: vehiclenumber})
    .then(vehiclenumber => {
        if(vehiclenumber){
                response.json({success: "Vehicle number is valid", vehiclenumber: vehiclenumber})          
        }else{
            response.json("Vehicle number is invalid.")
        }
    })
})

export default router;