import express from 'express';
import cors from 'cors';
import { StripePayment } from '../models/stripePaymentModel.js';
import { STRIPE_SECRET_KEY } from '../config.js';
import fs from 'fs';
// import sendPaymentEmail from '../index.js';

const router = express.Router();

//Route to save a new Stripe payment - client view
router.post('/user', async (request, response) => {
    try {
        if (
            // !request.body.PaymentID ||
            !request.body.CardNumber ||
            !request.body.CVV ||
            !request.body.DateOfExpiry ||
            !request.body.Amount
        ) {
            return response.status(400).send({
                message: 'Send all fields',
            });
        }
        const newStripePayment = {
            // PaymentID: request.body.PaymentID,
            CardNumber: request.body.CardNumber,
            CVV: request.body.CVV,
            DateOfExpiry: request.body.DateOfExpiry,
            Amount: request.body.Amount,
        };

        const stripePayment = await StripePayment.create(newStripePayment);

        //stripe - start
        // const paymentIntent = await STRIPE_SECRET_KEY.paymentIntents.create({
        //     Amount: req.body.Amount,
        //     currency: 'lkr',
        //   });
        //   res.send({ clientSecret: paymentIntent.client_secret });

          //stripe - end

        return response.status(201).send(stripePayment);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to get all Stripe payments - client view
router.get('/user', async (request, response) => {
    try {
        const stripePayments = await StripePayment.find({});

        return response.status(200).json({
            count: stripePayments.length,
            data: stripePayments
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to get all Stripe payments - admin view
router.get('/admin', async (request, response) => {
    try {
        const stripePayments = await StripePayment.find({});

        return response.status(200).json({
            count: stripePayments.length,
            data: stripePayments
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to get one stripe payment by id - client view
router.get('/user/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const stripePayment = await StripePayment.findById(id);

        return response.status(200).json(stripePayment);

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
        PaymentMethod: 'Stripe'
        
    };
    sendPaymentEmail(recipientEmail, dynamicData, paymentTemplate);
}

// exports.handlePaymentConfirmation = handlePaymentConfirmation;
export { handlePaymentConfirmation };