import express from 'express';
import { Record } from '../models/recordModel.js';

const router = express.Router();

//Root for save a new Record
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.Maintaintype ||
            !request.body.VehicleID ||
            !request.body.Date ||
            !request.body.Milage ||
            !request.body.Description
        ) {
            return response.status(400).send({
                message: 'Send all required fields: Maintaintype, VehicleID, Description',
            });
        }
        const newRecord = {
            Maintaintype: request.body.Maintaintype,
            VehicleID: request.body.VehicleID,
            Date: request.body.Date,
            Milage: request.body.Milage,
            Description: request.body.Description,
        };

        const record = await Record.create(newRecord);

        return response.status(201).send(record);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for get all records from database
router.get('/', async (request, response) => {
    try{
        const records = await Record.find({});
        return response.status(200).json({
            count: records.length,
            data: records
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for get one record from database by using id
router.get('/:id', async (request, response) => {
    try{

        const { id } = request.params;

        const record = await Record.findById(id);

        return response.status(200).json(record);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for a update record
router.put('/:id', async (request, response) => {
    try{
        if(
            !request.body.Maintaintype ||
            !request.body.VehicleID ||
            !request.body.Date ||
            !request.body.Milage ||
            !request.body.Description
        ) {
            return response.status(400).send({
                message: 'Send all required fields: Maintaintype, VehicleID, Date, Milage, Description',
            })
        }

        const { id } = request.params;

        const result = await Record.findByIdAndUpdate(id, request.body);

        if(!result) {
            return response.status(404).json({ message: 'Record not found' });
        }

        return response.status(200).send({ message: 'Record updated succesfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//Route for deleting a record
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Record.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).json({ message: 'Record not found' });
        }

        return response.status(200).send({ message: 'Record deleted succesfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;