import express from 'express';
import cors from 'cors';
import { CardPayment } from '../models/cardPaymentModel.js';
import fs from 'fs';
// import sendPaymentEmail from '../index.js';

const router = express.Router();

//Route to save a new card payment - client view
router.post('/user', async (request, response) => {
    try {
        if (
            // !request.body.NIC ||
            !request.body.CardHolderName ||
            !request.body.CardNumber ||
            !request.body.CVV ||
            !request.body.DateOfExpiry ||
            !request.body.Amount
        ) {
            return response.status(400).send({
                message: 'Send all fields',
            });
        }
        const newCardPayment = {
            // NIC: request.body.NIC,
            CardHolderName: request.body.CardHolderName,
            CardNumber: request.body.CardNumber,
            CVV: request.body.CVV,
            DateOfExpiry: request.body.DateOfExpiry,
            Amount: request.body.Amount,
        };

        const cardPayment = await CardPayment.create(newCardPayment);

        return response.status(201).send(cardPayment);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to get all card payments - client view
router.get('/user', async (request, response) => {
    try {
        const cardPayments = await CardPayment.find({});

        return response.status(200).json({
            count: cardPayments.length,
            data: cardPayments
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to get all card payments - admin view
router.get('/admin', async (request, response) => {
    try {
        const cardPayments = await CardPayment.find({});

        return response.status(200).json({
            count: cardPayments.length,
            data: cardPayments
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to get one card payment by id - client view
router.get('/user/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const cardPayment = await CardPayment.findById(id);

        return response.status(200).json(cardPayment);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;

// Read payment template

const paymentTemplate = fs.readFileSync( 'D:/OTHER/sliit/Y2S2/ITP Project/Rent-A-Car_MERNSTACK/backend/templates/PaymentConfirmation.html' , 'utf8');

function handlePaymentConfirmation(req, res) {

    const recipientEmail = req.body.Email;

    const dynamicData = {
        // BookingID: await BookingModel.getBookingID(req.body.bookingId),
        // VModel: req.body.VModel,
        // Year: req.body.Year,
        // Pickup_Date: req.body.Pickup_Date,
        // Pickup_Time: req.body.Pickup_Time,
        // ReturnDate: req.body.ReturnDate,
        // ReturnTime: req.body.ReturnTime,
        Amount: req.body.Amount,
        PaymentMethod: 'Card'
        
    };
    sendPaymentEmail(recipientEmail, dynamicData, paymentTemplate);
}

// exports.handlePaymentConfirmation = handlePaymentConfirmation;
export { handlePaymentConfirmation };