import express from 'express';
import { RentHis } from '../models/rentModel.js';

const router = express.Router();

//HTTP Route to Save a new vehicle
router.post('/', async(request, response) => {
    try {
        if(
        !request.body.name ||
        !request.body.vehicle ||
        !request.body.rentDate ||
        !request.body.returnDate ||
        !request.body.mileage ||
        !request.body.amount
        ) {
            return response.status(400).send({
                message: 'Send all required fields: Name, Vehicle, rentDate, returnDate, mileage '
            });
        }
        
        const newRent = {
            name: request.body.name,
            vehicle: request.body.vehicle,
            rentDate: request.body.rentDate,
            returnDate: request.body.returnDate,
            mileage: request.body.mileage,
            amount: request.body.amount,
        };
        const rentalHistory = await RentHis.create(newRent);

        return response.status(201).send(rentalHistory);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message:  'Internal Server Error'});
        
    }
});

//Route for Get All  from database
router.get('/', async(request, response) => {
    try {
        const rentalHistories = await RentHis.find({});

        return response.status(200).json({
            count: rentalHistories.length,
            data: rentalHistories
        });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
        
    }
});

//Route for Get One Rental from database
router.get('/:id', async(request, response) => {
    try {
        const{ id } = request.params;

        const rentalHistory = await RentHis.findById(id);

        return response.status(200).json(rentalHistory);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
        
    }
});

//Route to Update a Rent
router.put('/:id', async (request, response) => {
    try {
        if(
            !request.body.name ||
            !request.body.vehicle ||
            !request.body.rentDate ||
            !request.body.returnDate ||
            !request.body.mileage ||
            !request.body.amount
            ) {
                return response.status(400).send({
                    message: 'Send all required field: Name, Vehicle, rentDate, returnDate or mileage '
                });
            }
        
            const{ id } = request.params;

            const result = await RentHis.findByIdAndUpdate(id, request.body);

            if(!result){
                return response.status(404).json({ message: 'Rent not found'});
            }

            return response.status(200).send({ message: 'Rent updated succesfully'})

    } catch (error) {
    console.log(error.message); 
    response.status(500).send({ message: error.message });   
    }
})

//Route for Delete a rent
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await RentHis.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({ message: 'Rent not found'});
        }

        return response.status(200).send({ message: 'Rent deleted succesfully'})
        
    } catch (error) {
        console.log(error.message); 
    response.status(500).send({ message: error.message });
        
    }
});

export default router;