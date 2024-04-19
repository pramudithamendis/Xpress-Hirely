import express from "express";
import { userModel } from "../models/userModel.js";

const router = express.Router();

router.post('/create', async (request,response)=>{
    try {
        if(
            !request.body.idN ||
            !request.body.password
        ){
            return response.status(400).send('Send all the required fields');
        }
        
        const newUser ={
            idN: request.body.idN,
            password: request.body.password
        }

        
        const newUserFinal = await userModel.create(newUser);
        return response.status(201).send(newUserFinal);
    } catch (error) {
        
    }
})


router.post('/login', async (request,response)=>{
    const {idN, password} = request.body;

    userModel.findOne({idN: idN})
    .then(user => {
        if(user){
            if(user.password === password){
                response.json({success: "Success", user: user.idN})
                
            }else{
                response.json("Incorrect login details")
            }
        }else{
            response.json("No record existed")
        }
    })

})


export default router;