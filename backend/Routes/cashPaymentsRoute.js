import express from 'express';
import cors from 'cors';
import { CashPayment } from '../models/cashPaymentModel.js';
import fs from 'fs';
// import sendPaymentEmail from '../index.js';

const router = express.Router();

//Route to save a new cash payment - client view
router.post('/user', async (request, response) => {
    try {
        if (
            // !request.body.PaymentID ||
            !request.body.ReceiptNo ||
            !request.body.Date ||
            !request.body.Status ||
            !request.body.Amount
        ) {
            return response.status(400).send({
                message: 'Send all fields',
            });
        }
        const newCashPayment = {
            // PaymentID: request.body.PaymentID,
            ReceiptNo: request.body.ReceiptNo,
            Date: request.body.Date,
            Status: request.body.Status,
            Amount: request.body.Amount,
        };

        const cashpayment = await CashPayment.create(newCashPayment);

        return response.status(201).send(cashpayment);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to get all cash payments - client view
router.get('/user', async (request, response) => {
    try {
        const cashPayments = await CashPayment.find({});

        return response.status(200).json({
            count: cashPayments.length,
            data: cashPayments
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to get all cash payments - admin view
router.get('/admin', async (request, response) => {
    try {
        const cashPayments = await CashPayment.find({});

        return response.status(200).json({
            count: cashPayments.length,
            data: cashPayments
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to get one cash payment by id - client view
router.get('/user/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const cashPayment = await CashPayment.findById(id);

        return response.status(200).json(cashPayment);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to update a cash payment - admin view
router.put('/admin/:id', async (request, response) => {
    try {
        const { Status } = request.body;
        const { ReceiptNo } = request.body;

            if (!Status || !ReceiptNo) {
                return response.status(400).send({
                  message: 'Send Status and ReceiptNo field',
                });
              }

        const { id } = request.params;

        const result = await CashPayment.findByIdAndUpdate(id, {Status, ReceiptNo});

        if (!result) {
            return response.status(404).json({ message: 'Cash Payment not found' });

        }
        return response.status(200).send({ message: 'Cash Payment updated' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to get one cash payment by id - admin view
router.get('/admin/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const cashPayment = await CashPayment.findById(id);

        return response.status(200).json(cashPayment);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;

// Read payment template
const paymentTemplate = fs.readFileSync( 'templates/PaymentConfirmation.html' , 'utf8');

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
        PaymentMethod: 'Cash'
        
    };
    sendPaymentEmail(recipientEmail, dynamicData, paymentTemplate);
}

// exports.handlePaymentConfirmation = handlePaymentConfirmation;
export { handlePaymentConfirmation };