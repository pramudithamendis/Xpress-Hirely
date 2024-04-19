import express from "express";
import { adminModel } from "../models/adminModel.js";


const router = express.Router();
router.post('/create', async (request,response)=>{
    try {
        if(
            !request.body.email||
            !request.body.password
        ){
            return response.status(400).send('Send all the required fields');
        }

        const newAdmin = {
            email: request.body.email,
            password: request.body.password
        }

        const newAdminFinal = await adminModel.create(newAdmin);
        return response.status(201).send(newAdminFinal);
    } catch (error) {
        
    }
})

router.post('/login', async (request,response)=>{
    const {email, password} = request.body;

    adminModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                response.json({success: "Success", user: user.email})
                
            }else{
                response.json("Incorrect login details")
            }
        }else{
            response.json("No record existed")
        }
    })

})


export default router;
